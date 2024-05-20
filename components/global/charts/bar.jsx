"use client";

import { useTheme } from "@mui/material/styles";

import Chart from "react-apexcharts";

import { locales } from "#/utils/apexcharts-config";

export default function BarChart({ series, categories, color }) {
  const theme = useTheme();

  return (
    <Chart
      options={{
        chart: {
          type: "bar",
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
          animations: {
            dynamicAnimation: {
              enabled: false,
            },
          },
        },
        colors: [theme.palette.primary.main],
        grid: {
          borderColor: "rgba(145, 158, 171, 0.2)",
          strokeDashArray: 3,
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          bar: {
            colors: {
              ranges: [
                {
                  from: -100000,
                  to: -100,
                  color: theme.palette.error.main,
                },
                {
                  from: -100,
                  to: 0,
                  color: theme.palette.warning.main,
                },
              ],
            },
            columnWidth: "50%",
            borderRadius: 4,
            borderRadiusApplication: "end",
          },
        },
        tooltip: {
          x: {
            show: false,
            formatter: (val) => `${val.toFixed(2)}$`,
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
            formatter: (val) => `${val.toFixed(0)}$`,
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
      type="bar"
    />
  );
}
