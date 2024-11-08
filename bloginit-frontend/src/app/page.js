"use client";

import Navbar from "./components/navbar/Navbar";
import Link from "next/link";
import { useBackendStatus } from "@/app/context/BackendStatusContext";

export default function Home() {
  const isBackendUp = useBackendStatus();

  console.log(isBackendUp);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="p-4 flex flex-row mt-28">
        <div className="w-[60%] flex flex-col justify-center items-center">
          {" "}
          <h3 className="font-aloevera text-[13vw] text-accent">BlogiNIT</h3>
          <p className="font-poppins text-[3vw] text-foreground -translate-y-8">
            Your thoughts. Unfiltered.
          </p>
          <div className="flex flex-row gap-4">
            <Link
              className="btn bg-accent border-0 px-20 text-foreground font-poppinsbold text-lg 
               hover:bg-foreground hover:text-background"
              href="/profile"
            >
              Visit the feed!
            </Link>
            <Link
              className="btn bg-accent border-0 px-20 text-foreground font-poppinsbold text-lg 
hover:bg-foreground hover:text-background"
              href="/profile"
            >
              Make a post!
            </Link>
          </div>
        </div>
        <div className="w-[40%] flex flex-col">
          <p className="font-poppins text-[1.5vw] text-foreground text-justify p-10 pb-3 -translate-x-4 translate-y-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="font-poppins text-[1.5vw] text-foreground text-justify p-10 pt-3 -translate-x-4 translate-y-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </main>
    </div>
  );
}
