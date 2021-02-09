import web3 from './web3';
// import fs from 'fs';
import campaignFactory from './build/factory.json';
const path = require('path');

const addressPath = path.resolve(__dirname,'address.txt');
// const addressFile = fs.readFileSync('addressPath','utf8');
// console.log(web3);
const instance = new web3.eth.Contract(
     campaignFactory.abi,
    '0xAb598335C7204b19878eb380e479BC8C006305a6'
    // addressFile
);

export default instance;
