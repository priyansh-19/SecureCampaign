const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');
 
const buildPath = path.resolve(__dirname,'build');
// console.log(buildPath);
fs.removeSync(buildPath); //deletes the folder and everything inside

const campaignPath = path.resolve(__dirname,'contract','campaign.sol');
const source = fs.readFileSync(campaignPath,'utf8');
// console.log(source);
// console.log(source);//read the contract through fs module
// var output = solc.compile(source,1).contracts; //extract only contracts. 
// console.log(output);
// 

const input = {
    language: "Solidity",
    sources: {
      "campaign.sol": {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };
  const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['campaign.sol'];
  // console.log(output.contracts['campaign.sol']);

  fs.ensureDirSync(buildPath);
  for(let contract in output){
    
        fs.outputJSONSync(
            path.resolve(buildPath,contract.replace(':','') + '.json'),
            output[contract]
        )
        // console.log(contract);
    }

//   module.exports = output.contracts["Inbox.sol"].Inbox;