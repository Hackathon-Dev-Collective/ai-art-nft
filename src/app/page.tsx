// import ArtGenerator from "@/components/ArtGenerator";
// import Water from "@/components/Three3D";
"use client";
// import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Art3D from "@/components/Art3D";

import useUser from "@/hooks/useUser";

// Sample data for images
const initialImages = [
  {
    id: 1,
    src: "/images/demo-01.jpg",
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
    src: "/images/demo-09.jpg",
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
    src: "/images/demo-10.jpg",
    alt: "Abstract Art 3",
    title: "Digital Bloom",
    author: {
      name: "Carol Davis",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    likes: 1536,
    isFavorite: false,
  },
];

const upcommingImages = [
  {
    id: 1,
    src: "/images/demo-05.jpg",
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
    src: "/images/demo-07.jpg",
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
    src: "/images/demo-08.jpg",
    alt: "Abstract Art 3",
    title: "Digital Bloom",
    author: {
      name: "Carol Davis",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    likes: 1536,
    isFavorite: false,
  },
];
// const getImageList = async () => {
//   const res = await fetch("http://5j3iep.natappfree.cc/img/public_img_list?sort_by=likes");
//   const jsonRes = await res.json();
//   console.log({ jsonRes });
// };

export default function Home() {
  const [images, setImages] = useState(initialImages);
  const [upcomming, setUpcomming] = useState(upcommingImages);
  const { address, chain, chainId, connector, status, token, nonce, message } = useUser();
  console.log({ address, chain, chainId, connector, status, token, nonce, message });

  return (
    <main className="w-full    sm:pt-20 flex flex-col justify-center items-center">
      <div className="w-full h-[60vh] min-h-[700px] mb-12 relative flex flex-col justify-center items-center">
        <Art3D />
        <div className="inset-0 flex flex-col items-center justify-center">
          <h2 className="text-gray-900 text-5xl md:text-6xl font-bold mb-4 text-center z-10">AI NFT NeuroArt</h2>
          <p className="text-gray-900 text-xl md:text-2xl mb-8 text-center z-10">
            The Future of Digital Art on the Blockchain
          </p>
           <Link href="/generate" className="flex items-center">
          <Button
            size="lg"
            className="text-white z-10 hover:bg-black/80 duration-300 transition-colors border border-transparent"
          >
            Explore Collection
          </Button>
          </Link>
        </div>
      </div>
      <h3 className="text-gray-900 text-3xl font-bold mb-4">Providing Value with Endless Features</h3>
      <section className="mb-12 p-10 bg-gradient-to-r from-slate-50 to-slate-200 rounded">
        <section className="px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 container ">
          <div className="bg-gray-100 p-6 p-6 rounded-lg  shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">AI-Powered Creation</h3>
            <p className="text-gray-400">
              Harness cutting-edge AI technology to effortlessly generate unique digital artworks. No artistic skills
              required.
            </p>
          </div>
          <div className="bg-gray-100 p-6 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Auto NFT Minting</h3>
            <p className="text-gray-400">
              Transform your AI-generated art into NFTs with ease. Simplified minting process lets you focus on
              creation.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">NFT Marketplace</h3>
            <p className="text-gray-400">
              Showcase and trade your creations in our NFT marketplace. Connect with global collectors and realize the
              value of your art.
            </p>
          </div>
        </section>
        <section className="px-4 flex flex-col justify-center items-center text-center mb-12">
          <h3 className="text-gray-900 text-3xl font-bold mb-4">Ready to Start Your AI NFT Journey?</h3>
          <p className="text-gray-900 text-xl mb-8">Sign up now and experience the future of AI-driven NFT creation!</p>
          <Link href="/generate" className="flex items-center">
            <Button size="lg" className="text-white">
              Get Started for Free
            </Button>
          </Link>
        </section>
      </section>

      {/* upcoming */}
      <h3 className="text-gray-900 text-3xl font-bold mb-4">Upcoming Releases</h3>
      <section className="px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 container">
        {upcomming.map((image) => (
          <Card key={image.id} className="overflow-hidden shadow-md scale-hover">
            <CardContent className="p-0 relative overflow-hidden">
              <Image
                width={800}
                height={800}
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover  transform transition-all"
              />
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4">
              <div className="flex items-center justify-between w-full mb-2">
                <h2 className="text-xl font-semibold">{image.title}</h2>
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src={image.author.avatar} alt={image.author.name} />
                    <AvatarFallback>{image.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{image.author.name}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </section>
      {/* release */}
      <h3 className="text-gray-900 text-3xl font-bold mb-4">Recent Releases</h3>
      <section className="px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 container">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden shadow-md scale-hover">
            <CardContent className="p-0 relative overflow-hidden ">
              <Image
                width={800}
                height={800}
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transform transition-all"
              />
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4">
              <div className="flex items-center justify-between w-full mb-2">
                <h2 className="text-xl font-semibold">{image.title}</h2>
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src={image.author.avatar} alt={image.author.name} />
                    <AvatarFallback>{image.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{image.author.name}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </section>
    </main>
  );
}
