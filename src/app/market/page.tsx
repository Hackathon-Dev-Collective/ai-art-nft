/**
 * @description 交易市场
 */

"use client";
import Image from "next/image";
import { useState } from "react";
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
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { useWriteContract } from 'wagmi'

import { abi } from '@/abi/index'
import { parseEther } from 'viem'

import { transferNft } from "@/service/index";

// Sample data for NFTs
const initialNFTs = [
  {
    id: 1,
    title: "Cosmic Dreamscape",
    artist: "Elena Starlight",
    image: "/images/demo-02.jpg",
    price: 0.5,
    currency: "ETH",
    likes: 1024,
    category: "Abstract",
  },
  {
    id: 2,
    title: "Neon Cityscape",
    artist: "Alex Neon",
    image: "/images/demo-11.png",
    price: 0.75,
    currency: "ETH",
    likes: 896,
    category: "Cyberpunk",
  },
  {
    id: 3,
    title: "Digital Flora",
    artist: "Lily Bytes",
    image: "/images/demo-12.png",
    price: 0.3,
    currency: "ETH",
    likes: 1536,
    category: "Nature",
  },
  {
    id: 4,
    title: "Quantum Fragments",
    artist: "Dr. Qubit",
    image: "/images/demo-13.png",
    price: 1.2,
    currency: "ETH",
    likes: 768,
    category: "Sci-Fi",
  },
  {
    id: 5,
    title: "Retro Pixels",
    artist: "Bit Master",
    image: "/images/demo-14.jpg",
    price: 0.4,
    currency: "ETH",
    likes: 2048,
    category: "Pixel Art",
  },
  {
    id: 6,
    title: "Ethereal Whispers",
    artist: "Mystic Brush",
    image: "/images/demo-02.jpg",
    price: 0.6,
    currency: "ETH",
    likes: 1280,
    category: "Surrealism",
  },
];

export default function NFTMarket() {
    const { writeContract } = useWriteContract()
  const [nfts, setNfts] = useState(initialNFTs);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Abstract", "Cyberpunk", "Nature", "Sci-Fi", "Pixel Art", "Surrealism"];

  const filteredNFTs = nfts.filter(
    (nft) =>
      nft.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || nft.category === selectedCategory)
  );

 

  const purchaseNFT = (value:number) => 
        writeContract({ 
          abi,
          address: '0x0Ee0d12a58eE35270374f70dc5a61CDC35f0296d',
          functionName: 'purchaseNFT',
          args: [
            parseEther('0.01'), 
          ],
       },{
  onSuccess: () => {
    console.log("Mint Success");
    // 成功后 调用后台接口
    transferNft({cid})
  },
  onError: (err) => {
    console.log({'error---------':cid})
    console.log(err.message);
  },
})

 const buyNft = ({}) => {
    purchaseNFT('sss')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8  pb-20 sm:p-20 flex flex-col justify-center items-center">
      {/* <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">NFT Art Market</h1>
            <nav className="hidden md:flex space-x-4">
              {["Explore", "Create", "Community"].map((item) => (
                <a key={item} href="#" className="text-gray-500 hover:text-gray-900">
                  {item}
                </a>
              ))}
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                    <SheetDescription>Navigate through our NFT marketplace</SheetDescription>
                  </SheetHeader>
                  <nav className="flex flex-col space-y-4 mt-4">
                    {["Explore", "Create", "Community"].map((item) => (
                      <a key={item} href="#" className="text-gray-500 hover:text-gray-900">
                        {item}
                      </a>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header> */}

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
            {filteredNFTs.map((nft) => (
              <Card key={nft.id} className="overflow-hidden scale-hover">
                <CardContent className="p-0 overflow-hidden">
                  <Image
                    width={800}
                    height={800}
                    src={nft.image}
                    alt={nft.title}
                    className="w-full h-64 object-cover transform transition-all"
                  />
                </CardContent>
                <CardFooter className="flex flex-col items-start p-4">
                  <h2 className="text-xl font-semibold mb-2">{nft.title}</h2>
                  <div className="flex items-center justify-between w-full mb-4">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={nft.artist} />
                        <AvatarFallback>{nft.artist[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-500">{nft.artist}</span>
                    </div>
                    <span className="text-sm font-medium">
                      {nft.price} {nft.currency}
                    </span>
                  </div>
                  <Button className="w-full" onClick={buyNft}>Buy Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// export default function Market() {
//   return <div className="min-h-screen p-8 pb-20 sm:p-20 flex justify-center items-center">NFT Market</div>;
// }
