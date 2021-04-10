pragma solidity ^0.5.16; // declare version of solidity

contract MyToken {
	
	
	string public name = "MyToken"; // name; Name is a part of ERC-20
	string public symbol = "MYTKN"; // symbol; Symbol is a part of ERC-20
	string public standard = "MyToken v1.0"; // standard; Standard is not a part of ERC-20 implementation
	uint256 public totalSupply;	// global state variable made public, will be written to blockchain. Variable name and type comes from ERC-20 standard.
								// when variables are declared public they will have functions associated with them from the ERC-20 standard.
								// you can view the variables that have associated functions at https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md 
	
	// ERC-20 documentation states we must trigger a transfer event
	// "note: Transfers of 0 values MUST be treated as normal transfers and fire the Transfer event."
	// contract will emit this transfer event whenever a transfer is triggered, we can listen to events triggered by _from and _to accounts
	event Transfer(
		address indexed _from,	// account that sent transaction
		address indexed _to,	// account that recevied transaction
		uint256 _value			// amount sent
	);

	//approve event - events get logged into transaction logs
	event Approval(
		address indexed _owner,	// i the owner account A approve, account B the spender to transfer C tokens
		address indexed _spender,
		uint256 _value
		);

	mapping(address => uint256) public balanceOf; 	// map structure called balanceOf.
													// key==address and return value==uint256, which is balance of address
													// anytime a token is bought or transferred this mapping is responsible for knowing who has each token 
	// allowence
	mapping(address => mapping(address => uint256)) public allowance;	// nested mapping
																		// mapping(address (my account, all my approvals are tracked by this key) => mapping(address (account that i approve) => uint256 (approved amount))) 


	// constructor for smart contract
	constructor(uint256 _initialSupply) public {  	// public = visibility of function
													// use of `function function_name() public{--}` is depreciated, newer versions of Solidity requires `constructor() public{--}`
		// set the tokkens										
		totalSupply = _initialSupply; 	// total number of tokens that exist
										// convention is to use underscore for local variables. Not state/global variables
		// allocate the inital supply
		balanceOf[msg.sender] = _initialSupply;	// msg.sender is the account that deployed the contract
												// msg is a global variable in Solidity that has diffrent values, in this case sender is the address that the function calls. 
												// when we run migrations in devlopment it will be the first account in Ganache which Truffle will default to.
												// whats happening is that we write the balance of the first account to whatever initalSupply we initalize our contract with.
												// this function associated with the balanceOf public variable provided by the ERC-20 standard    
	}

	// transfer function
	function transfer(address _to, uint256 _value) public returns (bool success) {  // address we want to transfer to, and number of tokens we want to transfer 
		// exception if account does not have enough
		require(balanceOf[msg.sender] >= _value); 	// `require` is going to allow function execution to continue if statment is true, if false it will throw an error and stop function execution
													// msg.sender -> the person whose calling function; here we read balance from persons account
													// since we are writing to blockchain, we will be using gas, if statment evaluates to false, unused gas will be refunded to sender
		//Transfer the balance
		balanceOf[msg.sender] -= _value; // decrement balance of sender by amount sent
		balanceOf[_to] += _value; // increment balance of recevier by amount received

		// trigger Transfer Event
		emit Transfer(msg.sender, _to, _value); //msg.sender is account tokens are coming from

		// return an bool
		return true;

	}

	// approve - approves a delegated transfer
	function approve(address _spender, uint256 _value) public returns (bool success) { 	// we approve _spender account to spend _value amount of tokens
																						// if we are account A we want to approve account B to spend X amount of tokens
		// allowence
		allowance[msg.sender][_spender] = _value;

		// approval event
		emit Approval(msg.sender, _spender, _value);	//msg.sender = account thats calling the function (_owner)

		return true;																						
	}

	// transferFrom - preforms delegated transfer
	function transferFrom(address _from, address _to, uint256 _value) public returns (bool auccess) {

		// require _from has enough tokens
		require(_value <= balanceOf[_from]);
		
		// require allowance is big enough
		require(_value <= allowance[_from][msg.sender]);	// were reading out of allowance mapping
		
		// change the balance
		balanceOf[_from] -= _value;
		balanceOf[_to] += _value;
		
		// update the allowance
		allowance[_from][msg.sender] -= _value;	//msg.sender = the person spending the tokens 
		
		// transfer event
		emit Transfer(_from, _to, _value);
		
		// return a boolean
		return true;

	}














}