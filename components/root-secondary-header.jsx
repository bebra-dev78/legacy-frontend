"use client";

import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";

import { useEffect, useState } from "react";

import NProgressLink from "#/components/nprogress-link";
import Settings from "#/components/settings";
import AppLogo from "#/components/app-logo";

export default function RootSecondaryHeader() {
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
    <AppBar>
      <Toolbar
        sx={{
          p: "10px 15px",
          justifyContent: "space-between",
          transition:
            "height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          backdropFilter: scrolled ? "blur(6px)" : "none",
        }}
      >
        <AppLogo />
        <Stack gap={1} flexDirection="row" alignItems="center">
          <Settings />
          <NProgressLink path="/faq">
            <Typography
              variant="subtitle2"
              color="info.main"
              sx={{
                "&:hover ": {
                  textDecoration: "underline",
                },
              }}
            >
              Нужна помощь?
            </Typography>
          </NProgressLink>
        </Stack>
      </Toolbar>
      {scrolled && (
        <Divider
          sx={{
            borderStyle: "solid",
          }}
        />
      )}
    </AppBar>
  );
}
