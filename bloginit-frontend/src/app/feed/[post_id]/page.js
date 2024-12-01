"use client";

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

  const isBackendUp = useBackendStatus();

  console.log("Post ID:", postId);
  console.log("Backend Status:", isBackendUp);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {isBackendUp ? (
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
