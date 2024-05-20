"use client";

import { start, done } from "nprogress";
import Image from "next/image";
import Link from "next/link";

import logo from "#/public/svg/logo.svg";

export default function AppLogo() {
  return (
    <Link
      href="/"
      onClick={() => {
        start();
        done();
      }}
    >
      <Image src={logo} width={40} height={40} alt="tradify" />
    </Link>
  );
}
