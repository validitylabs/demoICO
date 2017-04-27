pragma solidity ^0.4.8;

contract Token {
    uint public supply;
    address public owner;
    
    mapping(address => uint) public balances;
    uint public price;
    
    function token(uint _supply, uint _priceWeiPerToken) {
        supply = _supply;
        price = _priceWeiPerToken;
        owner = msg.sender;
    }
    
    function buy() payable {
        uint tokensToTransfer = msg.value / price;
        if (tokensToTransfer > supply)
            throw;
        balances[msg.sender] = tokensToTransfer;
        supply -= tokensToTransfer;
    }
    
    function transfer(address _to, uint _amount) {
        if (balances[msg.sender] < _amount)
            throw;
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
    }
    
    function payOut() {
        if (msg.sender != owner)
            throw;
        
        bool res = msg.sender.send(this.balance);
    }
}
