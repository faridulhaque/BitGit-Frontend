import CreateCoinForm from "@/components/coin/CreateCoinForm";
import Navbar from "@/components/Shared/Navbar";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar></Navbar>
      <CreateCoinForm></CreateCoinForm>
    </div>
  );
};

export default page;
