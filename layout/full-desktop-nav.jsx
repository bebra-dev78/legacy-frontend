"use client";

import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";

import NavPaper from "#/layout/nav-paper";
import Iconify from "#/utils/iconify";

export default function FullDesktopNav({
  setOpenSidebar,
  privateMode,
  convertMode,
  username,
  activate,
  keys,
}) {
  return (
    <>
      <IconButton
        onClick={() => {
          setOpenSidebar(false);
          localStorage.setItem("sidebar", JSON.stringify(false));
        }}
        sx={{
          p: "4px",
          top: "32px",
          zIndex: 1101,
          left: "267px",
          width: "26px",
          height: "26px",
          position: "fixed",
          fontSize: "1.125rem",
          backdropFilter: "blur(6px)",
          border: "1px dashed rgba(145, 158, 171, 0.24)",
        }}
      >
        <Iconify
          icon="eva:arrow-ios-back-fill"
          color="text.secondary"
          width={16}
        />
      </IconButton>
      <Drawer
        open
        variant="permanent"
        PaperProps={{
          sx: {
            zIndex: 0,
            width: "280px",
            backgroundImage: "none",
            borderRight: "1px dashed rgba(145, 158, 171, 0.24)",
          },
        }}
      >
        <NavPaper
          username={username}
          keys={keys}
          activate={activate}
          privateMode={privateMode}
          convertMode={convertMode}
        />
      </Drawer>
    </>
  );
}
