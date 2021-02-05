import React, {Component} from 'react';
import {Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaignInstance';
import web3 from '../ethereum/web3';
// import Button from 'semantic-ui-react/dist/commonjs/elements/Button';

class ContributeForm extends Component {
    state = {
        value : ''
    };
    onSubmit = async (event) => {
        event.preventDefault();
        const campaign = Campaign(this.props.address);
        try{
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from:accounts[0],
                value:web3.utils.toWei(this.state.value,'ether')
            });
        }
        catch (err){

        }
    }
    render() {
        return (
            <Form onSubmit = {this.onSubmit}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input 
                    label ='ether'
                    labelPosition='right'
                    value = {this.state.value}
                    onChange = {event => this.setState({value:event.target.value})}
                    />
                </Form.Field>
                <Button primary>
                    Contribute
                </Button>
            </Form>
        )
    }
}
export default ContributeForm;