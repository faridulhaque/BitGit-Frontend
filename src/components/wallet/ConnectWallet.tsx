"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ConnectWallet() {
  const router = useRouter();
  const { connected } = useWallet();

  const handleSkip = () => {
    router.push("/");
  };

  useEffect(() => {
    if (connected) {
      router.push("/");
    }
  }, [connected, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-center mb-4">
        Connect Your Wallet
      </h2>
      <p className="text-gray-700 text-center mb-6 max-w-lg">
        To create a coin or receive rewards, connecting your wallet is
        necessary. You can find the <strong>Connect Wallet</strong> button at
        the top right corner of the navigation bar.
      </p>

      <button
        onClick={handleSkip}
        className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700 transition-all"
      >
        I will connect later
      </button>
    </div>
  );
}
