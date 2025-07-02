import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';

export default function LandingNavbar({ onWalletConnect }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-4 left-20 right-20 z-50">
      <div className="backdrop-blur-lg bg-black/30 border-[1px] border-[#1820c4] shadow-[0_0_8px_rgba(0,255,255,0.4)] rounded-xl">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between text-white font-medium">
          {/* Logo */}
          <button 
            onClick={() => window.location.reload()}
            className="text-xl sm:text-2xl font-bold tracking-wide text-accent font-lynq cursor-pointer hover:scale-105 transition-transform"
          >
            LYNQ
          </button>

          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-6 lg:gap-8 items-center">
            <li className="relative group">
              <ScrollLink
                to="faq"
                smooth={true}
                duration={500}
                className="cursor-pointer text-sm lg:text-base"
              >
                FAQ
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-fuchsia-500 group-hover:w-full transition-all duration-300"></span>
              </ScrollLink>
            </li>
            <li>
              <button 
                onClick={onWalletConnect}
                className="px-4 lg:px-6 py-2 text-sm lg:text-base rounded-full bg-gradient-to-r from-cyan-500/80 to-purple-500/80 hover:from-cyan-400 hover:to-purple-400 text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105 border border-cyan-400/30 backdrop-blur-sm"
              >
                Connect Wallet
              </button>
            </li>
          </ul>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <span className="material-icons text-white text-3xl">
                {isOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden px-6 pb-6 pt-2 space-y-4 bg-black/80 backdrop-blur-lg text-white"
            >
              <li>
                <ScrollLink
                  to="faq"
                  smooth={true}
                  duration={500}
                  onClick={() => setIsOpen(false)}
                  className="block cursor-pointer hover:text-accent"
                >
                  FAQ
                </ScrollLink>
              </li>
              <li>
                <button 
                  onClick={onWalletConnect}
                  className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:shadow-glow transition-all"
                >
                  Connect Wallet
                </button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
