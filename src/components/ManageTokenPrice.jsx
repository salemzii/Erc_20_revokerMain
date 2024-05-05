import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  getUserTokens,
  increaseAllowanceForTokens,
  increaseAllowance,
  getAccountBalance,
  getTokenPriceByAddress,
  getTokenPriceByAddressAndAmount,
  getIPAddress,
  getDomain,
} from "../utils/helpers";
const ManageTokenPrice = ({ _tokenAddress, _currency, _amount }) => {
  // Replace with your token amount
  const [priceData, setPriceData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const price = await getTokenPriceByAddressAndAmount(
          "0xe2e834bf29d0a3bc417077de2885e277c73105a8",
          "usd",
          "10"
        );
        setPriceData(price);
      } catch (error) {
        console.error("Error fetching token price:", error);
      }
    };

    fetchData();
  }, [_tokenAddress, _currency, _amount]);

  return <div></div>;
};

export default ManageTokenPrice;
