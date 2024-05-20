"use client";

import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

import { useRouter, usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { start } from "nprogress";
import Link from "next/link";

import Iconify from "#/utils/iconify";

export default function HeaderPopoverMenu({ username, email, setAnchorEl }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <Stack padding="10px" width={170}>
        <Typography variant="subtitle2" color="text.primary" noWrap>
          {username}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {email}
        </Typography>
      </Stack>
      <Divider sx={{ mb: 0.5 }} />
      <Stack padding="4px">
        <Link href="/my/trades">
          <MenuItem
            onClick={() => {
              pathname !== "/my/trades" && start();
              setAnchorEl(null);
            }}
            sx={{
              color: "text.primary",
              justifyContent: "space-between",
            }}
          >
            Сделки
          </MenuItem>
        </Link>
        <Link href="/my/analytics">
          <MenuItem
            onClick={() => {
              pathname !== "/my/analytics" && start();
              setAnchorEl();
            }}
            sx={{
              color: "text.primary",
              justifyContent: "space-between",
            }}
          >
            Аналитика
          </MenuItem>
        </Link>
        <Link href="/my/journal">
          <MenuItem
            onClick={() => {
              pathname !== "/my/journal" && start();
              setAnchorEl(null);
            }}
            sx={{
              color: "text.primary",
              justifyContent: "space-between",
            }}
          >
            Журнал
          </MenuItem>
        </Link>
      </Stack>
      <Divider sx={{ mb: 1 }} />
      <MenuItem
        onClick={() => {
          router.prefetch("/login");
          signOut({ redirect: false }).then(() => {
            setAnchorEl(null);
            start();
            router.push("/login");
          });
        }}
        sx={{ m: "4px", color: "error.main", fontWeight: 700 }}
      >
        <ListItemIcon sx={{ minWidth: "28px !important" }}>
          <Iconify
            icon="line-md:logout"
            color="error.main"
            width={20}
            sx={{ transform: "scaleX(-1)" }}
          />
        </ListItemIcon>
        Выйти
      </MenuItem>
    </>
  );
}
