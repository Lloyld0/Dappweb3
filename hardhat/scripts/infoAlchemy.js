// Setup
require("dotenv").config({ path: ".env" });
const {MUMBAI_API_KEY_ALCHEMY} = process.env;
const{ Alchemy, Network } = require("alchemy-sdk");

const settings = {
    apiKey: MUMBAI_API_KEY_ALCHEMY,
    network: Network.MATIC_MUMBAI,
};

const alchemy = new Alchemy(settings);  
  
// async function main() {
//     // Get the latest block
//     const latestBlock = await alchemy.core.getBlockNumber();
//     console.log(latestBlock);

//     // Get all outbound transfers for a provided address
//     const tokens = await alchemy.core
//         .getTokenBalances('0x79b0c26DC2c18aF3D9588B3839706e42A86D8Ed7');

//     console.log(tokens);
// }

// main();

// Get all the NFTs owned by an address
//const nfts = alchemy.nft.getNftsForOwner("0x79b0c26DC2c18aF3D9588B3839706e42A86D8Ed7");
    
// Listen to all new pending transactions

alchemy.ws.on(
    { method: "alchemy_pendingTransactions",
    //fromAddress: "0xc243Bc615F731AbdEcf973e1a285b2f0527167CE",
    toAddress: "0xc243Bc615F731AbdEcf973e1a285b2f0527167CE" },
    (res) => console.log(res)
);
