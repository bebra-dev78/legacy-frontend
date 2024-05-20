import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import Script from "next/script";

import RootSecondaryHeader from "#/components/root-secondary-header";
import BackButton from "#/components/other/back-button";

export const metadata = {
  title: "Страница не найдена | Tradify",
  description: "Tradify — страница не найдена",
};

export default function NotFound() {
  return (
    <>
      <RootSecondaryHeader />
      <Container component="main">
        <Stack
          sx={{
            m: "auto",
            maxWidth: "400px",
            minHeight: "100vh",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3" color="text.primary" paragraph>
            Извините, страница не найдена!
          </Typography>
          <Typography color="text.secondary">
            Извините, нам не удалось найти страницу, которую вы ищете. Возможно,
            вы неправильно ввели URL-адрес?
          </Typography>
          <tgs-player
            autoplay
            loop
            mode="normal"
            src="/video/duck_not_found.tgs"
            style={{ height: "250px", width: "250px", margin: "30px auto" }}
          />
          <BackButton />
        </Stack>
      </Container>
      <Script src="https://unpkg.com/@lottiefiles/lottie-player@2.0.3/dist/tgs-player.js" />
    </>
  );
}
