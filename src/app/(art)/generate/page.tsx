/**
 * @description ai 生图
 */

"use client";
import Image from "next/image";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Image as ImageIcon, Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast"

import { post } from "@/utils/request";
import useUser from "@/hooks/useUser";

// Sample generated images data
// const sampleImages = [
//   { id: 1, prompt: "A futuristic city with flying cars", image: "/placeholder.svg?height=512&width=512" },
//   { id: 2, prompt: "A serene landscape with a rainbow waterfall", image: "/placeholder.svg?height=512&width=512" },
//   { id: 3, prompt: "A cyberpunk cat in neon-lit alley", image: "/placeholder.svg?height=512&width=512" },
//   {
//     id: 4,
//     prompt: "An abstract representation of artificial intelligence",
//     image: "/placeholder.svg?height=512&width=512",
//   },
// ];

export default function AIImageGeneration() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast()
  // const { isConnected } = useUser();
  useUser();
  // const [generatedImages, setGeneratedImages] = useState(sampleImages);
  const [generatedImage, setGeneratedImage] = useState({
    cid: "",
    prompt: "",
    image: "/images/demo-03.jpg",
  });

  // Initialize the client with your API key
  // const imagine = imageClient("vk-FQtiyfFTMDD5qhYCGDKPXe3CcbjmgrdYU25mmo8EUZF3aE");

  // const generateImage = async () => {
  //   // Generate an image with the Imagine API
  //   const response = await imagine.generations(
  //     `A vibrant and whimsical fantasy forest with magical creatures, glowing plants, and a flowing river, in a digital painting style inspired by video games like Ori and the Blind Forest.`,
  //     {
  //       style: GenerationStyle.IMAGINE_V5,
  //     }
  //   );

  //   // Check if the request was successful
  //   if (response.status() === Status.OK) {
  //     const image = response.getOrThrow();
  //     image.asFile("output.png");
  //   } else {
  //     console.log(response.errorOrThrow());
  //   }
  // };

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    const params = {
      prompt,
      style: "scofield", //Option[]
      price: 0.0001,
    };
    try {
      const response = await post("/img/generator", params);
      console.log({ response });
       toast({
         variant:"default",
         description: `Sucess!`,
        })
      setGeneratedImage(
        Object.assign(generatedImage, {
          cid: response.data.cid,
          image: `https://gateway.pinata.cloud/ipfs/${response.data.cid}`,
        })
      );
      console.log({ generatedImage });
      setIsGenerating(false);
      setPrompt("");
    } catch (error) {
      console.log({ error });
       toast({
        variant: "destructive",
          description: `${error.message}`,
        })
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 pb-20 sm:p-20 flex flex-col justify-center items-center">
      <div className="max-w-6xl mx-auto mt-10">
        <h1 className="text-gray-900 text-4xl font-bold text-center mb-8">AI Image Generation</h1>

        <Card className="mb-8 shadow-md">
          <CardHeader>
            <CardTitle>Generate Your Image</CardTitle>
            <CardDescription>Enter a detailed description of the image you want to create</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleClick}>
              <Textarea
                placeholder="A futuristic cityscape with flying cars and neon billboards..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="mb-4"
                rows={4}
              />
              <Button type="submit" disabled={isGenerating || prompt.trim() === ""}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Generate Image
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <h2 className="text-gray-800 text-2xl font-semibold mb-4">Generated Images</h2>
        <div className="w-full">
          <Card className="shadow-md">
            <CardContent className="p-4">
              <Image
                width={800}
                height={800}
                src={generatedImage.image}
                alt={generatedImage.prompt}
                className="w-full h-full object-cover rounded-md mb-4"
              />
              <p className="text-sm text-gray-600 mb-2">{generatedImage.prompt}</p>
              <div className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
          {/* {generatedImages.map((img) => (
            <Card key={img.id} className="shadow-md">
              <CardContent className="p-4">
                <Image
                  width={800}
                  height={800}
                  src={img.image}
                  alt={img.prompt}
                  className="w-full h-64 object-cover rounded-md mb-4"
                />
                <p className="text-sm text-gray-600 mb-2">{img.prompt}</p>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))} */}
        </div>

        <Card className="mt-12 shadow-md">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>Enter a detailed description of the image you want to create in the text area above.</li>
              <li>Click the "Generate Image" button to start the AI image generation process.</li>
              <li>Wait a few moments while our advanced AI model creates your image based on the prompt.</li>
              <li>Once generated, your image will appear in the gallery below the form.</li>
              <li>You can download or share your generated images using the buttons provided.</li>
            </ol>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">
              Note: The AI model has been trained on a diverse range of images and can generate a wide variety of
              content. However, it may sometimes produce unexpected or imperfect results.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

// import ArtGenerator from "@/components/ArtGenerator";

// export default function Art() {
//   return (
//     <div className="min-h-screen p-8 pb-20 sm:p-20 flex justify-center items-center">
//       <h1>Generate the Art </h1>
//       <ArtGenerator />
//     </div>
//   );
// }
