"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/navbar/Navbar";
import Down from "@/app/components/505/Down";
import PostBox from "@/app/components/postBox/PostBoxUserPage";
import UserDesc from "@/app/components/userBlock/userDesc";
import { useBackendStatus } from "@/app/context/BackendStatusContext";
import { use } from "react";

export default function Feed({ params }) {
  const resolvedParams = use(params);
  const userid = resolvedParams.user_id;
  const router = useRouter();
  const backendStatus = useBackendStatus();

  useEffect(() => {
    if (!backendStatus.isLoggedIn) {
      router.push("/login"); // Redirect to the login page
    }
  }, [backendStatus.isBackendUp, backendStatus.isLoggedIn, router]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {backendStatus.isBackendUp && backendStatus.isLoggedIn ? (
        <main className="p-4 flex flex-col justify-center items-center gap-4">
          <UserDesc />
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
