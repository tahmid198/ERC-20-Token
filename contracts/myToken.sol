pragma solidity ^0.5.16; //Declare version of solidity

contract MyToken {
	//Constructor
	//Set the tokens
	//Read total tokens

	uint256 public totalSupply; //Global state variable made public, will be written to blockchain. Variable name and type comes from ERC-20 standard.
								//https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
	//Constructor
	constructor() public { 	//public = visibility of function
							// Use of `function function_name() public{--}` is depreciated, newer versions of Solidity requires `constructor() public{--}`
		totalSupply = 1000000; //Total number of tokens that exist
	}

}