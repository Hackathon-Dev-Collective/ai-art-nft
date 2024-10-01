/**
 * 先简单封装
 */
const baseUrl = "http://5j3iep.natappfree.cc";

const request = (
  url: string,
  config: any,
  options: { isConnected: boolean; requiresWallet: boolean } = { isConnected: false, requiresWallet: true }
) => {
  const access_token = localStorage.getItem("authToken");
  // if (options.requiresWallet && !options.isConnected) {
  //   console.log("先连接钱包------------------");
  //   throw Error("先连接钱包");
  // }
  if (options.requiresWallet && !access_token) {
    console.log("先连接钱包------------------2");
    throw Error("先连接钱包");
  }

  console.log({ localStorage });
  return fetch(`${baseUrl}${url}`, {
    ...config, 
    headers: {
      access_token,
    },
  })
    .then((res: any) => {
      if (!res.ok) {
        // 服务器异常返回
        throw Error("接口请求异常");
      }
      return res.json();
    })
    .then((res: any) => {
      if (res.status !== 200) {
        throw Error(res.msg);
      }
      return res;
    })
    .catch((error: any) => {
      return Promise.reject(error);
    });
};

// GET请求
export const get = (url: string, options: any) => {
  return request(url, { method: "GET" }, { requiresWallet: true, ...options });
};

// POST请求
export const post = (url: string, data: any, options: any) => {
  return request(
    url,
    {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    },
    { requiresWallet: true, ...options }
  );
};
