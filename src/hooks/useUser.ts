/**
 * checkk account statu
 */

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { post } from "@/utils/request";

function useUser() {
  const { address, chain, chainId, connector, status, isConnected } = useAccount();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected && address) {
      const fetchNonce = async () => {
        setLoading(true);
        setError(null); // 重置错误状态
        try {
          const res = await post(
            "/auth/login",
            {
              address,
            },
            { requiresWallet: false }
          );
          console.log({ "login-----------------": res });
          localStorage.setItem("authToken", JSON.stringify(res.data.accessToken));
        } catch (err: any) {
          setError(err.message || "Something went wrong");
        } finally {
          setLoading(false);
        }
      };
      console.log({ "connected-------------------": address });
      const accessToken = localStorage.getItem("authToken");
      if (!accessToken) {
        fetchNonce();
      }
    } else {
      console.log({ "disconnected-------------------": address });
      localStorage.removeItem("authToken");
    }
  }, [isConnected, address]);

  return {
    address,
    chain,
    chainId,
    connector,
    status,
    isConnected,
  };
}

export default useUser;
