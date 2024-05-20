"use client";

import { usePathname } from "next/navigation";
import { configure, done } from "nprogress";
import { useEffect } from "react";

configure({
  showSpinner: false,
});

export default function NavigationEvents() {
  const pathname = usePathname();

  useEffect(() => {
    done();
  }, [pathname]);
}
