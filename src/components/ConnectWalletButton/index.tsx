"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";


const ConnectWalletButton = () => {
  return (
    <div className="relative">
      <ConnectButton accountStatus="avatar" />
    </div>
  );
};

export default ConnectWalletButton;
