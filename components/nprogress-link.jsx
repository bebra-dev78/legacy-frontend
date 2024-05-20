"use client";

import { start } from "nprogress";
import Link from "next/link";

export default function NProgressLink({ children, path, ...other }) {
  return (
    <Link href={path} onClick={() => start()} {...other}>
      {children}
    </Link>
  );
}
