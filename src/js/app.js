App = {
		web3Provider: null,
		contracts: {},
		account: '0x0',
		loading: false,
		tokenPrice: 1000000000000000, // default token price in wei
		tokensSold: 0,
		tokensAvailable: 750000,

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
		// if app is loading dont show content
		if(App.loading) { // if true we will skip step.
			return; 
		}
		// whenever loading is finished we continue
		App.loading = true;

		// keep track of loader and content from index.html
		var loader = $('#loader');
		var content = $('#content');

		loader.show();
		content.hide();

		// load account data
		// we need to queary for account address and wire it to the frontend index.html
		web3.eth.getCoinbase(function(err, account) {
			if(err == null) {
				// console.log("account", account);
				App.account = account; 
				$('#accountAddress').html("Your Account: " + account)
			}
		})

		// token price will be read from smart contract
		App.contracts.MyTokenSale.deployed().then(function(instance) {
			myTokenSaleInstance = instance;
			return myTokenSaleInstance.tokenPrice();
		}).then(function(tokenPrice) {
			// console.log("tokenPrice", tokenPrice)
			App.tokenPrice = tokenPrice;
			$('.token-price').html(web3.fromWei(App.tokenPrice, "ether").toNumber()); // convert wei to ether
			return myTokenSaleInstance.tokensSold();
		}).then(function(tokenSold) {
			App.tokensSold = tokenSold.toNumber();
			$('.tokens-sold').html(App.tokensSold);
			$('.tokens-available').html(App.tokensAvailable);

			var progressPercent = (Math.ceil(App.tokensSold / App.tokensAvailable)) * 100;
			// console.log(progressPercent);
			$('#progress').css('width', progressPercent + '%');

			// load token contract and balance
			App.contracts.MyToken.deployed().then(function(instance) {
				myTokenInstance = instance;
				return myTokenInstance.balanceOf(App.account);
				}).then(function(balance) {
					$('.mytoken-balance').html(balance.toNumber())
				
					App.loading = false; // once loaded show content
					loader.hide();
					content.show();
				})
			});
		}
	}



// whenever window loads initilize our app
$(function() {
	$(window).load(function() {
		App.init();
	})
})