import React from "react";

const dAppUrl = "https://trump-airdrop.vercel.app";

const WalletDeepLink = () => {
  const openWalletLink = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
      // Android-specific deep links
      window.location.href = `intent://open/${dAppUrl}#Intent;scheme=https;package=com.wallet;end`;
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      // iOS-specific deep links
      window.location.href = `metamask://dapp/${dAppUrl}`;
    } else {
      // Fallback for desktop browsers
      alert("Please open this link in a mobile wallet browser");
    }
  };

  return <button onClick={openWalletLink}>Open dApp in Wallet</button>;
};

export default WalletDeepLink;
