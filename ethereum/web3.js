// import Web3 from 'web3'
const Web3 = require('web3');
let web3;
//we have to remove metamask dependency
// const web3 = new Web3(window.currentProvider);;
if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
    // we are in the brwoser and metamask is running
     web3 = new Web3(window.web3.currentProvider);
}
else{
    //we are on the server  or the user is not runnig metamask
    console.log('server side');
    const provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/ee00e1806bfb419f985a53526c510ac3');
    web3 = new Web3(provider);
}

export default web3;