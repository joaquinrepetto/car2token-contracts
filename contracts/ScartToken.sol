// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ScartToken is ERC20 {
    constructor() ERC20("SCART", "SCT") {
        uint256 initialSupply = 1000000 * (10 ** uint256(decimals())); // 1 million tokens
        _mint(msg.sender, initialSupply);
    }
}
