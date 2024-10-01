/**
 * checkk account statu
 */

// import { useState } from "react";
import { useAccount } from "wagmi";

async function useUser() {
  // const [account, setAccount] = useState<string | undefined>("");
  const { address, chain, chainId, connector, status, isConnected } = useAccount();

  if (status === "connected") {
    const nonce = await fetch(`http://5j3iep.natappfree.cc/auth/nonce?address=${address}`);
    const jsonNounce = await nonce.json();
    console.log({ jsonNounce });
   
  } else if (status === "disconnected") {
    console.log("disconnected--------------------------");
  }
  // setAccount(address);
  return {
    address,
    chain,
    chainId,
    connector,
    status,
    isConnected
  };
}

export default useUser;
