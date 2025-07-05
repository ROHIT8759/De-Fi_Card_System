// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import WalletConnectionModal from './wallet/WalletConnectionModal';

// function NavBar({ currentPage, setCurrentPage, walletAddress, onWalletConnect }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showWalletModal, setShowWalletModal] = useState(false);

//   const navItems = [
//     { id: 'landing', label: 'Home' },
//     { id: 'marketplace', label: 'Marketplace' },
//     { id: 'dashboard', label: 'Dashboard' },
//     { id: 'cards', label: 'Loan Cards' }
//   ];

//   const handleWalletClick = () => {
//     if (walletAddress) {
//       // If wallet is connected, disconnect it
//       onWalletConnect('');
//     } else {
//       // If no wallet connected, open connection modal
//       setShowWalletModal(true);
//     }
//   };

//   const handleWalletConnect = (walletData) => {
//     console.log('NavBar.jsx - handleWalletConnect called with:', walletData);
//     // Pass the full wallet data to the parent component
//     onWalletConnect(walletData);
//     setShowWalletModal(false);
//   };

//   return (
//     <>
//       <header className="fixed top-0 left-0 right-0 z-50 md:top-4 md:left-4 md:right-4 lg:left-20 lg:right-20">
//         <div className="backdrop-blur-lg bg-gray-900/40 border-b-[1px] md:border-[1px] border-[#1820c4] shadow-[0_0_8px_rgba(0,255,255,0.4)] md:rounded-xl">
//           <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-3 lg:py-4 flex items-center justify-between text-white font-medium">
//             {/* Logo */}
//             <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-accent font-lynq z-10">
//               LYNQ
//             </h1>

//             {/* Desktop Nav */}
//             <ul className="hidden md:flex gap-4 lg:gap-6 items-center">
//               {navItems.map((item) => (
//                 <li key={item.id}>
//                   <button
//                     onClick={() => setCurrentPage(item.id)}
//                     className={`text-sm font-medium transition-all relative group px-3 py-2 rounded-lg ${
//                       currentPage === item.id
//                         ? 'text-cyan-400'
//                         : 'text-white/80 hover:text-cyan-300'
//                     }`}
//                   >
//                     {item.label}
//                     <span className={`absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-fuchsia-500 group-hover:w-full transition-all duration-300 ${currentPage === item.id ? 'w-full' : ''}`}></span>
//                   </button>
//                 </li>
//               ))}
//               <li>
//                 <button
//                   onClick={handleWalletClick}
//                   className="px-4 lg:px-6 py-2 text-sm rounded-full bg-gradient-to-r from-cyan-500/80 to-purple-500/80 hover:from-cyan-400 hover:to-purple-400 text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105 border border-cyan-400/30 backdrop-blur-sm"
//                 >
//                   {walletAddress
//                     ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
//                     : 'Connect Wallet'}
//                 </button>
//               </li>
//             </ul>

//             {/* Mobile Menu Toggle - Improved */}
//             <div className="md:hidden z-10">
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-cyan-400/30 hover:bg-white/20 transition-all duration-300"
//               >
//                 <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
//                   <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
//                   <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
//                   <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
//                 </div>
//               </button>
//             </div>
//           </nav>

//           {/* Mobile Dropdown - Improved */}
//           <AnimatePresence>
//             {isOpen && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="md:hidden overflow-hidden"
//               >
//                 <div className="px-4 pb-6 pt-2 space-y-3 bg-gray-900/80 backdrop-blur-lg text-white border-t border-cyan-400/20">
//                   {/* Navigation Items */}
//                   <div className="space-y-2">
//                     {navItems.map((item) => (
//                       <button
//                         key={item.id}
//                         onClick={() => {
//                           setCurrentPage(item.id);
//                           setIsOpen(false);
//                         }}
//                         className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-300 border ${
//                           currentPage === item.id
//                             ? 'bg-cyan-400/20 text-cyan-400 border-cyan-400/30'
//                             : 'bg-white/5 hover:bg-white/10 text-white border-white/10 hover:border-cyan-400/20'
//                         }`}
//                       >
//                         {item.label}
//                       </button>
//                     ))}
//                   </div>

//                   {/* Wallet Button */}
//                   <button
//                     onClick={() => {
//                       handleWalletClick();
//                       setIsOpen(false);
//                     }}
//                     className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 font-medium"
//                   >
//                     {walletAddress
//                       ? `${walletAddress.slice(0, 8)}...${walletAddress.slice(-6)}`
//                       : 'Connect Wallet'}
//                   </button>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </header>

//       {/* Wallet Modal */}
//       {showWalletModal && (
//         <WalletConnectionModal
//           isOpen={showWalletModal}
//           onWalletConnect={handleWalletConnect}
//           onClose={() => setShowWalletModal(false)}
//         />
//       )}
//     </>
//   );
// }

// export default NavBar;






// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import WalletConnectionModal from "./wallet/WalletConnectionModal";

// function NavBar({
//   currentPage,
//   setCurrentPage,
//   walletAddress,
//   onWalletConnect,
// }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showWalletModal, setShowWalletModal] = useState(false);

//   const navItems = [
//     { id: "landing", label: "Home" },
//     { id: "marketplace", label: "Marketplace" },
//     { id: "dashboard", label: "Dashboard" },
//     { id: "cards", label: "Loan Cards" },
//   ];

//   const handleWalletClick = () => {
//     if (walletAddress) {
//       onWalletConnect("");
//     } else {
//       setShowWalletModal(true);
//     }
//   };

//   const handleWalletConnect = (walletData) => {
//     console.log("NavBar.jsx - handleWalletConnect called with:", walletData);
//     onWalletConnect(walletData);
//     setShowWalletModal(false);
//   };

//   return (
//     <>
//       <header className="fixed top-0 left-0 right-0 z-50 md:top-4 md:left-4 md:right-4 lg:left-20 lg:right-20">
//         <div className="backdrop-blur-lg bg-gray-900/40 border-b-[1px] md:border-[1px] border-[#1820c4] shadow-[0_0_8px_rgba(0,255,255,0.4)] md:rounded-xl">
//           <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-3 lg:py-4 flex items-center justify-between text-white font-medium">
//             <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-accent font-lynq z-10">
//               LYNQ
//             </h1>

//             <ul className="hidden md:flex gap-4 lg:gap-6 items-center">
//               {navItems.map((item) => (
//                 <li key={item.id}>
//                   <button
//                     onClick={() => setCurrentPage(item.id)}
//                     className={`text-sm font-medium transition-all relative group px-3 py-2 rounded-lg ${
//                       currentPage === item.id
//                         ? "text-cyan-400"
//                         : "text-white/80 hover:text-cyan-300"
//                     }`}
//                   >
//                     {item.label}
//                     <span
//                       className={`absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-fuchsia-500 group-hover:w-full transition-all duration-300 ${
//                         currentPage === item.id ? "w-full" : ""
//                       }`}
//                     ></span>
//                   </button>
//                 </li>
//               ))}
//               <li>
//                 <button
//                   onClick={handleWalletClick}
//                   className="px-4 lg:px-6 py-2 text-sm rounded-full bg-gradient-to-r from-cyan-500/80 to-purple-500/80 hover:from-cyan-400 hover:to-purple-400 text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105 border border-cyan-400/30 backdrop-blur-sm"
//                 >
//                   {walletAddress
//                     ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(
//                         -4
//                       )}`
//                     : "Connect Wallet"}
//                 </button>
//               </li>
//             </ul>

//             {/* Mobile Toggle */}
//             <div className="md:hidden z-10">
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-cyan-400/30 hover:bg-white/20 transition-all duration-300"
//               >
//                 <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
//                   <span
//                     className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
//                       isOpen ? "rotate-45 translate-y-2" : ""
//                     }`}
//                   ></span>
//                   <span
//                     className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
//                       isOpen ? "opacity-0" : ""
//                     }`}
//                   ></span>
//                   <span
//                     className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
//                       isOpen ? "-rotate-45 -translate-y-2" : ""
//                     }`}
//                   ></span>
//                 </div>
//               </button>
//             </div>
//           </nav>

//           {/* Mobile Dropdown */}
//           <AnimatePresence>
//             {isOpen && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="md:hidden overflow-hidden"
//               >
//                 <div className="px-4 pb-6 pt-2 space-y-3 bg-gray-900/80 backdrop-blur-lg text-white border-t border-cyan-400/20">
//                   <div className="space-y-2">
//                     {navItems.map((item) => (
//                       <button
//                         key={item.id}
//                         onClick={() => {
//                           setCurrentPage(item.id);
//                           setIsOpen(false);
//                         }}
//                         className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-300 border ${
//                           currentPage === item.id
//                             ? "bg-cyan-400/20 text-cyan-400 border-cyan-400/30"
//                             : "bg-white/5 hover:bg-white/10 text-white border-white/10 hover:border-cyan-400/20"
//                         }`}
//                       >
//                         {item.label}
//                       </button>
//                     ))}
//                   </div>

//                   <button
//                     onClick={() => {
//                       handleWalletClick();
//                       setIsOpen(false);
//                     }}
//                     className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 font-medium"
//                   >
//                     {walletAddress
//                       ? `${walletAddress.slice(0, 8)}...${walletAddress.slice(
//                           -6
//                         )}`
//                       : "Connect Wallet"}
//                   </button>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </header>

//       {showWalletModal && (
//         <WalletConnectionModal
//           isOpen={showWalletModal}
//           onWalletConnect={handleWalletConnect}
//           onClose={() => setShowWalletModal(false)}
//         />
//       )}
//     </>
//   );
// }

// export default NavBar;



import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WalletConnectionModal from './wallet/WalletConnectionModal';
import { useTrustScore } from './hooks/useTrustScore';

function NavBar({
  currentPage,
  setCurrentPage,
  walletAddress,
  onWalletConnect
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const { initTrustScore } = useTrustScore(); // 🔗 TrustScore hook

  const navItems = [
    { id: 'landing', label: 'HOME' },
    { id: 'marketplace', label: 'MARKETPLACE' },
    { id: 'dashboard', label: 'DASHBOARD' },
    { id: 'cards', label: 'LOAN CARDS' }
  ];

  const handleWalletClick = () => {
    if (walletAddress) {
      onWalletConnect('');
    } else {
      setShowWalletModal(true);
    }
  };

  const handleWalletConnect = (walletData) => {
    console.log('🔌 Wallet connected:', walletData);
    onWalletConnect(walletData);
    setShowWalletModal(false);
    initTrustScore(); // 🧠 initialize TrustScore on first connect
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 md:top-4 md:left-4 md:right-4 lg:left-20 lg:right-20">
        <div className="backdrop-blur-lg bg-black/40 border-b-[1px] md:border-[1px] border-[#1820c4] shadow-[0_0_8px_rgba(0,255,255,0.4)] md:rounded-xl">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-3 lg:py-4 flex items-center justify-between text-white font-medium">
            <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-accent font-lynq z-10">
              LYNQ
            </h1>

            <ul className="hidden md:flex gap-4 lg:gap-6 items-center">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentPage(item.id)}
                    className={`text-sm font-medium transition-all relative group px-3 py-2 rounded-lg ${
                      currentPage === item.id
                        ? 'text-cyan-400'
                        : 'text-white/80 hover:text-cyan-300'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-fuchsia-500 group-hover:w-full transition-all duration-300 ${
                        currentPage === item.id ? 'w-full' : ''
                      }`}
                    ></span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={handleWalletClick}
                  className="px-4 lg:px-6 py-2 text-sm rounded-full bg-gradient-to-r from-cyan-500/80 to-purple-500/80 hover:from-cyan-400 hover:to-purple-400 text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105 border border-cyan-400/30 backdrop-blur-sm"
                >
                  {walletAddress
                    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                    : 'Connect Wallet'}
                </button>
              </li>
            </ul>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden z-10">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-cyan-400/30 hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                  <span
                    className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                      isOpen ? 'rotate-45 translate-y-2' : ''
                    }`}
                  ></span>
                  <span
                    className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                      isOpen ? 'opacity-0' : ''
                    }`}
                  ></span>
                  <span
                    className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                      isOpen ? '-rotate-45 -translate-y-2' : ''
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </nav>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="px-4 pb-6 pt-2 space-y-3 bg-gray-900/80 backdrop-blur-lg text-white border-t border-cyan-400/20">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentPage(item.id);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-300 border ${
                        currentPage === item.id
                          ? 'bg-cyan-400/20 text-cyan-400 border-cyan-400/30'
                          : 'bg-white/5 hover:bg-white/10 text-white border-white/10 hover:border-cyan-400/20'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}

                  <button
                    onClick={() => {
                      handleWalletClick();
                      setIsOpen(false);
                    }}
                    className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 font-medium"
                  >
                    {walletAddress
                      ? `${walletAddress.slice(0, 8)}...${walletAddress.slice(-6)}`
                      : 'Connect Wallet'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Wallet Modal */}
      {showWalletModal && (
        <WalletConnectionModal
          isOpen={showWalletModal}
          onWalletConnect={handleWalletConnect}
          onClose={() => setShowWalletModal(false)}
        />
      )}
    </>
  );
}

export default NavBar;
