"use client";

import { useTheme } from "@mui/material/styles";

import Chart from "react-apexcharts";

import { locales } from "#/utils/apexcharts-config";

export default function LineChart({ series, categories }) {
  const theme = useTheme();
  return (
    <Chart
      options={{
        chart: {
          type: "line",
          locales,
          defaultLocale: "ru",
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
          dropShadow: {
            enabled: false,
          },
        },
        markers: {
          strokeColors: "rgba(22, 28, 36, 0.8)",
        },
        stroke: { curve: "smooth", width: 3 },
        grid: {
          borderColor: "rgba(145, 158, 171, 0.2)",
          strokeDashArray: 3,
        },
        dataLabels: {
          enabled: false,
        },
        tooltip: {
          x: {
            show: false,
          },
          theme: true,
          style: {
            fontSize: "12px",
            fontFamily: "inherit",
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: theme.palette.text.secondary,
            },
          },
        },
        xaxis: {
          type: "datetime",
          categories,
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            style: {
              colors: theme.palette.text.secondary,
              fontSize: "10px",
            },
          },
        },
      }}
      series={series}
      height="100%"
      type="line"
    />
  );
}
