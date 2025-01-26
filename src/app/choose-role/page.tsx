import ChooseRole from "@/components/choose-role/ChooseRole";
import Navbar from "@/components/Shared/Navbar";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar></Navbar>
      <ChooseRole></ChooseRole>
    </div>
  );
};

export default page;
