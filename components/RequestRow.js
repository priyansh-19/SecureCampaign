import React, { Component } from 'react';
import { Icon, Label, Menu, Table,Button } from 'semantic-ui-react'
import {Link} from '../routes';
import web3 from '../../Campaign/ethereum/web3';
import Campaign from '../../Campaign/ethereum/campaignInstance';



class RequestRow extends Component{
    
    static  getInitialProps(props){
        const req = props.request;
        const numOfApprovers = props.numOfApprovers;
        let status = 'Active';
        if(req.isTransferred){
            status = 'Transferred';
        }
        else if(req.approved){
            status = 'Approved';
        }
        return {status, numOfApprovers}
        //create for denial
    }
    getStatus(){

        const req = this.props.request;
        let status = 'Active';
        if(req.isTransferred){
            status = 'Transferred';
        }
        else if(req.approved){
            status = 'Approved';
        }
        const {Row,Cell} = Table;
        return (
            status
        );

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
    }
   
    render(){
        const {Row,Cell} = Table;
        const req = this.props.request;
        return (
            <Row>
                <Cell>{req.index}</Cell>
                <Cell>{req.description}</Cell>
                <Cell>{(web3.utils.fromWei(String(req.value),'ether'))}</Cell>
                {/* <Cell>{req.value}</Cell> */}
                <Cell>{req.recipient}</Cell>
                <Cell>{req.denials}/{this.props.numOfApprovers}</Cell>
                <Cell>{this.getStatus()}</Cell>
                <Cell>
                    <Button size = 'tiny' color = 'teal' basic onClick = {this.approve}>Approve</Button>
                    <Button size = 'tiny' color = 'red' basic onClick = {this.deny}>Deny</Button>
                </Cell>
            </Row>
        );
    }
}
export default RequestRow;