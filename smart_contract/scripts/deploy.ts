import { ethers } from "hardhat";

async function main() {
  const CrowdFunding = await ethers.getContractFactory("CrowdFunding");
  const crowdfunding = await CrowdFunding.deploy();

  await crowdfunding.deployed();

  console.log(crowdfunding.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
