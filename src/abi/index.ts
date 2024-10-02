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
  {
    type: 'function',
    name: 'purchaseNFT',
    stateMutability: "payable",
     outputs: [],
     inputs:[{
        name:'tokenId',
        type:'uint256'
     }]
  }
] as const
