"use client";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import { usePathname } from "next/navigation";
import { start } from "nprogress";
import Link from "next/link";

import { useMode } from "#/components/global/theme-registry";
import IconBox from "#/components/other/icon-box";

const navLinks = [
  { path: "/my/overview", label: "Главная", iconUrl: "/svg/overview.svg" },
  { path: "/my/analytics", label: "Аналитика", iconUrl: "/svg/analytics.svg" },
  { path: "/my/trades", label: "Сделки", iconUrl: "/svg/trades.svg" },
  { path: "/my/journal", label: "Журнал", iconUrl: "/svg/journal.svg" },
  { path: "/my/account", label: "Аккаунт", iconUrl: "/svg/account.svg" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { mode } = useMode();

  const isActive = (path) => pathname === path;

  return (
    <Paper
      sx={{
        p: 0,
        pb: 2,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        display: "flex",
        borderRadius: 0,
        position: "fixed",
        justifyContent: "center",
        backdropFilter: "blur(28px)",
        height: "calc(80px + env(safe-area-inset-bottom))",
        backgroundColor:
          mode === "dark" ? "rgba(22, 28, 36, .9)" : "rgba(249, 250, 251, .9)",
      }}
    >
      {navLinks.map(({ path, label, iconUrl }) => (
        <Link
          key={path}
          href={path}
          onClick={() => !isActive(path) && start()}
          style={{
            border: 0,
            gap: "2px",
            userSelect: "none",
            padding: "0px 12px",
            alignItems: "center",
            position: "relative",
            display: "inline-flex",
            verticalAlign: "middle",
            flexDirection: "column",
            justifyContent: "center",
            transition:
              "color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,padding-top 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          }}
        >
          <IconBox
            iconUrl={iconUrl}
            iconWidth="20px"
            iconColor={isActive(path) ? "text.primary" : "text.secondary"}
          />
          <Typography
            variant="caption"
            fontWeight={isActive(path) ? 600 : 400}
            color={isActive(path) ? "text.primary" : "text.secondary"}
          >
            {label}
          </Typography>
        </Link>
      ))}
    </Paper>
  );
}
