// BuySellModal.jsx
import React, { useState } from 'react';
import { AptosClient, AptosAccount, TxnBuilderTypes, BCS } from 'aptos';

function BuySellModal({ coin, tradeType, onClose, walletAddress, aptosClient, isMainnet = true }) {
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const NETWORK = isMainnet
    ? 'https://fullnode.mainnet.aptoslabs.com'
    : 'https://fullnode.testnet.aptoslabs.com';

  const handleTrade = async () => {
    if (!walletAddress || !amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    try {
      setLoading(true);
      setStatus('Preparing transaction...');

      const recipient = tradeType === 'buy' ? walletAddress : '0x1'; // Dummy recipient for sell
      const sendAmount = Math.floor(parseFloat(amount) * 1e8);

      const payload = new TxnBuilderTypes.EntryFunctionPayload(
        TxnBuilderTypes.EntryFunction.natural(
          "0x1::coin",
          "transfer",
          [TxnBuilderTypes.TypeTagStruct.fromString("0x1::aptos_coin::AptosCoin")],
          [
            BCS.bcsToBytes(TxnBuilderTypes.AccountAddress.fromHex(recipient)),
            BCS.bcsSerializeUint64(sendAmount)
          ]
        )
      );

      const response = await window.martian.signAndSubmitTransaction({
        sender: walletAddress,
        data: {
          function: "0x1::coin::transfer",
          type_arguments: ["0x1::aptos_coin::AptosCoin"],
          arguments: [recipient, sendAmount.toString()],
        },
      });

      setStatus(`✅ Transaction Submitted! Hash: ${response.hash}`);
    } catch (error) {
      console.error(error);
      setStatus('❌ Transaction failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-semibold mb-4">
          {tradeType === 'buy' ? 'Buy' : 'Sell'} {coin.name}
        </h2>

        <input
          type="number"
          min="0"
          placeholder="Amount in APT"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 mb-4 border dark:bg-gray-800 rounded"
        />

        <div className="flex justify-between gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded shadow"
          >
            Cancel
          </button>

          <button
            onClick={handleTrade}
            className="px-4 py-2 bg-indigo-600 text-white rounded shadow disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Processing...' : `${tradeType === 'buy' ? 'Buy' : 'Sell'} APT`}
          </button>
        </div>

        {status && <p className="mt-4 text-sm text-center">{status}</p>}
      </div>
    </div>
  );
}

export default BuySellModal;
