var MyToken = artifacts.require("./MyToken.sol"); // import contract file

contract('MyToken', function(accounts){ // pass all accounts provided by Ganache that are available for testing
var tokenInstance;

	// test to check totalSupply and adminBalance
	it('allocates the inital supply upon deployment', function(){
		return MyToken.deployed().then(function(instance){
			tokenInstance = instance;
			return tokenInstance.totalSupply();
		}).then(function(totalSupply){ // js promise chain
			assert.equal(totalSupply.toNumber(), 1000000, 'set the total supply to 1,000,000'); // check if totalSupply is equal to value that we expect   
			return tokenInstance.balanceOf(accounts[0]); // check balance of first account to ensure it has been set to the intial balance
		}).then(function(adminBalance){ // js promise chain
			assert.equal(adminBalance.toNumber(),1000000, 'it allocates the inital supply to the admin account');//Ensure admin balance is set to inital amount
		});
	});

	// test to check token name
	it('initializes the contract with the correct values', function(){
		return MyToken.deployed().then(function(instance){
			tokenInstance = instance;
			return tokenInstance.name();
		}).then(function(name){ // js promise chain
			assert.equal(name, 'MyToken', 'has the correct name');// check if token name is name we expect
			return tokenInstance.symbol();
		}).then(function(symbol){ // js promise chain
			assert.equal(symbol, 'MYTKN', 'has the correct symbol'); // check if token symbol is symbol we expect
			return tokenInstance.standard();
		}).then(function(standard){
			assert.equal(standard, 'MyToken v1.0', 'has the correct standard');
		});
	});

	// test to check transfer function
	it('transfers token ownership', function(){
		return MyToken.deployed().then(function(instance){
			tokenInstance = instance;
			// test `require` statement first by transferring something larger than the senders balance
			return tokenInstance.transfer.call(accounts[1], 99999999999999999999999999); 	// make sure function throws an error if user is attempting to transfer a amount that is not in balance
																							// .call() will not trigger a transaction, transfer() will and creates a transaction reciept
		}).then(assert.fail).catch(function(error){ 
			// assert(error.message.toString().indexOf('revert') >= 0, 'error message must contain revert');
			return tokenInstance.transfer.call(accounts[1], 250000, {from: accounts[0]}); // test if transfer it a success
		}).then(function(success){ 
			assert.equal(success, true, 'it returns true')
			return tokenInstance.transfer(accounts[1], 250000, { from: accounts[0]});	//Transfer 250000 tokens to account 1 from account 0, where inital supply is allocated
		}).then(function(receipt){ 	// after return we call promise chain; Whenever we create transaction it will have a reciept
									// by looking at transaction receipt we can test for events.
			
			assert.equal(receipt.logs.length, 1, 'triggers one event');	// first we say reciept has logs, logs is where our event information is
			assert.equal(receipt.logs[0].event,'Transfer', 'should be the "Transfer" event');	// we find first log and ensure event is a 'Transfer' event
			assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transferred from'); // we make sure event has all required arguments, _from account 0
			assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transferred to');	// // we make sure event has all required arguments, _to account 1
			assert.equal(receipt.logs[0].args._value, 250000, 'logs the transfer amount')	// we make sure event has all required arguments, _value of 250000
			
			return tokenInstance.balanceOf(accounts[1]);	// return balance of account where we sent tokens to
		}).then(function(balance){ // promise chain
			assert.equal(balance.toNumber(), 250000, 'adds the amount to the receiving account'); 	//Assert balance is equal to transfer amount 
			return tokenInstance.balanceOf(accounts[0]); // return balance of account that sent tokens
		}).then(function(balance){ // promise chain
			assert.equal(balance.toNumber(), 750000, 'deducts the amount from the sending account');	// since we started with 1000000 tokens in inital account 0, and sent 250000 from it, account 0 sould now have 750000 tokens
		});
	});

});
 