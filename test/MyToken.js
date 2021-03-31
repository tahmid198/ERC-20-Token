var MyToken = artifacts.require("./MyToken.sol"); //Import contract file

contract('MyToken', function(accounts){ //Pass all accounts provided by Ganache that are available for testing

	it('set the toatl supply upon deployment', function(){
		return MyToken.deployed().then(function(instance){
			tokenInstance = instance;
			return tokenInstance.totalSupply();
		}).then(function(totalSupply){
			assert.equal(totalSupply.toNumber(), 1000000, 'set the total supply to 1,000,000'); //Check if totalSupply is equal to value that we expect 
		});
	});
})
 