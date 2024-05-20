"use client";

import { useMode } from "#/components/global/theme-registry";
import Iconify from "#/utils/iconify";

export default function ErrorIcon() {
  const { mode } = useMode();

  return (
    <Iconify
      icon="solar:danger-bold"
      color={mode === "dark" ? "rgb(255, 172, 130)" : "rgb(255, 86, 48)"}
    />
  );
}
