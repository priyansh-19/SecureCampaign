import React, {Component} from 'react';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Layout from '../../../components/Layout';
import {Link} from '../../../routes';
import Campaign from '../../../ethereum/campaignInstance';


class RequestIndex extends Component {
    static async getInitialProps(props){
        const {address} = props.query;

        const campaign = await Campaign(address);
        const numReq = await campaign.methods.getRequestCount().call();
        console.log(numReq);
        let req;
        if(numReq!=0){
            req = await campaign.methods.getRequest(numReq-1).call();
            console.log(req);
        }   
        return {address};
    }

    render() {
        return (
            <Layout>
            <h3>Requests</h3>
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