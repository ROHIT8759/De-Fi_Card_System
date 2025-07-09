import React, { useState, useEffect } from "react";
import { AptosClient } from "aptos";

const NODE_URL = "https://fullnode.testnet.aptoslabs.com";
const CONTRACT_ADDRESS ="0xcc5e97e0015543dfac2d3e686fed214a7450e5c1efe15786dfde118987c3fbec";
const MODULE = "elegent_defi_v2";

const LoanRequestForm = () => {
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("3");
  const [purpose, setPurpose] = useState("");
  const [collateral, setCollateral] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState(null);
  const [error, setError] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);

  const client = new AptosClient(NODE_URL);

  // Check wallet status on mount
  useEffect(() => {
    const check = async () => {
      if (window.aptos) {
        const connected = await window.aptos.isConnected();
        setWalletConnected(connected);
      }
    };
    check();
  }, []);

  const connectWallet = async () => {
    try {
      await window.aptos.connect();
      setWalletConnected(true);
    } catch (err) {
      setError("Failed to connect wallet");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setTxHash(null);

    try {
      if (!window.aptos) throw new Error("Wallet not installed");
      if (!walletConnected) throw new Error("Wallet not connected");

      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        throw new Error("Invalid amount");
      }

      const amountInOctas = Math.floor(parsedAmount * 1e8);

      const payload = {
        type: "entry_function_payload",
        function: `${CONTRACT_ADDRESS}::${MODULE}::request_loan`,
        type_arguments: [],
        arguments: [
          amountInOctas.toString(), // u64
          "APT", // string
          CONTRACT_ADDRESS, // admin address
        ],
      };

      const tx = await window.aptos.signAndSubmitTransaction(payload);
      await client.waitForTransaction(tx.hash, { checkSuccess: true });

      setTxHash(tx.hash);
      alert("✅ Loan request submitted!");
      setAmount("");
      setPurpose("");
      setCollateral("");
    } catch (err) {
      console.error("Loan error:", err);
      setError(err?.message || "Transaction failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">📤 Request a Big Loan</h2>

      {!walletConnected && (
        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-4">
          <p className="text-yellow-200 text-sm mb-2">
            ⚠️ Wallet not connected. Please connect your Aptos wallet.
          </p>
          <button
            onClick={connectWallet}
            className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg text-white font-semibold"
          >
            Connect Wallet
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-sm text-white/80">
        <div>
          <label className="block mb-1">Loan Amount (APT)</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Loan Term</label>
          <select
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            required
          >
            <option value="1" className="text-black bg-black/5">1 Month</option>
            <option value="3" className="text-black bg-black/5">3 Months</option>
            <option value="6" className="text-black bg-black/5">6 Months</option>
            <option value="12" className="text-black bg-black/5">12 Months</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Purpose (optional)</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">Collateral (optional address)</label>
          <input
            type="text"
            placeholder="0x... (optional)"
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20"
            value={collateral}
            onChange={(e) => setCollateral(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !walletConnected}
          className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-lg text-white font-semibold transition disabled:opacity-50"
        >
          {isLoading ? "Submitting..." : "Submit Loan Request"}
        </button>

        {txHash && (
          <p className="text-green-400 mt-2">
            ✅ Tx:{" "}
            <a
              className="underline"
              href={`https://explorer.aptoslabs.com/txn/${txHash}?network=testnet`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {txHash.slice(0, 12)}...{txHash.slice(-8)}
            </a>
          </p>
        )}

        {error && <p className="text-red-500 mt-2">❌ {error}</p>}
      </form>

      <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3 mt-4">
        <p className="text-blue-300 text-xs">
          This interacts with: <code>request_loan</code> from <code>elegent_defi_v2</code>.
        </p>
      </div>
    </div>
  );
};

export default LoanRequestForm;
