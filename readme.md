This is my 3rd Udacity project for the Blockchain Developer Nanodegree.

It was build with:

Truffle v5.2.0 (core: 5.2.0)
Solidity - 0.8.4 (solc-js)
Node v12.21.0
Web3.js v1.2.9


The contracts were deployed to the Rinkeby network using this account:

0x8389597e9665D0488C50B8F2FbAe4198c4A20CdC

SupplyChain contract address: 0x3E14F68A282088dfA640Ba7f0F074BecD4Ea2554
Tx: 0x689c538bc4736f4d5d14d95a076a376e37811b4b95dc5ff6525db5cc78f469fe


Libraries used:

truffle: contract compilation, testing and deployment
@truffle/contract: contract wrapper for web3, exposing the contract to the web app
web3: ethereum client library

Prerequisites:

1. nodejs & npm

2. truffle (npm install truffle -g)

3. ganache-cli (npm install ganache-cli -g)

4. Metamask


Steps to run the project:

1. In the terminal window, cd to project root folder, then run "npm install" to install all the packages.

2. run "ganache-cli -m answer awesome please armor coyote organ life order anchor broken endless category"

3. in another terminal window, run "truffle console"

4. in the truffle console, type the following:

        compile
        test
        migrate
 in order to compile, test and migrate the contract to the ganache-cli dev blockchain

 5. in the project folder, run "npm run dev" in order to start the web app. The default browser will start with "http://localhost:3000"

 6. in the web app, open Metamask, connect it to the http://127.0.0.1:8545 and import the first five accounts.

 7. In order to test te functionality, you have two choices:

    Connect to the contract owner account in Metamask and then press the supply chain operaations buttons in order: Harvest, Process, Pack, FoSale, Buy, Ship, Receive, Purchase 
    and check the transaction log and the browser's dev console for the messages

    or 


    Firstly, connect to the contract owner account in Metamask and press the Add roles button. The corresponding roles will be added (the addreses are hardcoded as the inputs values).
    Then, switch the account in Metamask to one of the other roles and then perform the correspoding operations (ex. switch to the Farmer account and then press the Harvest, Process, Pack, ForSale buttons. 
        You should receive an error if you try to Buy the item with the a Farmer account).






Mnemonic: answer awesome please armor coyote organ life order anchor broken endless category

Available Accounts
==================
(0) 0x16fEa8F8F9c11d50b4e4b92421F17FFa07cF87fe (100 ETH) - Contract owner
(1) 0xC1F5551124f6F4e676Eee758e9C8F8A4160424FB (100 ETH) - Farmer
(2) 0x1c0f1DA28f5177B06E03DAb2375EB55a58F132fe (100 ETH) - Distributor
(3) 0xA41bf8424801598415ba6817aE6BCb52c0B6e541 (100 ETH) - Retailer
(4) 0xD35fDc249Be9f02eCA76f6450a3e2B6a50F2930E (100 ETH) - Customer
(5) 0x24415073FE8e5e2CFfCC2195B9E5457a6714ab1b (100 ETH)
(6) 0xC9b02e96Fa506adb20d41563A433aa547137d10D (100 ETH)
(7) 0xe8C88FeDd8670Adf3D3aB955ec1D805aa476DacF (100 ETH)
(8) 0x1039222Fa9153c6Ffd7282438812f6def560298E (100 ETH)
(9) 0x4F841EF5B33B91D1085F3A935397B202d0C08BcB (100 ETH)

Private Keys
==================
(0) 0xd1de4402dbe0b39fb2ace943629f71b9d3f96c36e59d9396ee1f465c322b482b
(1) 0xf9677023dfb31e8dcb3a3e100bf873b2fe56474876ea082d60433f8fa7d2a6b3
(2) 0x762e776fe7ce9874dc701b8223d551aaf1484a1d18934c0eb9dc8dec1e569f72
(3) 0x611ee9127a1f4e1073015d69d999a9cc31e0b2203e608e84d3da24f8aea0619b
(4) 0x0da668bce70138b5f567df88ff399fb9dbd1da3d162420e05ceddf88a5753e45
(5) 0xce0eeef6881bcdd258133f9c666bb65b8f030727b86643131bdd20a47fb0f638
(6) 0x2edf5e9299a4385be0690a4f65e5681238b17b8aab8f5d0e8297d266a1310254
(7) 0x925713fa3c641559f3e4c1dfc33be1b3dd475d9b019e92ec2b3eb4a6cf9b3352
(8) 0x7334f60f1563d49648fbf26359ee0aa20a0d14a083756b7fc228feb79a2b3d29
(9) 0xa606a98a8be8b9a72cb85f6aca91e5b07d2bd8ad85b0650ce489bc21f3e76d9e

