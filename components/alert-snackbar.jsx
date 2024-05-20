"use client";

import SnackbarContent from "@mui/material/SnackbarContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";

import Iconify from "#/utils/iconify";

export default function AlertSnackbar({ statusSnackbar, setStatusSnackbar }) {
  switch (statusSnackbar.variant) {
    case "success":
      return (
        <Snackbar
          anchorOrigin={
            statusSnackbar.anchorOrigin ?? {
              vertical: "bottom",
              horizontal: "right",
            }
          }
          open={statusSnackbar.show ?? false}
          autoHideDuration={1500}
          transitionDuration={300}
          onClose={() => {
            setStatusSnackbar({
              show: false,
              variant: "success",
              text: statusSnackbar.text ?? "Изменения сохранены",
              anchorOrigin: statusSnackbar.anchorOrigin ?? {
                vertical: "bottom",
                horizontal: "right",
              },
            });
          }}
        >
          <SnackbarContent
            role
            message={
              <Box
                sx={{
                  display: "flex",
                  maxWidth: "300px",
                  alignItems: "center",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    marginRight: "12px",
                    minWidth: "40px",
                    height: "40px",
                    display: "flex",
                    borderRadius: "8px",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgb(34, 197, 94)",
                    backgroundColor: "rgba(34, 197, 94, 0.16)",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    width="24px"
                    height="24px"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m4.3 7.61l-4.57 6a1 1 0 0 1-.79.39a1 1 0 0 1-.79-.38l-2.44-3.11a1 1 0 0 1 1.58-1.23l1.63 2.08l3.78-5a1 1 0 1 1 1.6 1.22Z"
                    ></path>
                  </svg>
                </Box>
                <Typography variant="subtitle2">
                  {statusSnackbar.text ?? "Изменения сохранены"}
                </Typography>
              </Box>
            }
            action={
              <IconButton
                onClick={() => {
                  setStatusSnackbar({
                    show: false,
                    variant: "success",
                    text: statusSnackbar.text ?? "Изменения сохранены",
                    anchorOrigin: statusSnackbar.anchorOrigin ?? {
                      vertical: "bottom",
                      horizontal: "right",
                    },
                  });
                }}
                sx={{ mr: 1 }}
              >
                <Iconify
                  icon="mingcute:close-line"
                  color="text.secondary"
                  width={18}
                />
              </IconButton>
            }
          />
        </Snackbar>
      );
    case "error":
      return (
        <Snackbar
          anchorOrigin={
            statusSnackbar.anchorOrigin ?? {
              vertical: "bottom",
              horizontal: "right",
            }
          }
          open={statusSnackbar.show ?? false}
          autoHideDuration={2000}
          transitionDuration={300}
          onClose={() => {
            setStatusSnackbar({
              show: false,
              variant: "error",
              text:
                statusSnackbar.text ??
                "Операция не удалась. Возможно ошибка на стороне сервера",
              anchorOrigin: statusSnackbar.anchorOrigin ?? {
                vertical: "bottom",
                horizontal: "right",
              },
            });
          }}
        >
          <SnackbarContent
            role
            message={
              <Box
                sx={{
                  display: "flex",
                  maxWidth: "300px",
                  alignItems: "center",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    marginRight: "12px",
                    minWidth: "40px",
                    height: "40px",
                    display: "flex",
                    borderRadius: "8px",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgb(255, 86, 48)",
                    backgroundColor: "rgba(255, 86, 48, 0.16)",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M7.843 3.802C9.872 2.601 10.886 2 12 2c1.114 0 2.128.6 4.157 1.802l.686.406c2.029 1.202 3.043 1.803 3.6 2.792c.557.99.557 2.19.557 4.594v.812c0 2.403 0 3.605-.557 4.594c-.557.99-1.571 1.59-3.6 2.791l-.686.407C14.128 21.399 13.114 22 12 22c-1.114 0-2.128-.6-4.157-1.802l-.686-.407c-2.029-1.2-3.043-1.802-3.6-2.791C3 16.01 3 14.81 3 12.406v-.812C3 9.19 3 7.989 3.557 7c.557-.99 1.571-1.59 3.6-2.792zM13 16a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-1-9.75a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0V7a.75.75 0 0 1 .75-.75"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </Box>
                <Typography variant="subtitle2">
                  {statusSnackbar.text ??
                    "Операция не удалась. Возможно ошибка на стороне сервера"}
                </Typography>
              </Box>
            }
            action={
              <IconButton
                onClick={() => {
                  setStatusSnackbar({
                    show: false,
                    variant: "error",
                    text:
                      statusSnackbar.text ??
                      "Операция не удалась. Возможно ошибка на стороне сервера",
                    anchorOrigin: statusSnackbar.anchorOrigin ?? {
                      vertical: "bottom",
                      horizontal: "right",
                    },
                  });
                }}
                sx={{ mr: 1 }}
              >
                <Iconify
                  icon="mingcute:close-line"
                  width={18}
                  color="text.secondary"
                />
              </IconButton>
            }
          />
        </Snackbar>
      );
    case "warning":
      return (
        <Snackbar
          anchorOrigin={
            statusSnackbar.anchorOrigin ?? {
              vertical: "bottom",
              horizontal: "right",
            }
          }
          open={statusSnackbar.show ?? false}
          autoHideDuration={2000}
          transitionDuration={300}
          onClose={() => {
            setStatusSnackbar({
              show: false,
              variant: "warning",
              text:
                statusSnackbar.text ??
                "Произошла неизвестная ошибка при обработке данных",
              anchorOrigin: statusSnackbar.anchorOrigin ?? {
                vertical: "bottom",
                horizontal: "right",
              },
            });
          }}
        >
          <SnackbarContent
            role
            message={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  maxWidth: "300px",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    marginRight: "12px",
                    minWidth: "40px",
                    height: "40px",
                    display: "flex",
                    borderRadius: "8px",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgb(255, 171, 0)",
                    backgroundColor: "rgba(255, 171, 0, 0.16)",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M22.56 16.3L14.89 3.58a3.43 3.43 0 0 0-5.78 0L1.44 16.3a3 3 0 0 0-.05 3A3.37 3.37 0 0 0 4.33 21h15.34a3.37 3.37 0 0 0 2.94-1.66a3 3 0 0 0-.05-3.04M12 17a1 1 0 1 1 1-1a1 1 0 0 1-1 1m1-4a1 1 0 0 1-2 0V9a1 1 0 0 1 2 0Z"
                    ></path>
                  </svg>
                </Box>
                <Typography variant="subtitle2">
                  {statusSnackbar.text ??
                    "Произошла неизвестная ошибка при обработке данных"}
                </Typography>
              </Box>
            }
            action={
              <IconButton
                onClick={() => {
                  setStatusSnackbar({
                    show: false,
                    variant: "warning",
                    text:
                      statusSnackbar.text ??
                      "Произошла неизвестная ошибка при обработке данных",
                    anchorOrigin: statusSnackbar.anchorOrigin ?? {
                      vertical: "bottom",
                      horizontal: "right",
                    },
                  });
                }}
                sx={{ mr: 1 }}
              >
                <Iconify
                  icon="mingcute:close-line"
                  width={18}
                  color="text.secondary"
                />
              </IconButton>
            }
          />
        </Snackbar>
      );
    case "info":
      return (
        <Snackbar
          anchorOrigin={
            statusSnackbar.anchorOrigin ?? {
              vertical: "bottom",
              horizontal: "right",
            }
          }
          open={statusSnackbar.show ?? false}
          autoHideDuration={4000}
          transitionDuration={300}
          onClose={() => {
            setStatusSnackbar({
              show: false,
              variant: "info",
              text:
                statusSnackbar.text ??
                "Вы получите уведомление, когда закончится загрузка сделок",
              anchorOrigin: statusSnackbar.anchorOrigin ?? {
                vertical: "bottom",
                horizontal: "right",
              },
            });
          }}
        >
          <SnackbarContent
            role
            message={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  maxWidth: "300px",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    marginRight: "12px",
                    minWidth: "40px",
                    height: "40px",
                    display: "flex",
                    borderRadius: "8px",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgb(0, 184, 217)",
                    backgroundColor: "rgba(0, 184, 217, 0.16)",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m1 14a1 1 0 0 1-2 0v-5a1 1 0 0 1 2 0Zm-1-7a1 1 0 1 1 1-1a1 1 0 0 1-1 1"
                    ></path>
                  </svg>
                </Box>
                <Typography variant="subtitle2">
                  {statusSnackbar.text ??
                    "Вы получите уведомление, когда закончится загрузка сделок"}
                </Typography>
              </Box>
            }
            action={
              <IconButton
                onClick={() => {
                  setStatusSnackbar({
                    show: false,
                    variant: "info",
                    text:
                      statusSnackbar.text ??
                      "Вы получите уведомление, когда закончится загрузка сделок",
                    anchorOrigin: statusSnackbar.anchorOrigin ?? {
                      vertical: "bottom",
                      horizontal: "right",
                    },
                  });
                }}
                sx={{ mr: 1 }}
              >
                <Iconify
                  icon="mingcute:close-line"
                  width={18}
                  color="text.secondary"
                />
              </IconButton>
            }
          />
        </Snackbar>
      );

    default:
      break;
  }
}
