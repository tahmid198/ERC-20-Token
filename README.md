## ERC-20 Token

### Background

Ethereum allows you to build your own cryptocurrency on their blockchain with a standard called [ERC-20 token standard](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md). ERC-20 is an API standard that governs how an Ethereum token should be built. This standard allows you to mint your own token, transfer it between wallets, and hold an initial token sale. This standard also allows your token to be accepted across various applications. This means support across different wallets and different cryptocurrency exchanges. 

We will be building out the required functionality specified with this standard so our token is compliant with the ERC20 standard and deploy it on a test network (not the main Ethereum network) so we do not have to worry about cost.

Your token, token sale, client side and backend will be on the blockchain and decentralized. 

### Dependencies

1. node package manager (npm) (install from node js website or with a command line tool like homebrew, type `brew install node`).
2. Truffle framework will allow us to create decentralized applications on the Ethereum network with its suite of tools so we can write, test, and deploy smart contracts. (To install go to command and type `npm install -g truffle`).
3. Ganache, is your local personal blockchain that you can use for testing purposes. (Install directly from their website).
4. Metamask, a browser extension that allows you to connect to the Ethereum network. (Found on Chrome browser).
5. Solidity syntax highlighting (you can use Ethereum from Package Control for Sublime 2/3)


Use `truffle init` in the command line within your project directory to create a new truffle project. This will create your contract, migration, and test directories including some configuration files.

<!-- ### Build

approve function will let us approve a delegated transfer, the amount being transferred will be stored in a allowance. transferForm will allow us to execute that transfer.  --> 

### File Breakdown

- `MyToken.sol` is the smart contract that will implement the ERC-20 standard and govern behavior for your token
- `MyTokenSale.sol` will handle the token sale part of this project
- `app.js` will handle the sale of tokens, display balance, and etc.


The contract directory will be used whenever we create other smart contracts(such as token contract and token sale contract). The *migration.sol* file is the contract that handles the migrations whenever we deploy our contracts to our blockchain. Deploying smart contracts will create transactions and write to the blockchain changing its state. So whenever we push a contract to the blockchain we are in a sense migrating the blockchains state from not having a smart contract to having it. This is why we need a migrations directory.

The migration directory is where all of our migrations files will be placed. *1_initial_migration.js* will get runned whenever we deploy our smart contracts. It will take the *migrations.sol* contract from our contract directory. Whenever we create a new smart contract we will create a new file in this directory to handle migrating those contracts to the blockchain. 

Test directory is used to test our smart contracts. 
`truffle-config.js` is used for windows and `truffle.js` is used for macOS

Make sure to first set *Development Configurations* in your truffle-config file. Four digit port number can be found at the end of your Ganache RPC Server, as well as the host.

### Truffle Console

To open the console use the `truffle console`command. Truffle console is a JS runtime environment used to interact with contracts. Because smart contracts are asynchronous in nature, they will rely upon the usage of JavaScript promises.

#### Examples Within Truffle Console: 

`truffle migrate` and `truffle migrate -- reset` will allow us to push contracts onto the Ethereum blockchain (either local, tesnet or mainnet) and help us link contracts with other contracts as well as populate them with initial data


<details>
<summary>How to get attributes of contract:</summary>
<br>

First create a tokenInstance by doing,`MyToken.deployed().then(function(instance){tokenInstance=instance})`, `MyToken.deployed()` will give us a deployed instance of our contract. We then save the value of that instance into the variable `tokenInstance`. `.deployed()` will return a promise, when the promise completes we call the `then()` function. We will get a deployed instance of our contract and set it to `tokenInstance`. Note, `MyToken` was created in our migrations.

We can also view the token instance by entering `tokenInstance` into our console.

After we have the instance of our contract we can use `tokenInstance.address` to get the address of our smart contract. 

All the following were declared in our `MyToken.sol` file:
`tokenInstance.name()` will return the name of our token.
`tokenInstance.symbol()` will return the symbol of our token.
`tokenInstance.standard()` will return the standard of our token.
</details>

<details>
<summary>How to get totalSupply:</summary>
<br>

We can then use the `tokenInstance` to find its total supply. 
`tokenInstance.totalSupply().then(function(s){totalSupply=s})` the `totalSupply` will return the total supply of your token. JavaScript will give us a BigNumber type, since we are returning units that are too large for JS to handle.
`totalSupply.toNumber()` will also return our total supply. 

When our `MyToken.sol` contract got deployed our constructor was executed which took `_initalSupply` as a parameter and set the `totalSupply` with it. `_initalSupply` was passed in our `_deploy_contracts.js`.
In the same constructor we also set the initial supply equal to the balance of the administrator, the one that deployed it.
</details>


<details>
<summary>How to get addresses and using web3:</summary>
<br>

web3 is a library that allows us to interact with the blockchain.

Use `web3.eth.accounts()` to see all accounts/addresses that are available. 

`web3.eth.accounts[0]` will show the account found at index 0 of accounts. 

Use of `web3.eth.accounts()` and `web3.eth.accounts[0]` is deprecated in newer versions of Solidity. Instead use `accounts = web3.eth.getAccounts()` and `web3.eth.getAccounts().then(function(s) {first = s[0];});` then, `first` respectively to get address of first.

Doing `web3.eth.getAccounts().then(function(acc){ accounts = acc })`, then accounts[0],accounts[1], etc.
will give account addresses by index. 

</details>


<details>
<summary>How to check balance:</summary>
<br>

First we need to get an account to its check balance .
`web3.eth.getAccounts().then(function(s) {admin = s[0];});`, admin will contain our account address. 
Note: admin is the address that contains the initial supply, this is the 0 index, because Ganache uses the first address (0 index) as default.

We can then do `tokenInstance.balanceOf(admin)` to view the supply of admin.

`tokenInstance.balanceOf(admin).then(function(bal){balance = bal;})`, then `balance.toNumber()` to also view the supply of admin.

</details>



<details>
<summary>Transfers</summary>
<br>

First we get an account that will receive tokens from the transfer. 
`web3.eth.getAccounts().then(function(s) {receiver = s[1];});`, this will set our receiver to the address at s[1].

We can then call a transfer by doing `tokenInstance.transfer(receiver, 1, {from:admin})`. This transfers one token from the admin account to the receiver's account. On completion it will print a receipt.

We can then check the balance of the receiver, which has increased by 1, with `tokenInstance.balanceOf(receiver)` and the balance of admin, which has decreased by 1, by  `tokenInstance.balanceOf(admin)` which has decreased by 1.

</details>


<details>
<summary>Approvals</summary>
<br>

First do, `web3.eth.getAccounts().then(function(acc){ accounts = acc })` to access account addresses by index. 

`tokenInstance.approve(accounts[1], 100, {from: admin})` will trigger an approval on accounts[1] for 100 tokens and create a receipt. 

`tokenInstance.allowance(accounts[0], accounts[1])` to check allowance that was approved for expenditure. This is saying accounts[1] is allowed to spend a certain amount of tokens on accounts[0] behalf. Following the syntax of 
- `mapping(address => mapping(address => uint256)) public allowance` 
</details>




<details>
<summary>Delegated Transfers</summary>
<br>

First do, `web3.eth.getAccounts().then(function(acc){ accounts = acc })` to access account addresses by index.

Set addresses for a fromAccount, toAccount, and spendingAccount
`fromAccount = accounts[2]
toAccount = accounts[3]
spendingAccount = accounts[4]`
Next, transfer tokens to your fromAccount by doing `tokenInstance.transfer(fromAccount, 100, {from: accounts[0]})` and check that it has tokens by doing `tokenInstance.balanceOf(fromAccount)`

Then, we will need to approve spendingAccount to spend tokens on the fromAccounts behalf. We will do this by doing: `tokenInstance.approve(spendingAccount, 10, {from: fromAccount})`.

Lastly, we will trigger the delegated transfer by: `tokenInstance.transferFrom(fromAccount, toAccount, 10, {from: spendingAccount})`

Allowance of `spendingAccount` should not be 0. You can check by doing `tokenInstance.allowance(fromAccount, spendingAccount)` and the balance of `toAccount` should have increased by 10. You can check by doing `tokenInstance.balanceOf(toAccount)`.

</details>




Use `.exit` to exit the console.

### Testing

Testing in Truffle comes bundled with the Mocha testing framework and Chai assertion library.

To test run use `truffle test`. 

Testing smart contracts is very important. Smart contracts and the blockchain are meant to be immutable. So it is important that they are bug free. If they are deployed with a bug, then we will have to disable it and then deploy another.


### Notes

All functions and variables **must** follow the naming convention as shown in the [ERC-20 token standard](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md)

Smart contracts is code that gets executed on the blockchain. It will be where the logic of your token and token sale will live. Reading, writing, behavior (buy, sale, transfer, etc), basic attributes (name, symbol, price, supply, etc) all exist in the contract.

To run migrations use `truffle migrate`  on the terminal. You can use the `--reset` flag if needed. 

Whenever you run migrations and deploy contracts to blockchain it will cost gas. Reading from Ethereum blockchain is free, writing to it will cost ETH.
After deploying the contracts your new ETH balance will be reflected on Ganache. Ganache will always use the first address by default.

Just like wallets can have tokens, so can smart contracts. We have to give our token sale contract tokens.

 
### Resources

[ERC-20 token standard  ](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md)

[Solidity v0.5.16 Documentation](https://docs.soliditylang.org/en/v0.5.16/)
[Solidity Documentation](https://docs.soliditylang.org/en/develop/)

[Truffle Suite Documentation](https://trufflesuite.com/docs/index.html)

[DSMath for safe arithmetic] (https://github.com/dapphub/ds-math)

[Guide that I followed](https://www.youtube.com/watch?v=044h0ZI-fDI&list=PLS5SEs8ZftgWFuKg2wbm_0GLV0Tiy1R-n&index=3)

["Interacting with Deployed Ethereum Contracts in Truffle"](https://medium.com/@blockchain101/interacting-with-deployed-ethereum-contracts-in-truffle-39d7c7040455)

[Javascript promises](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261)

