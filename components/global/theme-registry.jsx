"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { useState, useEffect, createContext, useContext } from "react";

const ThemeModeContext = createContext();

export default function ThemeRegistry({ children }) {
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    const m = localStorage.getItem("mode");
    if (m !== null) {
      setMode(m);
      document.body.setAttribute("data-theme", m);
    }
  }, []);

  const dark = mode === "dark";

  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode,
          primary: {
            main: "rgb(0, 167, 111)",
            light: dark ? "rgb(91, 228, 155)" : "rgb(0, 167, 111)",
          },
          secondary: { main: "rgb(142, 51, 255)" },
          error: { main: "rgb(255, 86, 48)" },
          warning: { main: "rgb(255, 171, 0)" },
          info: { main: "rgb(0, 184, 217)" },
          success: { main: "rgb(34, 197, 94)" },
          text: {
            primary: dark ? "rgb(255, 255, 255)" : "rgb(33, 43, 54)",
            secondary: dark ? "rgb(145, 158, 171)" : "rgb(99, 115, 129)",
            disabled: dark ? "rgb(99, 115, 129)" : "rgb(145, 158, 171)",
          },
          background: {
            paper: dark ? "rgb(22, 28, 36)" : "rgb(249, 250, 251)",
          },
        },
        typography: {
          fontFamily: "inherit",
          h1: {
            fontWeight: 800,
            fontSize: "2.5rem",
            lineHeight: 1.25,
            "@media (min-width: 600px)": {
              fontSize: "3.25rem",
            },
            "@media (min-width: 900px)": {
              fontSize: "3.625rem",
            },
            "@media (min-width: 1200px)": {
              fontSize: "4rem",
            },
          },
          h2: {
            fontWeight: 800,
            fontSize: "2rem",
            lineHeight: 1.33333,
            "@media (min-width: 600px)": {
              fontSize: "2.5rem",
            },
            "@media (min-width: 900px)": {
              fontSize: "2.75rem",
            },
            "@media (min-width: 1200px)": {
              fontSize: "3rem",
            },
          },
          h3: {
            fontWeight: 700,
            fontSize: "1.5rem",
            lineHeight: 1.5,
            "@media (min-width: 600px)": {
              fontSize: "1.625rem",
            },
            "@media (min-width: 900px)": {
              fontSize: "1.875rem",
            },
            "@media (min-width: 1200px)": {
              fontSize: "2rem",
            },
          },
          h4: {
            fontWeight: 700,
            fontSize: "1.25rem",
            lineHeight: 1.5,
            "@media (min-width: 600px)": {
              fontSize: "1.25rem",
            },
            "@media (min-width: 900px)": {
              fontSize: "1.5rem",
            },
            "@media (min-width: 1200px)": {
              fontSize: "1.5rem",
            },
          },
          h5: {
            fontWeight: 700,
            fontSize: "1.125rem",
            lineHeight: 1.5,
            "@media (min-width: 600px)": {
              fontSize: "1.1875rem",
            },
            "@media (min-width: 900px)": {
              fontSize: "1.25rem",
            },
            "@media (min-width: 1200px)": {
              fontSize: "1.25rem",
            },
          },
          h6: {
            fontWeight: 700,
            fontSize: "1.0625rem",
            lineHeight: 1.55556,
            "@media (min-width: 600px)": {
              fontSize: "1.125rem",
            },
            "@media (min-width: 900px)": {
              fontSize: "1.125rem",
            },
            "@media (min-width: 1200px)": {
              fontSize: "1.125rem",
            },
          },
          subtitle1: {
            fontWeight: 600,
            fontSize: "1rem",
            lineHeight: 1.5,
          },
          subtitle2: {
            fontWeight: 600,
            fontSize: "0.875rem",
            lineHeight: 1.57143,
          },
          body1: {
            fontWeight: 400,
            fontSize: "1rem",
            lineHeight: 1.5,
          },
          body2: {
            fontWeight: 400,
            fontSize: "0.875rem",
            lineHeight: 1.57143,
          },
          caption: {
            fontWeight: 400,
            fontSize: "0.75rem",
            lineHeight: 1.5,
          },
          overline: {
            fontWeight: 700,
            fontSize: "0.75rem",
            lineHeight: 1.5,
          },
          button: {
            fontWeight: 700,
            fontSize: "0.875rem",
            lineHeight: 1.71429,
            textTransform: "unset",
          },
        },
        components: {
          MuiButton: {
            variants: [
              {
                props: {
                  size: "large",
                },
                style: {
                  height: "48px",
                  padding: "6px 16px",
                  fontSize: "15px",
                },
              },
              {
                props: {
                  size: "small",
                },
                style: {
                  height: "30px",
                  padding: "6px 8px",
                  fontSize: "13px",
                },
              },
              {
                props: {
                  color: "inherit",
                },
                style: {
                  color: dark ? "rgb(255, 255, 255)" : "rgb(33, 43, 54)",
                },
              },
              {
                props: {
                  variant: "outlined",
                  color: "inherit",
                },
                style: {
                  color: dark ? "rgb(255, 255, 255)" : "rgb(33, 43, 54)",
                  transition:
                    "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  ":hover": {
                    borderColor: "currentcolor",
                    boxShadow: "currentcolor 0px 0px 0px 0.5px",
                  },
                },
              },
              {
                props: {
                  variant: "contained",
                  color: "inherit",
                },
                style: {
                  backgroundColor: dark
                    ? "rgb(255, 255, 255)"
                    : "rgb(33, 43, 54)",
                  color: dark ? "rgb(33, 43, 54)" : "rgb(255, 255, 255)",
                  "&:hover": {
                    backgroundColor: dark
                      ? "rgb(196, 205, 213)"
                      : "rgb(69, 79, 91)",
                  },
                },
              },
              {
                props: {
                  variant: "outlined",
                  color: "inherit",
                  size: "medium",
                },
                style: {
                  border: "1px solid rgba(145, 158, 171, 0.32)",
                  "&:hover": {
                    borderColor: "currentcolor",
                    boxShadow: "currentcolor 0px 0px 0px 0.5px",
                  },
                },
              },
              {
                props: {
                  variant: "contained",
                  color: "primary",
                  size: "medium",
                },
                style: {
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "rgb(0, 120, 103)",
                    boxShadow: "rgba(0, 167, 111, 0.24) 0px 8px 16px 0px",
                  },
                },
              },
              {
                props: {
                  variant: "contained",
                  color: "secondary",
                  size: "medium",
                },
                style: {
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "rgb(81, 25, 183)",
                    boxShadow: "rgba(142, 51, 255, 0.24) 0px 8px 16px 0px",
                  },
                },
              },
              {
                props: {
                  variant: "contained",
                  color: "error",
                  size: "medium",
                },
                style: {
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "rgb(183, 29, 24)",
                    boxShadow: "rgba(255, 86, 48, 0.24) 0px 8px 16px 0px",
                  },
                },
              },
              {
                props: {
                  variant: "soft",
                  color: "info",
                },
                style: {
                  boxShadow: "none",
                  color: dark ? "rgb(97, 243, 243)" : "rgb(0, 108, 156)",
                  backgroundColor: "rgba(0, 184, 217, 0.16)",
                  "&:hover": {
                    backgroundColor: "rgba(0, 184, 217, 0.32)",
                  },
                },
              },
              {
                props: {
                  variant: "contained",
                  color: "warning",
                  size: "medium",
                },
                style: {
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "rgba(255, 171, 0, 0.24) 0px 8px 16px 0px",
                  },
                },
              },
            ],
            styleOverrides: {
              root: {
                appearance: "none",
                borderRadius: "8px",
              },
            },
            defaultProps: {
              disableElevation: true,
            },
          },
          MuiCard: {
            variants: [
              {
                props: {
                  variant: "shadow",
                },
                style: {
                  "@media (min-width: 900px)": {
                    boxShadow:
                      mode === "dark"
                        ? "rgba(0, 0, 0, 0.4) -40px 40px 80px"
                        : "rgba(145, 158, 171, 0.16) -40px 40px 80px",
                  },
                },
              },
            ],
            defaultProps: {
              elevation: 0,
            },
            styleOverrides: {
              root: {
                position: "relative",
                borderRadius: "16px",
                backgroundColor: dark
                  ? "rgb(33, 43, 54)"
                  : "rgb(255, 255, 255)",
                boxShadow: dark
                  ? "rgba(0, 0, 0, 0.2) 0px 0px 2px 0px, rgba(0, 0, 0, 0.12) 0px 12px 24px -4px"
                  : "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
              },
            },
          },
          MuiMenuItem: {
            styleOverrides: {
              root: {
                padding: "6px 8px",
                marginBottom: "4px",
                borderRadius: "6px",
                fontSize: "0.875rem",
                ":hover": {
                  backgroundColor: dark
                    ? "rgba(145, 158, 171, 0.08)"
                    : "rgba(99, 115, 129, 0.08)",
                },
              },
            },
          },
          MuiPaper: {
            defaultProps: {
              elevation: 0,
            },
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },
          MuiList: {
            styleOverrides: {
              root: {
                paddingTop: "0px",
                paddingBottom: "0px",
              },
            },
          },
          MuiDivider: {
            styleOverrides: {
              root: {
                borderStyle: "dashed",
                borderWidth: "0px 0px thin",
                borderColor: "rgba(145, 158, 171, 0.2)",
              },
            },
          },
          MuiAvatar: {
            styleOverrides: {
              root: {
                fontWeight: 600,
                border: dark
                  ? "2px solid rgb(22, 28, 36)"
                  : "2px solid rgb(255, 255, 255)",
                backgroundColor: "rgb(255, 86, 48)",
                color: dark ? "rgb(255, 255, 255)" : "rgb(33, 43, 54)",
              },
            },
          },
          MuiAccordion: {
            styleOverrides: {
              root: {
                background: "inherit",
                boxShadow: "none",
                "&.MuiAccordion-root.Mui-expanded": {
                  backgroundColor: dark
                    ? "rgb(33, 43, 54)"
                    : "rgb(255, 255, 255)",
                  borderRadius: "8px !important",
                  boxShadow: dark
                    ? "rgba(0, 0, 0, 0.16) 0px 8px 16px 0px"
                    : "rgba(145, 158, 171, 0.16) 0px 8px 16px 0px",
                },
              },
            },
          },
          MuiAlert: {
            variants: [
              {
                props: { severity: "info" },
                style: {
                  backgroundColor: dark
                    ? "rgb(0, 55, 104)"
                    : "rgb(202, 253, 245)",
                  color: dark ? "rgb(202, 253, 245)" : "rgb(0, 55, 104)",
                },
              },
              {
                props: { severity: "error" },
                style: {
                  backgroundColor: dark
                    ? "rgb(122, 9, 22)"
                    : "rgb(255, 233, 213)",
                  color: dark ? "rgb(255, 233, 213)" : "rgb(122, 9, 22)",
                },
              },
              {
                props: { severity: "success" },
                style: {
                  backgroundColor: dark
                    ? "rgb(6, 94, 73)"
                    : "rgb(211, 252, 210)",
                  color: dark ? "rgb(211, 252, 210)" : "rgb(6, 94, 73)",
                },
              },
            ],
            styleOverrides: {
              root: {
                borderRadius: "10px",
              },
            },
          },
          MuiAppBar: {
            defaultProps: { color: "transparent" },
            styleOverrides: { root: { boxShadow: "none" } },
          },
          MuiDrawer: {
            defaultProps: {
              PaperProps: {
                sx: {
                  minWidth: "280px",
                  backgroundSize: "50%, 50%",
                  backdropFilter: "blur(20px)",
                  backgroundRepeat: "no-repeat, no-repeat",
                  backgroundPosition: "right top, left bottom",
                  backgroundImage:
                    "url(/images/cyan-blur.png), url(/images/red-blur.png)",
                  boxShadow: dark
                    ? "rgba(0, 0, 0, 0.24) -40px 40px 80px -8px"
                    : "rgba(145, 158, 171, 0.24) -40px 40px 80px -8px",
                },
              },
            },
          },
          MuiTextField: {
            defaultProps: {
              FormHelperTextProps: {
                sx: { margin: "6px 14px 0px" },
              },
            },
          },
          MuiInputLabel: {
            styleOverrides: {
              root: {
                "&.Mui-focused": {
                  fontWeight: 800,
                },
              },
            },
          },
          MuiFormLabel: {
            styleOverrides: {
              root: {
                color: dark ? "#5E6E7C" : "#919EAB",
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                borderRadius: "8px",
                "& fieldset": {
                  borderColor: "rgba(145, 158, 171, 0.2)",
                },
              },
            },
          },
          MuiPopover: {
            defaultProps: {
              slotProps: {
                paper: {
                  sx: {
                    marginTop: 1,
                    padding: "4px",
                    borderRadius: "10px",
                    backgroundSize: "50%, 50%",
                    backdropFilter: "blur(20px)",
                    backgroundRepeat: "no-repeat, no-repeat",
                    backgroundPosition: "right top, left bottom",
                    backgroundImage:
                      'url("/images/cyan-blur.png"), url("/images/red-blur.png")',
                    backgroundColor: dark
                      ? "rgba(33, 43, 54, 0.9)"
                      : "rgba(255, 255, 255, 0.9)",
                    boxShadow: dark
                      ? "rgba(0, 0, 0, 0.24) 0px 0px 2px 0px, rgba(0, 0, 0, 0.24) -20px 20px 40px -4px"
                      : "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
                  },
                },
              },
            },
          },
          MuiDialog: {
            defaultProps: {
              BackdropProps: {
                sx: {
                  backgroundColor: "rgba(22, 28, 36, 0.8)",
                },
              },
              PaperProps: {
                sx: {
                  borderRadius: "16px",
                  backgroundColor: dark
                    ? "rgb(33, 43, 54)"
                    : "rgb(255, 255, 255)",
                  boxShadow: dark
                    ? "rgba(0, 0, 0, 0.24) -40px 40px 80px -8px"
                    : "rgba(145, 158, 171, 0.24) -40px 40px 80px -8px",
                },
              },
            },
          },
          MuiDialogActions: {
            styleOverrides: { root: { padding: "24px", gap: "4px" } },
          },
          MuiSwitch: {
            styleOverrides: {
              root: {
                width: 28,
                height: 16,
                padding: "0px",
                display: "flex",
                "&:active": {
                  "& .MuiSwitch-thumb": {
                    width: 15,
                  },
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    transform: "translateX(9px)",
                  },
                },
                "& .MuiSwitch-switchBase": {
                  padding: 2,
                  "&.Mui-checked": {
                    transform: "translateX(12px)",
                    color: "#fff",
                    "& + .MuiSwitch-track": {
                      opacity: 1,
                      backgroundColor: "rgb(142, 51, 255)",
                    },
                  },
                },
                "& .MuiSwitch-thumb": {
                  boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  transition: "width 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                },
                "& .MuiSwitch-track": {
                  borderRadius: 16 / 2,
                  opacity: 1,
                  backgroundColor: dark
                    ? "rgba(255,255,255,.35)"
                    : "rgba(0,0,0,.25)",
                  boxSizing: "border-box",
                },
              },
            },
          },
          MuiSkeleton: {
            defaultProps: {
              animation: "wave",
            },
            styleOverrides: {
              root: {
                borderRadius: "16px",
                transform: "none",
                height: "100%",
              },
            },
          },
          MuiListItemButton: {
            styleOverrides: {
              root: {
                borderRadius: "8px",
                marginBottom: "4px",
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: { fontWeight: 500, cursor: "default", borderRadius: "8px" },
            },
            variants: [
              {
                props: {
                  variant: "soft",
                  color: "warning",
                  size: "medium",
                },
                style: {
                  color: dark ? "rgb(255, 214, 102)" : "rgb(183, 110, 0)",
                  backgroundColor: "rgba(255, 171, 0, 0.16)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 171, 0, 0.32)",
                  },
                },
              },
              {
                props: {
                  variant: "soft",
                  color: "info",
                  size: "medium",
                },
                style: {
                  color: dark ? "rgb(97, 243, 243)" : "rgb(0, 108, 156)",
                  backgroundColor: "rgba(0, 184, 217, 0.16)",
                  "&:hover": {
                    backgroundColor: "rgba(0, 184, 217, 0.32)",
                  },
                  "& .MuiChip-deleteIcon": {
                    opacity: "0.5",
                    color: "inherit",
                    "&:hover": {
                      opacity: "1",
                      color: "inherit",
                    },
                  },
                },
              },
            ],
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                ":hover": {
                  backgroundColor: dark
                    ? "rgba(145, 158, 171, 0.08)"
                    : "rgba(99, 115, 129, 0.08)",
                },
              },
            },
          },
          MuiCardContent: {
            styleOverrides: {
              root: {
                height: "100%",
                padding: "24px",
              },
            },
          },
          MuiCardHeader: {
            styleOverrides: {
              root: {
                padding: "24px 24px 0px",
              },
            },
          },
          MuiSnackbarContent: {
            styleOverrides: {
              root: {
                padding: "0 8px",
                borderRadius: "8px",
                boxShadow: "rgba(0, 0, 0, 0.25) 0px 8px 16px 0px",
                color: dark ? "rgb(255, 255, 255)" : "rgb(33, 43, 54)",
                backgroundColor: dark
                  ? "rgb(33, 43, 54)"
                  : "rgb(255, 255, 255)",
              },
            },
          },
        },
      })}
    >
      <ThemeModeContext.Provider value={{ mode, setMode }}>
        {children}
      </ThemeModeContext.Provider>
    </ThemeProvider>
  );
}

export function useMode() {
  return useContext(ThemeModeContext);
}
