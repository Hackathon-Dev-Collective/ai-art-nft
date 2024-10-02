export interface GenerateParams {
  prompt: string;
  style?: string;
  price: number;
}

export interface LoginParams {
  address: string;
}

export interface RequestOptions {
  requiresWallet: boolean;
}
