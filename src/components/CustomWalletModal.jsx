// CustomWalletModal.jsx
import React from 'react';

const CustomWalletModal = ({ isOpen, onClose }) => {
  const handleMetaMaskDeeplink = () => {
    // Metamask deeplink URL
    const metamaskURL = "https://metamask.app.link/dapp/YOUR_DAPP_URL";
    window.location.href = metamaskURL;
  };

  if (!isOpen) return null;

  return (
    <div className="custom-modal">
      <div className="custom-modal-content">
        <h2>Connect to Wallet</h2>
        <button onClick={handleMetaMaskDeeplink}>Open in Metamask</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CustomWalletModal;
