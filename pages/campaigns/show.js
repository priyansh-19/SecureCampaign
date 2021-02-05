import React, {Component} from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaignInstance';
import {Card, Grid, Button } from'semantic-ui-react';
import web3 from '../../ethereum/web3'
import ContributeForm from '../../components/ContributeForm';
import {Link} from '../../routes';

class CampaignShow extends Component {

    static async getInitialProps(props) {
        const address = props.query.address;
        const campaign = await Campaign(props.query.address);
        const stats = await campaign.methods.returnStats().call();
        // console.log(stats);
        //stats is an object with numbered keys

        return {
            address:props.query.address,
            reqNumber : stats[0],
            approveThreshold : stats[1],
            minimumContribution : stats[2],
            balance : stats[3],
            numOfApprovers : stats[4],
            manager : stats[5]

        };
    }
    renderCards() {
        const {
            reqNumber,
            approveThreshold,
            minimumContribution,
            balance ,
            numOfApprovers ,
            manager
        } = this.props;

        const items = [
            {
                header:manager,
                meta:'Address of Manager',
                description:'The Mangaer can ',
                style:{overflowWrap : 'break-word'}
            },
            {
                header:minimumContribution,
                meta:'Minimum Contribution(wei)',
                description:'You have to contribute atleast the minimum contribution to become an approver',
                style:{overflowWrap : 'break-word'}
            },
            {
                header:numOfApprovers,
                meta:'Number of Approvers',
                description:'The number of people who have donated to this campaign ',
                style:{overflowWrap : 'break-word'}
            },
            {
                header:web3.utils.fromWei(balance,'ether'),
                meta:'Campaign Balance (ether)',
                // description:'The number of people who have donated to this campaign ',
                style:{overflowWrap : 'break-word'}
            },
            // {
            //     header:web3.utils.fromWei(balance,'ether'),
            //     meta:'Campaign Balance (ether)',
            //     // description:'The number of people who have donated to this campaign ',
            //     style:{overflowWrap : 'break-word'}
            // },
        ];
        return <Card.Group items = {items} />;
    }
   
    render() {
        return(
            <Layout>
            <h3>Campaign Show</h3>
                <Grid>
                    <Grid.Row>
                    <Grid.Column width = {10}>
                        {this.renderCards()}
                      
                    </Grid.Column>

                    <Grid.Column width = {6}>
                        <ContributeForm address = {this.props.address} />
                    </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                        <Link route = {`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button primary>View Requests</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
            </Layout>
        ) 
    }
}
export default CampaignShow;