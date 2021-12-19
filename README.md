## ERC-20 Token

### Background
Ethereum allows you to build your own cryptocurrency on their blockchain with a standard called [ERC-20 token standard](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md). ERC-20 is an API standard that governs how an Ethereum token should be built. This standard allows you to mint your own token, transfer it between wallets, and hold an inital token sale. This standard also allows your token to be acceted across various application. This means support across different wallets and different cryptocurrency exchanges. 

We will be building out the required functionality specified with this standard so our token is compliant with the ERC20 standard and deploy it on a test network (not main Ethereum netowrk) so we do not have to worry about cost.

Your token, token sale, client side and backend will be on the blockchain and decentralized. 

### Dependencies
1. node package manager (npm) (install from node js website or with a command line tool like homebrew, type `brew install node`).
2. Truffle framework will allow us to create decentralized applications on the Ethereum network with its suite of tools so we can write, test, and deploy smart contracts. (To install go to command and type `npm install -g truffle`).
3. Ganache, is your local personal blockchain that you can use for testing purposes. (Install directly from thei website).
4. Metamask, a browser extension that allows you to connect to the Ethereum network. (Found on Chrome browser).
5. Solidity syntax highlighting (you can use Ethereum from Package Control for Sublime 2/3)


Use `truffle init` in the command line within your project directory to create a new truffle project. This will create your contract, migration, and test directories including some configuration files.

<!-- ### Build

approve function will let us approve a delegated transfer, the amount being transferred will be stored in a allowence. transferForm will allow us to execute that transfer.  --> 

### File Breakdown
- `MyToken.sol` is the smart contract that will implement the ERC-20 standard and govern behavior for your token
- `MyTokenSale.sol` will handle the token sale part of this project
- `app.js` will handle sale of token, display balance, and etc.


The contract directory will be used whenever we create other smart contracts(such as token contract and token sale contract). The *migration.sol* file is the contract that handles the migrations whenever we deploy our contracts to our blockchain. Deploying smart contracts will create transactions and write to the blockchain changing its state. So whenever we push a contract to the blockchain we are in a sense migrating the blockchains state from not having a smart contract to having it. This is why we need a migrations directory.

The migration directory is where all of our migrations files will be placed. *1_initial_migration.js* will get runned whenever we deploy our smart contracts. It will take the *migrations.sol* contract from our contract directory. Whenever we create a new smart contract we will create a new file in this directory to handle migrating those contracts to the blockchain. 

Test directory is used to test our smart contracts. 
`truffle-config.js` is used for windows and `truffle.js` is used for macOS

Make sure to first set *Devlopment Configurations* in your truffle-congig file. Four digit port number can be found at the end of your Ganache RPC Server, as well as host.

### Truffle Console
To open the console use `truffle console`. Truffle console is a JS runtime environment used to interact with contracts. Because smart contracts are asynchronous in nature, they will rely upon the usage of JavaScript promises.

#### Examples:
##### Within Truffle Console:

To get address of contract:

`MyToken.deployed().then(function(i){token=i})`, `MyToken.deployed()` will give us a deployed instance of our contract. We then save the value of that instance into the variable token. `.deployed()` will return a promise, when the promise completes we call the `then()` function. We will get a deployed instance of our contract and set it to `token`. Note, MyToken was created in our migrations.

After we have the instance of our contract we can use `token.address` to get the address of our smart contract.

To get totalSupply:

We can then use `token` to find its total supply. 
`token.totalSupply().then(function(s){totalSupply=s})` then `totalSupply` will return the total supply of your token. JavaScript will give us a BigNumber type, since we are returning units that are too large for JS to handle.
`totalSupply.toNumber()` will also return our total supply. 

To get addresses:

use `web3.eth.accounts` to see all accounts/addresses that are available. Web3 is a library that allows us to interact with our smart contracts and blockchain.
`web3.eth.accounts[0]` will show the account found at index 0 of accounts. 

Use of `web3.eth.accounts` and `web3.eth.accounts[0]` is depreciated in newer versions of Solidity. Instead use `accounts web3.eth.getAccounts()` and `web3.eth.getAccounts( ).then(function(s) {first = s[0];});first` respectively.

Use `.exit` to exit console.

### Testing
Testing in Truffle comes bundled with Mocha testing framework and Chai assertion library.

To test run use `truffle test`. 


### Notes
All functions and variables **must** follow the naming convention as shown in the [ERC-20 token standard](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md)

Smart contracts is code that gets executed on the blockchain. It will be where the logic of your token and token sale will live. Reading, writing, behavior (buy, sale, transfer, etc), basic attributes (name, symbol, price, supply, etc) all exist in the contract.

To run migrations use `truffle migrate`  on terminal. You can use `--reset` flag if needed. 

Whenever you run migrations and deploy contracts to blockchain it will cost gas. Reading from Ethereum blockchain is free, writing to it will cost ETH.
After deploying the contracts your new ETH balance will be reflected on Ganache. Ganache will always use first address by default.

 
### Resources

[ERC-20 token standard ](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md)

[Guide that I followed](https://www.youtube.com/watch?v=044h0ZI-fDI&list=PLS5SEs8ZftgWFuKg2wbm_0GLV0Tiy1R-n&index=3)

["Interacting with Deployed Ethereum Contracts in Truffle"](https://medium.com/@blockchain101/interacting-with-deployed-ethereum-contracts-in-truffle-39d7c7040455)

[Javascript promises](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261)

[Solidity v0.5.16 Documentation](https://docs.soliditylang.org/en/v0.5.16/)

