"use client";

import Navbar from "../components/navbar/Navbar";
import Down from "../components/505/Down";
import LoginForm from "../components/loginForm/LoginForm";
import Link from "next/link";
import { useBackendStatus } from "@/app/context/BackendStatusContext";

export default function Login() {
  const backendStatus = useBackendStatus();

  console.log(backendStatus.isBackendUp);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {backendStatus.isBackendUp ? (
        <main className="p-4 flex justify-center ">
          <LoginForm />
        </main>
      ) : (
        <div>
          <Down />
        </div>
      )}
    </div>
  );
}
