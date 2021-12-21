//In charge of migrating smart contracts

var MyToken = artifacts.require("./MyToken.sol"); // Create an instance of MyToken
											  // truffle-artifacts library which is itself a wrapper around the truffle-contract library which in turns wraps around the web3.js library.
											  // Creating an artifact allows us to create a contract abstraction that Truffle can use to run in a js runtime environment. This has several different applications, it allows us to interact with our smart contract in any js environment like Truffle or when writing tests. 

var MyTokenSale = artifacts.require("./MyTokenSale.sol");

module.exports = function (deployer) {
  deployer.deploy(MyToken, 1000000).then(function() { // deploy MyToken, subsequent arguments are passed to constructor in MyToken.sol, such as supply
  							// returns an instance of the deployed promise MyToken object
				// token price is 0.001 ether
				var tokenPrice = 1000000000000000;
				return  deployer.deploy(MyTokenSale, MyToken.address, tokenPrice); // pass address of token contract
  }); 
};
 