"use client";

import Typography from "@mui/material/Typography";

import { keyframes } from "@emotion/react";

export default function SmoothAnimation() {
  return (
    <>
      <Typography
        variant="h1"
        color="text.primary"
        sx={{
          animation: `${keyframes`
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        `} 0.4s ease-in-out forwards`,
        }}
      >
        Начните свою
        <br />
        торговлю
        <br />с{" "}
        <Typography
          variant="h1"
          component="span"
          sx={{
            WebkitTextFillColor: "transparent",
            background:
              "-webkit-linear-gradient(300deg, rgb(0, 167, 111) 0%, rgb(255, 171, 0) 25%, rgb(0, 167, 111) 50%, rgb(255, 171, 0) 75%, rgb(0, 167, 111) 100%) 0% 0% / 400% text",
            animation: `${keyframes`
            0% {
              background-position: 0 0;
            }
            50% {
              background-position: 400% 0;
            }
            100% {
              background-position: 0 0;
            }
          `} 40s linear infinite`,
          }}
        >
          Tradify
        </Typography>
      </Typography>
      <Typography
        variant="body2"
        color="text.primary"
        sx={{
          animation: `${keyframes`
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        `} 0.8s ease-in-out forwards`,
        }}
      >
        Криптовалютный
        <Typography
          variant="body2"
          component="span"
          fontWeight={600}
          color="primary.main"
        >
          {" "}
          дневник трейдера
        </Typography>
        , предназначенный для улучшения стратегии вашей торговли.
        Регистрируйтесь, подключайте криптобиржи и ведите детальный журнал
        сделок – всё в одном месте для успешного трейдинга.
      </Typography>
    </>
  );
}
