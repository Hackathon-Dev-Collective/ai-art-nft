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
  },
   {
     name: "getUserNFTs",
         stateMutability: "view",
        type: "function",
        inputs: [
            {
                name: "user",
                type: "address"
            }
        ],
        outputs: [
            {
                name: "",
                type: "uint256[]"
            }
        ],
       
    },
        {
        inputs: [],
        name: "getNFTsForSale",
        outputs: [
            {
                components: [
                    {
                        name: "id",
                        type: "uint256"
                    },
                    {
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "name": "tokenURI",
                        "type": "string"
                    },
                    {
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "name": "forSale",
                        "type": "bool"
                    }
                ],
                name: "",
                type: "tuple[]"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
        {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "tokenId",
                type: "uint256"
            },
            {
                indexed: true,
                name: "owner",
                type: "address"
            },
            {
                indexed: false,
                internalType: "string",
                name: "tokenURI",
                type: "string"
            },
            {
                indexed: false,
                name: "price",
                type: "uint256"
            }
        ],
        name: "NFTCreated",
        type: "event"
    },
] as const
