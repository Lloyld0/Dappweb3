const {ethers} = require("hardhat");
const arguments = 10;

async function main() {

    const whitelistContract = await ethers.getContractFactory("Whitelist");

    const deployedWhitelistContract = await whitelistContract.deploy(arguments);

    await deployedWhitelistContract.deployed();

    console.log("Whitelist deployed to:", deployedWhitelistContract.address);

        // print the address of the deployed contract
    console.log("Verify Contract Address:");

    console.log("Sleeping.....");
    // Wait for etherscan to notice that the contract has been deployed
    await sleep(30000);

    // Verify the contract after deploying

    await hre.run("verify:verify", {
        address: deployedWhitelistContract.address,
        constructorArguments: [arguments],
    });
}

    function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
    }


main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});