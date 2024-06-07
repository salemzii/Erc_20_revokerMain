import React from "react";
import Container from "../components/Container";
import Poster from "../assets/images/demo-thumb.jpg";
import Demo from "../assets/videos/demo.mp4";
import WalletOptionModal from "../components/WalletOptionModal";
const Home = () => {
  return (
    <Container>
      <main className="w-full grow">
       
        <div className="dark:text-white ">
          <div className="flex flex-col items-center gap-8">
            <div className="w-full px-4">
              <div className="flex flex-col gap-4 md:gap-4 max-w-3xl mx-auto">
                <h1>Take Back Control of Your Wallet.</h1>
                <div className="flex flex-col gap-4">
                  <div>
                    <p>
                      When using dapps like Uniswap or OpenSea you have to grant
                      them permission to spend your tokens and NFTs. This is
                      called a token approval. If you don't revoke these
                      approvals, the dapp can spend your tokens forever. Take
                      back control by revoking your approvals.
                    </p>
                  </div>
                  <div className="border border-black w-full max-w-5xl">
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
                    className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-white flex items-center border border-black dark:border-white duration-150 cursor-pointer disabled:cursor-not-allowed font-medium shrink-0 whitespace-nowrap bg-black text-white visited:text-white hover:bg-zinc-800 disabled:bg-zinc-600 justify-center h-12 px-6 text-lg rounded-xl mx-auto"
                    href="/token-approval-checker/ethereum"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full px-4 bg-black dark:bg-zinc-900 text-zinc-100 pt-8 pb-16">
              <div className="flex flex-col items-center">
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
                          className="w-12 h-12"
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
                          className="w-12 h-12"
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
                          className="w-12 h-12"
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
            <div className="w-full px-4">
              <div className="flex flex-col gap-4 md:gap-4 max-w-3xl mx-auto">
                <h2>Why You Should Use Revoke.cash.</h2>
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-xl">
                      1. Use Revoke.cash periodically.
                    </h3>
                    <p>
                      It is always good to limit your approvals whenever you are
                      not actively using a dapp, especially for NFT
                      marketplaces. This reduces the risk of losing your funds
                      to hacks or exploits and can also help mitigate the damage
                      of phishing scams.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl">
                      2. Use Revoke.cash after getting scammed.
                    </h3>
                    <p>
                      Very often, scammers try to trick you into granting them
                      an approval to your funds. Sort your approvals by most
                      recent to find out which approvals are to blame and revoke
                      them to prevent further damage. Unfortunately it is not
                      possible to <span className="italic">recover</span> funds
                      that have already been stolen.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl">
                      3. Use the Revoke.cash browser extension.
                    </h3>
                    <p>
                      Prevention is better than mitigation. The Revoke.cash
                      browser extension warns you when you're about to sign
                      something potentially harmful. This can save you from
                      phishing scams by making you think twice about what you're
                      doing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-4">
              <div className="flex flex-col gap-4 md:gap-4 max-w-3xl mx-auto">
                <h2>Frequently Asked Questions</h2>
                <div className="flex flex-col gap-4">
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-6 md:gap-y-8">
                    <div className="flex flex-col gap-1">
                      <dt>
                        <h3 className="text-xl">
                          If I have an "Unlimited" approval, does that mean my
                          whole wallet is at risk?
                        </h3>
                      </dt>
                      <dd>
                        <p>
                          No. An "unlimited" approval only applies to the token
                          or NFT collection that you gave an approval for. So if
                          you gave an unlimited approval for your DAI, then{"{"}
                          " "{"}"}
                          <span className="italic">all your DAI</span> may be at
                          risk, but none of your USDC. Similarly an "unlimited"
                          approval for your Bored Apes does not impact your Cool
                          Cats.
                        </p>
                      </dd>
                    </div>
                    <div className="flex flex-col gap-1">
                      <dt>
                        <h3 className="text-xl">
                          Is it enough to "disconnect" my wallet instead of
                          revoking approvals?
                        </h3>
                      </dt>
                      <dd>
                        <p>
                          No. Disconnecting your wallet (e.g. MetaMask) does not
                          do <span className="italic">anything</span> to protect
                          you from approval exploits - or most other exploits.
                          The only thing that happens when disconnecting your
                          wallet from a website is that that website cannot see
                          your address anymore. But your approvals stay active.
                        </p>
                      </dd>
                    </div>
                    <div className="flex flex-col gap-1">
                      <dt>
                        <h3 className="text-xl">
                          My funds were just stolen, can I use Revoke.cash to
                          get them back?
                        </h3>
                      </dt>
                      <dd>
                        <p>
                          No. Revoke.cash is a{"{"}" "{"}"}
                          <span className="italic">preventative</span> tool that
                          helps you practice proper wallet hygiene. By regularly
                          revoking active approvals you reduce the chances of
                          becoming the victim of approval exploits. But
                          unfortunately it cannot be used to recover any stolen
                          funds. You should still make sure to revoke the
                          approvals that were used to take your funds so that
                          they cannot steal more in the future.
                        </p>
                      </dd>
                    </div>
                    <div className="flex flex-col gap-1">
                      <dt>
                        <h3 className="text-xl">
                          I want to revoke approvals, but when I add ETH to my
                          account it gets stolen.
                        </h3>
                      </dt>
                      <dd>
                        <p>
                          If you have a so-called "sweeper bot" on your account
                          that steals any ETH as soon as it comes in, your seed
                          phrase was compromised. This means that revoking
                          approvals is not going to help with your wallet
                          security. Unfortunately, there is no way for your
                          wallet to recover from this. You should abandon this
                          wallet and create a new one.
                        </p>
                      </dd>
                    </div>
                  </dl>
                  <div className="border w-full border-zinc-200 dark:border-zinc-800" />
                  <p className="text-zinc-700 dark:text-zinc-300">
                    These are some of the most common questions we get asked.
                    For a full list of FAQs please visit our{"{"}" "{"}"}
                    <a
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:rounded text-blue-700 visited:text-fuchsia-800 dark:text-blue-400 dark:visited:text-fuchsia-600 no-underline hover:underline font-medium"
                      href="/learn/faq"
                    >
                      FAQ page
                    </a>
                    .
                  </p>
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
