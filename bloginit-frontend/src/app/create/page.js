"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar/Navbar";
import Down from "../components/505/Down";
import PostCreation from "../components/postCreation/PostCreation";
import Link from "next/link";
import { useBackendStatus } from "@/app/context/BackendStatusContext";

export default function Signup() {
  const backendStatus = useBackendStatus();
  const router = useRouter();

  useEffect(() => {
    if (!backendStatus.isLoggedIn) {
      router.push("/login"); // Redirect to the login page
    }
  }, [backendStatus.isBackendUp, backendStatus.isLoggedIn, router]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {backendStatus.isBackendUp && backendStatus.isLoggedIn ? (
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
