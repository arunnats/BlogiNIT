"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/navbar/Navbar";
import Down from "../../components/505/Down";
import PostBox from "../../components/postBox/PostBoxFull";
import CommentSection from "../../components/commentSection/CommentSection";
import Link from "next/link";
import { useBackendStatus } from "@/app/context/BackendStatusContext";
import { use } from "react";

export default function Feed({ params }) {
  const resolvedParams = use(params);
  const postId = resolvedParams.post_id;
  const backendStatus = useBackendStatus();
  const router = useRouter();

  useEffect(() => {
    if (!backendStatus.isLoggedIn) {
      router.push("/login"); // Redirect to the login page
    }
  }, [backendStatus.isBackendUp, backendStatus.isLoggedIn, router]);

  console.log("Post ID:", postId);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {backendStatus.isBackendUp && backendStatus.isLoggedIn ? (
        <main className="p-4 flex flex-col justify-center items-center gap-4">
          <PostBox />
          <CommentSection />
        </main>
      ) : (
        <div>
          <Down />
        </div>
      )}
    </div>
  );
}
