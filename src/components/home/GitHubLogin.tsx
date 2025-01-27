"use client";

import { GlobalContext } from "@/app/layout";
import { TContext } from "@/types/contextTypes";
import { UserRole } from "@/types/userTypes";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function GitHubLogin() {
  const router = useRouter();
  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI;

    router.push(
      `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`
    );
  };
  const value = useContext(GlobalContext);
  const { user } = value as TContext;

  return (
    <div className="flex items-center justify-center h-40">
      {!user ? (
        <button
          onClick={handleLogin}
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Login with GitHub
        </button>
      ) : user.role === UserRole.Creator ? (
        <button
          onClick={() => router.push("/create-coin")}
          className="bg-green-500 text-white px-6 py-3 rounded-lg"
        >
          Create a Coin
        </button>
      ) : (
        <button
          onClick={() => router.push("/claim-reward")}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg"
        >
          Claim Reward
        </button>
      )}
    </div>
  );
}
