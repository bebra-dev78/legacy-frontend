"use client";

import Button from "@mui/material/Button";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="contained"
      color="inherit"
      size="large"
      onClick={() => {
        router.back();
      }}
    >
      Вернуться назад
    </Button>
  );
}
