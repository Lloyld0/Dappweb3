    require("dotenv").config({ path: ".env" });
    const { MUMBAI_API_KEY_ALCHEMY, PRIVATE_KEY } = process.env;
    const { ethers } = require("ethers");
    const { hashMessage } = require("@ethersproject/hash");
    const { Network, Alchemy } = require("alchemy-sdk");
    const settings = {
        apiKey: MUMBAI_API_KEY_ALCHEMY,
        network: Network.MATIC_MUMBAI,
    };
    const alchemy = new Alchemy(settings);
    

    const main = async () => {

        const ethersAlchemyProvider = await alchemy.config.getProvider();

        const message = "Let's verify the signature of this message!";
        const walletInst = new ethers.Wallet(PRIVATE_KEY, ethersAlchemyProvider);
        const signMessage = walletInst.signMessage(message);

        const messageSigner = signMessage.then((value) => {
            const verifySigner = ethers.utils.recoverAddress(hashMessage(message),value);
            return verifySigner;
        });

        try {
        console.log("Success! The message: " +message+" was signed with the signature: " +await signMessage);
        console.log("The signer was: " +await messageSigner);
        } catch (err) {
        console.log("Something went wrong while verifying your message signature: " + err);
        }
    };
  
    main();