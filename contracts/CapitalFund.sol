// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract CapitalFund is Ownable, Pausable {
    using SafeERC20 for IERC20;

    // Event to log the receipt of tokens
    event TokensReceived(
        address indexed token,
        address indexed from,
        uint256 amount
    );

    // Event to log the sending of tokens
    event TokensSent(address indexed token, address indexed to, uint256 amount);

    // Constructor that takes the initial owner address
    constructor(address initialOwner) Ownable(initialOwner) {}

    // Function to receive ERC20 tokens
    function receiveTokens(
        IERC20 token,
        uint256 amount
    ) external whenNotPaused {
        require(amount > 0, "Amount must be greater than zero");
        token.safeTransferFrom(msg.sender, address(this), amount);
        emit TokensReceived(address(token), msg.sender, amount);
    }

    // Function to send ERC20 tokens
    function sendTokens(
        IERC20 token,
        address to,
        uint256 amount
    ) external onlyOwner whenNotPaused {
        require(to != address(0), "Cannot send to zero address");
        require(amount > 0, "Amount must be greater than zero");
        require(
            token.balanceOf(address(this)) >= amount,
            "Insufficient balance"
        );
        token.safeTransfer(to, amount);
        emit TokensSent(address(token), to, amount);
    }

    // Function to check the token balance of the contract
    function checkBalance(IERC20 token) public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    // Enable pausing of the contract
    function pause() external onlyOwner {
        _pause();
    }

    // Unpause the contract
    function unpause() external onlyOwner {
        _unpause();
    }
}
