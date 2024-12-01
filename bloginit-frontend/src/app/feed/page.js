"use client";

import Navbar from "../components/navbar/Navbar";
import Down from "../components/505/Down";
import PostBox from "../components/postBox/PostBox";
import Link from "next/link";
import { useBackendStatus } from "@/app/context/BackendStatusContext";

export default function Signup() {
  const backendContext = useBackendStatus();

  //console.log(backendContext.isBackendUp);

  if (backendContext.isBackendUp === null) {
    return <Down />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {backendContext.isBackendUp ? (
        <main className="p-4 flex flex-row justify-center">
          <PostBox />
        </main>
      ) : (
        <div>
          <Down />
        </div>
      )}
    </div>
  );
}
