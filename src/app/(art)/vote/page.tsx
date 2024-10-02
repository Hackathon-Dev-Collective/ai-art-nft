/**
 * @description 点赞页面
 */

"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Heart, Share2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useUser from "@/hooks/useUser";
import { useWriteContract,   useWatchContractEvent } from 'wagmi'
// import { waitForTransactionReceipt } from '@wagmi/core'
import { walletConfig } from '@/config/index'
import {contractUrl} from "@/config/index"
import { abi } from '@/abi/index'
import { parseEther } from 'viem'

import { getImageList,vote,mintNft } from "@/service/index";
// import MintNft from "@/components/MintNft/index"

// Sample data for images
const initialImages = [
  {
    id: 1,
    src: "/images/demo-17.png",
    alt: "Abstract Art 1",
    title: "Neon Dreams",
    author: {
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    likes: 1024,
    isFavorite: false,
  },
  {
    id: 2,
    src: "/images/demo-18.png",
    alt: "Abstract Art 2",
    title: "Cosmic Waves",
    author: {
      name: "Bob Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    likes: 896,
    isFavorite: true,
  },
  {
    id: 3,
    src: "/images/demo-19.png",
    alt: "Abstract Art 3",
    title: "Digital Bloom",
    author: {
      name: "Carol Davis",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    likes: 1536,
    isFavorite: false,
  },
  {
    id: 4,
    src: "/images/demo-20.png",
    alt: "Abstract Art 4",
    title: "Quantum Patterns",
    author: {
      name: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    likes: 768,
    isFavorite: true,
  },
  {
    id: 5,
    src: "/images/demo-21.png",
    alt: "Abstract Art 4",
    title: "Quantum Patterns",
    author: {
      name: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    likes: 768,
    isFavorite: true,
  },
  {
    id: 6,
    src: "/images/demo-22.png",
    alt: "Abstract Art 4",
    title: "Quantum Patterns",
    author: {
      name: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    likes: 900,
    isFavorite: true,
  },
];

export default function ImageCardList() {
  useUser();
  const [images, setImages] = useState(initialImages);
  // const [mintHash, setMintHash] = useState("")
  // const [mintCid, setMintCid] = useState("")

  /** 点赞 赞后判断 likescount 满足条件 出发合约铸造NFT */
  const toggleFavorite = async ({id, likes}) => {
    console.log({id, likes})
    if (likes > 0) {
      doMint(id)
      return 
    }
  
    const voteRes = await vote({cid:id})
     console.log({id,voteRes})
     getImages()
    // setImages(images.map((img) => (img.id === id ? { ...img, isFavorite: !img.isFavorite } : img)));
  };

  useWatchContractEvent({
    address: contractUrl,
    abi,
    eventName: 'NFTCreated',
    onLogs(logs) {
      console.log('New logs!--------------------------', logs)
      // mintNft({cid})
    },
  })

  const formatLikes = (likes: number) => {
    return likes >= 1000 ? `${(likes / 1000).toFixed(1)}k` : likes.toString();
  };
  const getImages = async () => {
    const res = await getImageList();
    let imageArr: any[] = [];
    res.data.images.forEach((image: any) => {
      imageArr.push({
        id: image.cid,
        src: `https://gateway.pinata.cloud/ipfs/${image.cid}`,
        likes: image.likes_count,
      });
    });
    console.log({ res });
    setImages(imageArr);
  };

    const { writeContract  } = useWriteContract()

  const doMint = (cid:string) => 
    // setMintCid(cid)
        writeContract({ 
          abi,
          address: contractUrl,
          functionName: 'createNFT',
          args: [
            'scofield-nft',
            parseEther('0.01'), 
          ],
       },{
  onSuccess: async (data:any) => {
    console.log("Mint Success------------",data);
    // setMintHash(data)
    // const transactionReceipt = await waitForTransactionReceipt(walletConfig, {
    //   hash: data,
    // })
// console.log({'-----------transactionReceipt----------':transactionReceipt})
    // mintNft({cid})
  },
  onError: (err) => {
    // console.log({'error---------':cid})
    // setMintCid("")
    // setMintHash("")
    console.log(err.message);
  },
})

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8  pb-20 sm:p-20 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 mt-10">Discover AI-Generated Art</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden scale-hover shadow-md">
            <CardContent className="p-0 relative overflow-hidden">
              <Image
                width={800}
                height={800}
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transform transition-all"
              />
              <Button
                variant="ghost"
                size="icon"
                className={`absolute top-2 right-2 bg-white/50 hover:bg-white/75 transition-colors ${
                  image.isFavorite ? "text-red-500" : "text-gray-600"
                }`}
                onClick={() => toggleFavorite(image)}
                aria-label={image.isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart className="h-5 w-5" fill={image.isFavorite ? "currentColor" : "none"} />
              </Button>
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4">
              <div className="flex items-center justify-between w-full mb-2">
                {/* <h2 className="text-xl font-semibold">{image.title}</h2> */}
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" aria-label="Share">
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label="More options">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Report</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-2">
                  {/* <Avatar>
                    <AvatarImage src={image.author.avatar} alt={image.author.name} />
                    <AvatarFallback>{image.author.name.charAt(0)}</AvatarFallback>
                  </Avatar> */}
                  {/* <span className="text-sm font-medium">{image.author.name}</span> */}
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="h-4 w-4 text-red-500" fill="currentColor" />
                  <span className="text-sm font-medium">{formatLikes(image.likes)}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}


