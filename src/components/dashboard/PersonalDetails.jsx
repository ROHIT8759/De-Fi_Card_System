// // // src/components/dashboard/PersonalDetails.jsx
// // import React from 'react';

// // const PersonalDetails = ({ walletAddress, aptosBalance }) => {
// //   return (
// //     <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg shadow-purple-500/10 transition-all hover:shadow-purple-500/20">
// //       <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
// //         <span className="text-purple-400"></span> Personal Details
// //       </h3>

// //       <div className="space-y-6 text-sm text-white/80">
// //         {/* Wallet Address */}
// //         <div>
// //           <label className="block text-white/60 mb-1">Wallet Address</label>
// //           <div className="p-3 bg-white/5 border border-white/10 rounded-lg font-mono break-all text-white text-sm">
// //             {walletAddress || 'Not connected'}
// //           </div>
// //         </div>

// //         {/* Balance Grid */}
// //         <div className="grid grid-cols-2 gap-4">
// //           <div>
// //             <label className="block text-white/60 mb-1">APT Balance</label>
// //             <div className="text-lg font-bold text-green-400">
// //               {aptosBalance ? `${aptosBalance.toFixed(4)} APT` : '--'}
// //             </div>
// //           </div>
// //           <div>
// //             <label className="block text-white/60 mb-1">USD Value</label>
// //             <div className="text-lg font-bold text-white">
// //               {aptosBalance ? `$${(aptosBalance * 8.5).toFixed(2)}` : '--'}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Account Status */}
// //         <div>
// //           <label className="block text-white/60 mb-1">Account Status</label>
// //           <div className="flex items-center gap-2">
// //             <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
// //             <span className="text-green-400 font-medium">
// //               {walletAddress ? 'Connected & Verified' : 'Not Connected'}
// //             </span>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PersonalDetails;




// // src/components/dashboard/PersonalDetails.jsx
// import React from 'react';

// const PersonalDetails = ({ walletData }) => {
//   // Extract data from walletData object for backward compatibility
//   const walletAddress = walletData?.address || walletData?.walletAddress || null;
//   const aptosBalance = walletData?.aptosBalance || walletData?.balance || null;
//   const walletType = walletData?.walletType || null;
//   const connectedAt = walletData?.connectedAt || null;

//   return (
//     <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg shadow-purple-500/10 transition-all hover:shadow-purple-500/20">
//       <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
//         <span className="text-purple-400">👤</span> Personal Details
//       </h3>

//       <div className="space-y-6 text-sm text-white/80">
//         {/* Wallet Address */}
//         <div>
//           <label className="block text-white/60 mb-1">Wallet Address</label>
//           <div className="p-3 bg-white/5 border border-white/10 rounded-lg font-mono break-all text-white text-sm">
//             {walletAddress || 'Not connected'}
//           </div>
//         </div>

//         {/* Wallet Type */}
//         {walletType && (
//           <div>
//             <label className="block text-white/60 mb-1">Wallet Provider</label>
//             <div className="text-lg font-medium text-cyan-400">
//               {walletType}
//             </div>
//           </div>
//         )}

//         {/* Balance Grid */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-white/60 mb-1">APT Balance</label>
//             <div className="text-lg font-bold text-green-400">
//               {aptosBalance ? `${aptosBalance.toFixed(4)} APT` : '--'}
//             </div>
//           </div>
//           <div>
//             <label className="block text-white/60 mb-1">USD Value</label>
//             <div className="text-lg font-bold text-white">
//               {aptosBalance ? `$${(aptosBalance * 8.5).toFixed(2)}` : '--'}
//             </div>
//           </div>
//         </div>

//         {/* Account Status */}
//         <div>
//           <label className="block text-white/60 mb-1">Account Status</label>
//           <div className="flex items-center gap-2">
//             <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
//             <span className="text-green-400 font-medium">
//               {walletAddress ? 'Connected & Verified' : 'Not Connected'}
//             </span>
//           </div>
//         </div>

//         {/* Connection Time */}
//         {walletAddress && (
//           <div>
//             <label className="block text-white/60 mb-1">Connected At</label>
//             <div className="text-white/80">
//               {connectedAt ? new Date(connectedAt).toLocaleString() : new Date().toLocaleString()}
//             </div>
//           </div>
//         )}

//         {/* Network Status */}
//         {walletAddress && (
//           <div>
//             <label className="block text-white/60 mb-1">Network</label>
//             <div className="flex items-center gap-2">
//               <span className="w-2 h-2 bg-green-400 rounded-full"></span>
//               <span className="text-green-400 font-medium">Aptos Mainnet</span>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PersonalDetails;




// import React from 'react';

// const PersonalDetails = ({ walletAddress, aptosBalance, walletType, connectedAt }) => {
//   return (
//     <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg shadow-purple-500/10 transition-all hover:shadow-purple-500/20">
//       <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
//         <span className="text-purple-400">👤</span> Personal Details
//       </h3>

//       <div className="space-y-6 text-sm text-white/80">

//         {/* Wallet Address */}
//         <div>
//           <label className="block text-white/60 mb-1">Wallet Address</label>
//           <div className="p-3 bg-white/5 border border-white/10 rounded-lg font-mono break-all text-white text-sm">
//             {walletAddress || 'Not connected'}
//           </div>
//         </div>

//         {/* Wallet Provider */}
//         {walletType && (
//           <div>
//             <label className="block text-white/60 mb-1">Wallet Provider</label>
//             <div className="text-lg font-medium text-cyan-400">
//               {walletType}
//             </div>
//           </div>
//         )}

//         {/* APT Balance & USD Value */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-white/60 mb-1">APT Balance</label>
//             <div className="text-lg font-bold text-green-400">
//               {aptosBalance ? `${aptosBalance.toFixed(4)} APT` : '--'}
//             </div>
//           </div>
//           <div>
//             <label className="block text-white/60 mb-1">USD Value</label>
//             <div className="text-lg font-bold text-white">
//               {aptosBalance ? `$${(aptosBalance * 8.5).toFixed(2)}` : '--'}
//             </div>
//           </div>
//         </div>

//         {/* Account Status */}
//         <div>
//           <label className="block text-white/60 mb-1">Account Status</label>
//           <div className="flex items-center gap-2">
//             <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
//             <span className="text-green-400 font-medium">
//               {walletAddress ? 'Connected & Verified' : 'Not Connected'}
//             </span>
//           </div>
//         </div>

//         {/* Connected At */}
//         {walletAddress && (
//           <div>
//             <label className="block text-white/60 mb-1">Connected At</label>
//             <div className="text-white/80">
//               {connectedAt
//                 ? new Date(connectedAt).toLocaleString()
//                 : new Date().toLocaleString()}
//             </div>
//           </div>
//         )}

//         {/* Network */}
//         {walletAddress && (
//           <div>
//             <label className="block text-white/60 mb-1">Network</label>
//             <div className="flex items-center gap-2">
//               <span className="w-2 h-2 bg-green-400 rounded-full"></span>
//               <span className="text-green-400 font-medium">Aptos Mainnet</span>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PersonalDetails;





// import React from 'react';

// const PersonalDetails = ({ walletAddress, aptosBalance, walletType, connectedAt }) => {
//   const handleCopy = () => {
//     if (walletAddress) {
//       navigator.clipboard.writeText(walletAddress);
//     }
//   };

//   const network = walletAddress?.startsWith('0x') ? 'Aptos Testnet' : 'Unknown';

//   return (
//     <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg shadow-purple-500/10 transition-all hover:shadow-purple-500/20">
//       <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
//         <span className="text-purple-400">👤</span> Personal Details
//       </h3>

//       <div className="space-y-6 text-sm text-white/80">
//         {/* Wallet Address */}
//         <div>
//           <label className="block text-white/60 mb-1">Wallet Address</label>
//           <div className="p-3 bg-white/5 border border-white/10 rounded-lg font-mono break-all text-white text-sm flex justify-between items-center">
//             <span>{walletAddress || 'Not connected'}</span>
//             {walletAddress && (
//               <button
//                 onClick={handleCopy}
//                 className="ml-2 text-xs text-cyan-400 hover:text-cyan-300"
//               >
//                 Copy
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Wallet Provider */}
//         {walletType && (
//           <div>
//             <label className="block text-white/60 mb-1">Wallet Provider</label>
//             <div className="text-lg font-medium text-cyan-400">
//               {walletType}
//             </div>
//           </div>
//         )}

//         {/* APT Balance & USD */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-white/60 mb-1">APT Balance</label>
//             <div className="text-lg font-bold text-green-400">
//               {aptosBalance ? `${aptosBalance.toFixed(4)} APT` : '--'}
//             </div>
//           </div>
//           <div>
//             <label className="block text-white/60 mb-1">USD Value</label>
//             <div className="text-lg font-bold text-white">
//               {aptosBalance ? `$${(aptosBalance * 8.5).toFixed(2)}` : '--'}
//             </div>
//           </div>
//         </div>

//         {/* Account Status */}
//         <div>
//           <label className="block text-white/60 mb-1">Account Status</label>
//           <div className="flex items-center gap-2">
//             <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
//             <span className="text-green-400 font-medium">
//               {walletAddress ? 'Connected & Verified' : 'Not Connected'}
//             </span>
//           </div>
//         </div>

//         {/* Connected At */}
//         {walletAddress && (
//           <div>
//             <label className="block text-white/60 mb-1">Connected At</label>
//             <div className="text-white/80">
//               {connectedAt
//                 ? new Date(connectedAt).toLocaleString()
//                 : new Date().toLocaleString()}
//             </div>
//           </div>
//         )}

//         {/* Network */}
//         {walletAddress && (
//           <div>
//             <label className="block text-white/60 mb-1">Network</label>
//             <div className="flex items-center gap-2">
//               <span className="w-2 h-2 bg-green-400 rounded-full"></span>
//               <span className="text-green-400 font-medium">{network}</span>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PersonalDetails;




// import React, { useEffect, useState } from 'react';
// import { useTrustScore } from './../hooks/useTrustScore';

// const PersonalDetails = ({ walletAddress, aptosBalance, walletType, connectedAt }) => {
//   const [usdRate, setUsdRate] = useState(8.5); // fallback
//   const [trustScore, setTrustScore] = useState(0);
//   const [trustTier, setTrustTier] = useState("🥉 Bronze");

//   const { fetchTrustScore } = useTrustScore();

//   useEffect(() => {
//     // Fetch live APT-USD price
//     const getAptPrice = async () => {
//       try {
//         const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=aptos&vs_currencies=usd");
//         const data = await res.json();
//         setUsdRate(data.aptos.usd || 8.5);
//       } catch (err) {
//         console.error("Failed to fetch APT price:", err);
//       }
//     };

//     // Fetch TrustScore from on-chain
//     const getTrustScore = async () => {
//       if (!walletAddress) return;
//       try {
//         const score = await fetchTrustScore(walletAddress);
//         setTrustScore(score);

//         if (score >= 86) setTrustTier("🥇 Elite");
//         else if (score >= 61) setTrustTier("🥈 Gold");
//         else if (score >= 31) setTrustTier("🥉 Silver");
//         else setTrustTier("🔸 Beginner");
//       } catch (err) {
//         console.error("Failed to fetch TrustScore:", err);
//       }
//     };

//     getAptPrice();
//     getTrustScore();
//   }, [walletAddress]);

//   const handleCopy = () => {
//     if (walletAddress) navigator.clipboard.writeText(walletAddress);
//   };

//   const network = walletAddress?.startsWith('0x') ? 'Aptos Testnet' : 'Unknown';

//   return (
//     <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg shadow-purple-500/10 transition-all hover:shadow-purple-500/20">
//       <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
//         <span className="text-purple-400">👤</span> Personal Details
//       </h3>

//       <div className="space-y-6 text-sm text-white/80">
//         {/* Wallet Address */}
//         <div>
//           <label className="block text-white/60 mb-1">Wallet Address</label>
//           <div className="p-3 bg-white/5 border border-white/10 rounded-lg font-mono break-all text-white text-sm flex justify-between items-center">
//             <span>{walletAddress || 'Not connected'}</span>
//             {walletAddress && (
//               <button
//                 onClick={handleCopy}
//                 className="ml-2 text-xs text-cyan-400 hover:text-cyan-300"
//               >
//                 Copy
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Wallet Provider */}
//         {walletType && (
//           <div>
//             <label className="block text-white/60 mb-1">Wallet Provider</label>
//             <div className="text-lg font-medium text-cyan-400">
//               {walletType}
//             </div>
//           </div>
//         )}

//         {/* APT Balance & USD */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-white/60 mb-1">APT Balance</label>
//             <div className="text-lg font-bold text-green-400">
//               {aptosBalance ? `${aptosBalance.toFixed(4)} APT` : '--'}
//             </div>
//           </div>
//           <div>
//             <label className="block text-white/60 mb-1">USD Value</label>
//             <div className="text-lg font-bold text-white">
//               {aptosBalance ? `$${(aptosBalance * usdRate).toFixed(2)}` : '--'}
//             </div>
//           </div>
//         </div>

//         {/* TrustScore + Tier */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-white/60 mb-1">TrustScore</label>
//             <div className="text-lg font-bold text-purple-300">{trustScore}</div>
//           </div>
//           <div>
//             <label className="block text-white/60 mb-1">Tier</label>
//             <div className="text-lg font-bold text-yellow-300">{trustTier}</div>
//           </div>
//         </div>

//         {/* Account Status */}
//         <div>
//           <label className="block text-white/60 mb-1">Account Status</label>
//           <div className="flex items-center gap-2">
//             <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
//             <span className="text-green-400 font-medium">
//               {walletAddress ? 'Connected & Verified' : 'Not Connected'}
//             </span>
//           </div>
//         </div>

//         {/* Connected At */}
//         {walletAddress && (
//           <div>
//             <label className="block text-white/60 mb-1">Connected At</label>
//             <div className="text-white/80">
//               {connectedAt
//                 ? new Date(connectedAt).toLocaleString()
//                 : new Date().toLocaleString()}
//             </div>
//           </div>
//         )}

//         {/* Network */}
//         {walletAddress && (
//           <div>
//             <label className="block text-white/60 mb-1">Network</label>
//             <div className="flex items-center gap-2">
//               <span className="w-2 h-2 bg-green-400 rounded-full"></span>
//               <span className="text-green-400 font-medium">{network}</span>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PersonalDetails;




// import React, { useEffect, useState } from 'react';
// import { useTrustScore } from './../hooks/useTrustScore';
// import {
//   LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
// } from 'recharts';

// const PersonalDetails = ({ walletAddress, aptosBalance, walletType, connectedAt }) => {
//   const [usdRate, setUsdRate] = useState(8.5);
//   const [trustScore, setTrustScore] = useState(0);
//   const [trustTier, setTrustTier] = useState("🥉 Bronze");
//   const [scoreHistory, setScoreHistory] = useState([]);

//   const { fetchTrustScore } = useTrustScore();

//   const fetchPrice = async () => {
//     try {
//       const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=aptos&vs_currencies=usd");
//       const data = await res.json();
//       setUsdRate(data.aptos.usd || 8.5);
//     } catch (err) {
//       console.error("Failed to fetch APT price:", err);
//     }
//   };

//   const fetchScore = async () => {
//     if (!walletAddress) return;
//     try {
//       const score = await fetchTrustScore(walletAddress);
//       setTrustScore(score);
//       setScoreHistory((prev) => [...prev.slice(-9), { time: new Date().toLocaleTimeString(), score }]);

//       if (score >= 86) setTrustTier("🥇 Elite");
//       else if (score >= 61) setTrustTier("🥈 Gold");
//       else if (score >= 31) setTrustTier("🥉 Silver");
//       else setTrustTier("🔸 Beginner");
//     } catch (err) {
//       console.error("Failed to fetch TrustScore:", err);
//     }
//   };

//   useEffect(() => {
//     fetchPrice();
//     fetchScore();
//     // Poll every 30s (optional)
//     const interval = setInterval(fetchScore, 30000);
//     return () => clearInterval(interval);
//   }, [walletAddress]);

//   const handleCopy = () => {
//     if (walletAddress) navigator.clipboard.writeText(walletAddress);
//   };

//   const network = walletAddress?.startsWith('0x') ? 'Aptos Testnet' : 'Unknown';

//   return (
//     <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg shadow-purple-500/10 transition-all hover:shadow-purple-500/20">
//       <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
//         <span className="text-purple-400">👤</span> Personal Details
//       </h3>

//       <div className="space-y-6 text-sm text-white/80">
//         {/* Wallet Address */}
//         <div>
//           <label className="block text-white/60 mb-1">Wallet Address</label>
//           <div className="p-3 bg-white/5 border border-white/10 rounded-lg font-mono break-all text-white text-sm flex justify-between items-center">
//             <span>{walletAddress || 'Not connected'}</span>
//             {walletAddress && (
//               <button onClick={handleCopy} className="ml-2 text-xs text-cyan-400 hover:text-cyan-300">
//                 Copy
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Wallet Provider */}
//         {walletType && (
//           <div>
//             <label className="block text-white/60 mb-1">Wallet Provider</label>
//             <div className="text-lg font-medium text-cyan-400">{walletType}</div>
//           </div>
//         )}

//         {/* APT Balance & USD */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-white/60 mb-1">APT Balance</label>
//             <div className="text-lg font-bold text-green-400">
//               {aptosBalance ? `${aptosBalance.toFixed(4)} APT` : '--'}
//             </div>
//           </div>
//           <div>
//             <label className="block text-white/60 mb-1 flex items-center justify-between">
//               USD Value
//               <button
//                 onClick={fetchPrice}
//                 className="text-xs px-2 py-0.5 bg-cyan-600 hover:bg-cyan-700 rounded text-white"
//               >
//                 🔄 Refresh
//               </button>
//             </label>
//             <div className="text-lg font-bold text-white">
//               {aptosBalance ? `$${(aptosBalance * usdRate).toFixed(2)}` : '--'}
//             </div>
//           </div>
//         </div>

//         {/* TrustScore + Tier */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-white/60 mb-1">TrustScore</label>
//             <div className="text-lg font-bold text-purple-300">{trustScore}</div>
//           </div>
//           <div>
//             <label className="block text-white/60 mb-1">Tier</label>
//             <div className="text-lg font-bold text-yellow-300">{trustTier}</div>
//           </div>
//         </div>

//         {/* 📉 Chart */}
//         <div>
//           <label className="block text-white/60 mb-1">TrustScore History</label>
//           <div className="h-48 bg-white/5 p-2 rounded-md border border-white/10">
//             {scoreHistory.length > 1 ? (
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={scoreHistory}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#333" />
//                   <XAxis dataKey="time" stroke="#ccc" />
//                   <YAxis stroke="#ccc" />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} dot={{ r: 3 }} />
//                 </LineChart>
//               </ResponsiveContainer>
//             ) : (
//               <p className="text-xs text-white/50 text-center mt-6">No data yet</p>
//             )}
//           </div>
//         </div>

//         {/* Status */}
//         <div>
//           <label className="block text-white/60 mb-1">Account Status</label>
//           <div className="flex items-center gap-2">
//             <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
//             <span className="text-green-400 font-medium">
//               {walletAddress ? 'Connected & Verified' : 'Not Connected'}
//             </span>
//           </div>
//         </div>

//         {/* Connected At */}
//         {walletAddress && (
//           <div>
//             <label className="block text-white/60 mb-1">Connected At</label>
//             <div className="text-white/80">
//               {connectedAt
//                 ? new Date(connectedAt).toLocaleString()
//                 : new Date().toLocaleString()}
//             </div>
//           </div>
//         )}

//         {/* Network */}
//         {walletAddress && (
//           <div>
//             <label className="block text-white/60 mb-1">Network</label>
//             <div className="flex items-center gap-2">
//               <span className="w-2 h-2 bg-green-400 rounded-full"></span>
//               <span className="text-green-400 font-medium">Aptos Testnet</span>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PersonalDetails;




// import React, { useEffect, useState } from 'react';
// import { useWallet } from '@aptos-labs/wallet-adapter-react';
// import { useTrustScore } from './../hooks/useTrustScore';
// import {
//   LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
// } from 'recharts';

// const PersonalDetails = ({ aptosBalance, walletType, connectedAt }) => {
//   const { account } = useWallet();
//   const walletAddress = account?.address;

//   const [usdRate, setUsdRate] = useState(8.5);
//   const [trustScore, setTrustScore] = useState(0);
//   const [trustTier, setTrustTier] = useState("🔸 Beginner");
//   const [scoreHistory, setScoreHistory] = useState([]);

//   const { fetchTrustScore } = useTrustScore();

//   const fetchPrice = async () => {
//     try {
//       const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=aptos&vs_currencies=usd");
//       const data = await res.json();
//       setUsdRate(data.aptos.usd || 8.5);
//     } catch (err) {
//       console.error("Failed to fetch APT price:", err);
//     }
//   };

//   const fetchScore = async () => {
//     if (!walletAddress) return;
//     try {
//       const score = await fetchTrustScore(walletAddress);
//       setTrustScore(score);
//       setScoreHistory((prev) => [...prev.slice(-9), { time: new Date().toLocaleTimeString(), score }]);

//       if (score >= 86) setTrustTier("🥇 Elite");
//       else if (score >= 61) setTrustTier("🥈 Gold");
//       else if (score >= 31) setTrustTier("🥉 Silver");
//       else setTrustTier("🔸 Beginner");
//     } catch (err) {
//       console.error("Failed to fetch TrustScore:", err);
//     }
//   };

//   useEffect(() => {
//     fetchPrice();
//     fetchScore();
//     const interval = setInterval(fetchScore, 30000); // Poll every 30s
//     return () => clearInterval(interval);
//   }, [walletAddress]);

//   const handleCopy = () => {
//     if (walletAddress) navigator.clipboard.writeText(walletAddress);
//   };

//   const network = walletAddress?.startsWith('0x') ? 'Aptos Testnet' : 'Unknown';

//   return (
//     <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg shadow-purple-500/10 transition-all hover:shadow-purple-500/20">
//       <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
//         <span className="text-purple-400">👤</span> Personal Details
//       </h3>

//       <div className="space-y-6 text-sm text-white/80">
//         {/* Wallet Address */}
//         <div>
//           <label className="block text-white/60 mb-1">Wallet Address</label>
//           <div className="p-3 bg-white/5 border border-white/10 rounded-lg font-mono break-all text-white text-sm flex justify-between items-center">
//             <span>{walletAddress || 'Not connected'}</span>
//             {walletAddress && (
//               <button onClick={handleCopy} className="ml-2 text-xs text-cyan-400 hover:text-cyan-300">
//                 Copy
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Wallet Provider */}
//         {walletType && (
//           <div>
//             <label className="block text-white/60 mb-1">Wallet Provider</label>
//             <div className="text-lg font-medium text-cyan-400">{walletType}</div>
//           </div>
//         )}

//         {/* APT Balance & USD */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-white/60 mb-1">APT Balance</label>
//             <div className="text-lg font-bold text-green-400">
//               {aptosBalance ? `${aptosBalance.toFixed(4)} APT` : '--'}
//             </div>
//           </div>
//           <div>
//             <label className="block text-white/60 mb-1 flex items-center justify-between">
//               USD Value
//               <button
//                 onClick={fetchPrice}
//                 className="text-xs px-2 py-0.5 bg-cyan-600 hover:bg-cyan-700 rounded text-white"
//               >
//                 🔄 Refresh
//               </button>
//             </label>
//             <div className="text-lg font-bold text-white">
//               {aptosBalance ? `$${(aptosBalance * usdRate).toFixed(2)}` : '--'}
//             </div>
//           </div>
//         </div>

//         {/* TrustScore + Tier */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-white/60 mb-1">TrustScore</label>
//             <div className="text-lg font-bold text-purple-300">{trustScore}</div>
//           </div>
//           <div>
//             <label className="block text-white/60 mb-1">Tier</label>
//             <div className="text-lg font-bold text-yellow-300">{trustTier}</div>
//           </div>
//         </div>

//         {/* 📉 TrustScore Chart */}
//         <div>
//           <label className="block text-white/60 mb-1">TrustScore History</label>
//           <div className="h-48 bg-white/5 p-2 rounded-md border border-white/10">
//             {scoreHistory.length > 1 ? (
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={scoreHistory}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#333" />
//                   <XAxis dataKey="time" stroke="#ccc" />
//                   <YAxis stroke="#ccc" />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} dot={{ r: 3 }} />
//                 </LineChart>
//               </ResponsiveContainer>
//             ) : (
//               <p className="text-xs text-white/50 text-center mt-6">No data yet</p>
//             )}
//           </div>
//         </div>

//         {/* Account Status */}
//         <div>
//           <label className="block text-white/60 mb-1">Account Status</label>
//           <div className="flex items-center gap-2">
//             <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
//             <span className="text-green-400 font-medium">
//               {walletAddress ? 'Connected & Verified' : 'Not Connected'}
//             </span>
//           </div>
//         </div>

//         {/* Connected At */}
//         {walletAddress && (
//           <div>
//             <label className="block text-white/60 mb-1">Connected At</label>
//             <div className="text-white/80">
//               {connectedAt
//                 ? new Date(connectedAt).toLocaleString()
//                 : new Date().toLocaleString()}
//             </div>
//           </div>
//         )}

//         {/* Network */}
//         {walletAddress && (
//           <div>
//             <label className="block text-white/60 mb-1">Network</label>
//             <div className="flex items-center gap-2">
//               <span className="w-2 h-2 bg-green-400 rounded-full"></span>
//               <span className="text-green-400 font-medium">{network}</span>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PersonalDetails;



import React, { useEffect, useState } from 'react';

const PersonalDetails = ({ address, aptosBalance, walletType, connectedAt, isLoadingBalance, balanceError }) => {
  const [usdRate, setUsdRate] = useState(8.5);
  const [trustScore, setTrustScore] = useState(75); // Mock score since useTrustScore hook doesn't exist
  const [trustTier, setTrustTier] = useState("🥈 Gold");

  const fetchPrice = async () => {
    try {
      const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=aptos&vs_currencies=usd");
      const data = await res.json();
      setUsdRate(data.aptos.usd || 8.5);
    } catch (err) {
      console.error("Failed to fetch APT price:", err);
    }
  };

  useEffect(() => {
    fetchPrice();
    // Set trust tier based on mock score
    if (trustScore >= 86) setTrustTier("🥇 Elite");
    else if (trustScore >= 61) setTrustTier("🥈 Gold");
    else if (trustScore >= 31) setTrustTier("🥉 Silver");
    else setTrustTier("🔸 Beginner");
  }, [address, trustScore]);

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      console.log('Wallet address copied to clipboard');
    }
  };

  const network = address?.startsWith('0x') ? 'Aptos Testnet' : 'Unknown';

  return (
    <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg shadow-purple-500/10 transition-all hover:shadow-purple-500/20">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="text-purple-400">👤</span> Personal Details
      </h3>

      <div className="space-y-6 text-sm text-white/80">
        {/* Wallet Address */}
        <div>
          <label className="block text-white/60 mb-1">Wallet Address</label>
          <div className="p-3 bg-white/5 border border-white/10 rounded-lg font-mono break-all text-white text-sm flex justify-between items-center">
            <span>{address || 'Not connected'}</span>
            {address && (
              <button 
                onClick={handleCopy} 
                className="ml-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Copy
              </button>
            )}
          </div>
        </div>

        {/* Wallet Provider */}
        {walletType && (
          <div>
            <label className="block text-white/60 mb-1">Wallet Provider</label>
            <div className="text-lg font-medium text-cyan-400">{walletType}</div>
          </div>
        )}

        {/* APT Balance & USD */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white/60 mb-1">APT Balance</label>
            <div className="text-lg font-bold text-green-400">
              {isLoadingBalance ? (
                <span className="animate-pulse">Loading...</span>
              ) : balanceError ? (
                <span className="text-red-400">Error</span>
              ) : aptosBalance ? (
                `${aptosBalance.toFixed(4)} APT`
              ) : (
                '--'
              )}
            </div>
          </div>
          <div>
            <label className="block text-white/60 mb-1 flex items-center justify-between">
              USD Value
              <button
                onClick={fetchPrice}
                className="text-xs px-2 py-0.5 bg-cyan-600 hover:bg-cyan-700 rounded text-white transition-colors"
              >
                🔄 Refresh
              </button>
            </label>
            <div className="text-lg font-bold text-white">
              {isLoadingBalance ? (
                <span className="animate-pulse">Loading...</span>
              ) : aptosBalance ? (
                `$${(aptosBalance * usdRate).toFixed(2)}`
              ) : (
                '--'
              )}
            </div>
          </div>
        </div>

        {/* TrustScore + Tier */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white/60 mb-1">TrustScore</label>
            <div className="text-lg font-bold text-purple-300">{trustScore}</div>
          </div>
          <div>
            <label className="block text-white/60 mb-1">Tier</label>
            <div className="text-lg font-bold text-yellow-300">{trustTier}</div>
          </div>
        </div>

        {/* Account Status */}
        <div>
          <label className="block text-white/60 mb-1">Account Status</label>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-green-400 font-medium">
              {address ? 'Connected & Verified' : 'Not Connected'}
            </span>
          </div>
        </div>

        {/* Connected At */}
        {address && (
          <div>
            <label className="block text-white/60 mb-1">Connected At</label>
            <div className="text-white/80">
              {connectedAt
                ? new Date(connectedAt).toLocaleString()
                : new Date().toLocaleString()}
            </div>
          </div>
        )}

        {/* Network */}
        {address && (
          <div>
            <label className="block text-white/60 mb-1">Network</label>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span className="text-green-400 font-medium">{network}</span>
            </div>
          </div>
        )}

        {/* Balance Error Display */}
        {balanceError && (
          <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
            <label className="block text-red-400 mb-1">Balance Error</label>
            <div className="text-red-300 text-xs">{balanceError}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalDetails;