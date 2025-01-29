import Instructions from "@/components/instructions/Instruction";
import Navbar from "@/components/Shared/Navbar";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Instructions></Instructions>
      <div className="py-6"></div>
    </div>
  );
};

export default page;
