import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import Image from "next/image";

import AuthOverlay from "#/components/auth-overlay";
import NProgressLink from "#/components/nprogress-link";
import AppLogo from "#/components/app-logo";
import Form from "#/app/login/form";

import auth_illustration from "#/public/images/auth_illustration.png";

export const metadata = {
  title: "Вход | Tradify",
  description: "Tradify —	вход в аккаунт",
};

export default function Login() {
  return (
    <Box
      component="main"
      sx={{
        height: "100%",
        display: "flex",
        position: "relative",
      }}
    >
      <Box
        sx={{
          zIndex: 1,
          mt: "40px",
          ml: "40px",
          position: "absolute",
          "@media (max-width: 899px)": {
            mt: "12px",
            ml: "16px",
          },
        }}
      >
        <AppLogo />
      </Box>
      <Box
        sx={{
          display: "none",
          position: "relative",
          "@media (min-width: 900px)": {
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          },
        }}
      >
        <Typography
          zIndex={1}
          variant="h3"
          maxWidth="480px"
          textAlign="center"
          marginBottom="80px"
          color="text.primary"
        >
          Привет, с возвращением
        </Typography>
        <Box
          sx={{
            zIndex: 1,
          }}
        >
          <Image src={auth_illustration} priority />
        </Box>
        <AuthOverlay />
      </Box>
      <Stack
        sx={{
          m: "auto",
          width: "480px",
          p: "120px 16px",
          minHeight: "100vh",
          "@media (min-width: 900px)": {
            p: "144px 64px 0px",
          },
        }}
      >
        <Stack gap={1} marginBottom="40px" position="relative">
          <Typography variant="h4" color="text.primary">
            Вход в аккаунт
          </Typography>
          <Stack flexDirection="row" gap="4px" alignItems="center">
            <Typography variant="body2" color="text.primary">
              Новый пользователь?
            </Typography>
            <NProgressLink path="/register">
              <Typography
                variant="subtitle2"
                color="primary.main"
                sx={{
                  "&:hover ": {
                    textDecoration: "underline",
                  },
                }}
              >
                Создайте аккаунт
              </Typography>
            </NProgressLink>
          </Stack>
        </Stack>
        <Form />
      </Stack>
    </Box>
  );
}
