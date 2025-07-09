// // import React from 'react';

// // const SmallLoanCard = ({ loan }) => {
// //   return (
// //     <div className="w-full bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md p-4 shadow-lg shadow-purple-500/10 transition-all hover:shadow-purple-500/20 hover:drop-shadow-glow">
// //       {/* Header */}
// //       <div className="flex justify-between items-center mb-3">
// //         <h3 className="text-lg font-semibold text-white truncate">
// //           Loan #{loan?.id || 'TBD'}
// //         </h3>
// //         <span
// //           className={`text-xs font-medium px-3 py-1 rounded-full border backdrop-blur-sm ${
// //             loan?.status === 'Active'
// //               ? 'bg-green-400/10 text-green-400 border-green-400/30'
// //               : loan?.status === 'Pending'
// //               ? 'bg-yellow-400/10 text-yellow-300 border-yellow-400/30'
// //               : 'bg-gray-400/10 text-gray-300 border-gray-400/30'
// //           }`}
// //         >
// //           {loan?.status || 'Active'}
// //         </span>
// //       </div>

// //       {/* Loan Info */}
// //       <div className="space-y-2 text-sm text-white/80">
// //         <div className="flex justify-between">
// //           <span>Amount:</span>
// //           <span className="text-white font-semibold">
// //             {loan?.amount || '$0'}
// //           </span>
// //         </div>
// //         <div className="flex justify-between">
// //           <span>Interest:</span>
// //           <span className="text-white font-semibold">
// //             {loan?.interest || '0%'}
// //           </span>
// //         </div>
// //         <div className="flex justify-between">
// //           <span>Due Date:</span>
// //           <span className="text-white font-semibold">
// //             {loan?.dueDate || 'TBD'}
// //           </span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SmallLoanCard;





// import React, { useState } from "react";
// import { AptosClient } from "aptos";

// const SmallLoanCard = ({ loan }) => {
//   const [isPaying, setIsPaying] = useState(false);
//   const [txHash, setTxHash] = useState(null);
//   const [error, setError] = useState(null);

//   const client = new AptosClient("https://fullnode.testnet.aptoslabs.com");

//   const handleRepayLoan = async () => {
//     if (!window.aptos) {
//       alert("❌ Wallet not connected");
//       return;
//     }

//     setIsPaying(true);
//     setError(null);
//     setTxHash(null);

//     try {
//       const payload = {
//         type: "entry_function_payload",
//         function: "0xYourModuleAddress::smallloan::repay", // 🔁 Replace with actual module
//         type_arguments: [],
//         arguments: [loan?.id || 0],
//       };

//       const tx = await window.aptos.signAndSubmitTransaction(payload);
//       await client.waitForTransaction(tx.hash);

//       setTxHash(tx.hash);
//       alert("✅ Repayment successful!");
//     } catch (err) {
//       console.error(err);
//       setError(err.message || "Transaction failed");
//     } finally {
//       setIsPaying(false);
//     }
//   };

//   return (
//     <div className="w-full bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md p-4 shadow-lg shadow-purple-500/10 transition-all hover:shadow-purple-500/20 hover:drop-shadow-glow flex flex-col justify-between h-full">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-3">
//         <h3 className="text-lg font-semibold text-white truncate">
//           Loan #{loan?.id || 'TBD'}
//         </h3>
//         <span
//           className={`text-xs font-medium px-3 py-1 rounded-full border backdrop-blur-sm ${
//             loan?.status === 'Active'
//               ? 'bg-green-400/10 text-green-400 border-green-400/30'
//               : loan?.status === 'Pending'
//               ? 'bg-yellow-400/10 text-yellow-300 border-yellow-400/30'
//               : 'bg-gray-400/10 text-gray-300 border-gray-400/30'
//           }`}
//         >
//           {loan?.status || 'Active'}
//         </span>
//       </div>

//       {/* Loan Info */}
//       <div className="space-y-2 text-sm text-white/80 mb-4">
//         <div className="flex justify-between">
//           <span>Amount:</span>
//           <span className="text-white font-semibold">{loan?.amount || '$0'}</span>
//         </div>
//         <div className="flex justify-between">
//           <span>Interest:</span>
//           <span className="text-white font-semibold">{loan?.interest || '0%'}</span>
//         </div>
//         <div className="flex justify-between">
//           <span>Due Date:</span>
//           <span className="text-white font-semibold">{loan?.dueDate || 'TBD'}</span>
//         </div>
//       </div>

//       {/* Button */}
//       <div>
//         <button
//           onClick={handleRepayLoan}
//           disabled={isPaying}
//           className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
//         >
//           {isPaying ? "Processing..." : "Repay Loan"}
//         </button>

//         {txHash && (
//           <p className="text-green-400 text-xs mt-2">
//             Tx:{" "}
//             <a
//               href={`https://explorer.aptoslabs.com/txn/${txHash}?network=testnet`}
//               target="_blank"
//               rel="noreferrer"
//               className="underline"
//             >
//               {txHash.slice(0, 12)}...
//             </a>
//           </p>
//         )}
//         {error && <p className="text-red-400 text-xs mt-1">❌ {error}</p>}
//       </div>
//     </div>
//   );
// };

// export default SmallLoanCard;






import React, { useState, useEffect, useMemo } from "react";
import { AptosClient } from "aptos";

const CONTRACT_ADDRESS = "0xcc5e97e0015543dfac2d3e686fed214a7450e5c1efe15786dfde118987c3fbec";
const NODE_URL = "https://fullnode.testnet.aptoslabs.com";

const SmallLoanCard = ({ loan: propLoan, walletAddress, loanId, onUpdate }) => {
  const [loanData, setLoanData] = useState(propLoan || null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [isExtending, setIsExtending] = useState(false);
  const [txHash, setTxHash] = useState(null);
  const [error, setError] = useState(null);

  const client = useMemo(() => new AptosClient(NODE_URL), []);

  // Fetch loan details from contract if loanId is provided
  useEffect(() => {
    if (loanId && walletAddress && !propLoan) {
      fetchLoanDetails();
    }
  }, [loanId, walletAddress]);

  const fetchLoanDetails = async () => {
    if (!loanId || !walletAddress) return;

    setIsLoading(true);
    setError(null);

    try {
      const [id, borrower, amount, interestAmount, dynamicInterestRate, status, dueDate] = await client.view({
        function: `${CONTRACT_ADDRESS}::elegent_defi_v2::get_loan_details`,
        arguments: [loanId.toString(), CONTRACT_ADDRESS],
        type_arguments: []
      });

      // Convert contract data to display format
      const loanDetails = {
        id: parseInt(id),
        amount: `${(parseInt(amount) / 1e8).toFixed(2)} APT`,
        interest: `${(parseInt(dynamicInterestRate) / 100).toFixed(1)}%`,
        dueDate: new Date(parseInt(dueDate) * 1000).toLocaleDateString(),
        status: getStatusText(parseInt(status)),
        totalDue: `${((parseInt(amount) + parseInt(interestAmount)) / 1e8).toFixed(2)} APT`,
        borrower,
        isOverdue: new Date(parseInt(dueDate) * 1000) < new Date()
      };

      setLoanData(loanDetails);
    } catch (err) {
      console.error("Error fetching loan details:", err);
      setError(`Failed to load loan #${loanId}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusText = (statusCode) => {
    const statusMap = {
      0: "Active",
      1: "Repaid", 
      2: "Defaulted",
      3: "Extended",
      4: "Liquidated"
    };
    return statusMap[statusCode] || "Unknown";
  };

  const handleRepayLoan = async () => {
    if (!window.aptos) {
      setError("Petra wallet not found. Please install Petra wallet.");
      return;
    }

    if (!loanData?.id) {
      setError("No loan ID available for repayment.");
      return;
    }

    setIsPaying(true);
    setError(null);
    setTxHash(null);

    try {
      const isConnected = await window.aptos.isConnected();
      if (!isConnected) {
        await window.aptos.connect();
      }

      const payload = {
        type: "entry_function_payload",
        function: `${CONTRACT_ADDRESS}::elegent_defi_v2::repay_loan`,
        type_arguments: [],
        arguments: [
          loanData.id.toString(),
          CONTRACT_ADDRESS
        ],
      };

      console.log("Repaying loan with payload:", payload);

      const response = await window.aptos.signAndSubmitTransaction(payload);
      await client.waitForTransaction(response.hash);

      setTxHash(response.hash);
      
      // Update loan status
      setLoanData(prev => ({ ...prev, status: "Repaid" }));
      
      if (onUpdate) onUpdate();

    } catch (err) {
      console.error("Repayment failed:", err);
      setError(err.message || "Repayment failed");
    } finally {
      setIsPaying(false);
    }
  };

  const handleExtendLoan = async () => {
    if (!window.aptos || !loanData?.id) {
      setError("Wallet not connected or no loan ID available.");
      return;
    }

    setIsExtending(true);
    setError(null);

    try {
      const payload = {
        type: "entry_function_payload",
        function: `${CONTRACT_ADDRESS}::elegent_defi_v2::extend_loan`,
        type_arguments: [],
        arguments: [
          loanData.id.toString(),
          CONTRACT_ADDRESS
        ],
      };

      const response = await window.aptos.signAndSubmitTransaction(payload);
      await client.waitForTransaction(response.hash);

      setTxHash(response.hash);
      
      // Refresh loan details
      await fetchLoanDetails();
      
      if (onUpdate) onUpdate();

    } catch (err) {
      console.error("Extension failed:", err);
      setError(err.message || "Extension failed");
    } finally {
      setIsExtending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md p-4 shadow-lg shadow-purple-500/10 h-[140px] flex items-center justify-center">
        <div className="text-white/70 text-sm">🔄 Loading...</div>
      </div>
    );
  }

  if (!loanData) {
    return (
      <div className="w-full bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md p-4 shadow-lg shadow-purple-500/10 h-[140px] flex items-center justify-center">
        <div className="text-white/70 text-sm">📋 No loan data</div>
      </div>
    );
  }

  const isActive = loanData.status === "Active";
  const isOverdue = loanData.isOverdue && isActive;

  return (
    <div className="w-full bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md p-4 shadow-lg shadow-purple-500/10 transition-all hover:shadow-purple-500/20 hover:drop-shadow-glow flex flex-col justify-between h-full">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-white truncate">
            Loan #{loanData.id}
          </h3>
          {loanId && (
            <button
              onClick={fetchLoanDetails}
              className="text-xs text-purple-400 hover:text-purple-300"
              title="Refresh loan data"
            >
              🔄
            </button>
          )}
        </div>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full border backdrop-blur-sm ${
            loanData.status === 'Active'
              ? isOverdue
                ? 'bg-red-400/10 text-red-400 border-red-400/30'
                : 'bg-green-400/10 text-green-400 border-green-400/30'
              : loanData.status === 'Pending'
              ? 'bg-yellow-400/10 text-yellow-300 border-yellow-400/30'
              : loanData.status === 'Repaid'
              ? 'bg-blue-400/10 text-blue-300 border-blue-400/30'
              : 'bg-gray-400/10 text-gray-300 border-gray-400/30'
          }`}
        >
          {loanData.status}
          {isOverdue && " ⚠️"}
        </span>
      </div>

      {/* Loan Info */}
      <div className="space-y-2 text-sm text-white/80 mb-4 flex-1">
        <div className="flex justify-between">
          <span>Amount:</span>
          <span className="text-white font-semibold">{loanData.amount}</span>
        </div>
        <div className="flex justify-between">
          <span>Interest:</span>
          <span className="text-white font-semibold">{loanData.interest}</span>
        </div>
        <div className="flex justify-between">
          <span>Due Date:</span>
          <span className={`font-semibold ${isOverdue ? 'text-red-400' : 'text-white'}`}>
            {loanData.dueDate}
          </span>
        </div>
        {loanData.totalDue && (
          <div className="flex justify-between pt-1 border-t border-white/10">
            <span className="text-yellow-400">Total Due:</span>
            <span className="text-yellow-400 font-semibold">{loanData.totalDue}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        {isActive && (
          <button
            onClick={handleRepayLoan}
            disabled={isPaying}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {isPaying ? (
              <span className="flex items-center justify-center gap-1">
                <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Processing...
              </span>
            ) : (
              "💳 Repay Loan"
            )}
          </button>
        )}

        {isActive && (
          <button
            onClick={handleExtendLoan}
            disabled={isExtending}
            className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium py-1.5 px-3 rounded text-xs transition-all disabled:opacity-50"
          >
            {isExtending ? "Extending..." : "⏰ Extend Loan"}
          </button>
        )}
      </div>

      {/* Transaction Hash */}
      {txHash && (
        <div className="mt-2 p-2 bg-green-500/20 border border-green-500/30 rounded text-center">
          <p className="text-green-400 text-xs">
            ✅{" "}
            <a
              href={`https://explorer.aptoslabs.com/txn/${txHash}?network=testnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-green-300"
            >
              Tx: {txHash.slice(0, 8)}...
            </a>
          </p>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mt-2 p-2 bg-red-500/20 border border-red-500/30 rounded">
          <p className="text-red-400 text-xs">❌ {error}</p>
        </div>
      )}

      {/* Overdue Warning */}
      {isOverdue && (
        <div className="mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded">
          <p className="text-red-400 text-xs font-medium text-center">
            ⚠️ Overdue - Pay now!
          </p>
        </div>
      )}
    </div>
  );
};

export default SmallLoanCard;