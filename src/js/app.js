App = {
		web3Provider: null,
		contracts: {},
		account: '0x0',

		init:function() {
			console.log("App initialized...")
			return App.initWeb3();
		},
		// initilize web3
		initWeb3: function() {
			// web3 will depend on an http provider that is provided my metamask
			if (typeof web3 !== 'undefined') {
				// if a web3 instance is already provided by Meta Mask.
				App.web3Provider = web3.currentProvider;

				 window.ethereum.enable(); //  makes a popup UI request to connect your dApp to MetaMask, and window.web3 becomes the updated version.
				 // window.ethereum.sendAsync('eth_requestAccounts');

				web3 = new Web3(web3.currentProvider);
			} else {
				// specify default instance if no web3 instance provided
				App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
				web3 = new Web3(App.web3Provider);
			}
			return App.initContracts();
		}, 
		initContracts: function() {
			// browserSync is able to get our contract file without giving it the entire path, we just give it the file name MyTokenSale.json
			$.getJSON("MyTokenSale.json", function(myTokenSale){
				App.contracts.MyTokenSale = TruffleContract(myTokenSale); // truffle contract can read our json contract file and will be able to parse it
				App.contracts.MyTokenSale.setProvider(App.web3Provider);
				App.contracts.MyTokenSale.deployed().then(function(myTokenSale) {
					console.log("My Token Sale Address: ", myTokenSale.address); // should print address proving that our client side application is talking to the blockchain
				});
			}).done(function() { // communication for token contract 
				$.getJSON("MyToken.json", function(myToken) {
				App.contracts.MyToken = TruffleContract(myToken); // truffle contract can read our json contract file and will be able to parse it
				App.contracts.MyToken.setProvider(App.web3Provider);
				App.contracts.MyToken.deployed().then(function(myToken) {
					console.log("My Token Address: ", myToken.address); // should print address proving that our client side application is talking to the blockchain
				});
				return App.render();
			});
		})
	},
	render: function() { 
		// load account data
		// we need to queary for account address and wire it to the frontend index.html
		web3.eth.getCoinbase(function(err, account) {
			if(err == null) {
				console.log("account", account);
				App.account = account; 
				$('#accountAddress').html("Your Account: " + account)
			}
		})

	}
}


// whenever window loads initilize our app
$(function() {
	$(window).load(function() {
		App.init();
	})
})