"use client";

import Box from "@mui/material/Box";

import { useMode } from "#/components/global/theme-registry";

export default function AuthOverlay() {
  const { mode } = useMode();

  return (
    <Box
      sx={{
        top: 0,
        left: 0,
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
            ? "linear-gradient(rgba(22, 28, 36, 0.95), rgba(22, 28, 36, 0.95)), url(/images/auth_overlay.jpg)"
            : "linear-gradient(rgba(249, 250, 251, 0.95), rgba(249, 250, 251, 0.95)), url(/images/auth_overlay.jpg)",
      }}
    />
  );
}
