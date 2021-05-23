const HDWallet = require("@truffle/hdwallet-provider");
const infuraKey = "12558959612a40819c162e83c68654bb";
//
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: () => new HDWallet({mnemonic:{phrase:mnemonic}, providerOrUrl: `https://rinkeby.infura.io/v3/${infuraKey}`}),
      gas: 5500000,
      network_id: 4,
      confirmation: 2,
      timeoutBlocks:200      
    }
  },
  compilers : {
    solc: {
      version: "0.8.4"
    }
  }
};