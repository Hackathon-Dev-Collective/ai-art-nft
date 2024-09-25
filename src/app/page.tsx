import ArtGenerator from "@/components/ArtGenerator";
import Water from "@/components/Three3D";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* sm:items-start */}
      <main className="w-full flex flex-col gap-8 row-start-2 items-center justify-center ">
        <Water />
        <ArtGenerator />
      </main>
    </div>
  );
}
