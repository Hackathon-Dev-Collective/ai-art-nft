/**
 * 先简单封装
 */
import { RequestOptions } from "@/types/index";
const baseUrl = "https://laoshihanhou.mynatapp.cc";

const request = (url: string, config: any, options: RequestOptions = { requiresWallet: true }) => {
  const access_token = localStorage.getItem("authToken");
  if (options.requiresWallet && !access_token) {
    console.log("先连接钱包------------------2");
    throw Error("先连接钱包");
  }
  // debugger;
  console.log({ localStorage, options, access_token });
  // debugger;
  return fetch(`${baseUrl}${url}`, {
    ...config,
    headers: {
      "content-type": "application/json",
      access_token: JSON.parse(access_token),
      // access_token:
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHg1QzIzN2U0YjVENjhCZWFhMDIxNUU0YzI2MjFEMDE3MzljZEU1MmU4IiwiZXhwIjoxNzI4MDE2MDYyLCJpc3MiOiJuZnRfZmx1eCJ9.1n6F4mMzd-ahUPGh1e34Nl_KiyPpdKZ4t_df1G7MOcc",
    },
    // mode: "no-cors",
  })
    .then((res: any) => {
      console.log({ "res---------status": res });
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
      console.log({ "res---------------": res });
      return res;
    })
    .catch((error: any) => {
      return Promise.reject(error);
    });
};

// GET请求
export const get = (url: string, options?: RequestOptions) => {
  return request(url, { method: "GET" }, { requiresWallet: true, ...options });
};

// POST请求
export const post = (url: string, data: any, options?: RequestOptions) => {
  return request(
    url,
    {
      body: JSON.stringify(data),
      // headers: {
      //   "content-type": "application/json",
      // },
      method: "POST",
    },
    { requiresWallet: true, ...options }
  );
};
