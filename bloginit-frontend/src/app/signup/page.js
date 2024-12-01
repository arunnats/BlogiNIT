"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar/Navbar";
import Down from "../components/505/Down";
import ProfileCreation from "../components/profileCreation/ProfileCreation";
import Link from "next/link";
import { useBackendStatus } from "@/app/context/BackendStatusContext";

export default function Signup() {
  const backendStatus = useBackendStatus();
  const router = useRouter();

  useEffect(() => {
    if (backendStatus.isBackendUp && backendStatus.isLoggedIn) {
      router.push("/"); // Redirect to the home page
    }
  }, [backendStatus.isBackendUp, backendStatus.isLoggedIn, router]);

  //console.log(backendStatus.isBackendUp);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {backendStatus.isBackendUp ? (
        <main className="p-4 flex flex-row justify-center">
          {" "}
          <ProfileCreation />
        </main>
      ) : (
        <div>
          <Down />
        </div>
      )}
    </div>
  );
}
