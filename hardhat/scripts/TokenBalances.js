require("dotenv").config({ path: ".env" });
const { ETH_MAINNET_API_KEY_ALCHEMY} = process.env;
const{ Alchemy, Network } = require("alchemy-sdk");

const config = {
  apiKey: ETH_MAINNET_API_KEY_ALCHEMY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

const main = async () => {
  // Wallet address
  const address = "0x5041ed759dd4afc3a72b8192c143f72f4724081a";

  // Get token balances
  const balances = await alchemy.core.getTokenBalances(address);

  // Remove tokens with zero balance
  const nonZeroBalances = balances.tokenBalances.filter((token) => {
    //return token.tokenBalance !== "0";
    return token.tokenBalance;
  });

  console.log(`Token balances of ${address} \n`);

  // Counter for SNo of final output
  let i = 1;

  // Loop through all tokens with non-zero balance
  for (let token of nonZeroBalances) {
    // Get balance of token
    let balance = token.tokenBalance;

    // Get metadata of token
    const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);

    // Compute token balance in human-readable format
    balance = balance / Math.pow(10, metadata.decimals);
    balance = balance.toFixed(18);

    // Print name, balance, and symbol of token
    console.log(`${i++}. ${metadata.name}: ${balance} ${metadata.symbol}`);
  }
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();