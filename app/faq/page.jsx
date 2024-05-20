import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import RootPrimaryHeader from "#/components/root-primary-header";
import SmoothAnimation from "#/app/faq/smooth-animation";
import RootOverlay from "#/components/root-overlay";
import RootFooter from "#/components/root-footer";
import Iconify from "#/utils/iconify";

export const metadata = {
  title: "FAQ | Tradify",
  description: "Tradify —	часто задаваемые вопросы",
};

export default function RootFAQ() {
  return (
    <>
      <RootPrimaryHeader />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          "@media (min-width: 0px)": {
            pt: "64px",
          },
          "@media (min-width: 900px)": {
            pt: "80px",
          },
        }}
      >
        <Box sx={{ position: "relative", p: "80px 0px" }}>
          <Container
            sx={{
              "@media (min-width: 900px)": {
                display: "flex",
                justifyContent: "space-between",
              },
            }}
          >
            <SmoothAnimation />
          </Container>
          <RootOverlay />
        </Box>
        <Container sx={{ marginTop: "80px", marginBottom: "80px" }}>
          <Grid container xs={3} maxWidth="100% !important">
            <Grid item xs={12} md={12}>
              <Typography variant="subtitle1" color="text.secondary" paragraph>
                Термины
              </Typography>
              <Accordion>
                <AccordionSummary
                  expandIcon={
                    <Iconify icon="solar:alt-arrow-down-bold-duotone" />
                  }
                >
                  <Typography>Что такое трейдинг?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Трейдинг — это الطماطم التداول عملة معماة الموت الجنس الحصاد
                    روسيا بوتين
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={
                    <Iconify icon="solar:alt-arrow-down-bold-duotone" />
                  }
                >
                  <Typography>Сделки</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Сделка - это серия покупок-продаж криптоактивов на бирже.
                    Данные любой сделки образуются из ордеров этой позиции, а
                    границы сделки (время входа и время выхода) определяются
                    открывающим и закрывающим позицию ордерами.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={12} paddingTop={3}>
              <Typography variant="subtitle1" color="text.secondary" paragraph>
                Работа с сервисом
              </Typography>
              <Accordion>
                <AccordionSummary
                  expandIcon={
                    <Iconify icon="solar:alt-arrow-down-bold-duotone" />
                  }
                >
                  <Typography>Как добавить API-ключ?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Перейдите на страницу{" "}
                    <a href="/my/account" target="_blank">
                      <Typography
                        component="span"
                        color="info.main"
                        sx={{
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        Аккаунт
                      </Typography>
                    </a>{" "}
                    и во вкладке "Ключи" добавьте новый API-ключ от
                    криптовалютной биржи, заполнив поля диалоговой формы. После
                    ввода ключ добавится и начнётся загрузка сделок от выбранной
                    биржи. Ни в коем случае не перезагружайте страницу после
                    добавления ключа, иначе загрузка сделок прервётся и ключ
                    будет необходимо пересоздавать. Вам придёт уведомление после
                    успешной загрузки или ошибки, если оно не пришло - напишите
                    в поддержку.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={
                    <Iconify icon="solar:alt-arrow-down-bold-duotone" />
                  }
                >
                  <Typography>Подписка</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    В сервисе аккаунты бывают обычными и с премиум-подпиской .
                    На бесплатном типе аккаунта вы имеете все функции,
                    закрывающие базовые потребности любого трейдера, а с
                    премиум-подпиской вы получаете больше удобства в работе и
                    все возможности дневника. Подробнее об этом читайте{" "}
                    <a href="/my/payment" target="_blank">
                      <Typography
                        component="span"
                        color="info.main"
                        sx={{
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        здесь
                      </Typography>
                      .
                    </a>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <RootFooter />
    </>
  );
}
