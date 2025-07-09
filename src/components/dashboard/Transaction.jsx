import React, { useEffect, useState } from "react";
import axios from "axios";

const Transaction = ({ walletAddress }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!walletAddress) return;

    const fetchTransactions = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await axios.get(
          `https://fullnode.testnet.aptoslabs.com/v1/accounts/${walletAddress}/transactions?limit=10`
        );
        setTransactions(res.data || []);
      } catch (err) {
        setError("❌ Failed to load transactions.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [walletAddress]);

  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-xl font-bold mb-4">🔁 Recent Transactions</h2>

      {loading && <p className="text-gray-400">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !transactions.length && (
        <p className="text-gray-400">No recent transactions found.</p>
      )}

      <ul className="space-y-3 max-h-[400px] overflow-auto">
        {transactions.map((tx) => (
          <li
            key={tx.hash}
            className="bg-black/20 p-4 rounded-md text-sm border border-white/10"
          >
            <div className="flex justify-between mb-1">
              <span className="font-semibold text-emerald-400">
                {tx.type === "user_transaction" ? "User TX" : tx.type}
              </span>
              <span className="text-gray-400">{tx.success ? "✅" : "❌"}</span>
            </div>
            <div className="text-xs text-white/80 space-y-1">
              <div>Version: {tx.version}</div>
              <div>Gas Used: {tx.gas_used}</div>
              <div>
                <a
                  className="underline text-cyan-400"
                  href={`https://explorer.aptoslabs.com/txn/${tx.hash}?network=testnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Explorer
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transaction;
