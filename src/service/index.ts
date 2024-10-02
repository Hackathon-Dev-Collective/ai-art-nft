import { get, post } from "@/utils/request";
import { GenerateParams, LoginParams } from "@/types";

export const login = (params: GenerateParams) => post("/auth/login", params, { requiresWallet: false });

export const generateImage = (params: LoginParams) => post("/img/generator", params);

// image
export const getImageList = () => get("/img/public_img_list");
export const getUserImageList = () => get("/img/imge_list");

export const vote = (params:any) => post("/img/like", params);
// nft
export const getNftList = () => get("/nft/nft_list");

export const getUserNftList = () => get("/nft/user_nft_list");

export const mintNft = (params) => post("/nft/mint", params)
