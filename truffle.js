var Web3 = require("web3");
let url = "https://micharoon.by.ether.camp:8555/sandbox/59768eb30c";

module.exports = {
    networks: {
        development: {
            provider: new Web3.providers.HttpProvider(url),
            network_id: "*"
        }
    }
};
