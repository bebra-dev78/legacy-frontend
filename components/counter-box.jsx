"use client";

import { useMode } from "#/components/global/theme-registry";

import Box from "@mui/material/Box";

export default function CounterBox({ count, variant, sx }) {
  const { mode } = useMode();

  switch (variant) {
    case "info":
      return (
        <Box
          component="span"
          sx={{
            height: "23px",
            fontWeight: 700,
            minWidth: "20px",
            cursor: "default",
            padding: "0px 6px",
            userSelect: "none",
            fontSize: "0.75rem",
            borderRadius: "6px",
            alignItems: "center",
            whiteSpace: "nowrap",
            display: "inline-flex",
            justifyContent: "center",
            backgroundColor: "rgba(0, 184, 217, 0.16)",
            color: mode === "dark" ? "rgb(97, 243, 243)" : "rgb(0, 108, 156)",
            ...sx,
          }}
        >
          {count}
        </Box>
      );

    default:
      return (
        <Box
          component="span"
          sx={{
            height: "23px",
            fontWeight: 700,
            minWidth: "20px",
            cursor: "default",
            padding: "0px 6px",
            userSelect: "none",
            fontSize: "0.75rem",
            borderRadius: "6px",
            alignItems: "center",
            whiteSpace: "nowrap",
            display: "inline-flex",
            justifyContent: "center",
            backgroundColor: "text.primary",
            color: mode === "dark" ? "rgb(33, 43, 54)" : "rgb(255, 255, 255)",
            ...sx,
          }}
        >
          {count}
        </Box>
      );
  }
}
