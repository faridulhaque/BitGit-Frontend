"use client";
import React from "react";

import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const ConnectWalletButton = () => {
  const { connected } = useWallet();

  return (
    <>
      <div>
        <WalletModalProvider>
          <WalletMultiButton>
            {!connected && " Connect Wallet"}
          </WalletMultiButton>
        </WalletModalProvider>
      </div>
    </>
  );
};

export default ConnectWalletButton;
