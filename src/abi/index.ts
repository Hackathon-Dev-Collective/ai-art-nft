export const abi = [
  {
    type: 'function',
    name: 'createNFT',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'tokenURI', type: 'string memory' },
      { name: 'price', type: 'uint256' },
    ],
    outputs: [{ type: 'bool' }],
  },
  {
    type: 'function',
    name: 'transferFrom',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ type: 'bool' }],
  },
] as const