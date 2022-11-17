require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });
require("@nomiclabs/hardhat-etherscan");

const MUMBAI_PROVIDER = process.env.MUMBAI_PROVIDER;
const POLYGON_VERIFY_KEY = process.env.POLYGON_VERIFY_KEY;
const GOERLI_PROVIDER = process.env.GOERLI_PROVIDER;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.10",
  networks: {
    goerli: {
      url: GOERLI_PROVIDER,
      accounts: [PRIVATE_KEY],
    },
    polygonMumbai: {
      url: MUMBAI_PROVIDER,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      mainnet: "WIUTBQAMWTVR6UI3VQ2MSFIY2DU56WVHQC",
      goerli: "WIUTBQAMWTVR6UI3VQ2MSFIY2DU56WVHQC",
      polygon: "F8792UPSYZXTC4C98831W2RIS8R3TDY9MF",
      polygonMumbai: "F8792UPSYZXTC4C98831W2RIS8R3TDY9MF",
      optimisticEthereum: "YOUR_OPTIMISTIC_ETHERSCAN_API_KEY",
      arbitrumOne: "YOUR_ARBISCAN_API_KEY",
    }  
  },
};