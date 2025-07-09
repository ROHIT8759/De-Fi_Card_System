import React, { useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { AptosClient } from "aptos";
import TrustScoreCard from "./TrustScoreCard";

const NODE_URL = "https://fullnode.testnet.aptoslabs.com"; // or mainnet
const aptos = new AptosClient(NODE_URL);

const ProfileDashboard = () => {
  const { account } = useWallet();
  const walletAddress = account?.address;

  const [trustScore, setTrustScore] = useState(null);
  const [stakingTab, setStakingTab] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!walletAddress) return;

    const fetchTrustScore = async () => {
      try {
        const res = await aptos.getAccountResource(
          walletAddress,

          // This is my wallet address, replace with your own
          "0xaf1472b72a6d6fc5ace1313c8856ab71174fcc2a846de8fd7d10ab3e32510c94::trust_score::TrustScore"
        );
        setTrustScore(res.data.score);
      } catch (err) {
        console.warn("TrustScore not found or not initialized");
        setTrustScore(0);
      }
    };

    const fetchNFTs = async () => {
      try {
        // Replace with your NFT fetching logic
        setNfts([]);
      } catch (err) {
        console.error("Failed to fetch NFTs", err);
      }
    };

    const fetchTransactions = async () => {
      try {
        // Replace with your tx fetching logic
        setTransactions([]);
      } catch (err) {
        console.error("Failed to fetch transactions", err);
      }
    };

    fetchTrustScore();
    fetchNFTs();
    fetchTransactions();
  }, [walletAddress]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📊 Profile Dashboard</h1>

      {!stakingTab && (
        <div className="mb-8">
          <TrustScoreCard score={trustScore ?? 0} />
        </div>
      )}

      <div className="flex justify-between mb-4">
        <button
          onClick={() => setStakingTab(false)}
          className={`px-4 py-2 rounded ${!stakingTab ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
        >
          🧾 Transactions
        </button>
        <button
          onClick={() => setStakingTab(true)}
          className={`px-4 py-2 rounded ${stakingTab ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
        >
          🖼️ NFTs
        </button>
      </div>

      {stakingTab ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {nfts.length === 0 ? (
            <p className="text-gray-600">No NFTs found.</p>
          ) : (
            nfts.map((nft, i) => (
              <div key={i} className="border rounded-lg p-4">
                <img src={nft.image} alt={nft.name} className="w-full h-auto rounded" />
                <p className="mt-2 text-sm font-medium">{nft.name}</p>
              </div>
            ))
          )}
        </div>
      ) : (
        <div>
          {transactions.length === 0 ? (
            <p className="text-gray-600">No transactions found.</p>
          ) : (
            <ul className="space-y-2">
              {transactions.map((tx, i) => (
                <li key={i} className="border p-3 rounded-md text-sm">
                  <span className="block font-medium">{tx.type}</span>
                  <span className="text-gray-500">{tx.timestamp}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileDashboard;
