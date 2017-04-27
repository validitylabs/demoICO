var Token = artifacts.require("./Token.sol");

module.exports = function(deployer, network) {
    console.log(web3.eth.accounts);
    web3.eth.defaultAccount = web3.eth.accounts[0];
    
    console.log("default account", web3.eth.defaultAccount);
    
    deployer.deploy(Token, 1500000000, 20000000);
};
