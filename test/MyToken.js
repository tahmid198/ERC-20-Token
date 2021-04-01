var MyToken = artifacts.require("./MyToken.sol"); //Import contract file

contract('MyToken', function(accounts){ //Pass all accounts provided by Ganache that are available for testing
var tokenInstance;

	//Test to check totalSupply and adminBalance
	it('allocates the inital supply upon deployment', function(){
		return MyToken.deployed().then(function(instance){
			tokenInstance = instance;
			return tokenInstance.totalSupply();
		}).then(function(totalSupply){ //JS promise chain
			assert.equal(totalSupply.toNumber(), 1000000, 'set the total supply to 1,000,000'); //Check if totalSupply is equal to value that we expect   
			return tokenInstance.balanceOf(accounts[0]); //Check balance of first account to ensure it has been set to the intial balance
		}).then(function(adminBalance){ //JS promise chain
			assert.equal(adminBalance.toNumber(),1000000, 'it allocates the inital supply to the admin account');//Ensure admin balance is set to inital amount
		});
	});

	//Test to check token name
	it('initializes the contract with the correct values', function(){
		return MyToken.deployed().then(function(instance){
			tokenInstance = instance;
			return tokenInstance.name();
		}).then(function(name){ //JS promise chain
			assert.equal(name, 'MyToken', 'has the correct name');//Check if token name is name we expect
			return tokenInstance.symbol();
		}).then(function(symbol){ //JS promise chain
			assert.equal(symbol, 'MYTKN', 'has the correct symbol'); //Check if token symbol is symbol we expect
			return tokenInstance.standard();
		}).then(function(standard){
			assert.equal(standard, 'MyToken v1.0', 'has the correct standard');
		});
	});
});
 