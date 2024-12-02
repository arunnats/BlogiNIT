"use client";

import Navbar from "./components/navbar/Navbar";
import Link from "next/link";
import { useBackendStatus } from "@/app/context/BackendStatusContext";

export default function Home() {
  const isBackendUp = useBackendStatus();

  //console.log(isBackendUp);
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
              href="/feed"
            >
              Visit the feed!
            </Link>
            <Link
              className="btn bg-accent border-0 px-20 text-foreground font-poppinsbold text-lg 
hover:bg-foreground hover:text-background"
              href="/create"
            >
              Make a post!
            </Link>
          </div>
        </div>
        <div className="w-[40%] flex flex-col">
          <p className="font-poppins text-[1.5vw] text-foreground text-justify p-10 pb-3 -translate-x-4 translate-y-7">
            BlogiNIT is the perfect way to make your thoughts public and share
            them with the world. Create posts, comment on them and let your
            thoughts run free
          </p>
          <p className="font-poppins text-[1.5vw] text-foreground text-justify p-10 py-3 -translate-x-4 translate-y-7">
            Created as as part of the S5 DBMS course at NIT Calicut by:
          </p>
          <p className="font-poppins text-[1.5vw] text-foreground text-justify p-10 py-0 -translate-x-4 translate-y-7">
            Arun Natarajan
          </p>
          <p className="font-poppins text-[1.5vw] text-foreground text-justify p-10 py-0 -translate-x-4 translate-y-7">
            Hafeez Muhammed{" "}
          </p>
          <p className="font-poppins text-[1.5vw] text-foreground text-justify p-10 py-0 -translate-x-4 translate-y-7">
            Kamble Aditya Dattatray
          </p>
        </div>
      </main>
    </div>
  );
}
