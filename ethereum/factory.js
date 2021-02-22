import web3 from './web3';
// import fs from 'fs';
import campaignFactory from './build/factory.json';
const path = require('path');

const addressPath = path.resolve(__dirname,'address.txt');
// const addressFile = fs.readFileSync('addressPath','utf8');
// console.log(web3);
const instance = new web3.eth.Contract(
     campaignFactory.abi,
    '0xc836404765083619Ff67B9c2948D7eC5bf8aC4aE'
    // addressFile
);

export default instance;
