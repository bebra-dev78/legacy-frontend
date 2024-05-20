"use client";

import ListItemButton from "@mui/material/ListItemButton";

import Iconify from "#/utils/iconify";

export default function Lineup({ addOverlay }) {
  return (
    <ListItemButton
      onClick={() => {
        addOverlay.current("lineup");
      }}
      sx={{
        p: "4px",
        m: "0px 4px",
        borderRadius: "6px",
        "&:hover": {
          backgroundColor: "rgba(145, 158, 171, 0.08)",
        },
      }}
    >
      <Iconify icon="solar:ruler-angular-bold" />
    </ListItemButton>
  );
}
