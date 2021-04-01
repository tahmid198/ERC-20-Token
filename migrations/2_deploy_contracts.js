//In charge of migrating smart contracts

const MyToken = artifacts.require("MyToken"); //Create an instance of MyToken
											  //truffle-artifacts library which is itself a wrapper around the truffle-contract library which in turns wraps around the web3.js library.
											  //Creating an artifact allows us to create a contract abstraction that Truffle can use to run in a js runtime environment. This has several different applications, it allows us to interact with our smart contract in any js environment like Truffle or when writing tests. 
module.exports = function (deployer) {
  deployer.deploy(MyToken, 1000000); //Deploy MyToken, subsequent arguments are passed to constructor
  							//returns an instance of the deployed promise MyToken object
};
