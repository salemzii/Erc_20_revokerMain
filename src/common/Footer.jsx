import React, { useState, useEffect } from "react";

const Footer = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(()=>{
if(darkMode){
  document.documentElement.classList.add("dark")
}
else{
  document.documentElement.classList.remove("dark")

}
  },[darkMode])
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div className="flex flex-col justify-end">
      <footer
        className="bg-black dark:bg-zinc-900 mt-24"
        aria-labelledby="footer-heading"
      >
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-8">
          <div className="my-16 grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="mt-8 flex flex-col gap-4">
                <h3 className="text-sm font-semibold leading-6 text-zinc-100">
                  Product
                </h3>
                <ul role="list" className="space-y-2">
                  <li className="list-none">
                    <a
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:rounded no-underline hover:underline text-sm text-zinc-400 dark:text-zinc-400 visited:text-zinc-400"
                      href="/token-approval-checker/ethereum"
                    >
                      Token Approval Checker
                    </a>
                  </li>
                  <li className="list-none">
                    <a
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:rounded no-underline hover:underline text-sm text-zinc-400 dark:text-zinc-400 visited:text-zinc-400"
                      href="/extension"
                    >
                      Browser Extension
                    </a>
                  </li>
                  <li className="list-none">
                    <a
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:rounded no-underline hover:underline text-sm text-zinc-400 dark:text-zinc-400 visited:text-zinc-400"
                      href="/exploits"
                    >
                      Exploit Checker
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-8 flex flex-col gap-4">
                <h3 className="text-sm font-semibold leading-6 text-zinc-100">
                  Learn
                </h3>
                <ul role="list" className="space-y-2">
                  <li className="list-none">
                    <a
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:rounded no-underline hover:underline text-sm text-zinc-400 dark:text-zinc-400 visited:text-zinc-400"
                      href="/learn"
                    >
                      Knowledgebase
                    </a>
                  </li>
                  <li className="list-none">
                    <a
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:rounded no-underline hover:underline text-sm text-zinc-400 dark:text-zinc-400 visited:text-zinc-400"
                      href="/learn/approvals/what-are-token-approvals"
                    >
                      What Are Token Approvals?
                    </a>
                  </li>
                  <li className="list-none">
                    <a
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:rounded no-underline hover:underline text-sm text-zinc-400 dark:text-zinc-400 visited:text-zinc-400"
                      href="/learn/faq"
                    >
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="mt-8 flex flex-col gap-4">
                <h3 className="text-sm font-semibold leading-6 text-zinc-100">
                  Company
                </h3>
                <ul role="list" className="space-y-2">
                  <li className="list-none">
                    <a
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:rounded no-underline hover:underline text-sm text-zinc-400 dark:text-zinc-400 visited:text-zinc-400"
                      href="/blog"
                    >
                      Blog
                    </a>
                  </li>
                  <li className="list-none">
                    <a
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:rounded no-underline hover:underline text-sm text-zinc-400 dark:text-zinc-400 visited:text-zinc-400"
                      href="/about"
                    >
                      About Us
                    </a>
                  </li>
                  <li className="list-none">
                    <a
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:rounded no-underline hover:underline text-sm text-zinc-400 dark:text-zinc-400 visited:text-zinc-400"
                      href="https://github.com/RevokeCash/brand-assets"
                      target="_blank"
                      referrerPolicy="origin"
                    >
                      Brand Assets
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-8 flex flex-col gap-4">
                <h3 className="text-sm font-semibold leading-6 text-zinc-100">
                  Community
                </h3>
                <ul role="list" className="space-y-2">
                  <li className="list-none">
                    <a
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:rounded no-underline hover:underline text-sm text-zinc-400 dark:text-zinc-400 visited:text-zinc-400"
                      href="https://twitter.com/RevokeCash"
                      target="_blank"
                      referrerPolicy="origin"
                    >
                      Twitter
                    </a>
                  </li>
                  <li className="list-none">
                    <a
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:rounded no-underline hover:underline text-sm text-zinc-400 dark:text-zinc-400 visited:text-zinc-400"
                      href="https://discord.gg/revoke-cash"
                      target="_blank"
                      referrerPolicy="origin"
                    >
                      Discord
                    </a>
                  </li>
                  <li className="list-none">
                    <a
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:rounded no-underline hover:underline text-sm text-zinc-400 dark:text-zinc-400 visited:text-zinc-400"
                      href="https://github.com/RevokeCash/revoke.cash"
                      target="_blank"
                      referrerPolicy="origin"
                    >
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border w-full my-16 border-zinc-900 dark:border-zinc-800" />
          <div className="my-16 flex flex-col md:flex-row items-center gap-4 justify-between">
            <div className="flex flex-col gap-px text-center md:text-left">
              <p className="leading-5 text-zinc-100 dark:text-zinc-100">
                © 2024 Revoke.cash
              </p>
              <ul className="flex justify-center md:justify-start items-center gap-1">
                <li className="list-none">
                  <a
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:rounded no-underline hover:underline text-sm text-zinc-400 dark:text-zinc-400 visited:text-zinc-400"
                    href="/privacy-policy"
                    referrerPolicy="origin"
                  >
                    Privacy Policy
                  </a>
                </li>
                <span className="text-zinc-400 dark:text-zinc-400 visited:text-zinc-400">
                  •
                </span>
                <li className="list-none">
                  <a
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:rounded no-underline hover:underline text-sm text-zinc-400 dark:text-zinc-400 visited:text-zinc-400"
                    href="/terms"
                    referrerPolicy="origin"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
