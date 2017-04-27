var Web3 = require("web3");
let url = "https://sebastianvaliditylabs.by.ether.camp:8555/sandbox/bdff5ab885";

module.exports = {
    networks: {
        development: {
            provider: new Web3.providers.HttpProvider(url),
            network_id: "*"
        }
    }
};
