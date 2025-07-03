import React, { useEffect, useState } from 'react';
import { AptosClient } from 'aptos';
import axios from 'axios';
import {
  User,
  Wallet,
  Banknote,
  History
} from 'lucide-react';

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
        const tokens = res.filter((r) => r.type.includes('0x3::token::Token'));
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
    <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg shadow-cyan-500/10 transition-all hover:shadow-cyan-500/20 text-white space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <User className="w-6 h-6 text-white/80" /> Profile Dashboard
        </h2>
        <button
          onClick={() => setStakingTab(!stakingTab)}
          className="text-sm bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-4 py-2 rounded-full hover:from-purple-600 hover:to-cyan-600 transition duration-300 shadow-md shadow-cyan-500/20"
        >
          {stakingTab ? 'View NFTs' : 'Staking'}
        </button>
      </div>

      <p className="text-white/80 flex items-center gap-2 mb-1">
        <Wallet className="w-4 h-4" /> Address: {walletAddress}
      </p>
      <p className="text-white/80 flex items-center gap-2 mb-4">
        <Banknote className="w-4 h-4" /> Aptos Balance: {aptosBalance?.toFixed(4)} APT
      </p>

      {stakingTab ? (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white">Staking Options</h3>
          <p className="text-white/60 mb-4">Coming soon: Integration with Tortuga and Ditto</p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border border-white/10 rounded-lg bg-white/5">
              <h4 className="font-bold text-white">Tortuga Staking</h4>
              <p className="text-white/70">Earn tAPT for APT deposits</p>
              <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                Stake
              </button>
            </div>
            <div className="p-4 border border-white/10 rounded-lg bg-white/5">
              <h4 className="font-bold text-white">Ditto Staking</h4>
              <p className="text-white/70">Stake APT to receive stAPT</p>
              <button className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                Stake
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* NFTs */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-2">Your NFTs</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {nfts.map((nft, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedToken(nft)}
                  className={`p-2 border border-white/10 rounded cursor-pointer bg-white/5 hover:border-blue-400 ${
                    selectedToken === nft ? 'border-blue-500' : ''
                  }`}
                >
                  <p className="text-sm font-semibold truncate text-white">
                    {nft.data.id.token_data_id.name}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-col md:flex-row gap-2">
              <input
                type="text"
                placeholder="Recipient address"
                className="p-2 border border-white/10 rounded w-full h-12 text-black"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
              <button
                onClick={handleTransferNFT}
                className="h-12 bg-purple-600 text-white text-sm px-5 py-0 rounded hover:bg-purple-700"
              >
                Transfer NFT
              </button>
            </div>
          </div>

          {/* Transaction History */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-2">
              <History className="w-5 h-5" /> Recent Transactions
            </h3>
            <ul className="list-disc ml-6 text-white/80 text-sm">
              {transactions.map((tx, i) => (
                <li key={i}>
                  {tx.type} – {tx.version} – {tx.timestamp}
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
