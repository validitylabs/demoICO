let Token = artifacts.require("./Token.sol");

contract("Token", function (accounts) {
    let token = null;

    /**
     * set the contract instances
     */
    before(function () {
        return Token.deployed().then(function(instance){
            token = instance;
        });
    });

    it("has " + accounts[0] + " as owner", function () {
        return token.owner()
            .then(function (owner) {
                assert.equal(owner, accounts[0], "the owner must be the " + accounts[0]);
            })
    });

    it("has 1500000000 as its total supply", function () {
        return token.supply().then(function (supply) {
            assert.equal(supply.toNumber(), 1500000000, "the initial supply must be 1500000000");
        })
    });

    it("transfers 100 tokens for 2000000000 wei", function () {
        return token.buy({value: 2000000000, from: accounts[0]}).then(function () {
            return token.balances(accounts[0]);
        }).then(function (balance) {
            assert.equal(balance.toNumber(), 100, "for 2000000000 wei you get 100 tokens");
            assert.equal(web3.eth.getBalance(token.address).toNumber(), 2000000000, "the contract should have the 2000000000 wei");
        })
    });

    it("changes the balance of sender and receiver when tokens are transfered", function () {
        return token.transfer(accounts[1], 10).then(function () {
            return Promise.all([token.balances(accounts[0]), token.balances(accounts[1])]);
        }).then(function (balances) {
            assert.equal(balances[0].toNumber(), 90, "the new balance of the account[0] is 90");
            assert.equal(balances[1].toNumber(), 10, "the new balance of the account[1] is 10");
        })
    });

    it("does not send all the ETH in the contract to other than the owner", function () {
        let ethBalance = web3.eth.getBalance(accounts[1]).toNumber();
        return token.payOut({form: accounts[1]}).then(function () {
            assert.equal(ethBalance, web3.eth.getBalance(accounts[1]).toNumber(), "the balance must not have changed");
        })
    });

    it("does send all the ETH in the contract to the owner", function () {
        let ethBalance = 0;
        let contractEth = 0;
        let gasPrice = 0;

        return token.buy({value: 2000000000, from: accounts[0]}).then(function () {
            return token.balances(accounts[0]);
        }).then(function (balance) {
            ethBalance = web3.eth.getBalance(accounts[0]);
            contractEth = web3.eth.getBalance(token.address);
            gasPrice = "2854400000000000";
    
            assert.equal(web3.eth.getBalance(token.address).toNumber(), 2000000000, "the contract should have the 2000000000 wei");
            
            return token.payOut({form: accounts[0]});
        }).then(function () {
            let expected = ethBalance.add(contractEth).minus(gasPrice);
            let actual = web3.eth.getBalance(accounts[0]).toString(10);
            assert.equal(actual, expected.toString(10), 
            "the balance must have increased by the ETH in the contract " + (expected.minus(actual)));
        })
    })

});