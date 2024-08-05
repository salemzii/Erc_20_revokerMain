import React, { useState } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";
import CustomWalletModal from "./CustomWalletModal";

const ConnectButton = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const [isOpen, setIsOpen] = useState(false);

  const { disconnect } = useDisconnect();

  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const isInWalletBrowser = /MetaMask/i.test(navigator.userAgent);

  const handleOpenWeb3Modal = async () => {
    open();
  };

  const handleMetaMaskDeeplink = () => {
    const metamaskURL = "https://metamask.app.link/dapp/erc-revoker.cloud";
    window.location.href = metamaskURL;
  };

  const handleConfirm = () => {
    handleMetaMaskDeeplink();
    setIsOpen(false);
  };

  const formatAddress = (addr) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <>
      <button
        className="text-white bg-[#0C70F2] px-3 py-2 hover:bg-neutral-700 rounded-md transition duration-200 ease-in-out"
        onClick={async () => {
          await handleOpenWeb3Modal();

          // Apply deep link only for mobile devices not in the wallet browser
          if (isMobile && !isInWalletBrowser) {
            // Show confirmation modal
            setIsOpen(true);
          }
        }}
      >
        {isConnected ? formatAddress(address) : "Connect Wallet"}
      </button>
      <CustomWalletModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default ConnectButton;
