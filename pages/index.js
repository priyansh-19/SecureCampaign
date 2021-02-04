import React, {Component} from 'react';
import factory from '../ethereum/factory';
import 'semantic-ui-css/semantic.min.css';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import {Link} from '../routes';
//display a list of all the active campaigns

class CampaignIndex extends Component{
    // This is the method for next js to load this data on server side
    static async getInitialProps() {
        const  campaigns = await factory.methods.getDeployedCampaigns().call();
        return {campaigns};
    }
    renderCampaigns() {
        //this maps the output of function inside map to all the items in campaign array
        // this.getInitialProps();
        const items = this.props.campaigns.map(address =>{
            return{
                header : address,
                description : (
                <Link route = {`/campaigns/${address }`}>
                <a>View Campaign</a>
                </Link>
                ),
                fluid : true
            };
        });
        return <Card.Group items={items} />;
    }
    render(){

        return(
            <Layout>
                <div>
                   
                    <h3>Open Campaigns </h3>
                    <Link route = '/campaigns/new'>
                        <a>
                        <Button
                            content = "Create Campaign"
                            icon = "add circle"  
                            primary = {true}
                            floated = 'right'
                        />
                        </a>
                     </Link>
                    {this.renderCampaigns()}
                </div>
            </Layout>
        );       
    }
}
export default CampaignIndex;
