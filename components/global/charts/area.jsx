"use client";

import { useTheme } from "@mui/material/styles";

import Chart from "react-apexcharts";

import { locales } from "#/utils/apexcharts-config";

export default function AreaChart({ series, categories, color }) {
  const theme = useTheme();

  return (
    <Chart
      options={{
        chart: {
          type: "area",
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
            enabled: false,
            animateGradually: {
              enabled: false,
            },
            dynamicAnimation: {
              enabled: false,
            },
          },
        },
        // colors: [color],
        fill: {
          type: "gradient",
          opacity: 0.05,
          gradient: {
            shadeIntensity: 0.05,
            inverseColors: false,
            stops: [20, 100, 100, 100],
          },
        },
        grid: {
          borderColor: "rgba(145, 158, 171, 0.2)",
          strokeDashArray: 3,
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          type: "datetime",
          categories: categories,
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
        yaxis: {
          labels: {
            style: {
              colors: theme.palette.text.secondary,
            },
            formatter: (value) => `${value}$`,
          },
        },
        markers: {
          strokeColors: "rgba(22, 28, 36, 0.8)",
        },
        tooltip: {
          x: {
            show: false,
          },
          y: {
            title: {
              formatter: () => "",
            },
          },
        },
      }}
      series={series}
      height="100%"
      type="area"
    />
  );
}
