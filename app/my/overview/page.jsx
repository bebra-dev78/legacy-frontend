import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

import Image from "next/image";

import GridLayoutItems from "#/layout/Overview/grid-layout-items";
import WelcomeItem from "#/layout/Overview/welcome-item";
import NProgressLink from "#/components/nprogress-link";
import ElapsedTime from "#/utils/elapsed-time";
import Iconify from "#/utils/iconify";

import woman_2 from "#/public/images/woman_2.png";

export const metadata = {
  title: "Главная | Tradify",
  description: "💊",
};

export default function Overview() {
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
      <WelcomeItem />
      <Grid container spacing={3} sx={{ flexFlow: "wrap" }}>
        <GridLayoutItems />
        <Grid item xs={12} md={6} xl={6}>
          <Card>
            <CardHeader
              title="Обновление 0.4.0"
              subheader={
                <Typography
                  display="flex"
                  variant="caption"
                  textAlign="center"
                  alignItems="center"
                  color="text.secondary"
                >
                  <Iconify
                    icon="solar:clock-circle-bold"
                    width={16}
                    sx={{ mr: "5px", mt: "-2px" }}
                  />
                  <ElapsedTime time={"2024-02-25T16:49:00Z"} /> назад
                </Typography>
              }
              subheaderTypographyProps={{
                sx: { m: "4px 0 0", display: "flex", alignItems: "center" },
              }}
            />
            <CardContent>
              <Typography
                paddingBottom="16px"
                whiteSpace="pre-line"
                textOverflow="ellipsis"
              >
                Доброго времени суток, партнёры! В этом обновлении мы немного
                поработали над улучшением UX нашего сервиса:
                <br />
                <br />• В инструментах наложений свечного графика была добавлена
                «линейка» — она позволяет узнать изменение цены в абсолютном и
                процентном соотношениях.
                <br />
                <br />• На странице аккаунта теперь срабатывает мягкая анимация
                при перемещении между вкладками.
                <br />
                <br />• Теперь большинство переиспользуемых данных кешируются
                прямо на клиенте, благодаря чему можно перемещаться по страницам
                панели управления практически без загрузок.
              </Typography>
              <NProgressLink path="/my/news">
                <Button
                  variant="outlined"
                  color="error"
                  size="medium"
                  fullWidth
                >
                  Все новости
                </Button>
              </NProgressLink>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="span"
            sx={{
              zIndex: 1,
              left: "40px",
              position: "relative",
              filter: "drop-shadow(rgba(0, 0, 0, 0.24) 0px 12px 24px)",
            }}
          >
            <Image src={woman_2} height={202} width={140} />
          </Box>
          <Card
            sx={{
              mt: "-120px",
              p: "128px 40px 40px",
              color: "rgb(255, 255, 255)",
              background:
                "linear-gradient(135deg, rgb(118, 53, 220), rgb(67, 26, 158))",
            }}
          >
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h4" maxWidth={350}>
                С ежемесячной подпиской можно пользоваться дневником без
                ограничений
              </Typography>
              <Typography variant="h2">5$</Typography>
            </Stack>
            <Typography variant="body2" margin="16px 0px 24px">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              harum, recusandae pariatur itaque doloribus debitis. Autem dolorem
              voluptate explicabo quaerat.
            </Typography>
            <NProgressLink path="/my/payment">
              <Button variant="contained" color="warning" size="medium">
                Подробнее
              </Button>
            </NProgressLink>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
