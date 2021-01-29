const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');
 
const buildPath = path.resolve(__dirname,'build');
fs.removeSync(buildPath); //deletes the folder and everything inside
const campaignPath = path.resolve(__dirname,'contracts','campaign.sol');
const soure = fs.readFileSync(campaignPath,'utf8');//read the contract through fs module
const output = solc.compile(source,1).contracts; //extract only contracts. 
fs.ensureDirSync(buildPath);

for(let contract in output){
    fs.outputJsonSync(
        path.resolve(buildPath,contract.replace(':','') + '.json'),
        output[contract]
    )
}