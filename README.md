## ERC-20 Token

### Background
Ethereum allows you to build your own cryptocurrency on their blockchain with a standard called ERC20. This standard allows you to mint your own token and transfer it between wallets.

### Dependencies
1. node package manager (install from node js website or with a command line tool like homebrew, type `brew install node`)
2. Truffle framework will allow us to create decentralized applications on the Ethereum network with its suite of tools so we can write, test, and deploy smart contracts. (To install go to command and type `npm install -g truffle`)
3. Ganache, is your personal blockchain that you can use for testing purposes
4. Metamask, a browser extension that allows you to connect to the Ethereum network. Found on Chrome browser. 
5. Solidity 


Use `truffle init` in the command line within your project directory to create a new truffle project. This will create your contract, migration, and test directories including some configuration files.


### Notes

The contract directory will be used whenever we create other contracts. The *migration.sol* file is the contract that handles the migrations whenever we deploy our contracts to our blockchain. Deploying smart contracts will create transactions and write to the blockchain changing its state. So whenever we push a contract to the blockhain we are in a sense migrating the blockchains state from not having a smart contract to having it.
The migration directory is where all of our migrations files will be placed. *1_initial_migration.js* will get runned whenever we deploy our smart contracts. It will take the *migrations.sol* contract from migration directory. Test directory is use to test smart contracts. 
`truffle-config.js` is used for windows and `truffle.js` is used for macOS

Smart contract is code that gets executed on the blockhain. It will be where the logic of token and token sale will live. Reading, writing, behavior (buy, sale, transfer, etc), basic atributes (name, symbol, price, supply, etc) all exist in the contract. 

`MyToken.sol` is the smart contract that will implement the ERC-20 standard and govern behavior of token

To run migrations use `truffle migrate`  on terminal. You can use `--reset` flag if needed. 
Whenever you run migrations and deploy contracts to blockchain it will cost gas. Reading from Ethereum blockchain is free, writing to it will cost ETH.
After deploying contract your new ETH balance will be reflected on Ganache.


### Truffle Console
To open console use `truffle console`. Truffle console is a JS runtime environment used to interact with contract. Because smart contracts are asynchronous in nature, they rely upon the usage of JavaScript promises.

To get address of contract:

`MyToken.deployed().then(function(i){token=i})`, `MyToken.deployed()` will give use a deployed instance of our contract. We then save the value of that instance into the variable token. `.deployed()` will return a promise, when promise completes we call the `then()` function.

After we have the instace of our contract we can use `token.address` to get the address of our smart contract.

To get totalSupply:

`token.totalSupply().then(function(s){totalSupply=s})` then `totalSupply` will return the total supply of your token. JavaScript will give us a BigNumber, since we are returning units that are to large for JS to handle.
`totalSupply.toNumber()` will also return our total supply. 

To get addresses:

use `web3.eth.accounts` to see all accounts/addresses that are available. Web3 is a library that allows us to intreact with our smart contracts and blockhain.
`web3.eth.accounts[0]` will show the account found at index 0 of accounts. 

Use of `web3.eth.accounts` and `web3.eth.accounts[0]` is depreciated in newer versions of Solidity. Instead use `accounts web3.eth.getAccounts()` and `web3.eth.getAccounts( ).then(function(s) {first = s[0];});first` respectively.

Use `.exit` to exit console.

### Testing
Testing in Truffle comes bundled with Mocha testing framework and Chai assertion library.

To test run use `truffle test`. 

 
### Resources
[Guide that I followed](https://www.youtube.com/watch?v=044h0ZI-fDI&list=PLS5SEs8ZftgWFuKg2wbm_0GLV0Tiy1R-n&index=3)

["Interacting with Deployed Ethereum Contracts in Truffle"](https://medium.com/@blockchain101/interacting-with-deployed-ethereum-contracts-in-truffle-39d7c7040455)

[Javascript promises](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261)

[ERC-20 standard for tokens](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md)

