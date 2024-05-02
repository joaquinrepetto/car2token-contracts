// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ProofOfCredit is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;

    constructor(
        address initialOwner
    ) ERC721("ProofOfCredit", "PoC") Ownable(initialOwner) {
        // Additional initialization can go here
    }

    event TokenMinted(uint256 tokenId, address recipient);

    function mintTo(address recipient, string memory uri) public onlyOwner {
        _safeMint(recipient, nextTokenId);
        _setTokenURI(nextTokenId, uri);
        emit TokenMinted(nextTokenId, recipient);
        nextTokenId++;
    }
}
