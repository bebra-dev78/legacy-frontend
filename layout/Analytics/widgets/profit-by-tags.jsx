"use client";

import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";

import Chart from "react-apexcharts";
import { DateTime } from "luxon";
import { useMemo } from "react";
import moment from "moment";

import Iconify from "#/utils/iconify";

export default function ProfitByTags({ data, isLoading, handleDeleteWidget }) {
  const theme = useTheme();

  const [series, categories] = useMemo(() => {
    if (!data || data.length === 0) return [[], []];

    const profitsByTags = {}; // объект для хранения общей прибыли по тегам
    const uniqueTags = new Set();

    // Перебираем каждую сделку и суммируем прибыль для каждого тега
    data.forEach((deal) => {
      const tags = deal.tags ? JSON.parse(deal.tags) : []; // Проверяем наличие тегов
      const profit = parseFloat(deal.profit);

      tags.forEach((tag) => {
        if (!profitsByTags[tag]) {
          profitsByTags[tag] = 0;
        }
        profitsByTags[tag] += profit;
        uniqueTags.add(tag);
      });
    });

    // Преобразуем Set в массив уникальных тегов
    const uniqueTagsArray = Array.from(uniqueTags);

    // Формируем массивы categories и series
    const categories = uniqueTagsArray.map((tag) => tag.toString());
    const series = uniqueTagsArray.map((tag) => profitsByTags[tag] || 0);

    return [series, categories];
  }, [data]);

  return isLoading ? (
    <Skeleton />
  ) : (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader
        title="Прибыль по причинам входа"
        titleTypographyProps={{
          className: "drag-header",
          sx: { cursor: "move" },
        }}
        action={
          <IconButton
            onClick={() => {
              handleDeleteWidget(8);
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
                borderRadius: 6,
                borderRadiusApplication: "end",
                colors: {
                  ranges: [
                    {
                      from: -1000000,
                      to: 0,
                      color: theme.palette.error.main,
                    },
                  ],
                },
              },
            },
            xaxis: {
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
                formatter: (val) => `${val}$`,
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
              data: series,
              color: theme.palette.primary.main,
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
