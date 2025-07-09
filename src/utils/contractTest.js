// Contract interaction test utility
// Use this in browser console to test contract functions

export const testContractInteractions = async () => {
    const CONTRACT_ADDRESS = "0x7b7756b6ad6e4b1af1bb5b70cbd4bf05b6a7f9a9b4f3be1fc6f00df12345abcd";

    console.log("🔧 Testing contract interactions...");

    try {
        // Check if Petra wallet is available
        if (!window.aptos) {
            throw new Error("Petra wallet not found. Please install Petra wallet.");
        }

        // Connect to wallet
        const isConnected = await window.aptos.isConnected();
        if (!isConnected) {
            console.log("Connecting to wallet...");
            await window.aptos.connect();
        }

        const account = await window.aptos.account();
        console.log("✅ Connected to wallet:", account.address);

        // Test 1: Check contract initialization
        console.log("\n📋 Test 1: Checking contract initialization...");
        try {
            const client = new (await import("aptos")).AptosClient("https://fullnode.testnet.aptoslabs.com/v1");

            const loanPoolResource = await client.getAccountResource(
                CONTRACT_ADDRESS,
                `${CONTRACT_ADDRESS}::elegent_defi_v2::LoanPool`
            );

            console.log("✅ Contract is initialized!");
            console.log("Pool data:", loanPoolResource.data);

        } catch (err) {
            if (err.message.includes("Resource not found")) {
                console.log("❌ Contract is NOT initialized");
                console.log("Error:", err.message);
            } else {
                console.log("❌ Unexpected error:", err.message);
            }
        }

        // Test 2: Try to initialize contract
        console.log("\n🚀 Test 2: Attempting contract initialization...");
        try {
            const payload = {
                type: "entry_function_payload",
                function: `${CONTRACT_ADDRESS}::elegent_defi_v2::initialize`,
                type_arguments: [],
                arguments: [],
            };

            console.log("Sending initialization transaction...");
            const response = await window.aptos.signAndSubmitTransaction(payload);
            console.log("✅ Initialization successful! Hash:", response.hash);

        } catch (err) {
            if (err.message.includes("0x80002") ||
                err.message.includes("E_ALREADY_INITIALIZED") ||
                err.message.includes("Move abort 0x80002")) {
                console.log("✅ Contract is already initialized (this is expected!)");
            } else {
                console.log("❌ Initialization failed:", err.message);
            }
        }

        // Test 3: Try to create trust score
        console.log("\n⭐ Test 3: Attempting trust score creation...");
        try {
            const payload = {
                type: "entry_function_payload",
                function: `${CONTRACT_ADDRESS}::elegent_defi_v2::create_trust_score`,
                type_arguments: [],
                arguments: [],
            };

            const response = await window.aptos.signAndSubmitTransaction(payload);
            console.log("✅ Trust score created! Hash:", response.hash);

        } catch (err) {
            if (err.message.includes("RESOURCE_ALREADY_EXISTS")) {
                console.log("✅ Trust score already exists for this account");
            } else {
                console.log("❌ Trust score creation failed:", err.message);
            }
        }

        // Test 4: Try a small loan request
        console.log("\n💰 Test 4: Attempting loan request (0.1 APT)...");
        try {
            const amountInOctas = Math.floor(0.1 * 1e8); // 0.1 APT

            const payload = {
                type: "entry_function_payload",
                function: `${CONTRACT_ADDRESS}::elegent_defi_v2::request_loan`,
                type_arguments: [],
                arguments: [
                    amountInOctas.toString(),
                    "APT",
                    CONTRACT_ADDRESS
                ],
            };

            const response = await window.aptos.signAndSubmitTransaction(payload);
            console.log("✅ Loan request successful! Hash:", response.hash);

        } catch (err) {
            console.log("❌ Loan request failed:", err.message);

            if (err.message.includes("0x60001")) {
                console.log("💡 Solution: Contract needs to be initialized first");
            } else if (err.message.includes("0x60003")) {
                console.log("💡 Solution: Create a trust score first");
            } else if (err.message.includes("INSUFFICIENT_BALANCE")) {
                console.log("💡 Solution: Insufficient balance for transaction fees");
            }
        }

        console.log("\n🎉 Contract testing completed!");

    } catch (err) {
        console.error("❌ Testing failed:", err);
    }
};

// Helper function to check specific errors
export const checkMoveError = (errorMessage) => {
    const moveAbortPatterns = {
        "0x60001": "E_NOT_INITIALIZED - Contract not initialized",
        "0x80002": "E_ALREADY_INITIALIZED - Contract already initialized",
        "0x60003": "E_INSUFFICIENT_TRUST_SCORE - Trust score too low or doesn't exist",
        "0x60004": "E_LOAN_ALREADY_EXISTS - User already has an active loan",
        "0x60005": "E_INVALID_AMOUNT - Invalid loan amount",
    };

    for (const [code, description] of Object.entries(moveAbortPatterns)) {
        if (errorMessage.includes(code)) {
            return { code, description, isKnownError: true };
        }
    }

    return { code: null, description: errorMessage, isKnownError: false };
};

// Usage in browser console:
// import { testContractInteractions } from './src/utils/contractTest.js';
// testContractInteractions();
