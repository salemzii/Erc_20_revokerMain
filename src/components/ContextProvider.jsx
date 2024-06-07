import React, { useState, useEffect } from "react";
import { useAccount, useBalance, useChainId } from "wagmi";
import AppContext from "./AppContext";
import {
  getUserTokens,
  getAccountBalance,
  getIPAddress,
  getDomain,
} from "../utils/helpers";
const ContextProvider = (props) => {
  const [domainName, setDomainName] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const { connector, isConnected, address } = useAccount();
  const [loadingData, setLoadingData] = useState(false);
  const [loadingEthBalance, setLoadingEthBalance] = useState(false);
  const [tokenData, setTokenData] = useState([]);
  const chainid = useChainId();
  const desiredChainId = 1;
  const [ethBalance, setEthBalance] = useState("0");

  const { isLoading, refetch } = useBalance({
    address: address,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch domain name and update state
        const domain = getDomain();
        setDomainName(domain);
        // Fetch IP address and update state
        const res = await getIPAddress();
        setIpAddress(res);
      } catch (error) {
        console.error("Error fetching IP and domain:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after initial render
  useEffect(() => {
    const fetchData = async () => {
      if (chainid === desiredChainId && address && isConnected) {
        setLoadingData(true);

        setLoadingEthBalance(true);
        try {
          // Fetch ETH balance
          const balanceResponse = await refetch();

          setEthBalance(balanceResponse.data.formatted);
        } catch (error) {
          console.error("Error fetching ETH balance:", error);
        } finally {
          setLoadingEthBalance(false);
        }

        try {
          // Fetch user tokens
          const tokensResponse = await getUserTokens(address);
          setTokenData(tokensResponse);
        } catch (error) {
          console.error("Error fetching user tokens:", error);
        } finally {
          setLoadingData(false);
        }
      }
    };

    fetchData();
  }, [isConnected, address, chainid]); // Re-run effect when isConnected or address changes

  const handleLoadingData = () => {
    setLoadingData(false);
  };
  const handleLoadingEthBalance = () => {
    setLoadingData(false);
  };

  const contextValue = {
    domainName,
    ipAddress,
    loadingData,
    ethBalance,
    tokenData,
    loadingEthBalance,
    handleLoadingData,
    handleLoadingEthBalance,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
