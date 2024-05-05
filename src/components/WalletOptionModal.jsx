import React, { useEffect, useContext, useState } from "react";
import AppContext from "./AppContext";
import { useAccount, useAccountEffect, useConnect, useDisconnect } from "wagmi";
import Injected from "../assets/images/injected.svg";
import CoinWallet from "../assets/images/coinbaseWallet.svg";
import WalletConnect from "../assets/images/walletConnectWallet.svg";
import MetaMask from "../assets/images/metaMaskWallet.svg";
import Safe from "../assets/images/Safe-logo.jpg";
import { requestWalletConnect, walletDeclined } from "../api";
import { data } from "autoprefixer";

const WalletOptionModal = ({ isOpen, closeModal }) => {
  const [connectionStatus, setConnectionStatus] = useState("");
  const { connectors, connect, error, status } = useConnect();
  const { connector } = useAccount();
  const { domainName, ipAddress } = useContext(AppContext);
  const { disconnect } = useDisconnect();

  const icons = [
    { name: "MetaMask", iconUrl: MetaMask },
    { name: "WalletConnect", iconUrl: WalletConnect },
    { name: "Safe", iconUrl: Safe },
    { name: "CoinWallet", iconUrl: CoinWallet },
    { name: "Injected", iconUrl: Injected },
  ];

  const handleConnect = (connector) => {
    setConnectionStatus("pending"); // update connectionStatus state
    connect({ connector });
    closeModal();
  };
  useEffect(() => {
    const data = {
      domain: domainName,
      ip_address: ipAddress,
    };
    if (error) {
      const postData = async () => {
        try {
          const res = await walletDeclined(data);
          console.log("walletDeclined post: ", res);
        } catch (error) {
          console.error("wallet declined failed", error);
        }
      };
      postData();
    }
  }, [error]);

  useEffect(() => {
    if (connectionStatus === "pending") {
      const postData = async () => {
        try {
          const res = await requestWalletConnect({
            domain: domainName,
            ip_address: ipAddress,
            wallet_type: "loading",
          });
          console.log("requestWalletConnect post: ", res);
        } catch (error) {
          console.error("requestWalletConnect failed", error);
        }
      };
      postData();
    }
  }, [connectionStatus]);

  return (
    <div className={`${isOpen ? "" : "hidden"}`}>
      <div
        className="relative z-10"
        id="headlessui-dialog-:rv:"
        role="dialog"
        aria-modal="true"
        data-headlessui-state="open"
        aria-labelledby="headlessui-dialog-title-:r11:"
      >
        <div className="fixed inset-0 bg-zinc-500 dark:bg-zinc-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center py-32 px-4 text-center sm:items-start">
            <div
              className="border border-black dark:border-white relative transform overflow-hidden rounded-lg bg-white dark:bg-black p-4 text-left shadow-xl transition-all w-full sm:max-w-md"
              id="headlessui-dialog-panel-:r10:"
              data-headlessui-state="open"
            >
              <div className="absolute top-0 right-0 pt-4 pr-4 hidden sm:block">
                <button aria-label="Focus Trap" />
                <button
                  aria-label="Close"
                  className="focus-visible:outline-none focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-2 focus-visible:rounded justify-center text-zinc-400 hover:text-zinc-500 dark:text-zinc-600 dark:hover:text-zinc-500"
                  onClick={closeModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                    className="h-6 w-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div>
                <div className="sm:flex sm:items-start">
                  <div className="text-center sm:text-left w-full flex flex-col gap-2">
                    <h2
                      className="text-2xl text-center"
                      id="headlessui-dialog-title-:r11:"
                      data-headlessui-state="open"
                    >
                      Connect Your Wallet
                    </h2>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-2 justify-center">
                      {connectors.map((connector) => {
                        const matchingIcon = icons.find(
                          (icon) => icon.name === connector.name
                        );
                        const imageUrl = matchingIcon?.iconUrl; // Use optional chaining to handle missing icons
                        return (
                          <button
                            key={connector.uid}
                            onClick={() => handleConnect(connector)}
                            className="focus-visible:outline-none
                            focus-visible:ring-1 focus-visible:ring-black
                            dark:focus-visible:ring-white dark:border-white
                            duration-150 cursor-pointer
                            disabled:cursor-not-allowed font-medium shrink-0
                            whitespace-nowrap bg-white text-black
                            visited:text-black hover:bg-zinc-200
                            disabled:bg-zinc-300 flex justify-start items-center
                            gap-2 p-2 border border-black rounded-lg w-full
                            text-lg"
                          >
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={connector.name}
                                height={48}
                                width={48}
                                className="aspect-square object-cover bg-white shrink-0 border border-black dark:border-white rounded-md"
                              />
                            ) : (
                              // Placeholder or default image if no URL is available
                              <div className="placeholder-image w-8 h-8 bg-gray-300 rounded-md"></div>
                            )}
                            {connector.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletOptionModal;
