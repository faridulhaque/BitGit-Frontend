"use client";
import { useGetCoinsQuery } from "@/services/api/coinApi";
import React from "react";
import CoinCard from "./CoinCard";
import { ICoin } from "@/types/coinTypes";

const Coins = () => {
  const { data: coinsData } = useGetCoinsQuery("");
  const coins = coinsData?.data;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {coins.map((coin: ICoin) => (
        <CoinCard key={coin.id} coin={coin} />
      ))}
    </div>
  );
};

export default Coins;
