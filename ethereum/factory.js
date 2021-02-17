import web3 from './web3';
// import fs from 'fs';
import campaignFactory from './build/factory.json';
const path = require('path');

const addressPath = path.resolve(__dirname,'address.txt');
// const addressFile = fs.readFileSync('addressPath','utf8');
// console.log(web3);
const instance = new web3.eth.Contract(
     campaignFactory.abi,
    '0xAb61cBE7D82e293D25c6DF7e414Fd3638a900630'
    // addressFile
);

export default instance;
