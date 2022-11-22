//Import librairies, modules and constants
const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
const { WHITELIST_CONTRACT_ADDRESS, METADATA_URL } = require("../constants");

// Main function
async function main() {

    // Tableau d'arguments
    //let arguments = [];
    //Function Deployed and Verify
    async function deployedAndVerify(contractName, contractArguments = []) {

        console.log(contractName);
        console.log(contractArguments);
        console.log(contractArguments.length);
        let deployedContract;
        const contract = await ethers.getContractFactory(contractName);
            switch (contractArguments.length) {
                case 0: 
                    deployedContract = await contract.deploy();
                    console.log("0 arguments");
                  break;
                case 1:
                    deployedContract = await contract.deploy(contractArguments[0]);
                    console.log("1 arguments");
                  break;
                case 2:
                    deployedContract = await contract.deploy(contractArguments[0], contractArguments[1]);
                    console.log("2 arguments");
                  break;
                case 3:
                    deployedContract = await contract.deploy(contractArguments[0], contractArguments[1], contractArguments[2]);
                    console.log("3 arguments");
                  break;
                default:
                  break;
              }
        await deployedContract.deployed();

        console.log(deployedContract.deployTransaction);
        console.log(contractName, " deployed to: ", deployedContract.address);
        console.log("Verify Contract Address:");
        console.log("Sleeping.....");
        await sleep(30000);

        switch (contractArguments.length) {
            case 0:
                await hre.run("verify:verify", {address: deployedContract.address, constructorArguments: []});
                console.log("0 arguments");
              break;
            case 1:
                await hre.run("verify:verify", {address: deployedContract.address, constructorArguments: [contractArguments[0]]});
                console.log("1 arguments");
              break;
            case 2:
                console.log("2 arguments");
                await hre.run("verify:verify", {address: deployedContract.address, constructorArguments: [contractArguments[0], contractArguments[1]]});
                console.log("2 arguments");
              break;
            case 3:
                await hre.run("verify:verify", {address: deployedContract.address, constructorArguments: [contractArguments[0], contractArguments[1], contractArguments[2]]});
                console.log("3 arguments");
              break;
            default:
              break;
          }        
    }

    //Function Sleep
    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
     }

    //await deployedAndVerify("Whitelist", [10]);
    //await deployedAndVerify("CryptoDevs", ["https://nft-collection-sneh1999.vercel.app/api/", "0x2Bb340e047Efc7AC98770D88d05093FB23eABA8d"]);

    //const contract = await ethers.getContractFactory(contractName);

    /*
    //WHITELIST
    const arguments_whitelist = 10;
    const whitelistContract = await ethers.getContractFactory("Whitelist");
    const deployedWhitelistContract = await whitelistContract.deploy(arguments_whitelist);
    await deployedWhitelistContract.deployed();

    console.log("Whitelist deployed to:", deployedWhitelistContract.address);
    console.log("Verify Contract Address:");
    console.log("Sleeping.....");
    
    await sleep(30000);
    await hre.run("verify:verify", {
        address: deployedWhitelistContract.address,
        constructorArguments: [arguments],
    });

    //CRYPTODEVNFT
    const metadataURL = METADATA_URL;
    const cryptoDevsContract = await ethers.getContractFactory("CryptoDevs");
    const deployedCryptoDevsContract = await cryptoDevsContract.deploy(metadataURL, deployedWhitelistContract.address);
    await deployedCryptoDevsContract.deployed();

    console.log("Crypto Devs Contract Address:", deployedCryptoDevsContract.address);
    console.log("Verify Contract Address:");
    console.log("Sleeping.....");
    
    await sleep(30000);
    await hre.run("verify:verify", {
        address: deployedCryptoDevsContract.address,
        constructorArguments: [metadataURL, deployedWhitelistContract.address],
    });

    //CRYPTODEVTOKEN
    const cryptoDevsTokenContract = await ethers.getContractFactory("CryptoDevToken");
    const deployedCryptoDevsTokenContract = await cryptoDevsTokenContract.deploy(deployedCryptoDevsContract.address);
    await deployedCryptoDevsTokenContract.deployed();
  
    console.log("Crypto Devs Token Contract Address:",deployedCryptoDevsTokenContract.address);
    console.log("Verify Contract Address:");
    console.log("Sleeping.....");
    
    await sleep(30000);
    await hre.run("verify:verify", {
        address: deployedCryptoDevsTokenContract.address,
        constructorArguments: [deployedCryptoDevsContract.address],
    });

    //EXCHANGE
    const exchangeContract = await ethers.getContractFactory("Exchange");
    const deployedExchangeContract = await exchangeContract.deploy(deployedCryptoDevsTokenContract.address);
    await deployedExchangeContract.deployed();

    console.log("Exchange Contract Address:", deployedExchangeContract.address);
    console.log("Verify Contract Address:");
    console.log("Sleeping.....");
    
    await sleep(30000);
    await hre.run("verify:verify", {
        address: deployedExchangeContract.address,
        constructorArguments: [deployedCryptoDevsTokenContract.address],
    });

    //Function Sleep
    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
     }
    */

}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });