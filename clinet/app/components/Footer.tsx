import React from "react";
import Link from "next/link";
import { useEffect } from "react";

const Footer = () => {
  return (
    <div className="Footer">
      <ul className="FooterList">
        <li>
          <Link href="./Login">HOME</Link>
        </li>
        <li>
          <Link href="./Login">Log Out</Link>
        </li>
        <li>HELP</li>
      </ul>
    </div>
  );
};

export default Footer;
