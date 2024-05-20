"use client";

import Box from "@mui/material/Box";

import { useMode } from "#/components/global/theme-registry";

export default function RootOverlay() {
  const { mode } = useMode();

  return (
    <Box
      sx={{
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        position: "absolute",
        transform: "scaleX(-1)",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundImage:
          mode === "dark"
            ? "linear-gradient(rgba(22, 28, 36, 0.8), rgba(22, 28, 36, 0.8)), url(/images/root_overlay.jpg)"
            : "linear-gradient(rgba(249, 250, 251, 0.2), rgba(249, 250, 251, 0.2)), url(/images/root_overlay.jpg)",
      }}
    />
  );
}
