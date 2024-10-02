'use client'

import { useWriteContract } from 'wagmi'
import { abi } from '@/abi/index'
import { Button } from "@/components/ui/button";

const MintNft = () =>  {
  const { writeContract } = useWriteContract()

  const doMint = () => 
        writeContract({ 
          abi,
          address: '0x6b175474e89094c44da98b954eedeac495271d0f',
          functionName: 'createNFT',
          args: [
            '0xd2135CfB216b74109775236E36d4b433F1DF507B',
            '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
            123n,
          ],
       },{
  onSuccess: () => {
    console.log("Mint Success");
  },
  onError: (err) => {
    console.log(err.message);
  },
})

  return (
    <Button 
      onClick={doMint}
    >
      Mint
    </Button>
  )
}

export default MintNft