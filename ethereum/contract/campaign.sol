// SPDX-License-Identifier: MIT
pragma solidity ^ 0.4.17;
//create a formula for a personally weighted voting system
contract factory{
    
}
contract campaign{
    address public manager;
    uint public minContribution;
    mapping(address => approver) approvers;
    uint reqNumber;
    uint approveThreshlod;
    uint numberOfApprovers;
    
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
        bool approved;
        bool isTransferred;
        mapping(address => uint) state;
        
    }
    request[]  public requests;
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    
    constructor(uint min_val,uint threshold) public{
        manager = msg.sender;
        minContribution = min_val;
        approveThreshlod = threshold;
        reqNumber = 0;
        numberOfApprovers = 0;
    }
    
    function contribute() public payable{
        require(msg.value >= minContribution);
        approvers[msg.sender].stakeValue = msg.value;
        numberOfApprovers+=1;
    } 
    
    function createRequest(string description, uint value, address recipient) public restricted{
        reqNumber++; //updation;
        
        request memory req;
        req.description = description;
        req.value = value;
        req.recipient = recipient;
        req.index = reqNumber;
        req.isProcessed = false;
        req.denials = 0;
        req.approved = false;
        req.isTransferred = false;
        
        requests.push(req);
    }
    function approveRequest(uint req_number, bool isApproved) public{
        //try to close the incoming after request has been approved
        // what if new people enter the pool after the request goes live, would they be able to approve?
        
        request storage req = requests[req_number-1];
        require(!req.isProcessed);
        require((req.state[msg.sender] == 0));
        //if the request is processed or the person has already voted then we return without processing
 
        if(!isApproved){
            req.denials+=1;
            req.state[msg.sender] = 2;
        }
        req.state[msg.sender] = 1;
    }
    function checkApproval(uint req_number) public restricted{
        //here we check the approveal of a certain request
        //this function will be called after a certain amount of time has been passed since the requst was initiated( find out how this works)
        
        request storage req = requests[req_number - 1];
        // if(req.isProcessed){return ;}
        require(!req.isProcessed);
        uint total = numberOfApprovers;
        uint denied = req.denials;
        uint percentage = (denied*100)/total;
        req.isProcessed = true;
        if(percentage >= approveThreshlod){
            req.approved = true;
        }
        //the request has been processed now
    }
    
}