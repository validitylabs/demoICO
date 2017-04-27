var Web3 = require("web3");
let url = "https://micharoon.by.ether.camp:8555/sandbox/6c97f772a2";

module.exports = {
    networks: {
        development: {
            provider: new Web3.providers.HttpProvider(url),
            network_id: "*"
        }
    }
};
