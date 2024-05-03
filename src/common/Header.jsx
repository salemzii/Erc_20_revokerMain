import React, { useState } from "react";
import Logo from "../assets/revoke.svg";
import Ethereum from "../assets/images/ethereum.svg";
import UseAccountFunctions from "../utils/helpers";
import { useAccount, useAccountEffect, useDisconnect } from "wagmi";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import WalletOptionModal from "../components/WalletOptionModal";
import PathConstants from "../routes/pathConstants";
const Header = () => {
  const { getUserTokens } = UseAccountFunctions;
  const { address, isConnected } = useAccount();
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

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <WalletOptionModal isOpen={isOpen} closeModal={closeModal} />

      <header className="flex flex-col relative p-4 lg:px-8 pb-8 gap-4 ">
        <div className="flex justify-between items-center gap-8">
          <div className="hidden lg:flex justify-start items-center gap-4 w-2/5 flex-wrap">
            <button className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-white flex items-center border border-black dark:border-white duration-150 cursor-pointer disabled:cursor-not-allowed font-medium shrink-0 whitespace-nowrap bg-black text-white visited:text-white hover:bg-zinc-800 disabled:bg-zinc-600 justify-center h-9 px-4 text-base rounded-lg">
              Donate
            </button>
            <a
              className="focus-visible:outline-none focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-2 focus-visible:rounded flex items-center border border-black dark:border-white duration-150 cursor-pointer disabled:cursor-not-allowed font-medium whitespace-nowrap text-black visited:text-black dark:text-white dark:visited:text-white disabled:text-zinc-600 dark:disabled:text-zinc-400 border-none justify-center text-lg shrink-0"
              href="/extension"
            >
              Extension
            </a>
            <a
              className="focus-visible:outline-none focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-2 focus-visible:rounded flex items-center border border-black dark:border-white duration-150 cursor-pointer disabled:cursor-not-allowed font-medium whitespace-nowrap text-black visited:text-black dark:text-white dark:visited:text-white disabled:text-zinc-600 dark:disabled:text-zinc-400 border-none justify-center text-lg shrink-0"
              href="/exploits"
            >
              Exploits
            </a>
            <div className="relative text-left" data-headlessui-state="">
              <button
                className="flex focus-visible:outline-none focus-visible:ring-black focus-visible:dark:ring-white focus-visible:ring-2 rounded"
                id="headlessui-menu-button-:Roamfja:"
                type="button"
                aria-haspopup="menu"
                aria-expanded="false"
                data-headlessui-state=""
                aria-controls="headlessui-menu-items-:R18amfja:"
              >
                <div className="focus-visible:outline-none focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-2 focus-visible:rounded justify-center flex items-center font-medium text-lg">
                  <div className="">More</div>
                  <svg
                    className="w-5 h-5 fill-black dark:fill-white"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
                  </svg>
                </div>
              </button>
              <div
                className="origin-top-left left-0 absolute rounded-lg shadow-lg bg-white border border-black dark:border-white flex flex-col shrink-0 z-10 mt-2 max-h-88 overflow-x-hidden overflow-y-scroll focus:outline-none"
                id="headlessui-menu-items-:R18amfja:"
                role="menu"
                tabIndex={0}
                hidden=""
                style={{ display: "none" }}
                data-headlessui-state=""
                aria-labelledby="headlessui-menu-button-:Roamfja:"
              >
                <a
                  id="headlessui-menu-item-:R78amfja:"
                  role="menuitem"
                  tabIndex={-1}
                  data-headlessui-state=""
                  className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-white flex items-center border border-black dark:border-white duration-150 cursor-pointer disabled:cursor-not-allowed shrink-0 whitespace-nowrap text-black visited:text-black disabled:bg-zinc-300 h-9 px-4 rounded-none border-none font-normal justify-start text-lg w-full bg-white dark:bg-black hover:bg-white hover:dark:bg-black"
                  href="/blog"
                >
                  Blog
                </a>
                <a
                  id="headlessui-menu-item-:Rb8amfja:"
                  role="menuitem"
                  tabIndex={-1}
                  data-headlessui-state=""
                  className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-white flex items-center border border-black dark:border-white duration-150 cursor-pointer disabled:cursor-not-allowed shrink-0 whitespace-nowrap text-black visited:text-black disabled:bg-zinc-300 h-9 px-4 rounded-none border-none font-normal justify-start text-lg w-full bg-white dark:bg-black hover:bg-white hover:dark:bg-black"
                  href="/learn"
                >
                  Learn
                </a>
                <a
                  id="headlessui-menu-item-:Rf8amfja:"
                  role="menuitem"
                  tabIndex={-1}
                  data-headlessui-state=""
                  className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-white flex items-center border border-black dark:border-white duration-150 cursor-pointer disabled:cursor-not-allowed shrink-0 whitespace-nowrap text-black visited:text-black disabled:bg-zinc-300 h-9 px-4 rounded-none border-none font-normal justify-start text-lg w-full bg-white dark:bg-black hover:bg-white hover:dark:bg-black"
                  href="/learn/faq"
                >
                  FAQ
                </a>
                <a
                  id="headlessui-menu-item-:Rj8amfja:"
                  role="menuitem"
                  tabIndex={-1}
                  data-headlessui-state=""
                  className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-white flex items-center border border-black dark:border-white duration-150 cursor-pointer disabled:cursor-not-allowed shrink-0 whitespace-nowrap text-black visited:text-black disabled:bg-zinc-300 h-9 px-4 rounded-none border-none font-normal justify-start text-lg w-full bg-white dark:bg-black hover:bg-white hover:dark:bg-black"
                  href="/about"
                >
                  About Us
                </a>
              </div>
            </div>
          </div>
          <div className="flex lg:justify-center grow shrink-0 h-12">
            <a
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:rounded text-current visited:text-current no-underline hover:no-underline flex"
              href="/"
            >
              <img
                alt="Revoke.cash logo"
                fetchpriority="high"
                width={240}
                height={48}
                decoding="async"
                data-nimg={1}
                className="filter dark:invert shrink-0"
                style={{ color: "transparent" }}
                src={Logo}
              />
            </a>
          </div>
          <div className="hidden lg:flex justify-end w-2/5 gap-2">
            <div className="flex gap-2">
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
                      className="aspect-square object-cover bg-white shrink-0 rounded-full border border-black dark:border-white"
                      src={Ethereum}
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
              <div className="flex whitespace-nowrap">
                <div className="relative text-left" data-headlessui-state="">
                  {isConnected ? (
                    <button
                      className="flex focus-visible:outline-none focus-visible:ring-black focus-visible:dark:ring-white focus-visible:ring-1 rounded-lg"
                      id="headlessui-menu-button-:r0:"
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded="false"
                      data-headlessui-state=""
                      aria-controls="headlessui-menu-items-:r1:"
                      onClick={() => disconnect()}
                    >
                      <div className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-white border border-black dark:border-white duration-150 cursor-pointer disabled:cursor-not-allowed shrink-0 whitespace-nowrap bg-white text-black visited:text-black hover:bg-zinc-200 disabled:bg-zinc-300 justify-center h-9 px-4 text-base rounded-lg flex items-center pl-3 pr-2 font-normal">
                        {address.slice(0, 6)}...{address.slice(-4)}
                        <svg
                          className="w-5 h-5 fill-black dark:fill-white"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
                        </svg>
                      </div>
                    </button>
                  ) : (
                    <div className="hidden relative lg:flex justify-end w-2/5 gap-2">
                      <div className="flex gap-2">
                        <div className="flex whitespace-nowrap">
                          <button
                            onClick={openModal}
                            className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-white flex items-center border border-black dark:border-white duration-150 cursor-pointer disabled:cursor-not-allowed font-medium shrink-0 whitespace-nowrap bg-black text-white visited:text-white hover:bg-zinc-800 disabled:bg-zinc-600 justify-center h-9 px-4 text-base rounded-lg"
                          >
                            Connect Wallet
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  <div
                    className="origin-top-right right-0 absolute rounded-lg shadow-lg bg-white border border-black dark:border-white flex flex-col shrink-0 z-10 mt-2 max-h-88 overflow-x-hidden overflow-y-scroll focus:outline-none"
                    id="headlessui-menu-items-:r1:"
                    role="menu"
                    tabIndex={0}
                    hidden=""
                    data-headlessui-state=""
                    aria-labelledby="headlessui-menu-button-:r0:"
                    style={{ display: "none" }}
                  >
                    <a
                      id="headlessui-menu-item-:r2:"
                      role="menuitem"
                      tabIndex={-1}
                      data-headlessui-state=""
                      className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-white flex items-center border border-black dark:border-white duration-150 cursor-pointer disabled:cursor-not-allowed shrink-0 whitespace-nowrap text-black visited:text-black disabled:bg-zinc-300 h-9 px-4 rounded-none border-none font-normal text-base justify-start w-full bg-white dark:bg-black hover:bg-white hover:dark:bg-black"
                      href="/address/0x80EeF47fAb3b35726eBE01922969224EEC8B393E"
                    >
                      My Approvals
                    </a>
                    <button
                      id="headlessui-menu-item-:r3:"
                      role="menuitem"
                      tabIndex={-1}
                      data-headlessui-state=""
                      className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-white flex items-center border border-black dark:border-white duration-150 cursor-pointer disabled:cursor-not-allowed shrink-0 whitespace-nowrap text-black visited:text-black disabled:bg-zinc-300 h-9 px-4 rounded-none border-none font-normal text-base justify-start w-full bg-white dark:bg-black hover:bg-white hover:dark:bg-black"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex lg:hidden justify-end">
            <div className="flex flex-col">
              <button
                aria-label="Open Menu"
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
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
