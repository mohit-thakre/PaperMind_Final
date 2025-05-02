import DashboardImage from "@/components/home/DashboardImage";
import Hero from "@/components/home/Home";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" w-full max-w-5xl h-full mx-auto flex justify-center flex-col items-center   ">
      <Hero />
    </div>
  );
}
