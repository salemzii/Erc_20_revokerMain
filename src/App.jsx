import { useState, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "../wagmiConfig";
import { Route, Routes } from "react-router-dom";
import PathConstants from "./routes/pathConstants";
import Layout from "./layout/Layout";
import { WagmiProvider } from "wagmi";
// 0. Setup queryClient
const queryClient = new QueryClient();

function App() {
  const Home = lazy(() => import("./pages/Home"));
  const Revoke = lazy(() => import("./pages/Revoke"));

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <>
          <Layout>
            <Routes>
              <Route path={PathConstants.HOME} element={<Home />} />
              <Route path={PathConstants.REVOKE} element={<Revoke />} />
            </Routes>
          </Layout>
        </>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
