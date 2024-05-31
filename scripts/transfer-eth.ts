const { ethers } = require("hardhat");

async function main() {
  const [sender] = await ethers.getSigners();
  const recipient = "0x81c53637e97C626174BeC954f53B8BB24755976c"; // Replace with your address
  const amount = ethers.parseEther("1.0"); // Amount to send in ETH

  // // Check the balance of the recipient before the transfer
  // let balanceBefore = await ethers.provider.getBalance(recipient);
  // console.log(
  //   `Balance of ${recipient} before: ${ethers.formatEther(balanceBefore)} ETH`
  // );

  // // Send the transaction
  // const tx = await sender.sendTransaction({
  //   to: recipient,
  //   value: amount,
  // });

  // console.log("Transaction hash:", tx.hash);

  // // Wait for the transaction to be mined
  // const receipt = await tx.wait();
  // console.log("Transaction was mined in block:", receipt.blockNumber);
  // console.log("Gas used:", receipt.gasUsed.toString());

  // Check the balance of the recipient after the transfer
  let balanceAfter = await ethers.provider.getBalance(recipient);
  console.log(`Balance of ${recipient} after: ${balanceAfter} ETH`);

  // const CapitalFund = await ethers.getContractFactory("CapitalFund");
  // const capitalFund = await CapitalFund.deploy();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
