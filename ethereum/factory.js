import web3 from './web3';
import campaignFactory from './build/factory.json';
// console.log(web3);
const instance = new web3.eth.Contract(
     campaignFactory.abi,
    '0xA2529A0314278748c6699a799B12B8C734A28f10'
);

export default instance;
