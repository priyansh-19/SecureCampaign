// const compiledFile = require("./build/factory.json");


// console.log(bytecode);
const { interfaces } = require('mocha');
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFile = require("./build/factory.json");
const interface = compiledFile.abi;
const bytecode = compiledFile.evm.bytecode.object;

const provider = new HDWalletProvider(
'bring spoil crash hub slide false blind dose smart carry garlic fine',
 'https://rinkeby.infura.io/v3/ee00e1806bfb419f985a53526c510ac3'
);

const web3 = new Web3(provider);

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();
    // console.log(accounts);
    console.log('Attempting to deploy from account ', accounts[0]);

    const result =  await new web3.eth.Contract(interface)
    .deploy({data:bytecode})
    .send({gas:'10000000',from:accounts[0], gasPrice: 2000000000,});
    
    // console.log(interface);
    console.log('contract deployed to ',result.options.address);
};
deploy();