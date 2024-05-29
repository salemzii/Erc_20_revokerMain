import React, { useState, useContext } from "react";
import AppContext from "../components/AppContext";
import Logo from "../assets/revoke.svg";
import { useAccount, useAccountEffect, useConnect, useDisconnect } from "wagmi";
import { useNavigate } from "react-router-dom";
import WalletOptionModal from "../components/WalletOptionModal";
import PathConstants from "../routes/pathConstants";

const Header = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();

  useAccountEffect({
    onConnect() {
      navigate(PathConstants.REVOKE);
    },
    onDisconnect() {
      console.log("Disconnected!");
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleDisconnect = () => {
    localStorage.clear(); // Clear local storage
    disconnect();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <WalletOptionModal isOpen={isOpen} closeModal={closeModal} />

      <header className="flex flex-col p-4 lg:px-8 gap-4 mb-4">
        <div className="flex justify-between items-center gap-8">
          <a className="flex-grow-0" href="/">
            <img
              src={Logo}
              alt="Revoke.cash logo"
              className="h-12 dark:invert"
            />
          </a>

          <div className="hidden lg:flex flex-grow justify-center gap-4">
            <button className="">Donate</button>
            <a className="link" href="/extension">
              Extension
            </a>
            <a className="link" href="/exploits">
              Exploits
            </a>
            <div className="relative">
              <button className="btn-more">More</button>
              {/* Dropdown menu for "More" */}
            </div>
          </div>

          <div className="hidden lg:flex flex-grow justify-end gap-2">
            {isConnected ? (
              <button className="btn" onClick={handleDisconnect}>
                {address.slice(0, 6)}...{address.slice(-4)}
              </button>
            ) : (
              <button className="btn" onClick={openModal}>
                Connect Wallet
              </button>
            )}
          </div>

          <button className="lg:hidden" onClick={toggleMobileMenu}>
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden flex flex-col items-center gap-6 p-12 bg-white dark:bg-black">
            <button className="btn" onClick={openModal}>
              Connect Wallet
            </button>
            <button className="btn">Donate</button>
            <a className="link" href="/extension">
              Extension
            </a>
            <a className="link" href="/exploits">
              Exploits
            </a>
            <a className="link" href="/learn">
              Learn
            </a>
            <a className="link" href="/learn/faq">
              FAQ
            </a>
            <a className="link" href="/blog">
              Blog
            </a>
            <a className="link" href="/about">
              About Us
            </a>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
