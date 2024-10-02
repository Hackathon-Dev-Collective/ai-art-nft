'use client'

import { useWriteContract } from 'wagmi'

import { abi } from '@/abi/index'
import { Button } from "@/components/ui/button";
import { parseEther } from 'viem'

const MintNft = () =>  {
  const { writeContract } = useWriteContract()

  const doMint = () => 
        writeContract({ 
          abi,
          address: '0x0Ee0d12a58eE35270374f70dc5a61CDC35f0296d',
          functionName: 'createNFT',
          args: [
            'scofield-nft',
            parseEther('0.01'), 
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