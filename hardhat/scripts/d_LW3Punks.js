const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {
  
  const contractName = "LW3Punks";
  const metadataURL = "ipfs://Qmbygo38DWF1V8GttM1zy89KzyZTPU2FLUzQtiDvB7q6i5/";
  const lw3PunksContract = await ethers.getContractFactory(contractName);
  const deployedLW3PunksContract = await lw3PunksContract.deploy(metadataURL);
  await deployedLW3PunksContract.deployed();

  console.log(deployedLW3PunksContract.deployTransaction);
  console.log(contractName, " deployed to: ", deployedLW3PunksContract.address);
  console.log("Verify Contract Address:");
  console.log("Sleeping.....");
  await new Promise((resolve) => setTimeout(resolve, 30000));
  
  await hre.run("verify:verify", {
        address: deployedLW3PunksContract.address,
        constructorArguments: [metadataURL],
  });
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });