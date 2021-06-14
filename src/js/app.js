App = {
    web3Provider: null,
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    sku: 0,
    upc: 0,
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    ownerID: "0x0000000000000000000000000000000000000000",
    originFarmerID: "0x0000000000000000000000000000000000000000",
    originFarmName: null,
    originFarmInformation: null,
    originFarmLatitude: null,
    originFarmLongitude: null,
    productNotes: null,
    productPrice: 0,
    distributorID: "0x0000000000000000000000000000000000000000",
    retailerID: "0x0000000000000000000000000000000000000000",
    consumerID: "0x0000000000000000000000000000000000000000",

    init: async function () {
        App.readForm();
        /// Setup access to blockchain
        return await App.initWeb3();
    },

    readForm: function () {
        App.sku = $("#sku").val();
        App.upc = $("#upc").val();
        App.ownerID = $("#ownerID").val();
        App.originFarmerID = $("#originFarmerID").val();
        App.originFarmName = $("#originFarmName").val();
        App.originFarmInformation = $("#originFarmInformation").val();
        App.originFarmLatitude = $("#originFarmLatitude").val();
        App.originFarmLongitude = $("#originFarmLongitude").val();
        App.productNotes = $("#productNotes").val();
        App.productPrice = $("#productPrice").val();
        App.distributorID = $("#distributorID").val();
        App.retailerID = $("#retailerID").val();
        App.consumerID = $("#consumerID").val();

        console.log(
            App.sku,
            App.upc,
            App.ownerID, 
            App.originFarmerID, 
            App.originFarmName, 
            App.originFarmInformation, 
            App.originFarmLatitude, 
            App.originFarmLongitude, 
            App.productNotes, 
            App.productPrice, 
            App.distributorID, 
            App.retailerID, 
            App.consumerID
        );
    },

    initWeb3: async function () {
        /// Find or Inject Web3 Provider
        /// Modern dapp browsers...
        
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:9545');
        }
                

        await App.getMetaskAccountID();

        return App.initSupplyChain();
    },

    getMetaskAccountID: async function () {
        try{
            web3 = new Web3(App.web3Provider);

            // Retrieving accounts
            let res = await web3.eth.getAccounts();
            console.log('getMetaskID:',res);
            App.metamaskAccountID = res[0];
        } catch(err){
            console.log('Error getting Metamask account:',err);
        }
        
    },

    initSupplyChain: function () {
        /// Source the truffle compiled smart contracts
        var jsonSupplyChain='../../build/contracts/SupplyChain.json';
        
        /// JSONfy the smart contracts
        $.getJSON(jsonSupplyChain, function(data) {
            console.log('data',data);
            var SupplyChainArtifact = data;
            App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
            App.contracts.SupplyChain.setProvider(App.web3Provider);
            
            App.fetchItemBufferOne();
            App.fetchItemBufferTwo();
            App.fetchEvents();            
        });

        return App.bindEvents();
    },

    checkDistributor: async function (){
        try{
            let instance = await App.contracts.SupplyChain.deployed();
            let result = await instance.isDistributor(App.distributorID);
            showOperationResult(result);
            console.log('checkDistrbutor',result);        
        }
        catch(err){
            console.log('checkDistributor', err);
        }
    },

    addRoles: async function () {
        try{
            let instance = await App.contracts.SupplyChain.deployed();
            let promises = [];            

            await App.getMetaskAccountID();

            let isOwner = await instance.isOwner({from: App.metamaskAccountID});
            if(isOwner) {

                console.log('Owner ID', App.ownerID);

                promises.push(instance.addFarmer(App.originFarmerID, {from: App.metamaskAccountID}));            
                promises.push(instance.addDistributor(App.distributorID, {from: App.metamaskAccountID}));
                promises.push(instance.addRetailer(App.retailerID, {from: App.metamaskAccountID}));
                promises.push(instance.addConsumer(App.consumerID, {from: App.metamaskAccountID}));

                let result = await  Promise.all(promises);
                showOperationResult(result);
                console.log('addRoles',result);        
            } else {
                alert('Current Metamask account is not the contract owner');
            }
        }
        catch(err){
            console.log('addRoles error',err);
        }            
    },
    bindEvents: function() {
        $(document).on('click', App.handleButtonClick);
    },

    handleButtonClick: async function(event) {
        var processId = parseInt($(event.target).data('id'));
        console.log('processId',processId);
        event.preventDefault();

        try{
            await App.getMetaskAccountID();

            let instance = await App.contracts.SupplyChain.deployed();

            let result;        

            switch(processId) {
                case 1:
                    result = await App.harvestItem(instance);
                    break;
                case 2:
                    result = await App.processItem(instance);
                    break;
                case 3:
                    result = await App.packItem(instance);
                    break;
                case 4:
                    result = await App.sellItem(instance);
                    break;
                case 5:
                    result = await App.buyItem(instance);
                    break;
                case 6:
                    result = await App.shipItem(instance);
                    break;
                case 7:
                    result = await App.receiveItem(instance);
                    break;
                case 8:
                    result = await App.purchaseItem(instance);
                    break;
                case 9:
                    result = await App.fetchItemBufferOne(instance);
                    break;
                case 10:
                    result = await App.fetchItemBufferTwo(instance);
                    break;
                case 11:
                    result = await App.addRoles(instance);
                }
            showOperationResult(result);
            console.log(processId, ':', result);
            event.preventDefault();
            return result;
        }
        catch(err){
            console.log('Error on ' + processId, err);
        }
    },

    harvestItem: async function(instance) {
        
        return await instance.harvestItem(
            App.upc, 
            App.metamaskAccountID, 
            App.originFarmName, 
            App.originFarmInformation, 
            App.originFarmLatitude, 
            App.originFarmLongitude, 
            App.productNotes,
            {from: App.metamaskAccountID}
        )
    },

    processItem: async function (instance) {        
        return await instance.processItem(App.upc, {from: App.metamaskAccountID});        
    },
    
    packItem: async function (instance) {
        return await instance.packItem(App.upc, {from: App.metamaskAccountID});        
    },

    sellItem: async function (instance) {
        const productPrice = web3.utils.toWei(App.productPrice, "ether");
        console.log('productPrice',productPrice);
        return await instance.sellItem(App.upc, productPrice, {from: App.metamaskAccountID});
    },

    buyItem: async function (instance) {
        const walletValue = web3.utils.toWei(App.productPrice, "ether");
        return await instance.buyItem(App.upc, {from: App.metamaskAccountID, value: walletValue});    
    },

    shipItem: async function (instance) {        
        return await instance.shipItem(App.upc, {from: App.metamaskAccountID});        
    },

    receiveItem: async function (instance) {        
        return await instance.receiveItem(App.upc, {from: App.metamaskAccountID});        
    },

    purchaseItem: async function (instance) {        
        return await instance.purchaseItem(App.upc, {from: App.metamaskAccountID});        
    },

    fetchItemBufferOne: async function (instance) {
        if(!instance){
            instance = await App.contracts.SupplyChain.deployed();
        }
        App.upc = $('#upc').val();
        console.log('upc',App.upc);    
        return await instance.fetchItemBufferOne(App.upc);        
    },

    fetchItemBufferTwo: async function (instance) {
        if(!instance){
            instance = await App.contracts.SupplyChain.deployed();
        }
        App.upc = $('#upc').val();        
        return await instance.fetchItemBufferTwo.call(App.upc);        
    },

    fetchEvents: function () {
        if (typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function") {
            App.contracts.SupplyChain.currentProvider.sendAsync = function () {
                return App.contracts.SupplyChain.currentProvider.send.apply(
                App.contracts.SupplyChain.currentProvider,
                    arguments
              );
            };
        }

        App.contracts.SupplyChain.deployed().then(function(instance) {
        var events = instance.allEvents(function(err, log){
          if (!err)
            $("#ftc-events").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
        });
        }).catch(function(err) {
          console.log(err.message);
        });
        
    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});


function showOperationResult(result){
    $("#ftc-item").text(JSON.stringify(result));   
}