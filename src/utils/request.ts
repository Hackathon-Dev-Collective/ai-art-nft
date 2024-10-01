/**
 * 先简单封装
 */
const baseUrl = "http://5j3iep.natappfree.cc";

const request = (url: string, config: any) => {
  return fetch(`${baseUrl}${url}`, {
    headers: {
      Authorization: "token.......",
    },
    ...config,
  })
    .then((res: any) => {
      if (!res.ok) {
        // 服务器异常返回
        throw Error("接口请求异常");
      }
      return res.json();
    })
    .catch((error: any) => {
      return Promise.reject(error);
    });
};

// GET请求
export const get = (url: string) => {
  return request(url, { method: "GET" });
};

// POST请求
export const post = (url: string, data: any) => {
  return request(url, {
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
      Authorization: "token.......",
    },
    method: "POST",
  });
};
