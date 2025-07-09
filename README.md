# 🏦 Elegant DeFi - Decentralized Lending Platform

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/react-18.x-brightgreen.svg)
![Vite](https://img.shields.io/badge/vite-7.x-purple.svg)
![Aptos](https://img.shields.io/badge/blockchain-Aptos-red.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

A modern, secure, and user-friendly decentralized finance (DeFi) platform built on the Aptos blockchain, offering lending, borrowing, and staking services with real-time market data integration.

## 🌟 Features

### 💰 Core DeFi Features

- **Decentralized Lending & Borrowing**: Secure peer-to-peer lending with smart contracts
- **Trust Score System**: Dynamic creditworthiness assessment using on-chain data
- **APT Staking**: Earn rewards by staking APT tokens
- **Loan Management**: Request, repay, extend, and refinance loans
- **Liquidation Protection**: Automated liquidation system for risk management

### 🔗 Blockchain Integration

- **Aptos Network Support**: Built on the high-performance Aptos blockchain
- **Wallet Integration**: Support for multiple Aptos wallets (Petra, Martian, etc.)
- **Real-time Balance**: Live APT balance fetching
- **Network Switching**: Testnet/Mainnet toggle
- **Transaction Tracking**: Complete transaction history and status

### 📊 Market Features

- **Live Market Data**: Real-time cryptocurrency prices via CoinGecko API
- **Advanced Filtering**: Search, sort, and filter market data
- **Interactive Charts**: 7-day price charts with sparklines
- **Portfolio Tracking**: Monitor your holdings and performance

### 🎨 User Experience

- **Responsive Design**: Mobile-first, responsive UI built with Tailwind CSS
- **Dark Theme**: Modern dark theme with glassmorphism effects
- **Real-time Updates**: Live data updates without page refresh
- **Error Handling**: Comprehensive error handling and user feedback
- **Loading States**: Smooth loading animations and skeleton screens

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Git
- An Aptos wallet (Petra, Martian, etc.)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ROHIT8759/De-Fi_Card_System.git
   cd elegant-defi
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── card/            # Loan card components
│   │   ├── BigLoanCard.jsx
│   │   ├── SmallLoanCard.jsx
│   │   ├── LoanRequestForm.jsx
│   │   └── LoanEligibilityMeter.jsx
│   ├── dashboard/       # Dashboard components
│   │   ├── ProfileDashboard.jsx
│   │   ├── PersonalDetails.jsx
│   │   └── Transaction.jsx
│   ├── landing/         # Landing page components
│   │   ├── HeroSection.jsx
│   │   ├── Features.jsx
│   │   └── Footer.jsx
│   ├── marketplace/     # Market components
│   │   ├── CoinCard.jsx
│   │   ├── AssetTable.jsx
│   │   └── TradeInterface.jsx
│   └── wallet/          # Wallet integration
│       ├── WalletConnectionModal.jsx
│       └── walletConfig.js
├── assets/              # Static assets
├── utils/               # Utility functions
├── config/              # Configuration files
├── App.jsx             # Main application component
└── main.jsx            # Application entry point
```

## 🔧 Smart Contract Integration

### Contract Address

```
Testnet: 0xcc5e97e0015543dfac2d3e686fed214a7450e5c1efe15786dfde118987c3fbec
Module: elegent_defi_v2
```

### Available Functions

- `initialize()` - Initialize the platform
- `create_trust_score()` - Create user trust score NFT
- `request_loan(amount, token_type, platform_address)` - Request a new loan
- `repay_loan(loan_id, platform_address)` - Repay an existing loan
- `stake_apt(amount, platform_address)` - Stake APT tokens
- `unstake_apt(amount, platform_address)` - Unstake APT tokens
- `get_trust_score(user_address)` - View user trust score
- `get_user_loans(user_address, platform_address)` - Get user's loans
- `get_loan_details(loan_id, platform_address)` - Get specific loan details

## 🛠️ Technologies Used

### Frontend

- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Hooks** - useState, useEffect, useCallback, useMemo

### Blockchain

- **Aptos Blockchain** - Layer 1 blockchain for smart contracts
- **Move Language** - Smart contract programming language
- **Aptos SDK** - JavaScript SDK for Aptos integration
- **Wallet Adapter** - Multi-wallet support

### APIs & Services

- **CoinGecko API** - Real-time cryptocurrency market data
- **Aptos RPC** - Blockchain data and transaction submission
- **Local Storage** - Wallet connection persistence

## 🎯 Usage Guide

### 1. Connect Your Wallet

- Click "Connect Wallet" in the navigation
- Select your preferred Aptos wallet
- Approve the connection

### 2. Initialize Platform (First Time)

- Go to Dashboard
- Click "Initialize Platform" button
- Confirm the transaction in your wallet

### 3. Create Trust Score

- In Dashboard, click "Create Trust Score"
- This creates your creditworthiness NFT
- Required for borrowing

### 4. Request a Loan

- Navigate to "Loan Management"
- Fill out the loan request form
- Specify amount and purpose
- Submit and confirm transaction

### 5. Manage Loans

- View active loans in Dashboard
- Repay loans directly from loan cards
- Track payment history and due dates

### 6. Stake APT

- Go to Dashboard
- Click "Stake APT"
- Enter amount and confirm
- Earn staking rewards

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APTOS_NETWORK=testnet
VITE_CONTRACT_ADDRESS=0xcc5e97e0015543dfac2d3e686fed214a7450e5c1efe15786dfde118987c3fbec
VITE_MODULE_NAME=elegent_defi_v2
VITE_COINGECKO_API=https://api.coingecko.com/api/v3
```

### Network Configuration

- **Testnet**: `https://fullnode.testnet.aptoslabs.com/v1`
- **Mainnet**: `https://fullnode.mainnet.aptoslabs.com/v1`

## 🔐 Security Features

- **Smart Contract Audited**: Comprehensive security audit
- **Multi-signature Support**: Enhanced security for large transactions
- **Liquidation Protection**: Automated risk management
- **Secure Wallet Integration**: Non-custodial wallet connections
- **Real-time Monitoring**: Continuous security monitoring

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow React best practices
- Use functional components with hooks
- Maintain consistent code formatting
- Add tests for new features
- Update documentation

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/elegant-defi/issues) page
2. Create a new issue with detailed description
3. Join our [Discord](https://discord.gg/elegant-defi) community
4. Email us at support@elegant-defi.com

## 🗺️ Roadmap

### Q1 2025

- [ ] Multi-token support (USDC, USDT)
- [ ] Advanced loan terms
- [ ] Mobile app development

### Q2 2025

- [ ] Cross-chain integration
- [ ] Governance token launch
- [ ] DAO implementation

### Q3 2025

- [ ] Insurance products
- [ ] Yield farming
- [ ] NFT collateralization

## 🙏 Acknowledgments

- **Aptos Foundation** for the excellent blockchain infrastructure
- **CoinGecko** for reliable market data API
- **React Team** for the amazing frontend framework
- **Tailwind CSS** for the utility-first CSS framework
- **Vite Team** for the fast build tool

---

**Built with ❤️ by the Elegant DeFi Team**

_Empowering the future of decentralized finance on Aptos_
