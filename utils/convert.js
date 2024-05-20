"use client";

import { useEffect, useState } from "react";

import useFormat from "#/utils/format-thousands";

export default function Convert({ count }) {
  const [rate, setRate] = useState(1);

  useEffect(() => {
    setRate(93.43);
  }, []);

  return ` ~${useFormat((count * rate).toFixed())}₽`;
}
