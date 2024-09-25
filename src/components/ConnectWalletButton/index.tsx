"use client";

import { useState } from "react";
import { useSDK } from "@metamask/sdk-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import WalletIcon from "@/components/icons/WalletIcon";

// import { formatAddress } from "@/lib/utils";

const ConnectWalletButton = () => {
  const [account, setAccount] = useState<string>();
  // const { sdk, connected, connecting, account } = useSDK();

  const { sdk, connected, connecting, provider, chainId } = useSDK();

  console.log({ connected, connecting, provider, chainId, account });

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      console.log({ accounts });
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  // const disconnect = () => {
  //   if (sdk) {
  //     sdk.terminate();
  //   }
  // };

  return (
    <div className="relative">
      <Button onClick={connect}>Connect Wallet</Button>
      {/* {connected ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button>{account ? account : "未连接"}</Button>
          </PopoverTrigger>
          <PopoverContent className="mt-2 w-44 bg-gray-100 border rounded-md shadow-lg right-0 z-10 top-10">
            <button
              onClick={disconnect}
              className="block w-full pl-2 pr-4 py-2 text-left text-[#F05252] hover:bg-gray-200"
            >
              Disconnect
            </button>
          </PopoverContent>
        </Popover>
      ) : (
        <Button disabled={connecting} onClick={connect}>
          <WalletIcon className="mr-2 h-4 w-4" /> Connect Wallet
        </Button>
      )} */}
      {/* <button style={{ padding: 10, margin: 10 }} onClick={connect}>
        Connect
      </button> */}
      {/* <Popover>
        <PopoverTrigger asChild>
          <Button onClick={connect}>Connect</Button>
        </PopoverTrigger>
        <PopoverContent className="mt-2 w-44 bg-gray-100 border rounded-md shadow-lg right-0 z-10 top-10">
          <button
            onClick={disconnect}
            className="block w-full pl-2 pr-4 py-2 text-left text-[#F05252] hover:bg-gray-200"
          >
            Disconnect
          </button>
        </PopoverContent>
      </Popover>
      {connected && (
        <div>
          <>
            {chainId && `Connected chain: ${chainId}`}
            <p></p>
            {account && `Connected account: ${account}`}
          </>
        </div>
      )} */}
    </div>
  );
};

export default ConnectWalletButton;
