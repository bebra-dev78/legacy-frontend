import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import Image from "next/image";

import AuthOverlay from "#/components/auth-overlay";
import NProgressLink from "#/components/nprogress-link";
import AppLogo from "#/components/app-logo";
import Form from "#/app//register/form";

import auth_illustration from "#/public/images/auth_illustration.png";

export const metadata = {
  title: "Регистрация | Tradify",
  description: "Tradify —	регистрация аккаунта",
};

export default function Register() {
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
            justifyContent: "center",
            flexDirection: "column",
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
          Начните управлять своими сделками
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
        <Stack gap={1} marginBottom="40px">
          <Typography variant="h4" color="text.primary">
            Регистрация в Tradify
          </Typography>
          <Stack flexDirection="row" gap="4px" alignItems="center">
            <Typography variant="body2" color="text.primary">
              Уже есть аккаунт?
            </Typography>
            <NProgressLink path="/login">
              <Typography
                variant="subtitle2"
                color="primary.main"
                sx={{
                  "&:hover ": {
                    textDecoration: "underline",
                  },
                }}
              >
                Войти
              </Typography>
            </NProgressLink>
          </Stack>
        </Stack>
        <Form />
        <Typography
          marginTop="24px"
          variant="caption"
          textAlign="center"
          color="text.secondary"
        >
          Создавая аккаунт, Вы соглашаетесь с{" "}
          <NProgressLink path="/privacy-policy">
            <Typography
              variant="caption"
              color="info.main"
              sx={{
                "&:hover ": {
                  textDecoration: "underline",
                },
              }}
            >
              политикой конфиденциальности
            </Typography>
          </NProgressLink>
          .
        </Typography>
      </Stack>
    </Box>
  );
}
