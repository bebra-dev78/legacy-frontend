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

import AreaChart from "#/components/global/charts/area";
import Iconify from "#/utils/iconify";

export default function CumulativeCommission({
  data,
  isLoading,
  chartTypesRef,
  handleDeleteWidget,
}) {
  const theme = useTheme();

  const [chartType, setChartType] = useState(
    chartTypesRef.current["cumulative-commission"] ?? "linear"
  );

  const [series, categories] = useMemo(() => {
    if (!data || data.length === 0) return [[], []];

    const commissions = {}; // объект для хранения комиссий по датам
    const firstDate = DateTime.fromMillis(
      parseInt(data[0].entry_time)
    ).toFormat("yyyy-MM-dd");
    const lastDate = DateTime.fromMillis(
      parseInt(data[data.length - 1].entry_time)
    ).toFormat("yyyy-MM-dd");

    // Заполняем объект комиссиями по датам
    data.forEach((deal) => {
      const date = DateTime.fromMillis(parseInt(deal.entry_time)).toFormat(
        "yyyy-MM-dd"
      );
      if (!commissions[date]) {
        commissions[date] = 0;
      }
      commissions[date] += parseFloat(deal.commission);
    });

    const categories = [];
    const series = [];
    let cumulativeCommission = 0;

    // Создаем массив дат между первой и последней датой сделок
    let currentDate = DateTime.fromFormat(firstDate, "yyyy-MM-dd");
    const lastDay = DateTime.fromFormat(lastDate, "yyyy-MM-dd");

    while (currentDate <= lastDay) {
      const formattedDate = currentDate.toFormat("yyyy-MM-dd");
      categories.push(formattedDate);

      // Вычисляем кумулятивную комиссию для текущей даты
      cumulativeCommission += commissions[formattedDate] || 0;
      series.push(cumulativeCommission.toFixed(2));

      currentDate = currentDate.plus({ days: 1 }); // переходим к следующей дате
    }

    return [series, categories];
  }, [data]);

  return isLoading ? (
    <Skeleton />
  ) : (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader
        title="Кумулятивная комиссия"
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
                    "cumulative-commission": e.target.value,
                  };
                  chartTypesRef.current = n;
                  localStorage.setItem("chartTypes", JSON.stringify(n));
                }}
              >
                <MenuItem value={"linear"}>Линейный</MenuItem>
                <MenuItem value={"numeric"}>Числовой</MenuItem>
              </Select>
            </FormControl>
            <IconButton
              onClick={() => {
                handleDeleteWidget(5);
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
        {chartType === "linear" ? (
          <AreaChart
            series={[
              {
                name: "Всего",
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
              <Typography variant="h3">
                ${Number(series[series.length - 1] || 0).toFixed(0)}
              </Typography>
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
