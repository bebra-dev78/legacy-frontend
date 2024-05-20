"use client";

import Typography from "@mui/material/Typography";

import { usePathname } from "next/navigation";
import { start } from "nprogress";
import Link from "next/link";

export default function LinkToPolicy() {
  const pathname = usePathname();

  return (
    <Link
      href="/privacy-policy"
      onClick={() => pathname !== "/privacy-policy" && start()}
    >
      <Typography
        variant="body2"
        color={
          pathname === "/privacy-policy" ? "primary.main" : "text.secondary"
        }
        sx={{
          "&:hover": { textDecoration: "underline" },
        }}
      >
        Политика конфиденциальности
      </Typography>
    </Link>
  );
}
