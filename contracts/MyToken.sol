pragma solidity ^0.5.16; //Declare version of solidity

contract MyToken {
	
	
	string public name = "MyToken"; //Name; Name is a part of ERC-20
	string public symbol = "MYTKN"; //Symbol; Symbol is a part of ERC-20
	string public standard = "MyToken v1.0"; //Standard; Standard is not a part of ERC-20 implementation
	//Constructor
	//Set the tokens
	//Read total tokens

	//When variables are declared public they will have functions associated with them from the ERC-20 standard.
	//You can view the variables that have associated functions at https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md 
	uint256 public totalSupply; //Global state variable made public, will be written to blockchain. Variable name and type comes from ERC-20 standard.

	mapping(address => uint256) public balanceOf; 	//map structure called balanceOf.
													//key==address and return value==uint256, which is balance of address
													//Anytime a token is bought or transferred this mapping is responsible for knowing who has each token 

	//Constructor for smart contract
	constructor(uint256 _initialSupply) public { 	//public = visibility of function
							// Use of `function function_name() public{--}` is depreciated, newer versions of Solidity requires `constructor() public{--}`
		totalSupply = _initialSupply; 	//Total number of tokens that exist
										//Convention is to use underscore for local variables. Not state/global variables
	//Allocate the inital supply
	balanceOf[msg.sender] = _initialSupply; //msg.sender is the account that deployed the contract
											//msg is a global variable in Solidity that has diffrent values, in this case sender is the address that the function calls. 
											//when we run migrations in devlopment it will be the first account in Ganache which Truffle will default to.
											//Whats happening is that we write the balance of the first account to whatever initalSupply we initalize our contract with.
											//This function associated with the balanceOf public variable provided by the ERC-20 standard    
	}
}