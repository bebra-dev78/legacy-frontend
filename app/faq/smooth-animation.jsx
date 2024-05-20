"use client";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { keyframes } from "@emotion/react";
import Image from "next/image";

import woman_1 from "#/public/images/woman_1.png";

export default function SmoothAnimation() {
  return (
    <>
      <Stack
        gap={3}
        zIndex={1}
        sx={{
          "@media (max-width: 899px)": {
            textAlign: "center",
          },
          "@media (min-width: 900px)": {
            animation: `${keyframes`
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        `} 0.5s ease-in-out forwards`,
          },
        }}
      >
        <Typography variant="h1" zIndex={1} color="text.primary">
          FAQ
        </Typography>
        <Typography
          zIndex={1}
          variant="h6"
          fontWeight={500}
          color="text.secondary"
        >
          В этом справочном разделе вы найдёте всю основную информацию
          <br />
          для понятия устройства сервиса
        </Typography>
      </Stack>
      <Box
        sx={{
          zIndex: 1,
          animation: `${keyframes`
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        `} 0.5s ease-in-out forwards`,
          "@media (max-width: 900px)": {
            display: "none",
          },
        }}
      >
        <Image src={woman_1} alt="FAQ" priority />
      </Box>
    </>
  );
}
