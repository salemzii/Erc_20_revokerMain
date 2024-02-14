import { http, createConfig, WagmiProvider } from "wagmi";
import {sepolia, bscTestnet, mainnet} from "wagmi/chains";
import { walletConnect, injected, coinbaseWallet } from "wagmi/connectors";

const projectId = '243060104b273e0c5af1209e5f4a34dd'

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const config = createConfig({
  chains: [ sepolia, bscTestnet, mainnet],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [bscTestnet.id]: http(),
  },
  connectors: [
    walletConnect({ projectId, metadata, showQrModal: false }),
    injected({ shimDisconnect: true }),
    coinbaseWallet({
      appName: metadata.name,
      appLogoUrl: metadata.icons[0],
    }),
  ],
});

export { config, metadata };
