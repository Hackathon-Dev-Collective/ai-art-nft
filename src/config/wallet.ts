import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrum, base, mainnet, optimism, polygon, sepolia } from "wagmi/chains";

export const walletConfig = getDefaultConfig({
  appName: "Neuro Art",
  projectId: "57d79175983f1aba99c5bbf103e7fd2e",
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  // transports: {
  //   [mainnet.id]: http(),
  //   [base.id]: http(),
  // },
  ssr: true,
});
