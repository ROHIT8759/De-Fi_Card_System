// ProfileDashboard.jsx
import React, { useEffect, useState } from 'react';
import { AptosClient } from 'aptos';
import axios from 'axios';

const aptos = new AptosClient('https://fullnode.mainnet.aptoslabs.com');

const ProfileDashboard = ({ walletAddress, aptosBalance }) => {
  const [transactions, setTransactions] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [selectedToken, setSelectedToken] = useState(null);
  const [stakingTab, setStakingTab] = useState(false);

  useEffect(() => {
    const fetchTx = async () => {
      try {
        const res = await axios.get(
          `https://api.mainnet.aptoslabs.com/v1/accounts/${walletAddress}/transactions`
        );
        setTransactions(res.data.slice(0, 10));
      } catch (e) {
        console.error('Failed to load transactions', e);
      }
    };

    const fetchNFTs = async () => {
      try {
        const res = await aptos.getAccountResources(walletAddress);
        const tokens = res.filter((r) => r.type.includes('0x3::token::Token')); // adjust if using new metadata standard
        setNfts(tokens);
      } catch (e) {
        console.error('Failed to load NFTs', e);
      }
    };

    if (walletAddress) {
      fetchTx();
      fetchNFTs();
    }
  }, [walletAddress]);

  const handleTransferNFT = async () => {
    if (!recipient || !selectedToken) return alert('Missing recipient or token');
    try {
      const txn = {
        type: 'entry_function_payload',
        function: '0x3::token_transfers::direct_transfer_script',
        type_arguments: [],
        arguments: [walletAddress, recipient, selectedToken.data.id.token_data_id.name, 1],
      };
      const response = await window.martian.signAndSubmitTransaction(txn);
      alert('Transfer submitted: ' + response.hash);
    } catch (e) {
      console.error('Transfer failed', e);
      alert('Failed to transfer NFT');
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">👤 Profile Dashboard</h2>
        <button onClick={() => setStakingTab(!stakingTab)} className="text-sm bg-indigo-600 text-white px-3 py-1 rounded">
          {stakingTab ? '📦 View NFTs' : '🏦 Staking' }
        </button>
      </div>

      <p>📬 Address: {walletAddress}</p>
      <p>💸 Aptos Balance: {aptosBalance?.toFixed(4)} APT</p>

      {stakingTab ? (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">🔐 Staking Options</h3>
          <p className="text-gray-500 mb-4">Coming soon: Integration with Tortuga and Ditto staking protocols</p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded">
              <h4 className="font-bold">Tortuga Staking</h4>
              <p>Earn tAPT for APT deposits</p>
              <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">Stake</button>
            </div>
            <div className="p-4 border rounded">
              <h4 className="font-bold">Ditto Staking</h4>
              <p>Stake APT to receive stAPT</p>
              <button className="mt-2 bg-green-500 text-white px-3 py-1 rounded">Stake</button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* NFTs */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">🖼️ Your NFTs</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {nfts.map((nft, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedToken(nft)}
                  className={`p-2 border rounded cursor-pointer ${
                    selectedToken === nft ? 'border-blue-500' : ''
                  }`}
                >
                  <p className="text-sm font-semibold truncate">{nft.data.id.token_data_id.name}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-col md:flex-row gap-2">
              <input
                type="text"
                placeholder="Recipient address"
                className="p-2 border rounded w-full h-12 text-black"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
              <button
                onClick={handleTransferNFT}
                className="h-12 bg-purple-600 text-white px-4 py-0 rounded"
              >
                Transfer NFT
              </button>
            </div>
          </div>

          {/* Transaction History */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">🧾 Recent Transactions</h3>
            <ul className="list-disc ml-6">
              {transactions.map((tx, i) => (
                <li key={i} className="text-sm">
                  {tx.type} - {tx.version} - {tx.timestamp}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDashboard;