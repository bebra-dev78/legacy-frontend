"use client";

import { utils } from "klinecharts";

export default function useFormat(count) {
  return utils.formatThousands(count, ",");
}
