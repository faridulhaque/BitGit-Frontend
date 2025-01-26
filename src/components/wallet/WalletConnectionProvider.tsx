"use client";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  Coin98WalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { NightlyWalletAdapter } from "@solana/wallet-adapter-nightly";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";

const WalletConnectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new NightlyWalletAdapter(),
      new Coin98WalletAdapter(),
    ],
    []
  );

  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletConnectionProvider;
