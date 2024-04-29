// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CapitalFund is Ownable {
    // Event to log the receipt of tokens
    event TokensReceived(address from, uint amount);

    // Event to log the sending of tokens
    event TokensSent(address to, uint amount);

    // Constructor that takes the initial owner address
    constructor(address initialOwner) Ownable(initialOwner) {}

    // Function to receive ERC20 tokens
    function receiveTokens(IERC20 token, uint256 amount) public {
        require(
            token.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        emit TokensReceived(msg.sender, amount);
    }

    // Function to send ERC20 tokens
    function sendTokens(
        IERC20 token,
        address to,
        uint256 amount
    ) public onlyOwner {
        require(
            token.balanceOf(address(this)) >= amount,
            "Insufficient balance"
        );
        require(token.transfer(to, amount), "Transfer failed");
        emit TokensSent(to, amount);
    }

    // Optional: Function to check the token balance of the contract
    function checkBalance(IERC20 token) public view returns (uint256) {
        return token.balanceOf(address(this));
    }
}
