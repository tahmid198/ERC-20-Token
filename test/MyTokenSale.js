var MyTokenSale = artifacts.require("./MyTokenSale");

contract('MyTokenSale', function(accounts){
	var tokenSaleInstance;
	var tokenPrice = 1000000000000000; // in wei (wei is smallest subdivesion of ether; a mesurment tool basically)
									// 1000000000000000 wei = 0.001 ether

	it('initializes the contract with the correct values', function() {
		return MyTokenSale.deployed().then(function(instance){ // instance of deployed contract
			tokenSaleInstance = instance 
			return tokenSaleInstance.address // checks if tokenInstance has an address
		}).then(function(address){
			assert.notEqual(address, 0x0, 'has contract address');
			return tokenSaleInstance.tokenContract(); // check if a refrence to our token exists in token sale contract
		}).then(function(address){
			assert.notEqual(address, 0x0, 'has token contract address');
			return tokenSaleInstance.tokenPrice();
		}).then(function(price){
			assert.equal(price, tokenPrice, 'token price is correct'); // assert token price is equal to a certain amount 
		});
	});
});