// utils/aptosHelpers.js
import { AptosClient, HexString, TxnBuilderTypes, BCS, Types } from "aptos";

const client = new AptosClient("https://fullnode.testnet.aptoslabs.com/v1");

export async function repayLoan(wallet, loanId) {
  const payload = {
    type: "entry_function_payload",
    function: `${CONTRACT_ADDRESS}::elegent_defi::repay_loan`,
    type_arguments: [],
    arguments: [loanId.toString(), CONTRACT_ADDRESS],
  };

  const txHash = await wallet.signAndSubmitTransaction(payload);
  await client.waitForTransaction(txHash.hash);
  return txHash.hash;
}

export async function requestLoan(wallet, amount, tokenType = "APT") {
  const payload = {
    type: "entry_function_payload",
    function: `${CONTRACT_ADDRESS}::elegent_defi::request_loan`,
    type_arguments: [],
    arguments: [amount.toString(), tokenType, CONTRACT_ADDRESS],
  };

  const txHash = await wallet.signAndSubmitTransaction(payload);
  await client.waitForTransaction(txHash.hash);
  return txHash.hash;
}

export async function stakeAPT(wallet, amount) {
  const payload = {
    type: "entry_function_payload",
    function: `${CONTRACT_ADDRESS}::elegent_defi::stake_apt`,
    type_arguments: [],
    arguments: [amount.toString(), CONTRACT_ADDRESS],
  };

  const txHash = await wallet.signAndSubmitTransaction(payload);
  await client.waitForTransaction(txHash.hash);
  return txHash.hash;
}

