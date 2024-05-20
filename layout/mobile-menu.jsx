"use client";

import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

import NavPaper from "#/layout/nav-paper";

import menu from "#/public/svg/menu.svg";

export default function MobileMenu({
  username,
  keys,
  privateMode,
  convertMode,
}) {
  const pathname = usePathname();

  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    setOpenDrawer(false);
  }, [pathname]);

  return (
    <>
      <IconButton
        onClick={() => {
          setOpenDrawer(true);
        }}
      >
        <Image src={menu} />
      </IconButton>
      <Drawer
        open={openDrawer}
        anchor="left"
        onClose={() => {
          setOpenDrawer(false);
        }}
      >
        <NavPaper
          username={username}
          keys={keys}
          privateMode={privateMode}
          convertMode={convertMode}
        />
      </Drawer>
    </>
  );
}
