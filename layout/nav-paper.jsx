"use client";

import ListItemButton from "@mui/material/ListItemButton";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import Box from "@mui/material/Box";

import { useEffect, useState, memo } from "react";
import { usePathname } from "next/navigation";
import { start, done } from "nprogress";
import SimpleBar from "simplebar-react";
import Image from "next/image";
import Link from "next/link";
import crypto from "crypto";
import axios from "axios";

import { useMode } from "#/components/global/theme-registry";
import IconBox from "#/components/other/icon-box";
import AppLogo from "#/components/app-logo";
import Convert from "#/utils/convert";
import Iconify from "#/utils/iconify";

import illustration_docs from "#/public/svg/illustration_docs.svg";

const navLinks = [
  { path: "/my/overview", label: "Главная", iconUrl: "/svg/overview.svg" },
  { path: "/my/trades", label: "Сделки", iconUrl: "/svg/trades.svg" },
  { path: "/my/analytics", label: "Аналитика", iconUrl: "/svg/analytics.svg" },
  { path: "/my/journal", label: "Журнал", iconUrl: "/svg/journal.svg" },
];

function AccountLink({ username, keys, privateMode, convertMode }) {
  const pathname = usePathname();

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const key1 = keys.find((key) => key.exchange === 1);
    const key2 = keys.find((key) => key.exchange === 2);

    setBalance(0);

    try {
      if (key1 !== undefined) {
        axios.get("https://fapi.binance.com/fapi/v1/time").then(({ data }) => {
          axios
            .get("https://fapi.binance.com/fapi/v2/account", {
              headers: {
                "X-MBX-APIKEY": key1.api_key,
              },
              params: {
                timestamp: data.serverTime,
                signature: crypto
                  .createHmac("sha256", key1.secret_key)
                  .update(`timestamp=${data.serverTime}&recvWindow=60000`)
                  .digest("hex"),
                recvWindow: 60000,
              },
            })
            .then(({ data }) => {
              setBalance(
                (prev) => (prev += parseFloat(data?.totalWalletBalance))
              );
            });
        });
      }

      if (key2 !== undefined) {
        axios.get("https://api.bybit.com/v5/market/time").then(({ data }) => {
          axios
            .get(
              "https://api.bybit.com/v5/account/wallet-balance?accountType=UNIFIED",
              {
                headers: {
                  "X-BAPI-SIGN": crypto
                    .createHmac("sha256", key2.secret_key)
                    .update(
                      data.time + key2.api_key + 60000 + "accountType=UNIFIED"
                    )
                    .digest("hex"),
                  "X-BAPI-API-KEY": key2.api_key,
                  "X-BAPI-TIMESTAMP": data.time,
                  "X-BAPI-RECV-WINDOW": 60000,
                },
              }
            )
            .then(({ data }) => {
              setBalance(
                (prev) =>
                  (prev += parseFloat(
                    data?.result?.list[0]?.totalWalletBalance
                  ))
              );
            });
        });
      }
    } catch (error) {
      console.log("error (AccountLink): ", error);
    }
  }, [keys]);

  return (
    <Link
      href="/my/account"
      onClick={() => pathname !== "/my/account" && start()}
      style={{ margin: "24px" }}
    >
      <Box
        sx={{
          p: "16px 20px",
          display: "flex",
          alignItems: "center",
          borderRadius: "12px",
          justifyContent: "space-between",
          transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          backgroundColor:
            pathname === "/my/account"
              ? "rgba(0, 167, 111, 0.16)"
              : "rgba(145, 158, 171, 0.12)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar>{username?.charAt(0).toUpperCase()}</Avatar>
          <Box
            sx={{
              ml: "16px",
              minWidth: "0px",
            }}
          >
            <Typography variant="subtitle2" color="text.primary" noWrap>
              {username ?? "."}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {privateMode ? (
                <Skeleton />
              ) : convertMode ? (
                <>
                  ${balance.toFixed(2)}
                  <Convert count={balance} />
                </>
              ) : (
                `$${balance.toFixed(2)}`
              )}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}

const InfoCollapse = memo(function InfoCollapse() {
  const pathname = usePathname();

  const [openInfo, setOpenInfo] = useState(false);

  const faq = pathname === "/my/faq";
  const news = pathname === "/my/news";
  const community = pathname === "/my/community";

  const summary = faq || news || community;

  return (
    <>
      <ListItemButton
        onClick={() => setOpenInfo((prev) => !prev)}
        sx={{
          color: summary
            ? "primary.light"
            : openInfo
            ? "text.primary"
            : "text.secondary",
          backgroundColor: summary
            ? "rgba(0, 167, 111, 0.08)"
            : openInfo
            ? "rgba(145, 158, 171, 0.08)"
            : "transparent",
          "&:hover": {
            backgroundColor: summary
              ? "rgba(0, 167, 111, 0.16)"
              : "rgba(145, 158, 171, 0.08)",
          },
        }}
      >
        <IconBox iconUrl="/svg/info.svg" iconMarginRight="16px" />
        <ListItemText
          primaryTypographyProps={{
            variant: "body2",
            fontWeight: summary ? 600 : 400,
          }}
        >
          Информация
        </ListItemText>
        <Iconify
          icon={
            openInfo
              ? "eva:arrow-ios-downward-fill"
              : "eva:arrow-ios-forward-fill"
          }
          width={16}
        />
      </ListItemButton>
      <Collapse in={openInfo} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link href="/my/faq">
            <ListItemButton
              onClick={() => !faq && start()}
              sx={{
                height: "36px",
                "&:hover": {
                  backgroundColor: faq
                    ? "transparent"
                    : "rgba(145, 158, 171, 0.08)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  mr: "16px",
                  width: "24px",
                  display: "flex",
                  minWidth: "auto",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    transition:
                      "transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                    backgroundColor: faq ? "primary.light" : "text.secondary",
                    transform: faq ? "scale(2)" : "none",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  variant: "body2",
                  fontWeight: faq ? 600 : 400,
                  color: faq ? "text.primary" : "text.secondary",
                }}
              >
                FAQ
              </ListItemText>
            </ListItemButton>
          </Link>
        </List>
        <List component="div" disablePadding>
          <Link href="/my/news">
            <ListItemButton
              onClick={() => !news && start()}
              sx={{
                height: "36px",
                "&:hover": {
                  backgroundColor: news
                    ? "transparent"
                    : "rgba(145, 158, 171, 0.08)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  mr: "16px",
                  width: "24px",
                  display: "flex",
                  minWidth: "auto",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    transition:
                      "transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                    transform: news ? "scale(2)" : "none",
                    backgroundColor: news ? "primary.light" : "text.secondary",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  variant: "body2",
                  fontWeight: news ? 600 : 400,
                  color: news ? "text.primary" : "text.secondary",
                }}
              >
                Новости
              </ListItemText>
            </ListItemButton>
          </Link>
        </List>
        <List component="div" disablePadding>
          <Link href="/my/community">
            <ListItemButton
              onClick={() => !community && start()}
              sx={{
                height: "36px",
                "&:hover": {
                  backgroundColor: community
                    ? "transparent"
                    : "rgba(145, 158, 171, 0.08)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  mr: "16px",
                  width: "24px",
                  display: "flex",
                  minWidth: "auto",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    transition:
                      "transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                    transform: community ? "scale(2)" : "none",
                    backgroundColor: community
                      ? "primary.light"
                      : "text.secondary",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  variant: "body2",
                  fontWeight: community ? 600 : 400,
                  color: community ? "text.primary" : "text.secondary",
                }}
              >
                Сообщество
              </ListItemText>
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
    </>
  );
});

const NavigationLinks = memo(function NavigationLinks() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <>
      {navLinks.map(({ path, label, iconUrl }) => (
        <Link key={path} href={path}>
          <ListItemButton
            onClick={() => !isActive(path) && start()}
            sx={{
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
            <IconBox iconUrl={iconUrl} iconMarginRight="16px" />
            <ListItemText
              primaryTypographyProps={{
                variant: "body2",
                fontWeight: isActive(path) ? 600 : 400,
              }}
            >
              {label}
            </ListItemText>
          </ListItemButton>
        </Link>
      ))}
      <InfoCollapse />
      <Link href="/my/profile">
        <ListItemButton
          onClick={() => !isActive("/my/profile") && start()}
          sx={{
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
          <IconBox iconUrl="/svg/profile.svg" iconMarginRight="16px" />
          <ListItemText
            primaryTypographyProps={{
              variant: "body2",
              fontWeight: isActive("/my/profile") ? 600 : 400,
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
            "&:hover": {
              backgroundColor: "rgba(145, 158, 171, 0.08)",
            },
          }}
        >
          <IconBox iconUrl="/svg/external.svg" iconMarginRight="16px" />
          <ListItemText
            primaryTypographyProps={{
              variant: "body2",
              fontWeight: 400,
            }}
          >
            Канал Telegram
          </ListItemText>
        </ListItemButton>
      </a>
    </>
  );
});

const NavPaper = memo(function NavPaper({
  username,
  keys,
  activate,
  privateMode,
  convertMode,
}) {
  const { mode } = useMode();

  return (
    <SimpleBar>
      <Box
        sx={{
          mt: "24px",
          ml: "24px",
        }}
      >
        {activate ? (
          <Badge
            badgeContent="premium"
            color="info"
            sx={{
              "& .MuiBadge-badge": {
                top: "8px",
                right: "-32px",
                height: "22px",
                fontWeight: 700,
                minWidth: "24px",
                cursor: "default",
                padding: "4px 6px",
                userSelect: "none",
                fontSize: "0.75rem",
                borderRadius: "6px",
                alignItems: "center",
                whiteSpace: "nowrap",
                textTransform: "unset",
                display: "inline-flex",
                justifyContent: "center",
                backgroundColor: "rgba(0, 184, 217, 0.16)",
                color:
                  mode === "dark" ? "rgb(97, 243, 243)" : "rgb(0, 108, 156)",
              },
            }}
          >
            <AppLogo />
          </Badge>
        ) : (
          <AppLogo />
        )}
      </Box>
      <AccountLink
        username={username}
        keys={keys}
        privateMode={privateMode}
        convertMode={convertMode}
      />
      <List
        disablePadding
        sx={{
          p: "0 16px",
        }}
      >
        <ListSubheader
          disableSticky
          sx={{
            fontWeight: 700,
            lineHeight: 1.5,
            fontSize: "11px",
            p: "24px 16px 8px",
          }}
        >
          НАВИГАЦИЯ
        </ListSubheader>
        <NavigationLinks />
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Stack
        gap={3}
        width="100%"
        display="block"
        marginTop="80px"
        textAlign="center"
        padding="0 40px 40px 40px"
      >
        <Image src={illustration_docs} priority />
        <Box sx={{ mt: 5 }}>
          <Typography variant="subtitle1" gutterBottom color="text.primary">
            Привет, {username}
          </Typography>
          <Typography variant="body2" marginBottom={3} color="text.secondary">
            Нужна помощь?
            <br />
            посмотри наш FAQ
          </Typography>
          <Link href="/my/faq">
            <Button
              variant="contained"
              color="secondary"
              size="medium"
              onClick={() => {
                start();
                done();
              }}
              sx={{
                backgroundColor: "rgb(81, 25, 183)",
                boxShadow: "rgba(142, 51, 255, 0.24) 0px 8px 16px 0px",
                "&:hover": {
                  boxShadow: "none",
                },
              }}
            >
              FAQ
            </Button>
          </Link>
        </Box>
      </Stack>
    </SimpleBar>
  );
});

export default NavPaper;
