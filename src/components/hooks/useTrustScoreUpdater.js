import { AptosClient } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const NODE_URL = "https://fullnode.testnet.aptoslabs.com";
const client = new AptosClient(NODE_URL);
const MODULE_ADDRESS = "0x<your_module_address>";

export const useTrustScoreUpdater = () => {
  const { account, signAndSubmitTransaction } = useWallet();

  const updateTrustScore = async (delta = 5) => {
    if (!account) return;
    try {
      const payload = {
        type: "entry_function_payload",
        function: `${MODULE_ADDRESS}::trust_score::update_score`,
        arguments: [delta],
        type_arguments: [],
      };

      const tx = await signAndSubmitTransaction({ payload });
      await client.waitForTransaction(tx.hash);
      console.log("✅ TrustScore updated by", delta);
    } catch (err) {
      console.error("TrustScore update failed:", err);
    }
  };

  return { updateTrustScore };
};
