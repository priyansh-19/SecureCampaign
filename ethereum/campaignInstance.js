import web3 from './web3';
import  Campaign from './build/campaign.json';

const createInstance = (address) =>{
    return new web3.eth.Contract(
        Campaign.abi,
        address
    )
}
export default createInstance;