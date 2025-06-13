import Image from "next/image";
import React from "react";
import logoSm from "@/assets/images/logo-sm.png";
import logoDark from "@/assets/images/logo-dark.png";

const LogoBox = () => {
  return (
    <a href="/" className="logo">
      <span className="logo-light">
        <span className="logo-lg">
          <Image width={120} height={30} src={logoDark} alt="logo" />
        </span>
        <span className="logo-sm">
          <Image width={40} height={50} src={logoSm} alt="small logo" />
        </span>
      </span>
      <span className="logo-dark">
        <span className="logo-lg">
          <Image width={120} height={30} src={logoDark} alt="dark logo" />
        </span>
        <span className="logo-sm">
          <Image width={40} height={50} src={logoSm} alt="small logo" />
        </span>
      </span>
    </a>
  );
};

export default LogoBox;
