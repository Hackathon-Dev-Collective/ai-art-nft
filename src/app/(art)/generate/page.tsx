import ArtGenerator from "@/components/ArtGenerator";

export default function Art() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 flex justify-center items-center">
      <h1>Generate the Art </h1>
      <ArtGenerator />
    </div>
  );
}
