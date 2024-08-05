import React, { useState, useEffect } from "react";
import ConnectButton from "../components/ConnectButton";
import Logo from "../assets/images/logo.svg";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import PathConstants from "../routes/pathConstants";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const Header = () => {
  const { address, isConnected, chainId } = useAccount();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const desiredChainId = 1;

  useEffect(() => {
    if (isConnected && chainId !== desiredChainId) {
      return;
    }
    if (isConnected && chainId == desiredChainId) {
      navigate("/address");
    }
  }, [isConnected, chainId]);

  const formik = useFormik({
    initialValues: {
      transactionHash: "",
    },
    validationSchema: Yup.object({
      transactionHash: Yup.string()
        .required("Transaction hash is required")
        .matches(/^0x([A-Fa-f0-9]{64})$/, "Invalid transaction hash"),
    }),
    onSubmit: async (values) => {
      if (isConnected) {
        navigate(PathConstants.REVOKE.concat("?tx=", values.transactionHash));
      } else {
        toast.error("Connect your wallet");
      }
    },
  });

  return (
    <>
      <header className="flex border-b border-[#0C70F2] flex-col p-4 lg:px-8 gap-4 mb-8 bg-black">
        <div className="flex justify-between items-center gap-8">
          <a className="flex-grow-0" href="/">
            <img
              src={Logo}
              alt="Revoke.cash logo"
              className="h-12 dark:invert"
            />
          </a>
          <div>
            <ConnectButton />
          </div>
        </div>
      </header>
      <div className="flex justify-center -mt-4 mb-8 px-4 lg:px-8">
        <form
          onSubmit={formik.handleSubmit}
          className="h-9 flex gap-2 items-center border border-[#0C70F2] text-white dark:border-white rounded-lg px-2 font-medium focus-within:ring-1 focus-within:ring-black dark:focus-within:ring-white w-full max-w-3xl text-base sm:text-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#0C70F2"
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
            placeholder="Enter Transaction Hash"
            aria-label="Search Accounts by Address or Domain"
            id="global-search"
            name="transactionHash"
            value={formik.values.transactionHash}
            onChange={formik.handleChange}
          />
          {formik.errors.transactionHash && formik.touched.transactionHash && (
            <div className="pt-1 text-[#FF4609] text-xs">
              {formik.errors.transactionHash}
            </div>
          )}
          <button
            type="submit"
            className="text-white bg-[#0C70F2] px-1 hover:bg-neutral-700 rounded-md"
          >
            submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Header;
