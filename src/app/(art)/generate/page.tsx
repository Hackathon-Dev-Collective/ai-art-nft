/**
 * @description ai 生图
 */

"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Image as ImageIcon, Download, Share2 } from "lucide-react";

// Sample generated images data
const sampleImages = [
  { id: 1, prompt: "A futuristic city with flying cars", image: "/placeholder.svg?height=512&width=512" },
  { id: 2, prompt: "A serene landscape with a rainbow waterfall", image: "/placeholder.svg?height=512&width=512" },
  { id: 3, prompt: "A cyberpunk cat in neon-lit alley", image: "/placeholder.svg?height=512&width=512" },
  {
    id: 4,
    prompt: "An abstract representation of artificial intelligence",
    image: "/placeholder.svg?height=512&width=512",
  },
];

export default function AIImageGeneration() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState(sampleImages);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    // Simulate image generation
    setTimeout(() => {
      const newImage = {
        id: generatedImages.length + 1,
        prompt: prompt,
        image: `/images/demo-05.jpg?height=512&width=512&text=${encodeURIComponent(prompt)}`,
      };
      setGeneratedImages([newImage, ...generatedImages]);
      setIsGenerating(false);
      setPrompt("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 pb-20 sm:p-20 flex flex-col justify-center items-center">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-gray-900 text-4xl font-bold text-center mb-8">AI Image Generation</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Generate Your Image</CardTitle>
            <CardDescription>Enter a detailed description of the image you want to create</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
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

        <h2 className="text-2xl font-semibold mb-4">Generated Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {generatedImages.map((img) => (
            <Card key={img.id}>
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
          ))}
        </div>

        <Card className="mt-12">
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
