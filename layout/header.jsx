"use client";

import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import List from "@mui/material/List";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { useState, useEffect, memo } from "react";
import SimpleBar from "simplebar-react";
import dynamic from "next/dynamic";
import Image from "next/image";

import { readNotifications, deleteNotification } from "#/server/notifications";
import HeaderPopoverMenu from "#/components/header-popover-menu";
import { useMode } from "#/components/global/theme-registry";
import CounterBox from "#/components/counter-box";
import Settings from "#/components/settings";
import Iconify from "#/utils/iconify";

const MobileMenu = dynamic(() => import("#/layout/mobile-menu"));

const HeaderAction = memo(function HeaderAction({ username, email }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
        sx={{
          width: "39.5px",
          height: "39.5px",
        }}
        style={{
          background: open
            ? "linear-gradient(135deg, rgb(91, 228, 155) 0%, rgb(0, 167, 111) 100%)"
            : "rgba(145, 158, 171, 0.08)",
        }}
      >
        <Avatar
          sx={{
            width: "36px",
            height: "36px",
            "&:hover": {
              borderRadius: "16px",
            },
          }}
        >
          {username?.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        disableScrollLock
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={() => {
          setAnchorEl(null);
        }}
        slotProps={{
          paper: {
            style: {
              width: 200,
            },
          },
        }}
      >
        <HeaderPopoverMenu
          email={email}
          username={username}
          setAnchorEl={setAnchorEl}
        />
      </Popover>
    </>
  );
});

const Notifications = memo(function Notifications({
  id,
  notifications,
  setNotifications,
}) {
  const { mode } = useMode();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [unread, setUnread] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (notifications) {
      setUnread(notifications.filter((i) => i.read === false));
    }
  }, [notifications]);

  return (
    <>
      <IconButton
        onClick={() => {
          setOpenDrawer(true);
        }}
      >
        <Badge badgeContent={unread.length} color="error">
          <Iconify icon="solar:bell-bing-bold-duotone" color="text.secondary" />
        </Badge>
      </IconButton>
      <Drawer
        open={openDrawer}
        anchor="right"
        onClose={() => {
          setOpenDrawer(false);
        }}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: "420px",
            backdropFilter: "blur(20px)",
            backgroundColor:
              mode === "dark"
                ? "rgba(33, 43, 54, 0.7)"
                : "rgba(255, 255, 255, 0.7)",
          },
        }}
      >
        <Stack
          minHeight="68px"
          alignItems="center"
          flexDirection="row"
          padding="16px 8px 16px 20px"
          justifyContent="space-between"
        >
          <Typography variant="h6">Уведомления</Typography>
          <IconButton
            onClick={() => {
              setOpenDrawer(false);
            }}
          >
            <Iconify
              icon="mingcute:close-line"
              color="text.secondary"
              width={20}
            />
          </IconButton>
        </Stack>
        <Divider />
        <Stack paddingLeft="20px" paddingRight="8px">
          <Tabs
            value={value}
            onChange={(e, n) => setValue(n)}
            sx={{
              "& .MuiTab-root.Mui-selected": {
                color: "text.primary",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "text.primary",
              },
            }}
          >
            <Tab
              label="Все"
              disableTouchRipple
              iconPosition="end"
              icon={<CounterBox count={notifications?.length} sx={{ ml: 1 }} />}
              sx={{ minHeight: "48px", minWidth: "48px", p: 0, mr: 3 }}
            />
            <Tab
              label="Непрочитанные"
              disableTouchRipple
              iconPosition="end"
              icon={
                <CounterBox
                  count={unread.length}
                  variant="info"
                  sx={{ ml: 1 }}
                />
              }
              sx={{ minHeight: "48px", minWidth: "48px", p: 0 }}
            />
          </Tabs>
        </Stack>
        <Divider sx={{ borderStyle: "solid" }} />
        <Box sx={{ height: "100%", overflow: "hidden" }}>
          <SimpleBar>
            <List disablePadding>
              {(value === 0 ? notifications : unread)?.map((n) => (
                <ListItemButton
                  key={n.id}
                  disableTouchRipple
                  onClick={() => {
                    setNotifications((prev) =>
                      prev.filter((p) => p.id !== n.id)
                    );
                    deleteNotification(n.id);
                  }}
                  sx={{
                    mb: 0,
                    p: "20px",
                    borderRadius: 0,
                    borderWidth: "0 0 1px",
                    borderBottomStyle: "dashed",
                    borderBottomColor: "rgba(145, 158, 171, 0.2)",
                  }}
                >
                  <ListItemAvatar>
                    <Stack
                      justifyContent="center"
                      alignItems="center"
                      width={40}
                      height={40}
                      sx={{
                        backgroundColor: "rgba(145, 158, 171, 0.12)",
                        borderRadius: "50%",
                      }}
                    >
                      <Image src={n.image_url} width={24} height={24} />
                    </Stack>
                  </ListItemAvatar>
                  <Stack flexGrow={1}>
                    <ListItemText>
                      <Typography variant="subtitle2" gutterBottom>
                        {n.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(n.created_at).toLocaleString()}
                      </Typography>
                    </ListItemText>
                  </Stack>
                </ListItemButton>
              ))}
            </List>
          </SimpleBar>
        </Box>
        <Divider sx={{ borderStyle: "solid" }} />
        <Box sx={{ p: 1 }}>
          <Button
            color="inherit"
            size="large"
            fullWidth
            onClick={() => {
              setOpenDrawer(false);
              setNotifications((prev) =>
                prev.map((n) => ({ ...n, read: true }))
              );
              readNotifications(id);
            }}
          >
            Прочитать всё
          </Button>
        </Box>
      </Drawer>
    </>
  );
});

const Header = memo(function Header({
  id,
  keys,
  email,
  unread,
  stretch,
  username,
  setStretch,
  openSidebar,
  privateMode,
  convertMode,
  notifications,
  setNotifications,
}) {
  const isSmallScreen = useMediaQuery("(max-width:1199px)");
  const { mode } = useMode();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AppBar
      sx={{
        width: isSmallScreen
          ? "100%"
          : `calc(100% - ${openSidebar ? 280 : 110}px)`,
      }}
    >
      <Toolbar
        sx={{
          p: "0 16px",
          justifyContent: "flex-end",
          transition:
            "height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          backdropFilter: scrolled ? "blur(6px)" : "none",
          backgroundColor: scrolled
            ? mode === "dark"
              ? "rgba(22, 28, 36, 0.72)"
              : "rgba(249, 250, 251, 0.72)"
            : "transparent",
          height: scrolled ? "60px" : isSmallScreen ? "64px" : "80px",
          "@media (min-width: 1200px)": {
            p: "0 40px",
          },
        }}
      >
        {isSmallScreen && (
          <MobileMenu
            username={username}
            keys={keys}
            privateMode={privateMode}
            convertMode={convertMode}
          />
        )}
        <Stack
          gap={2}
          flexGrow={1}
          alignItems="center"
          flexDirection="row"
          justifyContent="flex-end"
        >
          <Notifications
            id={id}
            unread={unread}
            notifications={notifications}
            setNotifications={setNotifications}
          />
          <Settings stretch={stretch} setStretch={setStretch} />
          <HeaderAction username={username} email={email} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
});

export default Header;
