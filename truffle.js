var Web3 = require("web3");
let url = "https://userid.by.ether.camp:8555/sandbox/replacemewithsanboxid";

module.exports = {
    networks: {
        development: {
            provider: new Web3.providers.HttpProvider(url),
            network_id: "*"
        }
    }
};
