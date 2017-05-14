let W3 = require("web3");
let lw = require ("eth-lightwallet");

let provider = new W3.providers.HttpProvider("https://micharoon.by.ether.camp:8555/sandbox/090f0fd52b");
let w3 = new W3(provider);

console.log(w3.eth.blockNumber);

lw.keystore.createVault({
    password: "password",
}, function (err, ks) {
    if (err) throw err;
    ks.keyFromPassword("password", function (err, pwDerivedKey) {
        if (err) throw err;
        keystore = ks;
        ks.generateNewAddress(pwDerivedKey, 1);
        addr = ks.getAddresses();
        console.log(addr);
        let me = "0x" + addr[0];

        w3.eth.sendTransaction({from: w3.eth.accounts[0], to: me, value: w3.toHex(2e18) }, function(err) {
            var rawTx =
                {
                    nonce: w3.eth.getTransactionCount(me, "pending"),
                    gasPrice: w3.toHex(w3.eth.gasPrice),
                    to: "0x2adc25665018aa1fe0e6bc666dac8fc2697ff9ba",
                    from: me,
                    value: w3.toHex(1e18),
                    gasLimit: w3.toHex(21001)
                };

            let rawTxString = lw.txutils.valueTx(rawTx);
            console.log(rawTxString);

            let signTxString = lw.signing.signTx(ks, pwDerivedKey, "0x" + rawTxString, me);
            console.log(signTxString);

            w3.eth.sendRawTransaction("0x" + signTxString, function(err, txHash) {
                console.log(err, txHash);
                setTimeout(function() {
                    console.log(w3.eth.getTransaction(txHash))
                }, 1000);
            })
        })

    });
});
