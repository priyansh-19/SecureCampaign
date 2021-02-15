import web3 from './web3';
// import fs from 'fs';
import campaignFactory from './build/factory.json';
const path = require('path');

const addressPath = path.resolve(__dirname,'address.txt');
// const addressFile = fs.readFileSync('addressPath','utf8');
// console.log(web3);
const instance = new web3.eth.Contract(
     campaignFactory.abi,
    '0x1c47C4715A029Cd10711811CaaC240143CcA2903'
    // addressFile
);

export default instance;
