import React, {Component} from 'react';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Layout from '../../../components/Layout';
import {Link} from '../../../routes';
import Campaign from '../../../ethereum/campaignInstance';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {
    static async getInitialProps(props){
        const {address} = props.query;

        const campaign = await Campaign(address);
        let numReq = await campaign.methods.getRequestCount().call();
        const stats = await campaign.methods.returnStats().call();

        const numOfApprovers = stats[4];
        numReq = parseInt(numReq);
  
        let requests = [];
        for(let i=0;i<numReq;i++){
            let req;
            req = await campaign.methods.getRequest(i).call();
            console.log(req);
            requests.push(req);
        }
        return {address,requests,numOfApprovers,numReq};
    }
    renderRow() {
     
        return this.props.requests.map((request,index) => {
            return(
            <RequestRow
            key = {index}
            request = {request}
            address = {this.props.address}
            numOfApprovers = {this.props.numOfApprovers}
            />
            );
        });
    }
    render() {
        const {Header,Row,HeaderCell,Body} = Table;
        return (
            <Layout>
            <h3>Requests</h3>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Denials</HeaderCell>
                        <HeaderCell>Status</HeaderCell>
                        <HeaderCell>Vote</HeaderCell>
                        <HeaderCell>Process Request</HeaderCell>
                    </Row>
                </Header>
                <Body>
                    {this.renderRow()}
                </Body>
            </Table>

            <Link route={`/campaigns/${this.props.address}/requests/new`}  >
                <a>
                    <Button primary>Add Request</Button>
                </a>
            </Link>
            </Layout>
        );
    }
}
export default RequestIndex; 