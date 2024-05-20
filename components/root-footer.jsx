import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import LinkToPolicy from "#/components/other/footer-link-to-policy";
import AppLogo from "#/components/app-logo";

export default function RootFooter() {
  return (
    <Box component="footer">
      <Divider />
      <Container sx={{ pt: "40px" }}>
        <Grid
          container
          textAlign="left"
          paddingBottom="80px"
          justifyContent="space-between"
          sx={{
            "@media (max-width: 900px)": {
              textAlign: "center",
              justifyContent: "center",
            },
          }}
        >
          <Grid item xs={12} margin="0px 0px 24px">
            <AppLogo />
          </Grid>
          <Grid item xs={8} md={3}>
            <Typography variant="body2" color="text.primary">
              Современный дневник трейдера, предназначенный для улучшения
              стратегии вашей торговли.
            </Typography>
            <Typography variant="body2" color="text.disabled" margin="40px 0">
              © 2024. Все права защищены
            </Typography>
          </Grid>
          <Grid item xs={12} md={7}>
            <Stack
              gap="40px"
              flexDirection="row"
              justifyContent="space-between"
              sx={{
                "@media (max-width: 900px)": {
                  flexDirection: "column",
                  gap: "40px",
                },
              }}
            >
              <Stack
                gap={2}
                alignItems="flex-start"
                sx={{
                  "@media (max-width: 900px)": {
                    alignItems: "center",
                  },
                }}
              >
                <Typography variant="overline" color="text.primary">
                  Telegram
                </Typography>
                <a href="https://t.me/tradifyy" target="_blank">
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    https://t.me/tradifyy
                  </Typography>
                </a>
              </Stack>
              <Stack
                gap={2}
                alignItems="flex-start"
                sx={{
                  "@media (max-width: 900px)": {
                    alignItems: "center",
                  },
                }}
              >
                <Typography variant="overline" color="text.primary">
                  Правовая информация
                </Typography>
                <LinkToPolicy />
              </Stack>
              <Stack
                gap={2}
                alignItems="flex-start"
                sx={{
                  "@media (max-width: 900px)": {
                    alignItems: "center",
                  },
                }}
              >
                <Typography variant="overline" color="text.primary">
                  Связь с нами
                </Typography>
                <a href="mailto:support@tradify.su" target="_blank">
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    support@tradify.su
                  </Typography>
                </a>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
