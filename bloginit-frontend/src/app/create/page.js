"use client";

import Navbar from "../components/navbar/Navbar";
import Down from "../components/505/Down";
import PostCreation from "../components/postCreation/PostCreation";
import Link from "next/link";
import { useBackendStatus } from "@/app/context/BackendStatusContext";

export default function Signup() {
  const isBackendUp = useBackendStatus();

  console.log(isBackendUp);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {isBackendUp ? (
        <main className="p-4 flex flex-row justify-center">
          {" "}
          <PostCreation />
        </main>
      ) : (
        <div>
          <Down />
        </div>
      )}
    </div>
  );
}
