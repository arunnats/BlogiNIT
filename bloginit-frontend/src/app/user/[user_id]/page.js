"use client";

import Navbar from "@/app/components/navbar/Navbar";
import Down from "@/app/components/505/Down";
import PostBox from "@/app/components/postBox/PostBoxUserPage";
import UserDesc from "@/app/components/userBlock/userDesc";
import { useBackendStatus } from "@/app/context/BackendStatusContext";
import { use } from "react";

export default function Feed({ params }) {
  const resolvedParams = use(params);
  const userid = resolvedParams.user_id;

  const isBackendUp = useBackendStatus();

  console.log("User ID:", userid);
  console.log("Backend Status:", isBackendUp);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {isBackendUp ? (
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
