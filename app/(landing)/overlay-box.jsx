"use client";

import Box from "@mui/material/Box";

import { useMode } from "#/components/global/theme-registry";

export default function OverlayBox({ children }) {
  const { mode } = useMode();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        minHeight: "600px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center center",
        backgroundImage:
          mode === "dark"
            ? "linear-gradient(rgba(22, 28, 36, 0.94), rgba(22, 28, 36, 0.94)), url(/images/preview_overlay.jpg)"
            : "linear-gradient(rgba(249, 250, 251, 0.9), rgba(249, 250, 251, 0.9)), url(/images/preview_overlay.jpg)",
        "@media (min-width: 900px)": {
          position: "fixed",
        },
      }}
    >
      {children}
    </Box>
  );
}
