const Web3 = require('web3');
const assert = required('assert');
const ganache = require('ganache-cli');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/factory.json');
const compiledCampaign = require('../ethereum/build/campaign.json');

let acounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({data:compiledFactory.bytecode})//check here 
    .send({from:accounts[0], gas:'1000000'});

    await factory.methods.createCampaign('100','33').send({
        from : accounts[0],
        gas : '1000000'
    });
   
    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
    // assign an already deployed contract to the campaign variable
    campaign = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface),
        campaignAddress
    );
});

