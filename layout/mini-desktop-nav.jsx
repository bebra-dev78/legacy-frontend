"use client";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { usePathname } from "next/navigation";
import { useState, memo } from "react";
import { start } from "nprogress";
import Link from "next/link";

import IconBox from "#/components/other/icon-box";
import AppLogo from "#/components/app-logo";
import Iconify from "#/utils/iconify";

const navLinks = [
  { path: "/my/overview", label: "Главная", iconUrl: "/svg/overview.svg" },
  { path: "/my/trades", label: "Сделки", iconUrl: "/svg/trades.svg" },
  { path: "/my/analytics", label: "Аналитика", iconUrl: "/svg/analytics.svg" },
  { path: "/my/journal", label: "Журнал", iconUrl: "/svg/journal.svg" },
];

function NavLinks() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <>
      {navLinks.map(({ path, label, iconUrl }) => (
        <Link key={path} href={path}>
          <ListItemButton
            onClick={() => !isActive(path) && start()}
            sx={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              lineHeight: "16px",
              minHeight: "56px",
              maxWidth: "85px",
              pr: "24px",
              pl: "24px",
              color: isActive(path) ? "primary.light" : "text.secondary",
              backgroundColor: isActive(path)
                ? "rgba(0, 167, 111, 0.08)"
                : "transparent",
              "&:hover": {
                backgroundColor: isActive(path)
                  ? "rgba(0, 167, 111, 0.16)"
                  : "rgba(145, 158, 171, 0.08)",
              },
            }}
          >
            <IconBox iconUrl={iconUrl} />
            <ListItemText
              sx={{ mb: "auto" }}
              primaryTypographyProps={{
                variant: "body2",
                sx: {
                  fontWeight: isActive(path) ? 600 : 400,
                  fontSize: "10px",
                },
              }}
            >
              {label}
            </ListItemText>
          </ListItemButton>
        </Link>
      ))}
      <InfoPopover />
      <Link href="/my/profile">
        <ListItemButton
          onClick={() => !isActive("/my/profile") && start()}
          sx={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            lineHeight: "16px",
            minHeight: "56px",
            maxWidth: "85px",
            pr: "24px",
            pl: "24px",
            color: isActive("/my/profile") ? "primary.light" : "text.secondary",
            backgroundColor: isActive("/my/profile")
              ? "rgba(0, 167, 111, 0.08)"
              : "transparent",
            "&:hover": {
              backgroundColor: isActive("/my/profile")
                ? "rgba(0, 167, 111, 0.16)"
                : "rgba(145, 158, 171, 0.08)",
            },
          }}
        >
          <IconBox iconUrl="/svg/profile.svg" />
          <ListItemText
            sx={{ mb: "auto" }}
            primaryTypographyProps={{
              variant: "body2",
              sx: {
                fontWeight: isActive("/my/profile") ? 600 : 400,
                fontSize: "10px",
              },
            }}
          >
            Профиль
          </ListItemText>
        </ListItemButton>
      </Link>
      <a href="https://t.me/tradifyy" target="_blank">
        <ListItemButton
          sx={{
            color: "text.secondary",
            backgroundColor: "transparent",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            lineHeight: "16px",
            minHeight: "56px",
            maxWidth: "85px",
            pr: "24px",
            pl: "24px",
            "&:hover": {
              backgroundColor: "rgba(145, 158, 171, 0.08)",
            },
          }}
        >
          <IconBox iconUrl={"/svg/external.svg"} />
          <ListItemText
            sx={{ mb: "auto" }}
            primaryTypographyProps={{
              variant: "body2",
              sx: { fontWeight: 600, fontSize: "10px" },
            }}
          >
            Telegram
          </ListItemText>
        </ListItemButton>
      </a>
    </>
  );
}

function InfoPopover() {
  const pathname = usePathname();

  const [anchorEl, setAnchorEl] = useState(null);

  const faq = pathname === "/my/faq";
  const news = pathname === "/my/news";
  const community = pathname === "/my/community";

  const summary = faq || news || community;

  const open = Boolean(anchorEl);

  return (
    <>
      <ListItemButton
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
        sx={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          lineHeight: "16px",
          minHeight: "56px",
          maxWidth: "85px",
          color: summary ? "primary.light" : "text.secondary",
          backgroundColor: summary ? "rgba(0, 167, 111, 0.08)" : "transparent",
          "&:hover": {
            backgroundColor: summary
              ? "rgba(0, 167, 111, 0.16)"
              : "rgba(145, 158, 171, 0.08)",
          },
        }}
      >
        <IconBox iconUrl="/svg/info.svg" />
        <ListItemText
          sx={{ mb: "auto" }}
          primaryTypographyProps={{
            variant: "body2",
            fontWeight: 600,
            fontSize: "10px",
          }}
        >
          Информация
        </ListItemText>
        <Iconify
          icon={open ? "eva:arrow-ios-back-fill" : "eva:arrow-ios-forward-fill"}
          sx={{
            top: "12px",
            right: "8px",
            width: "16px",
            height: "16px",
            position: "absolute",
          }}
        />
      </ListItemButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        disableRestoreFocus
        disableScrollLock
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        onClose={() => {
          setAnchorEl(null);
        }}
        slotProps={{ paper: { style: { backgroundImage: "none" } } }}
      >
        <Link href="/my/faq">
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              !faq && start();
            }}
            sx={{
              mb: 0,
              transition:
                "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              fontWeight: faq ? 600 : 400,
              color: faq ? "text.primary" : "text.secondary",
            }}
          >
            FAQ
          </MenuItem>
        </Link>
        <Divider sx={{ m: "4px 0" }} />
        <Link href="/my/news">
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              !news && start();
            }}
            sx={{
              mb: 0,
              transition:
                "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              fontWeight: news ? 600 : 400,
              color: news ? "text.primary" : "text.secondary",
            }}
          >
            Новости
          </MenuItem>
        </Link>
        <Divider sx={{ m: "4px 0" }} />
        <Link href="/my/community">
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              !community && start();
            }}
            sx={{
              mb: 0,
              transition:
                "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              fontWeight: community ? 600 : 400,
              color: community ? "text.primary" : "text.secondary",
            }}
          >
            Сообщество
          </MenuItem>
        </Link>
      </Popover>
    </>
  );
}

const MiniDesktopNav = memo(function MiniDesktopNav({ setOpenSidebar }) {
  return (
    <>
      <IconButton
        onClick={() => {
          setOpenSidebar(true);
          localStorage.setItem("sidebar", JSON.stringify(true));
        }}
        sx={{
          p: "4px",
          top: "22px",
          left: "85px",
          zIndex: 1101,
          width: "26px",
          height: "26px",
          position: "fixed",
          fontSize: "1.125rem",
          backdropFilter: "blur(6px)",
          border: "1px dashed rgba(145, 158, 171, 0.24)",
        }}
      >
        <Iconify
          icon="eva:arrow-ios-forward-fill"
          color="text.secondary"
          width={16}
        />
      </IconButton>
      <Stack
        height="100%"
        position="fixed"
        paddingBottom="16px"
        borderRight="1px dashed rgba(145, 158, 171, 0.24)"
      >
        <Box
          sx={{
            m: "16px auto",
          }}
        >
          <AppLogo />
        </Box>
        <Stack gap={1} padding="0 6px">
          <NavLinks />
        </Stack>
      </Stack>
    </>
  );
});

export default MiniDesktopNav;
