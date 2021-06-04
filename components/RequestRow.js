import React, { Component } from 'react';
import { Icon, Label, Menu, Table,Button } from 'semantic-ui-react'
import {Link} from '../routes';
import web3 from '../../Campaign/ethereum/web3';
import Campaign from '../../Campaign/ethereum/campaignInstance';



class RequestRow extends Component{
    state = {
        Status:'',
        denials:0,
    }
    static  async getInitialProps(props){
        const req = props.request;
        // console.log(req);
        const numOfApprovers = props.numOfApprovers;
        canProcess = (Math.floor(Date.now()/1000) > req.deadline && !req.isProcessed ) ? true : false;
        return {numOfApprovers,canProcess}
    }
    getStatus(){
       
        const req = this.props.request;
        console.log(req);
        let status;
        const canProcess = (Math.floor(Date.now()/1000) > req.deadline && !req.isProcessed ) ? true : false;
        if(!req.isProcessed && !canProcess){status = "Open for Voting"}
        else if(canProcess && !req.isProcessed){status = "Ready to Process"}
        else if(req.isProcessed && req.isApproved){status = "Transferred"}
        else if(req.isProcessed && !req.isApproved){status = "Denied"}
        // this.setState({Status:status});
        return (
            status
        );

    }
    process = async() => {
        const index = this.props.request.index;         
        console.log('req index is',index);  
        const req = this.props.request;
        // if( Math.floor(Date.now()/1000) < req.deadline){console.log('Time is remaining');}
        const campaign = await Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.processRequest(index)
        .send({from:accounts[0],gas:'10000000',});
        console.log('req is being processed');
    }

    approve(){
       console.log('approve'); 
    }

    deny = async() =>{

        const campaign = await Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        const index = this.props.request.index;
        await campaign.methods.approveRequest(index,false)
        .send({from:accounts[0],gas:'10000000',});
        this.setState({denials:this.state.denials+1});
    }
   
    render(){
        const {Row,Cell} = Table;
        const req = this.props.request;
        return (
           
            <Row positive = {req.isApproved} negative = {req.isProcessed && (!req.isApproved) }>
                <Cell>{req.index}</Cell>
                <Cell>{req.description}</Cell>
                <Cell>{(web3.utils.fromWei(String(req.value),'ether'))}</Cell>
                {/* <Cell>{req.value}</Cell> */}
                <Cell>{req.recipient}</Cell>
                <Cell>{this.state.denials}/{this.props.numOfApprovers}</Cell>
                <Cell>
                    {   //disable button when approved has denied
                        <Button size = 'tiny' color = 'red' disabled = {req.isProcessed} basic onClick = {this.deny}>Deny</Button>
    
                    }
                </Cell>
                <Cell>
                <Button size = 'tiny' color = 'blue' basic onClick = {this.process} disabled = {req.isProcessed}>Process</Button>
                </Cell>
                <Cell>{this.getStatus()}</Cell>
                
            </Row>
        );
    }
}
export default RequestRow;