// import ArtGenerator from "@/components/ArtGenerator";
// import Water from "@/components/Three3D";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import Art3D from "@/components/Art3D";

export default function Home() {
  return (
    <main className="w-full    sm:pt-20 flex flex-col justify-center items-center">
      <div className="w-full h-[60vh] min-h-[700px] mb-12 relative flex flex-col justify-center items-center">
        <Art3D />
        <div className="inset-0 flex flex-col items-center justify-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center z-10">AI NFT NeuroArt</h2>
          {/* <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 text-center leading-tight">
            AI NFT NeuroArt
          </h1> */}
          <p className="text-xl md:text-2xl mb-8 text-center z-10">The Future of Digital Art on the Blockchain</p>
          {/* <p className="mt-4 text-xl md:text-2xl text-blue-100 font-light tracking-wide">
            The Future of Digital Creativity
          </p> */}
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white z-10">
            Explore Collection
          </Button>
        </div>
      </div>

      <section className="px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 container">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">AI-Powered Creation</h3>
          <p className="text-gray-300">
            Harness cutting-edge AI technology to effortlessly generate unique digital artworks. No artistic skills
            required.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Auto NFT Minting</h3>
          <p className="text-gray-300">
            Transform your AI-generated art into NFTs with ease. Simplified minting process lets you focus on creation.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">NFT Marketplace</h3>
          <p className="text-gray-300">
            Showcase and trade your creations in our NFT marketplace. Connect with global collectors and realize the
            value of your art.
          </p>
        </div>
      </section>

      <section className="px-4 flex flex-col justify-center items-center text-center mb-12">
        <h3 className="text-3xl font-bold mb-4">Ready to Start Your AI NFT Journey?</h3>
        <p className="text-xl mb-8">Sign up now and experience the future of AI-driven NFT creation!</p>
        <Link href="/generate" className="flex items-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            Get Started for Free
          </Button>
        </Link>
      </section>
    </main>
  );
  // return (
  //   <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
  //     <main className="w-full flex flex-col gap-8 row-start-2 items-center justify-center relative">
  //       <h1 className="font-bold text-4xl">Revolutionizing Digital Art: How AI is Transforming the Future of NFTs</h1>
  //       <div className="w-full">
  //         <Art3D />
  //       </div>
  //     </main>
  //   </div>
  // );
}
