// SPDX-License-Identifier: MIT
pragma solidity >= 0.6.1;
pragma experimental ABIEncoderV2;
//create a formula for a personally weighted voting system
contract factory{
    address public manager;
    campaign[] public deployedCampaigns;
    uint timeWindow;
    constructor(){
        timeWindow = 60;
        manager = msg.sender;
    }
    function createCampaign(uint min_val, uint threshold) public{
        // require(msg.sender == manager);
        campaign newCampaign = new campaign(min_val, threshold, timeWindow, msg.sender);
        deployedCampaigns.push(newCampaign); 
    }
    function getDeployedCampaigns() public view returns(campaign[] memory) {
        return deployedCampaigns;
    }
}
contract campaign{
    
    address public manager;
    uint minContribution;
    mapping(address => approver) approvers;
    mapping(uint => mapping(address => uint) ) voteStatus;//array of mapping of addresses
    uint reqNumber;
    uint approveThreshlod;
    uint numberOfApprovers;
    uint timeWindow;
    
    request [] public requests; //cannot initialize struct with mappings normally( through array of requests)
    
    struct approver{
        uint stakeValue;
    }
    
    struct request{
        uint value;
        address recipient;
        string description;
        uint index;
        uint denials;
        bool isProcessed;
        bool isApproved;
        uint deadline;
        // mapping(address => uint) state;
    }
    // request[]  public requests; not valid anymore
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    
    constructor(uint min_val,uint threshold,uint timewindow, address creator) {
        manager = creator;
        minContribution = min_val;
        approveThreshlod = threshold;
        reqNumber = 0;
        numberOfApprovers = 0;
        timeWindow = timewindow;
    }
    
    function contribute() public payable{
        require(msg.value >= minContribution);
        if(approvers[msg.sender].stakeValue == 0){
        numberOfApprovers+=1;
        }
        approvers[msg.sender].stakeValue += msg.value;
        //edit this part, number of approvers should not increase when someone contributes again
    } 
    
    function createRequest(string memory description , uint value, address recipient) public restricted{
         //updation;
        reqNumber++;
        request memory req ;
        req.description = description;
        req.value = value;
        req.recipient = recipient;
        req.index = reqNumber;
        req.isProcessed = false;
        req.denials = 0;
        req.isApproved = false;
        req.deadline = block.timestamp + timeWindow;
        requests.push(req);
        
    }
    function approveRequest(uint req_number, bool isApproved) public{
        //try to close the incoming after request has been approved
        // what if new people enter the pool after the request goes live, would they be able to approve?
        
        request storage req = requests[req_number-1];
        require(approvers[msg.sender].stakeValue != 0);//voter must be an approver
        require(!req.isProcessed);//request should not have been proccessed
        require((voteStatus[req_number][msg.sender] == 0));//approver should not have already voted
        //if the request is processed or the person has already voted then we return without processing
 
        if(!isApproved){
            req.denials+=1;
            voteStatus[req_number][msg.sender] = 2;
            
        }
       voteStatus[req_number][msg.sender] = 1;
    }
    function processRequest(uint req_number) public restricted{
        //here we check the approveal of a certain request
        //this function will be called after a certain amount of time has been passed since the requst was initiated( find out how this works)
        
        request storage req = requests[req_number - 1];
        require(!req.isProcessed);
        
        uint total = numberOfApprovers;
        uint denied = req.denials;
        uint percentage = (denied*100)/total;
        
        if(percentage <= approveThreshlod){
            req.isApproved = true;
            transferRequestMoney(req_number);
        }
        req.isProcessed = true;
        //the request has been processed now
    }
    function transferRequestMoney(uint req_number) public restricted{
        request storage req = requests[req_number - 1];
        require(req.isApproved);
        address payable recipient = payable(req.recipient);
        recipient.transfer(req.value);
    }
    //this function return the stats for the frontend display
    function returnStats() public view returns(uint,uint,uint,uint,uint,address){

        return(reqNumber, approveThreshlod, minContribution,address(this).balance,numberOfApprovers, manager);
        
    }
    function getRequestCount() public view returns (uint){
        return reqNumber;
    }
    function getRequest(uint req_number) public view returns(request memory){
        return requests[req_number];
    }
}
    
