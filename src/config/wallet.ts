import { getDefaultConfig,Chain } from "@rainbow-me/rainbowkit";
import { arbitrum, base, mainnet, optimism, polygon, sepolia } from "wagmi/chains";


const avalanche = {
  id: 59141,
  name: 'Linea Sepolia',
  iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png',
  iconBackground: '#fff',
  nativeCurrency: { name: 'Linea Sepolia', symbol: 'LS', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.sepolia.linea.build'] },
  },
  blockExplorers: {
    default: { name: 'SepoliaLineascan', url: 'https://sepolia.lineascan.build' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 11_907_934,
    },
  },
} as const satisfies Chain;




export const walletConfig = getDefaultConfig({
  appName: "Neuro Art",
  projectId: "57d79175983f1aba99c5bbf103e7fd2e",
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    avalanche,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  // transports: {
  //   [mainnet.id]: http(),
  //   [base.id]: http(),
  // },
  ssr: true,
});
