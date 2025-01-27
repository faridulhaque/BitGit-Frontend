import Navbar from "@/components/Shared/Navbar";
import ConnectWallet from "@/components/wallet/ConnectWallet";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar></Navbar>
      <ConnectWallet></ConnectWallet>
    </div>
  );
};

export default page;
