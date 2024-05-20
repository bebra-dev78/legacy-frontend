import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import NProgressLink from "#/components/nprogress-link";
import Iconify from "#/utils/iconify";

export const metadata = {
  title: "FAQ | Tradify",
  description: "💊",
};

export default function FAQ() {
  return (
    <Box
      sx={{
        marginLeft: "auto",
        marginRight: "auto",
        "@media (min-width: 1200px)": {
          maxWidth: "1200px",
        },
      }}
    >
      <Typography variant="h4" color="text.primary" paragraph>
        Часто задаваемые вопросы
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            Термины
          </Typography>
          <Accordion>
            <AccordionSummary
              expandIcon={<Iconify icon="solar:alt-arrow-down-bold-duotone" />}
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
              expandIcon={<Iconify icon="solar:alt-arrow-down-bold-duotone" />}
            >
              <Typography>Сделки</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Сделка - это серия покупок-продаж криптоактивов на бирже. Данные
                любой сделки образуются из ордеров этой позиции, а границы
                сделки (время входа и время выхода) определяются открывающим и
                закрывающим позицию ордерами.
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
              expandIcon={<Iconify icon="solar:alt-arrow-down-bold-duotone" />}
            >
              <Typography>Как добавить API-ключ?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Перейдите на страницу{" "}
                <NProgressLink path="/my/account/">
                  <Typography
                    component="span"
                    color="info.main"
                    sx={{
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Аккаунт
                  </Typography>
                </NProgressLink>{" "}
                и во вкладке "Ключи" добавьте новый API-ключ от криптовалютной
                биржи, заполнив поля диалоговой формы. После ввода ключ
                добавится и начнётся загрузка сделок от выбранной биржи. Ни в
                коем случае не перезагружайте страницу после добавления ключа,
                иначе загрузка сделок прервётся и ключ будет необходимо
                пересоздавать. Вам придёт уведомление после успешной загрузки
                или ошибки, если оно не пришло - напишите в поддержку.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<Iconify icon="solar:alt-arrow-down-bold-duotone" />}
            >
              <Typography>Подписка</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                В сервисе аккаунты бывают обычными и с премиум-подпиской . На
                бесплатном типе аккаунта вы имеете все функции, закрывающие
                базовые потребности любого трейдера, а с премиум-подпиской вы
                получаете больше удобства в работе и все возможности дневника.
                Подробнее об этом читайте{" "}
                <NProgressLink path="/my/payment">
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
                </NProgressLink>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Box>
  );
}
