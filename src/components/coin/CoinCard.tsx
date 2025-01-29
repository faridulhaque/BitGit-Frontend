import React from "react";
import Link from "next/link";
import { ICoin } from "@/types/coinTypes";
import Image from "next/image";

interface CoinCardProps {
  coin: ICoin;
}

const CoinCard = ({ coin }: CoinCardProps) => {
  return (
    <div className="flex w-full max-w-md items-start gap-4 p-4 bg-white text-black rounded-lg shadow-lg hover:shadow-xl transition mt-5">
      {/* Coin Image */}

      <Image
        src={coin.image || "/placeholder-image.png"}
        alt="Coin Image"
        width={100}
        height={100}
        className="w-[100px] h-[100px] object-cover rounded-md"
      />

      {/* Coin Information */}
      <div className="flex-1 space-y-2">
        {/* Creator Section */}
        <div className="text-sm text-info">
          Created by 🐸{" "}
          <Link href={`/profile/${coin.creator?.id}`}>
            <span className="border-b border-info hover:border-opacity-70 cursor-pointer">
              {coin.creator?.name || "Unknown"}
            </span>
          </Link>
        </div>

        {/* Market Cap */}
        <div className="text-sm text-yellow-500">
          Market Cap: {coin.market_cap || "N/A"} 
        </div>

        {/* Replies */}
        {/* <div className="text-sm text-gray-500">
          Replies: {coin.replies || 0}
        </div> */}

        {/* Coin Name & Ticker */}
        <div className="text-lg font-semibold">
          {coin.name || "Unknown Coin"}{" "}
          <span className="text-xs text-gray-400">{coin.ticker}</span>
        </div>
      </div>
    </div>
  );
};

export default CoinCard;
