import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import RootSecondaryHeader from "#/components/root-secondary-header";
import NProgressLink from "#/components/nprogress-link";
import Iconify from "#/utils/iconify";
import Form from "#/app/restore/form";

export const metadata = {
  title: "Восстановление аккаунта | Tradify",
  description: "Tradify —	восстановление аккаунта",
};

export default function Restore() {
  return (
    <>
      <RootSecondaryHeader />
      <Container component="main">
        <Stack
          sx={{
            margin: "auto",
            maxWidth: "400px",
            minHeight: "100vh",
            paddingTop: "96px",
            textAlign: "center",
            paddingBottom: "96px",
            justifyContent: "center",
          }}
        >
          <Form />
          <NProgressLink
            path="/login"
            style={{
              display: "flex",
              margin: "24px auto",
              flexDirection: "row",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Iconify
              icon="eva:arrow-ios-back-fill"
              color="info.main"
              width={17}
            />
            <Typography
              variant="subtitle2"
              color="info.main"
              sx={{
                "&:hover ": {
                  textDecoration: "underline",
                },
              }}
            >
              вернуться на страницу входа
            </Typography>
          </NProgressLink>
        </Stack>
      </Container>
    </>
  );
}
