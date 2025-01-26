"use client";

import { useRouter } from "next/navigation";

export default function GitHubLogin() {
  const router = useRouter();
  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI;

    router.push(
      `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`
    );
  };

  return (
    <div className="flex items-center justify-center h-40">
      <button
        onClick={handleLogin}
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        Login with GitHub
      </button>
    </div>
  );
}
