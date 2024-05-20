"use client";

import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Skeleton from "@mui/material/Skeleton";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

import { useMemo, useState } from "react";
import { DateTime } from "luxon";

import LineChart from "#/components/global/charts/line";
import Iconify from "#/utils/iconify";

export default function СurrentOfTrades({
  data,
  isLoading,
  chartTypesRef,
  handleDeleteWidget,
}) {
  const theme = useTheme();

  const [chartType, setChartType] = useState(
    chartTypesRef.current["counter-of-trades"] ?? "bar"
  );

  const [series, categories] = useMemo(() => {
    if (!data || data.length === 0) return [[], []];

    const tradesCount = {}; // объект для хранения количества сделок по датам
    let firstDate = Infinity;
    let lastDate = -Infinity;

    // Заполняем объект количеством сделок по датам и находим первую и последнюю даты
    data.forEach((trade) => {
      const entryTime = parseInt(trade.entry_time);
      const date = DateTime.fromMillis(entryTime).toFormat("yyyy-MM-dd");

      if (!tradesCount[date]) {
        tradesCount[date] = 0;
      }
      tradesCount[date]++;

      firstDate = Math.min(firstDate, entryTime);
      lastDate = Math.max(lastDate, entryTime);
    });

    const categories = [];
    const series = [];

    // Создаем массив дат между первой и последней датой сделок
    let currentDate = DateTime.fromMillis(firstDate).startOf("day");
    const lastDay = DateTime.fromMillis(lastDate).startOf("day");

    while (currentDate <= lastDay) {
      const formattedDate = currentDate.toFormat("yyyy-MM-dd");
      categories.push(formattedDate);

      // Добавляем количество сделок за текущий день в массив series
      series.push(tradesCount[formattedDate] || 0);

      currentDate = currentDate.plus({ days: 1 }); // переходим к следующей дате
    }

    return [series, categories];
  }, [data]);

  return isLoading ? (
    <Skeleton />
  ) : (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader
        title="Счетчик сделок"
        titleTypographyProps={{
          className: "drag-header",
          sx: { cursor: "move" },
        }}
        action={
          <>
            <FormControl sx={{ mr: 1 }} size="small">
              <InputLabel>Тип графика</InputLabel>
              <Select
                label="Тип графика"
                value={chartType}
                onChange={(e) => {
                  setChartType(e.target.value);
                  const n = {
                    ...chartTypesRef.current,
                    "counter-of-trades": e.target.value,
                  };
                  chartTypesRef.current = n;
                  localStorage.setItem("chartTypes", JSON.stringify(n));
                }}
              >
                <MenuItem value={"bar"}>Столбчатый</MenuItem>
                <MenuItem value={"numeric"}>Числовой</MenuItem>
              </Select>
            </FormControl>
            <IconButton
              onClick={() => {
                handleDeleteWidget(4);
              }}
            >
              <Iconify
                icon="solar:close-square-outline"
                color="text.disabled"
              />
            </IconButton>
          </>
        }
      />
      <CardContent>
        {chartType === "bar" ? (
          <LineChart
            series={[
              {
                name: "Сделки",
                color: theme.palette.info.main,
                data: series,
              },
            ]}
            categories={categories}
          />
        ) : (
          <Box sx={{ height: "100%" }}>
            <Box
              sx={{
                top: "50%",
                left: "50%",
                padding: "0px 6px",
                borderRadius: "6px",
                width: "min-content",
                position: "relative",
                justifyContent: "center",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(0, 184, 217, 0.16)",
                color:
                  theme.palette.mode === "dark"
                    ? "rgb(97, 243, 243)"
                    : "rgb(0, 108, 156)",
              }}
            >
              <Typography variant="h3">{data.length}</Typography>
            </Box>
          </Box>
        )}
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
