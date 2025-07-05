import { AptosClient } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const NODE_URL = "https://fullnode.testnet.aptoslabs.com"; // testnet or mainnet
const client = new AptosClient(NODE_URL);
const MODULE_ADDRESS = "0x<your_module_address>"; // ⬅️ replace this

export const useTrustScore = () => {
  const { account, signAndSubmitTransaction } = useWallet();

  const initTrustScore = async () => {
    if (!account) return;

    try {
      const payload = {
        type: "entry_function_payload",
        function: `${MODULE_ADDRESS}::trust_score::init_account`,
        arguments: [],
        type_arguments: [],
      };

      const txn = await signAndSubmitTransaction({ payload });
      await client.waitForTransaction(txn.hash);
      console.log("✅ TrustScore initialized!");
    } catch (err) {
      if (err.toString().includes("already exists")) {
        console.log("TrustScore already initialized.");
      } else {
        console.error("Init TrustScore failed:", err);
      }
    }
  };

  return { initTrustScore };
};
