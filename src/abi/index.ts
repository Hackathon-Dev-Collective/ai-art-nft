export const abi = [
  {
    type: 'function',
    name: 'createNFT',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'tokenURI', type: 'string' },
      { name: 'price', type: 'uint256' },
    ],
    outputs: [],
  },
] as const