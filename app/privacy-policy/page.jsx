import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import RootPrimaryHeader from "#/components/root-primary-header";
import RootOverlay from "#/components/root-overlay";
import RootFooter from "#/components/root-footer";

export const metadata = {
  title: "Политика конфиденциальности | Tradify",
  description: "Tradify —	политика конфиденциальности",
};

export default function Policy() {
  return (
    <>
      <RootPrimaryHeader />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          paddingTop: "80px",
          "@media (max-width: 899px)": {
            paddingTop: "64px",
          },
        }}
      >
        <Box
          sx={{
            p: "80px 0px",
            position: "relative",
          }}
        >
          <Container
            sx={{
              p: "40px 0px",
              "@media (min-width: 900px)": {
                display: "flex",
                justifyContent: "space-between",
              },
            }}
          >
            <Stack
              sx={{
                "@media (max-width: 900px)": {
                  textAlign: "center",
                },
              }}
            >
              <Typography
                zIndex={1}
                variant="h1"
                color="text.primary"
                sx={{
                  "@media (max-width: 600px)": {
                    fontSize: "2.25rem",
                  },
                  "@media (max-width: 360px)": {
                    fontSize: "2rem",
                  },
                }}
              >
                Политика
              </Typography>
              <Typography
                zIndex={1}
                variant="h1"
                component="span"
                color="primary.main"
                sx={{
                  "@media (max-width: 600px)": {
                    fontSize: "2rem",
                  },
                  "@media (max-width: 360px)": {
                    fontSize: "1.75rem",
                  },
                }}
              >
                конфиденциальности
              </Typography>
            </Stack>
          </Container>
          <RootOverlay />
        </Box>
        <Container
          sx={{
            pt: "160px",
            pb: "160px",
          }}
        >
          <Typography color="text.primary">
            Настоящая Политика конфиденциальности персональных данных (далее –
            Политика конфиденциальности) действует в отношении всей информации,
            которую сайт, может получить о Пользователе во время использования
            сайта. Используя сайт и (или) оставляя свои персональные данные на
            сайте, Пользователь выражает свое согласие на использование данных
            на условиях, изложенных в настоящей Политике конфиденциальности.
            Отношения, связанные со сбором, хранением, распространением и
            защитой информации, предоставляемой Пользователем, регулируются
            настоящей Политикой и действующим законодательством Российской
            Федерации. В случае несогласия Пользователя с условиями настоящей
            Политики использование сайта должно быть немедленно прекращено.
          </Typography>
        </Container>
      </Box>
      <RootFooter />
    </>
  );
}
