import React from "react";
import Image from "next/image";
import Logo from "../assets/logo.png";
import Link from "next/link";

const AppBar = () => {
  return (
    <div className="px-[200px] py-5">
      <Link href="/">
        <>
          <Image src={Logo} alt="logo" className="cursor-pointer" />
        </>
      </Link>
    </div>
  );
};

export default AppBar;
