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

import { getImageList,vote } from "@/service/index";

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

  const toggleFavorite = async (id: number) => {
   
    const voteRes = await vote({cid:id})
     console.log({id,voteRes})
     getImages()
    // setImages(images.map((img) => (img.id === id ? { ...img, isFavorite: !img.isFavorite } : img)));
  };

  const formatLikes = (likes: number) => {
    return likes >= 1000 ? `${(likes / 1000).toFixed(1)}k` : likes.toString();
  };
  // author_address: "0x5C237e4b5D68Beaa0215E4c2621D01739cdE52e8";
  // cid: "Qmd4s3fKRVEgn3WBks4d7mQoXhj8rNoeLKZH2ypg6S5eJL";
  // created_at: 1727845212;
  // is_uplinked: false;
  // likes_count: 0;
  // owner_address: "0x5C237e4b5D68Beaa0215E4c2621D01739cdE52e8";
  // price: 26;
  // prompt: "a women";
  const getImages = async () => {
    const res = await getImageList();
    let imageArr: any[] = [];
    //   id: 6,
    // src: "/images/demo-22.png",
    // alt: "Abstract Art 4",
    // title: "Quantum Patterns",
    // author: {
    //   name: "David Wilson",
    //   avatar: "/placeholder.svg?height=40&width=40",
    // },
    // likes: 900,
    // isFavorite: true,
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

  const voteHandle = () => {
    console.log("vote");
  };

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
                onClick={() => toggleFavorite(image.id)}
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

// export default function ImageList() {
//   return <div className="min-h-screen p-8 pb-20 sm:p-20 flex justify-center items-center">ImageList</div>;
// }
