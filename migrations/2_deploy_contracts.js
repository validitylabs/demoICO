var Token = artifacts.require("./Token.sol");

module.exports = function(deployer, network) {
    deployer.deploy(Token, 1500000000, 20000000);
};
