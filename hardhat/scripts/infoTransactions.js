// Setup: npm install alchemy-sdk
const{ Alchemy, Network } = require("alchemy-sdk");

const config = {
  apiKey: "3C6RTh-0CiG92bbUlMUrfednctPAbpRf",
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

async function main(){

  const data = await alchemy.core.getAssetTransfers({
    fromBlock: "0x0",
    toAddress: "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1",
    category: ["external", "internal", "erc20", "erc721", "erc1155"],
  });
  console.log(data);
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});