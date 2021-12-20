pragma solidity ^0.5.16; // version of solidity being used

import "./MyToken.sol";

contract MyTokenSale {
	address admin; // admin does not have public visiblity becasue we do not want to expose admin address
	MyToken public tokenContract; // solidity will give a tokenContract() function for free because variable is made public
	uint256 public tokenPrice; 

	constructor (MyToken _tokenContract, uint256 _tokenPrice) public {
		// assign an admin (an external account connected to the blockchain that has special privleges that other accounts do not have, such as ending token sale)
		admin = msg.sender; // address of person who deployed the contract

		// add token contract, because all token functionality can be found there
		tokenContract = _tokenContract; // gets passed value in deploy_contracts.js

		// assign token price
		tokenPrice = _tokenPrice;
	}
}