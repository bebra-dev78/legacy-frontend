"use client";

import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";

import { DateTime } from "luxon";
import { useMemo } from "react";

import BarChart from "#/components/global/charts/bar";
import Iconify from "#/utils/iconify";

export default function Profit({ data, isLoading, handleDeleteWidget }) {
  const theme = useTheme();

  const [series, categories] = useMemo(() => {
    if (!data || data.length === 0) return [[], []];

    const profits = {}; // объект для хранения прибыли по датам
    let firstDate = Infinity;
    let lastDate = -Infinity;

    // Заполняем объект прибылью по датам и находим первую и последнюю даты
    data.forEach((deal) => {
      const entryTime = parseInt(deal.entry_time);
      const date = DateTime.fromMillis(entryTime).toFormat("yyyy-MM-dd");

      if (!profits[date]) {
        profits[date] = 0;
      }
      profits[date] += parseFloat(deal.profit);

      firstDate = Math.min(firstDate, entryTime);
      lastDate = Math.max(lastDate, entryTime);
    });

    const categories = [];
    const series = [];

    let currentDate = DateTime.fromMillis(firstDate).startOf("day");
    const lastDay = DateTime.fromMillis(lastDate).startOf("day");

    while (currentDate <= lastDay) {
      const formattedDate = currentDate.toFormat("yyyy-MM-dd");
      categories.push(formattedDate);

      series.push(profits[formattedDate] || 0);

      currentDate = currentDate.plus({ days: 1 });
    }

    return [series, categories];
  }, [data]);

  return isLoading ? (
    <Skeleton />
  ) : (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader
        title="Прибыль"
        titleTypographyProps={{
          className: "drag-header",
          sx: { cursor: "move" },
        }}
        action={
          <IconButton
            onClick={() => {
              handleDeleteWidget(7);
            }}
          >
            <Iconify icon="solar:close-square-outline" color="text.disabled" />
          </IconButton>
        }
      />
      <CardContent>
        <BarChart
          series={[
            {
              name: "Прибыль",
              color: theme.palette.primary.main,
              data: series,
            },
          ]}
          categories={categories}
        />
      </CardContent>
      <Iconify
        icon="tabler:border-corner-ios"
        color="#637381"
        width={18}
        sx={{
          position: "absolute",
          rotate: "180deg",
          bottom: 0,
          right: 0,
        }}
      />
    </Card>
  );
}
