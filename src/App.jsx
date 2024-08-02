import { useState, lazy, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "../wagmiConfig";
import { Route, Routes } from "react-router-dom";
import PathConstants from "./routes/pathConstants";
import Layout from "./layout/Layout";
import ContextProvider from "./components/ContextProvider";
import { WagmiProvider } from "wagmi";
import CustomWalletModal from './components/CustomWalletModal'; // Import your custom modal

// 0. Setup queryClient
const queryClient = new QueryClient();

function App() {
  const Home = lazy(() => import("./pages/Home"));
  const Revoke = lazy(() => import("./pages/Revoke"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if the user is on a mobile device
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent) || /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      setIsMobile(true);
    }
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <>
          <ContextProvider>
            <Layout>
              {isMobile && (
                <>
                  <button onClick={openModal}>Connect Wallet</button>
                  <CustomWalletModal isOpen={isModalOpen} onClose={closeModal} />
                </>
              )}
              <Routes>
                <Route path={PathConstants.HOME} element={<Home />} />
                <Route path={PathConstants.REVOKE} element={<Revoke />} />
              </Routes>
            </Layout>
          </ContextProvider>
        </>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
