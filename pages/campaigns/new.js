import React,{Component} from 'react';
import Layout from '../../components/Layout';
import {Form, Button, Input, Message} from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Link, Router} from '../../routes';

class campaignNew extends Component {
    state = {
        minimumContribution: '',
        threshold: '',
        errorMessage:'',
        isLoading:false
    }
    onSubmit = async(event)=> {
        //we need function binding, hence the arrow function(to enable 'this')
        event.preventDefault();
        this.setState({isLoading:true, errorMessage:''})
        // this.setState({errorMessage : ''});
        //creata a new campaign here
        try{
            // console.log(accounts);//connect metamask to site, fragile line
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampaign(this.state.minimumContribution,this.state.threshold)
            .send({
                from : accounts[0]
            });
            //redirect user to campaign index page
            Router.pushRoute('/');
        }
        catch(err){
            this.setState({errorMessage:err.message});
        }
        this.setState({isLoading:false});

    };
    render() {
        return(
            <Layout>
                <h3>Create a Campaign</h3>
                <Form onSubmit = {this.onSubmit} error = {this.state.errorMessage}>
                    {/* //no parenthesis here */}
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input 
                        label = "wei"
                        labelPosition='right'
                        value = {this.state.minimumContribution}
                        onChange={event => this.setState({minimumContribution:event.target.value})}
                        />
                    </Form.Field>
                    
                    <Form.Field>
                        <label>Passing Threshold</label>
                        <Input 
                        label = "%"
                        labelPosition='right'
                        value = {this.state.threshold}
                        onChange={event => this.setState({threshold:event.target.value})}
                        />
                    </Form.Field>
                    <Message error header = "oops!" content = {this.state.errorMessage}/>
                   <Button loading = {this.state.isLoading} primary>Create!</Button> 

                </Form>
            </Layout>
        )
    }
}
export default campaignNew;