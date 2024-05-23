const { ethers } = require("hardhat");

async function main() {
  const [sender] = await ethers.getSigners();
  const recipient = "0xde762807E80ff5eD8B5c289d10A8eC94dB3683e4"; // Replace with your address
  const amount = ethers.parseEther("1.0"); // Amount to send in ETH

  // Check the balance of the recipient before the transfer
  let balanceBefore = await ethers.provider.getBalance(recipient);
  console.log(
    `Balance of ${recipient} before: ${ethers.formatEther(balanceBefore)} ETH`
  );

  // Send the transaction
  const tx = await sender.sendTransaction({
    to: recipient,
    value: amount,
  });

  console.log("Transaction hash:", tx.hash);

  // Wait for the transaction to be mined
  const receipt = await tx.wait();
  console.log("Transaction was mined in block:", receipt.blockNumber);
  console.log("Gas used:", receipt.gasUsed.toString());

  // Check the balance of the recipient after the transfer
  let balanceAfter = await ethers.provider.getBalance(recipient);
  console.log(
    `Balance of ${recipient} after: ${ethers.formatEther(balanceAfter)} ETH`
  );

  const CapitalFund = await ethers.getContractFactory("CapitalFund");
  const capitalFund = await CapitalFund.deploy();
  const ScartToken = await ethers.getContractFactory("ScartToken");
  const scartToken = await ScartToken.deploy();

  const balance = await capitalFund.checkBalance(scartToken.address);
  console.log("Balance of tokens in CapitalFund:", balance);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
