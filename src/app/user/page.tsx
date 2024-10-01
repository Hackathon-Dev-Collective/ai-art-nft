/**
 * @description 个人中心
 */

"use client";
import Image from "next/image";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Box, Image as ImageIcon, DollarSign, Users } from "lucide-react";
import useUser from "@/hooks/useUser";

// Sample user data
const user = {
  name: "Alice Johnson",
  username: "@alicecreates",
  avatar: "/images/demo-03.jpg",
  balance: 5.23,
  followers: 1024,
  following: 256,
};

// Sample NFT data
const nfts = [
  { id: 1, title: "Cosmic Dreamscape", image: "/images/demo-03.jpg", price: 0.5 },
  { id: 2, title: "Neon Cityscape", image: "/images/demo-04.jpg", price: 0.75 },
  { id: 3, title: "Digital Flora", image: "/images/demo-10.jpg", price: 0.3 },
  { id: 4, title: "Quantum Fragments", image: "/images/demo-06.jpg", price: 1.2 },
  { id: 5, title: "Quantum Fragments", image: "/images/demo-07.jpg", price: 1.2 },
  { id: 6, title: "Quantum Fragments", image: "/images/demo-08.jpg", price: 1.2 },
  { id: 7, title: "Quantum Fragments", image: "/images/demo-09.jpg", price: 1.2 },
];

// Sample artwork data
const artworks = [
  { id: 1, title: "Abstract Harmony", image: "/images/demo-04.jpg", likes: 230 },
  { id: 2, title: "Serene Landscape", image: "/images/demo-04.jpg", likes: 189 },
  { id: 3, title: "Urban Rhythm", image: "/images/demo-04.jpg", likes: 275 },
  { id: 4, title: "Ethereal Portrait", image: "/images/demo-04.jpg", likes: 312 },
];

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("nfts");
  useUser()

  return (
    <div className="min-h-screen bg-gray-100 p-8  pb-20 sm:p-20 flex flex-col justify-center items-center">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="md:col-span-2 shadow-md scale-hover">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>{user.username}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  <span className="font-medium text-gray-900">{user.followers}</span> followers
                </div>
                <div className="text-sm text-gray-500">
                  <span className="font-medium text-gray-900">{user.following}</span> following
                </div>
                <Button>Edit Profile</Button>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Wallet Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{user.balance} ETH</div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Add Funds</Button>
            </CardFooter>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="nfts">My NFTs</TabsTrigger>
            <TabsTrigger value="artworks">My Artworks</TabsTrigger>
          </TabsList>
          <TabsContent value="nfts">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {nfts.map((nft) => (
                <Card key={nft.id} className="shadow-md scale-hover">
                  <CardContent className="p-0 overflow-hidden">
                    <Image
                      width={800}
                      height={800}
                      src={nft.image}
                      alt={nft.title}
                      className="w-full h-48 object-cover transform transition-all"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-sm">{nft.title}</CardTitle>
                      <CardDescription>{nft.price} ETH</CardDescription>
                    </div>
                    <Badge variant="secondary">
                      <Box className="h-4 w-4 mr-1" />
                      NFT
                    </Badge>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="artworks">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {artworks.map((artwork) => (
                <Card key={artwork.id} className="shadow-md scale-hover">
                  <CardContent className="p-0 overflow-hidden">
                    <Image
                      width={800}
                      height={800}
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-48 object-cover transform transition-all"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-sm">{artwork.title}</CardTitle>
                      <CardDescription>{artwork.likes} likes</CardDescription>
                    </div>
                    <Badge variant="secondary">
                      <ImageIcon className="h-4 w-4 mr-1" />
                      Art
                    </Badge>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$4,231.89</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Artwork Views</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">+180.1% from last month</p>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total NFTs Sold</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// export default function User() {
//   return <div className="min-h-screen p-8 pb-20 sm:p-20 flex justify-center items-center">User</div>;
// }
