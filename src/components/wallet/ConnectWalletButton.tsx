"use client";
import React from "react";

import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
type ConnectWalletBTN = {
  connected: boolean;
};
const ConnectWalletButton = ({ connected }: ConnectWalletBTN) => {
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
