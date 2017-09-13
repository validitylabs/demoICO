var Web3 = require("web3");

module.exports = {
    networks: {
        development: {
            provider: new Web3.providers.HttpProvider(),
            network_id: "*"
        }
    }
};
