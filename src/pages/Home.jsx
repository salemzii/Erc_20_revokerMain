import React from "react";
import Container from "../components/Container";
import Poster from "../assets/images/demo-thumb.jpg";
import Demo from "../assets/videos/demo.mp4";
import Logo from "../assets/revoke.png"
import WalletOptionModal from "../components/WalletOptionModal";
const Home = () => {
  return (
    <Container>
      <main className="w-full grow bg-[#111426] text-white">
        <div
          className=" "
        >
          <div className="flex flex-col items-center gap-8">
            <div className="w-full px-4">
              <div className="flex flex-col gap-4 md:gap-4 max-w-3xl mx-auto">
                <h1>Take Back Control of Your Wallet.</h1>
                <div className="flex flex-col gap-4 text-white">
                  <div>
                    <p>
                      When using dapps like Uniswap or OpenSea you have to grant
                      them permission to spend your tokens and NFTs. This is
                      called a token approval. If you don't revoke these
                      approvals, the dapp can spend your tokens forever. Take
                      back control by revoking your approvals.
                    </p>
                  </div>
                  <div className="border border-[#0c87f2] w-full max-w-5xl">
                    <video
                      className="aspect-[16/9] w-full"
                      controls
                      loop
                      preload="none"
                      poster={Poster}
                    >
                      <source src={Demo} type="video/mp4" />
                    </video>
                  </div>
                  <a
                    className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0c87f2] dark:focus-visible:ring-white flex items-center border border-[#0c87f2] dark:border-white duration-150 cursor-pointer disabled:cursor-not-allowed font-medium shrink-0 whitespace-nowrap bg-black text-[#0c87f2] visited:text-white hover:bg-zinc-800 disabled:bg-zinc-600 justify-center h-12 px-6 text-lg rounded-xl mx-auto"
                    href="/token-approval-checker/ethereum"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full px-4 bg-black dark:bg-zinc-900 text-zinc-100 pt-8 pb-16 lg: bg-no-repeat bg-right bg-contain ">
              <div className="flex flex-col items-center">
                <img src={Logo} className="w-[100px]" alt="logo" />
                <h2 className="text-center">How To Revoke Your Approvals.</h2>
                <div>
                  <div className="flex flex-col md:flex-row gap-4 pt-8">
                    <div className="flex items-start gap-2 bg-white text-zinc-900 dark:bg-black dark:text-zinc-100 rounded-lg py-6 px-4 max-w-xs md:basis-96">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                          className="w-12 h-12 text-[#0c87f2]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl">1. Connect</h3>
                        <p className="text-sm">
                          Click{" "}
                          <span className="font-bold">Connect Wallet</span> on
                          the top right or enter an address in the search bar.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 bg-white text-zinc-900 dark:bg-black dark:text-zinc-100 rounded-lg py-6 px-4 max-w-xs md:basis-96">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                          className="w-12 h-12 text-[#0c87f2]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl">2. Inspect</h3>
                        <p className="text-sm">
                          Inspect your approvals by using the network selection,
                          sorting and filtering options.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 bg-white text-zinc-900 dark:bg-black dark:text-zinc-100 rounded-lg py-6 px-4 max-w-xs md:basis-96">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                          className="w-12 h-12 text-[#0c87f2]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl">3. Revoke</h3>
                        <p className="text-sm">
                          Revoke the approvals that you no longer use to prevent
                          unwanted access to your funds.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
         
          
          </div>
        </div>
      </main>
    </Container>
  );
};

export default Home;
