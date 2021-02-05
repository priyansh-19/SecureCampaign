import React, {Component} from 'react';
import {Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaignInstance';
import web3 from '../ethereum/web3';
import {Router} from '../routes';
// import Button from 'semantic-ui-react/dist/commonjs/elements/Button';

class ContributeForm extends Component {
    state = {
        value : '',
        errorMessage:'',
        isLoading:false
    };
    onSubmit = async (event) => {
        event.preventDefault();
        const campaign = Campaign(this.props.address);
        this.setState({isLoading:true,errorMessage:''})
        try{
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from:accounts[0],
                value:web3.utils.toWei(this.state.value,'ether')
            });
            //refresh the page
            // Router.replaceRoute(`/campaigns/${this.props.address}`);
        }
        catch (err){
            this.setState({errorMessage:err.message});
        }
        this.setState({isLoading:false,value:''})
    }
    render() {
        return (
            <Form onSubmit = {this.onSubmit} error = {!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input 
                    label ='ether'
                    labelPosition='right'
                    value = {this.state.value}
                    onChange = {event => this.setState({value:event.target.value})}
                    />
                </Form.Field>
                <Message error header ="oops!" content = {this.state.errorMessage}></Message>
                <Button primary loading = {this.state.isLoading}>
                    Contribute
                </Button>
            </Form>
        )
    }
}
export default ContributeForm;