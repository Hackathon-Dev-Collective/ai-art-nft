/**
 * checkk account statu
 */

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { get } from "@/utils/request";

function useUser() {
  const { address, chain, chainId, connector, status, isConnected } = useAccount();
  const [message, setMessage] = useState("");
  const [nonce, setNonce] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected && address) {
      const fetchNonce = async () => {
        setLoading(true);
        setError(null); // 重置错误状态

        try {
          const response = await get(`/auth/nonce?address=${address}`);

          console.log({ "data--------------": response });
          setNonce(response.data.nonce); // 更新 nonce 状态
        } catch (err: any) {
          setError(err.message || "Something went wrong");
        } finally {
          setLoading(false);
        }
      };
      const timestamp = Math.floor(new Date().getTime() / 1000);
      console.log({ "connected-------------------": address });
      // set msg based on current wallet address and timestamp, with unique application string
      setMessage(
        `Welcome to myawesomedapp.com. Please login to continue. Challenge: ${address?.toLowerCase()}:${timestamp}`
      );
      fetchNonce();
    } else {
      console.log({ "disconnected-------------------": address });
      setNonce('')
    }
  }, [isConnected, address]);

  return {
    address,
    chain,
    chainId,
    connector,
    status,
    isConnected,
    message,
    nonce,
  };
}

export default useUser;
