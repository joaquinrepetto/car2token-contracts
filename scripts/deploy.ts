import { ethers, network } from "hardhat";

async function main() {
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        " gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  const [deployer] = await ethers.getSigners();
  console.log("Deploying the contracts with the account:", deployer.address);

  // Deploy ScartToken (ERC20)
  const ScartToken = await ethers.getContractFactory("ScartToken");
  const scartToken = await ScartToken.deploy();
  console.log("ScartToken contract address:", scartToken.target);

  // Deploy CapitalFund
  const CapitalFund = await ethers.getContractFactory("CapitalFund");
  const capitalFund = await CapitalFund.deploy(deployer.address);
  console.log("CapitalFund contract address:", capitalFund.target);

  // Transfer all minted tokens from deployer to CapitalFund
  const totalSupply = await scartToken.totalSupply();
  const transferTx = await scartToken.transfer(capitalFund.target, totalSupply);
  await transferTx.wait(); // Wait for the transaction to be mined
  console.log(
    `Transferred all tokens (${totalSupply.toString()} SCT) to CapitalFund.`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment error:", error);
    process.exit(1);
  });
