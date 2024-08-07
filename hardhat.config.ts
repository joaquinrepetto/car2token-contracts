import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    // rskMainnet: {
    //   url: "https://public-node.rsk.co",
    //   chainId: 30,
    //   gasPrice: 60000000,
    //   accounts: process.env.ROOTSTOCK_MAINNET_PRIVATE_KEY
    //     ? [process.env.ROOTSTOCK_MAINNET_PRIVATE_KEY]
    //     : [],
    // },
    amoy: {
      url: "https://rpc-amoy.polygon.technology/",
      // chainId: 31,
      // gasPrice: 60000000,
      accounts: process.env.TESTNET_PRIVATE_KEY
        ? [process.env.TESTNET_PRIVATE_KEY]
        : [],
    },
    prod: {
      url: "https://polygon-rpc.com/",
      // chainId: 31,
      // gasPrice: 60000000,
      accounts: process.env.TESTNET_PRIVATE_KEY
        ? [process.env.TESTNET_PRIVATE_KEY]
        : [],
    },
    hardhat: {
      chainId: 1337, // Default chain ID for Hardhat's local network
    },
  },
};

export default config;
