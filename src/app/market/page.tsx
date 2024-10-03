/**
 * @description 交易市场
 */

"use client";
import Image from "next/image";
import { useState,useEffect} from "react";
import { Search, Filter, ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {shortenAddress} from "@/utils/index"

import { useWriteContract, useReadContract } from 'wagmi'
import {contractUrl} from "@/config/index"

import { abi } from '@/abi/index'
import { parseEther } from 'viem'

import { transferNft,getNftList } from "@/service/index";

// Sample data for NFTs
const initialNFTs = [
  {
    tokenId: 1,
    src: "/images/demo-02.jpg",
    prompt:'',
    price: 0.005,
    forSale:true,
    category: "Abstract",
  },
  {
    tokenId: 2,
    src: "/images/demo-11.png",
    prompt:'',
    price: 0.75,
    forSale:true,
    category: "Cyberpunk",
  },
];

export default function NFTMarket() {
    const { writeContract } = useWriteContract()

  const [nfts, setNfts] = useState(initialNFTs);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const {isSuccess, data} = useReadContract({
    abi,
    address: contractUrl,
    functionName: 'getNFTsForSale',
  });
  const categories = ["All", "Abstract", "Cyberpunk", "Nature", "Sci-Fi", "Pixel Art", "Surrealism"];

  const getNftLists = async () => {
        const list = await getNftList();
        console.log({"list-----------":list})
        const imagesList = []
        list.data.images.forEach((item:any) => {
          imagesList.push({
            src: `https://gateway.pinata.cloud/ipfs/${item.cid}`,
            price:item.price,
            owner_address: item.owner_address,
            prompt: item.prompt,
            cid:item.cid
          })
        })
        setNfts(imagesList)
  }

  useEffect(() => {
    // getNftLists()
    console.log({'result---------------result': data})
    if(data){
      const images = []
      data.filter((item)=>item.tokenURI !== "scofield-nft" ).forEach((item) => {
      images.push({
        forSale:item.forSale,
        tokenId:item.id,
        owner: shortenAddress(item.owner),
        prompt:'',
        price: item.price,
        src: item.tokenURI
      })
      })
        setNfts(images)
    }else {
       setNfts(initialNFTs)
    }
   
  },[isSuccess])

  const purchaseNFT = (nft:any) => 
        writeContract({ 
          abi,
          address: contractUrl,
          functionName: 'purchaseNFT',
          args: [
            nft.tokenId
          ],
          // value:parseEther(`${nft.price}`)
          value:parseEther(`0.0001`)
       },{
  onSuccess: () => {
    console.log("购买 Success----",nft);
     const sp = nft.src.split("/")
  console.log({'sp':sp[sp.length-1]})
    // 成功后 调用后台接口
    transferNft({cid:sp[sp.length-1]})
  },
  onError: (err) => {
    console.log({'error---------':cid})
    console.log(err.message);
  },
})

 const buyNft = async (nft) => {
  console.log({'nft---------':nft})
    purchaseNFT(nft)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8  pb-20 sm:p-20 flex flex-col justify-center items-center">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
            <div className="relative w-full sm:w-64">
              <Input
                type="text"
                placeholder="Search NFTs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map((category) => (
                  <DropdownMenuItem key={category} onClick={() => setSelectedCategory(category)}>
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nfts.map((nft) => (
              <Card key={nft.tokenId} className="overflow-hidden scale-hover">
                <CardContent className="p-0 overflow-hidden">
                  <Image
                    width={800}
                    height={800}
                    src={nft.src}
                    alt={nft.prompt}
                    className="w-full h-64 object-cover transform transition-all"
                  />
                </CardContent>
                <CardFooter className="flex flex-col items-start p-4">
                  <h2 className="text-xl font-semibold mb-2">{nft.owner}</h2>
                  <div className="flex items-center justify-between w-full mb-4">
                    <div className="flex items-center space-x-2">
                      {/* <Avatar className="h-6 w-6">
                        <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={nft.prompt} />
                        <AvatarFallback>{nft.artist[0]}</AvatarFallback>
                      </Avatar> */}
                      {/* <span className="text-sm text-gray-500">{nft.artist}</span> */}
                    </div>
                    <span className="text-sm font-medium">
                      {/* {nft.currency} */}
                      {nft.price} 
                    </span>
                  </div>
                  <Button className="w-full" onClick={() => buyNft(nft)}>Buy Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

