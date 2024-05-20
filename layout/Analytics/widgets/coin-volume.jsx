"use client";

import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";

import Chart from "react-apexcharts";

import useFormat from "#/utils/format-thousands";
import Iconify from "#/utils/iconify";

export default function CoinVolume({ data, isLoading, handleDeleteWidget }) {
  const theme = useTheme();

  const counter = Object.fromEntries(
    Object.entries(
      data.reduce((acc, trade) => {
        if (acc[trade.symbol]) {
          acc[trade.symbol] += parseFloat(trade.volume);
        } else {
          acc[trade.symbol] = parseFloat(trade.volume);
        }
        return acc;
      }, {})
    ).sort((a, b) => a[1] - b[1])
  );

  return isLoading ? (
    <Skeleton />
  ) : (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader
        title="Объём по монете"
        titleTypographyProps={{
          className: "drag-header",
          sx: { cursor: "move" },
        }}
        action={
          <IconButton
            onClick={() => {
              handleDeleteWidget(2);
            }}
          >
            <Iconify icon="solar:close-square-outline" color="text.disabled" />
          </IconButton>
        }
      />
      <CardContent>
        <Chart
          options={{
            chart: {
              type: "bar",
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
            colors: ["#FFAC82"],
            dataLabels: {
              enabled: false,
            },
            grid: {
              borderColor: "rgba(145, 158, 171, 0.2)",
              strokeDashArray: 3,
            },
            plotOptions: {
              bar: {
                horizontal: true,
                borderRadius: 4,
                borderRadiusApplication: "end",
              },
            },
            xaxis: {
              categories: Object.keys(counter),
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              labels: {
                style: {
                  colors: theme.palette.text.secondary,
                },
              },
            },
            yaxis: {
              labels: {
                style: {
                  colors: theme.palette.text.secondary,
                },
              },
            },
            tooltip: {
              marker: { show: false },
              x: {
                show: false,
              },
              y: {
                formatter: (value) => `$${useFormat(value.toFixed(0))}`,
                title: {
                  formatter: () => "",
                },
              },
              style: {
                fontSize: "14px",
                fontFamily: "inherit",
              },
            },
          }}
          series={[
            {
              data: Object.values(counter),
            },
          ]}
          height="100%"
          type="bar"
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
