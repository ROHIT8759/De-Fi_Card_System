// src/utils/initPlatform.js

import { AptosClient } from "aptos";

const NODE_URL = "https://fullnode.testnet.aptoslabs.com";
const CONTRACT_ADDRESS = "0xcc5e97e0015543dfac2d3e686fed214a7450e5c1efe15786dfde118987c3fbec";

const client = new AptosClient(NODE_URL);

/**
 * Check if PlatformState exists (i.e., initialized by admin)
 */
async function isPlatformInitialized(address = CONTRACT_ADDRESS) {
    try {
        const res = await client.getAccountResource(
            address,
            `${CONTRACT_ADDRESS}::elegent_defi_v2::PlatformState`
        );
        return !!res;
    } catch (err) {
        // If resource not found, platform is not initialized
        if (err.message.includes("Resource not found") || err.message.includes("404")) {
            return false;
        }
        // For other errors, log and return false
        console.error("Error checking platform initialization:", err);
        return false;
    }
}

/**
 * Check if TrustScoreNFT exists for user
 */
async function isTrustScoreInitialized(address) {
    try {
        const res = await client.getAccountResource(
            address,
            `${CONTRACT_ADDRESS}::elegent_defi_v2::TrustScoreNFT`
        );
        return !!res;
    } catch (err) {
        // If resource not found, trust score doesn't exist
        if (err.message.includes("Resource not found") || err.message.includes("404")) {
            return false;
        }
        // For other errors, log and return false
        console.error("Error checking trust score:", err);
        return false;
    }
}

/**
 * Call `initialize` on-chain if not already initialized (admin only)
 */
export async function initializePlatformIfNeeded() {
    if (!window.aptos) throw new Error("Wallet not connected");

    try {
        // Check if platform is already initialized (check at contract address, not user address)
        const alreadyInitialized = await isPlatformInitialized(CONTRACT_ADDRESS);

        if (alreadyInitialized) {
            console.log("✅ Platform already initialized.");
            return { success: true, message: "Platform already initialized", txHash: null };
        }

        console.log("🚀 Initializing platform...");
        const payload = {
            type: "entry_function_payload",
            function: `${CONTRACT_ADDRESS}::elegent_defi_v2::initialize`,
            type_arguments: [],
            arguments: [],
        };

        const tx = await window.aptos.signAndSubmitTransaction(payload);
        await client.waitForTransaction(tx.hash);

        console.log("✅ Platform initialized with tx:", tx.hash);
        return { success: true, message: "Platform initialized successfully", txHash: tx.hash };

    } catch (err) {
        console.error("Platform initialization error:", err);

        // Handle specific Move abort codes
        if (err.message.includes("0x80002") || err.message.includes("E_ALREADY_INITIALIZED")) {
            console.log("✅ Platform was already initialized (Move abort 0x80002)");
            return { success: true, message: "Platform already initialized", txHash: null };
        }

        throw new Error(`Platform initialization failed: ${err.message}`);
    }
}

/**
 * Call `create_trust_score` on-chain if not already exists (for user)
 */
export async function createTrustScoreIfNeeded() {
    if (!window.aptos) throw new Error("Wallet not connected");

    try {
        const account = await window.aptos.account();
        const alreadyExists = await isTrustScoreInitialized(account.address);

        if (alreadyExists) {
            console.log("✅ Trust Score NFT already created.");
            return { success: true, message: "Trust Score already exists", txHash: null };
        }

        console.log("🧠 Creating Trust Score NFT...");
        const payload = {
            type: "entry_function_payload",
            function: `${CONTRACT_ADDRESS}::elegent_defi_v2::create_trust_score`,
            type_arguments: [],
            arguments: [],
        };

        const tx = await window.aptos.signAndSubmitTransaction(payload);
        await client.waitForTransaction(tx.hash);

        console.log("✅ Trust Score NFT created with tx:", tx.hash);
        return { success: true, message: "Trust Score created successfully", txHash: tx.hash };

    } catch (err) {
        console.error("Trust score creation error:", err);

        // Handle specific errors
        if (err.message.includes("RESOURCE_ALREADY_EXISTS")) {
            console.log("✅ Trust Score already exists for this account");
            return { success: true, message: "Trust Score already exists", txHash: null };
        }

        throw new Error(`Trust score creation failed: ${err.message}`);
    }
}

/**
 * Get current platform and user status
 */
export async function getPlatformStatus() {
    try {
        const platformInitialized = await isPlatformInitialized(CONTRACT_ADDRESS);

        let userTrustScore = false;
        let userAddress = null;

        if (window.aptos) {
            try {
                const account = await window.aptos.account();
                userAddress = account.address;
                userTrustScore = await isTrustScoreInitialized(account.address);
            } catch (err) {
                console.log("User not connected:", err.message);
            }
        }

        return {
            platformInitialized,
            userTrustScore,
            userAddress,
            contractAddress: CONTRACT_ADDRESS,
            nodeUrl: NODE_URL
        };
    } catch (err) {
        console.error("Error getting platform status:", err);
        return {
            platformInitialized: false,
            userTrustScore: false,
            userAddress: null,
            contractAddress: CONTRACT_ADDRESS,
            nodeUrl: NODE_URL,
            error: err.message
        };
    }
}

/**
 * Initialize both platform and trust score if needed
 */
export async function initializeAllIfNeeded() {
    const results = {
        platform: null,
        trustScore: null,
        errors: []
    };

    try {
        // Try to initialize platform first
        results.platform = await initializePlatformIfNeeded();
    } catch (err) {
        results.errors.push(`Platform: ${err.message}`);
    }

    try {
        // Then try to create trust score
        results.trustScore = await createTrustScoreIfNeeded();
    } catch (err) {
        results.errors.push(`Trust Score: ${err.message}`);
    }

    return results;
}
