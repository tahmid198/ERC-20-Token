var MyTokenSale = artifacts.require("./MyTokenSale.sol");
var MyToken = artifacts.require("./MyToken.sol");


contract('MyTokenSale', function(accounts){
	var tokenSaleInstance;
	var tokenInstance;
	var admin = accounts[0];
	//console.log(admin);
	var buyer = accounts[1];
	var numberOfTokens;
	var tokenPrice = 1000000000000000; // in wei (wei is smallest subdivesion of ether; a mesurment tool basically)
									// 1000000000000000 wei = 0.001 ether
	var tokensAvailable = 750000; // provisin 75% of all tokens to token sale

	it('initializes the contract with the correct values', function() {
		return MyTokenSale.deployed().then(function(instance){ // instance of deployed contract
			tokenSaleInstance = instance 
			return tokenSaleInstance.address // checks if tokenInstance has an address
		}).then(function(address){
			assert.notEqual(address, 0x0, 'has contract address');
			return tokenSaleInstance.tokenContract(); // check if a refrence to our token exists in token sale contract
		}).then(function(address){
			assert.notEqual(address, 0x0, 'has token contract address');
			return tokenSaleInstance.tokenPrice();
		}).then(function(price){
			assert.equal(price, tokenPrice, 'token price is correct'); // assert token price is equal to a certain amount 
		});
	});

	it('facilitates token buying', function(){ // test tokenBuying
		return MyToken.deployed().then(function(instance){
			// grab token instance first
			tokenInstance = instance;
			return MyTokenSale.deployed();
		}).then(function(instance) {
			tokenSaleInstance = instance;
			// provision 75% of all tokens to the token sale
			return tokenInstance.transfer(tokenSaleInstance.address, tokensAvailable, {from: admin}) // admin wil transfer tokensAvailable to tokenSaleAddress
		}).then(function(receipt){
			numberOfTokens = 10;
			return tokenSaleInstance.buyTokens(numberOfTokens, {from: buyer, value: numberOfTokens * tokenPrice  }) // we want to buy some tokens
		}).then(function(receipt){ // whenever we buy tokens we check recipt for number of tokens sold
			assert.equal(receipt.logs.length, 1, 'triggers one event'); // check recipt logs for one event
			assert.equal(receipt.logs[0].event, 'sell', 'should be the "Sell" event'); // check if it is a sell event
			assert.equal(receipt.logs[0].args._buyer, buyer, 'logs the account that purchased the tokens'); // check that there is a buyer
			assert.equal(receipt.logs[0].args._amount, numberOfTokens, 'logs the number of tokens purchased'); // check the amount
			return tokenSaleInstance.tokensSold(); // check for number of tokens sold
		}).then(function(amount){
			assert.equal(amount.toNumber(), numberOfTokens, 'increments the number of tokens sold'); // ensure number of tokens sold is the same as the amount of tokens bought
			return tokenInstance.balanceOf(buyer); // check balance of buyer went up and balance of token sale went down
		}).then(function(balance){
			assert.equal(balance.toNumber(), numberOfTokens);
			return tokenInstance.balanceOf(tokenSaleInstance.address); 
		}).then(function(balance){
			assert.equal(balance.toNumber(), tokensAvailable - numberOfTokens);
			// try to buy tokens different from the ether value
			return tokenSaleInstance.buyTokens(numberOfTokens, {from: buyer, value: 1 }); // buy a tokens that is worth 1 wei, which is different from our token value
		}).then(assert.fail).catch(function(error){
			assert(error.message.indexOf('revert') >= 0, 'msg.value must equal number of tokens in wei');
			return tokenSaleInstance.buyTokens(800000, {from: buyer, value: numberOfTokens * tokenPrice }); // purchase more tokens then are available in the contract (750000) and test for failure
		}).then(assert.fail).catch(function(error){
			assert(error.message.indexOf('revert') >= 0, 'cannot purchase more tokens than available');
		});
	});

	it('ends token sale', function(){
		return MyToken.deployed().then(function(instance){
			// grab token instance first
			tokenInstance = instance;
			//console.log(tokenSaleInstance.address);
			return MyTokenSale.deployed();
		}).then(function(instance) {
			// then grab token sale instance
			tokenSaleInstance = instance;
			//try to end sale from account other than the admin
			return tokenSaleInstance.endSale({from: buyer});
		}).then(assert.fail).catch(function(error) {
			assert(error.message.indexOf('revert') >= 0, 'must be admin to end sale');
			// end sale as admin
			return tokenSaleInstance.endSale({from: admin});
		}).then(function(receipt) {
			return tokenInstance.balanceOf(admin);
		}).then(function(balance) {
			assert.equal(balance.toNumber(), 999990, 'returns all unsold tokens to admin');
			// check token price was reset to 0 when endSale is called
      		//return tokenInstance.balanceOf(tokenSaleInstance.address); // balanceOf return number of tokens
           return web3.eth.getBalance(tokenSaleInstance.address) //  web3.eth.getBalance returns value of eth in wei
       	//     console.log(balance);
	     	 // assert.equal(balance, 0);
		}).then(function(balance) {
			console.log(balance);
		   assert.equal(balance, 0);
		});
	});














});