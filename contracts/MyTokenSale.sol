pragma solidity ^0.5.16; // version of solidity being used

import "./MyToken.sol";

contract MyTokenSale {
	address payable admin; // admin does not have public visiblity becasue we do not want to expose admin address
	MyToken public tokenContract; // solidity will give a getter tokenContract() function for free because variable is made public
	uint256 public tokenPrice;
	uint256 public tokensSold; // keep track of number of token sold

	event sell(address _buyer, uint256 _amount); // sell event

	constructor (MyToken _tokenContract, uint256 _tokenPrice) public {
		
		admin = msg.sender;	// assign an admin (an external account connected to the blockchain that has special privleges that other accounts do not have, such as ending token sale)
		 					// address of person who deployed the contract
		tokenContract = _tokenContract;	// add token contract, because all token functionality can be found there
		 								// gets passed value in deploy_contracts.js
		tokenPrice = _tokenPrice; // assign token price	
	}

	// multiply function - safe arithmetic
	function multiply(uint x, uint y) internal pure returns (uint z) { // internal means that it is used only internally within contract, cannot be called externally
																	   // pure means that it is not acutally reading/writing in blockchain; does not create a transaction
		require(y == 0 || (z = x * y) / y == x);
	}

	// buy tokens
	function buyTokens(uint256 _numberOfTokens) public payable { // made public so visible to public interface, allowing user interaction. 
																// function made payable so it can process transactions.
		
		// require that value is equal to tokens (help prevent people from overpaying or underpaying for thier token amount)
		require(msg.value == multiply(_numberOfTokens, tokenPrice)); // msg is a global variable with different properties such as sender and value
																	// msg.value is amount of wei function is sending
		// require that contract has enough tokens (take some tokens from token supply and give it to this contract)
		require(tokenContract.balanceOf(address(this)) >= _numberOfTokens);	

		// require that a transfer is successful
		require(tokenContract.transfer(msg.sender, _numberOfTokens)); // our buy functionality
	
		// keep track of tokens sold
		tokensSold += _numberOfTokens; // whenever someone buys tokens increment number of tokens sold

		// trigger a sell event
		emit sell(msg.sender, _numberOfTokens);	// buyer is the account that is calling the function (msg.sender)
	}

	// ending MyToken tokenSale
	function endSale() public {
		// require admin to only perform this task
		require(msg.sender == admin); 

		// at end of sale transfer remaining tokens to admin
		require(tokenContract.transfer(address(admin), tokenContract.balanceOf(address(this))));
		
		// destory this contract - will reset everything
		// selfdestruct(payable(admin));

		// UPDATE: Let's not destroy the contract here
        // Just transfer the balance to the admin
         admin.transfer(address(this).balance);
	}
}



















