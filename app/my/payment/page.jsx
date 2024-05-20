import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import Iconify from "#/utils/iconify";

export const metadata = {
  title: "Подписка | Tradify",
  description: "💊",
};

export default function Payment() {
  return (
    <Container>
      <Stack textAlign="center" marginBottom="60px">
        <Typography variant="h2" color="text.primary" marginBottom="30px">
          Лучший выбор
          <br />
          для вашей торговли
        </Typography>
        <Typography color="text.secondary">
          С премиальной подпиской вы сможете открыть все возможности дневника
        </Typography>
      </Stack>
      <Box
        sx={{
          gap: 10,
          display: "flex",
          borderRadius: "16px",
          justifyContent: "center",
        }}
      >
        <Stack
          width={383}
          padding="40px"
          borderRadius="16px"
          border="1px dashed rgba(145, 158, 171, 0.2)"
        >
          <Typography variant="overline" color="text.disabled" paragraph>
            Навсегда
          </Typography>
          <Typography
            variant="h4"
            color="text.primary"
            paragraph
            position="relative"
          >
            Бесплатно
            <Box
              sx={{
                left: "0px",
                bottom: "4px",
                width: "40px",
                height: "8px",
                opacity: 0.48,
                position: "absolute",
                backgroundColor: "primary.main",
              }}
            />
          </Typography>
          <Stack gap={3} marginTop="40px">
            <Stack
              color="text.primary"
              flexDirection="row"
              alignItems="center"
              gap={1}
            >
              <Iconify icon="eva:checkmark-fill" width={18} />
              <Typography variant="body2">
                Без ограничений на кол-во API-ключей
              </Typography>
            </Stack>
            <Stack
              color="text.primary"
              flexDirection="row"
              alignItems="center"
              gap={1}
            >
              <Iconify icon="eva:checkmark-fill" width={18} />
              <Typography variant="body2">
                Без ограничений на кол-во виджетов
              </Typography>
            </Stack>
            <Stack
              color="text.primary"
              flexDirection="row"
              alignItems="center"
              gap={1}
            >
              <Iconify icon="eva:checkmark-fill" width={18} />
              <Typography variant="body2">
                Без ограничений на историю сделок
              </Typography>
            </Stack>
            <Divider />
            <Stack
              color="text.disabled"
              flexDirection="row"
              alignItems="center"
              gap={1}
            >
              <Iconify icon="eva:close-fill" width={18} />
              <Typography variant="body2">
                Доступна всего 1 доска в «Аналитике»
              </Typography>
            </Stack>
            <Stack
              color="text.disabled"
              flexDirection="row"
              alignItems="center"
              gap={1}
            >
              <Iconify icon="eva:close-fill" width={28} />
              <Typography variant="body2">
                В «Журнале» можно посмотреть данные только за текущий месяц
              </Typography>
            </Stack>
            <Stack
              color="text.disabled"
              flexDirection="row"
              alignItems="center"
              gap={1}
            >
              <Iconify icon="eva:close-fill" width={18} />
              <Typography variant="body2">
                Ограничения на публичный профиль
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          width={383}
          padding="40px"
          borderRadius="16px"
          border="1px dashed rgba(145, 158, 171, 0.2)"
        >
          <Typography variant="overline" color="text.disabled" paragraph>
            Ежемесячно
          </Typography>
          <Typography
            variant="h4"
            color="text.primary"
            paragraph
            position="relative"
          >
            Премиум
            <Box
              sx={{
                left: "0px",
                bottom: "4px",
                width: "40px",
                height: "8px",
                opacity: 0.48,
                position: "absolute",
                backgroundColor: "info.main",
              }}
            />
          </Typography>
          <Stack gap={3} marginTop="40px">
            <Stack
              color="text.primary"
              flexDirection="row"
              alignItems="center"
              gap={1}
            >
              <Iconify icon="eva:checkmark-fill" width={18} />
              <Typography variant="body2">
                Без ограничений на кол-во API-ключей
              </Typography>
            </Stack>
            <Stack
              color="text.primary"
              flexDirection="row"
              alignItems="center"
              gap={1}
            >
              <Iconify icon="eva:checkmark-fill" width={18} />
              <Typography variant="body2">
                Без ограничений на кол-во виджетов
              </Typography>
            </Stack>
            <Stack
              color="text.primary"
              flexDirection="row"
              alignItems="center"
              gap={1}
            >
              <Iconify icon="eva:checkmark-fill" width={18} />
              <Typography variant="body2">
                Без ограничений на историю сделок
              </Typography>
            </Stack>
            <Divider />
            <Stack
              color="text.disabled"
              flexDirection="row"
              alignItems="center"
              gap={1}
            >
              <Iconify icon="eva:checkmark-fill" width={18} />
              <Typography variant="body2">
                Доступно неограниченное кол-во досок
              </Typography>
            </Stack>
            <Stack
              color="text.disabled"
              flexDirection="row"
              alignItems="center"
              gap={1}
            >
              <Iconify icon="eva:checkmark-fill" />
              <Typography variant="body2">
                В «Журнале» можно посмотреть данные за любое время
              </Typography>
            </Stack>
            <Stack
              color="text.disabled"
              flexDirection="row"
              alignItems="center"
              gap={1}
            >
              <Iconify icon="eva:checkmark-fill" width={18} />
              <Typography variant="body2">
                Без ограничений на публичный профиль
              </Typography>
            </Stack>
          </Stack>
          <Button
            variant="contained"
            size="large"
            color="inherit"
            sx={{ mt: "80px" }}
          >
            Перейти к оплате
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
