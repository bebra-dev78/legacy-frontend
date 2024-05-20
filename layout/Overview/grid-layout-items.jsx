"use client";

import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Skeleton from "@mui/material/Skeleton";
import Collapse from "@mui/material/Collapse";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

import { useState, useEffect, useMemo } from "react";
import Chart from "react-apexcharts";
import { DateTime } from "luxon";
import moment from "moment";

import useFormat from "#/utils/format-thousands";
import { useUser } from "#/app/my/layout";
import Iconify from "#/utils/iconify";

function ProfitItem({ data, today, last24Hours, isLoading }) {
  const [current, diff, series] = useMemo(() => {
    const now = Date.now();
    const counter = today.reduce((a, t) => a + t.profit, 0);

    return [
      counter.toFixed(2),
      counter -
        data
          .filter((t) => {
            const entryTime = parseInt(t.entry_time);
            return (
              now - entryTime > 24 * 60 * 60 * 1000 &&
              now - entryTime <= 48 * 60 * 60 * 1000
            );
          })
          .reduce((a, t) => a + t.profit, 0),
      [
        {
          data: Array.from({ length: 24 }, (_, hour) => {
            const hourStart = last24Hours + hour * 60 * 60 * 1000;
            const hourEnd = last24Hours + (hour + 1) * 60 * 60 * 1000;
            const hourProfit = today.reduce((a, t) => {
              const entryTime = parseInt(t.entry_time);
              if (entryTime >= hourStart && entryTime < hourEnd) {
                return a + t.profit;
              }
              return a;
            }, 0);
            return { x: hour, y: hourProfit };
          }),
          name: "aboba",
          color: "rgb(255, 171, 0)",
        },
      ],
    ];
  }, [data]);

  return isLoading ? (
    <Skeleton height={166} />
  ) : (
    <Card
      sx={{
        padding: "24px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">Прибыль</Typography>
        <Stack
          gap={1}
          marginTop="16px"
          marginBottom="8px"
          alignItems="center"
          flexDirection="row"
        >
          {diff < 0 ? (
            <Iconify
              icon="solar:double-alt-arrow-down-bold-duotone"
              color="error.main"
            />
          ) : (
            <Iconify
              icon="solar:double-alt-arrow-up-bold-duotone"
              color="success.main"
            />
          )}
          <Tooltip
            title={`Изменение прибыли относительно вчера в ${DateTime.now().toFormat(
              "HH:mm"
            )}`}
            arrow
            placement="right-start"
          >
            {diff < 0 ? (
              <Typography variant="subtitle2" color="error">
                {diff.toFixed(2)}$
              </Typography>
            ) : (
              <Typography variant="subtitle2" color="success.main">
                +{diff.toFixed(2)}$
              </Typography>
            )}
          </Tooltip>
        </Stack>
        <Typography variant="h3">{current}$</Typography>
      </Box>
      <Chart
        options={{
          chart: {
            type: "line",
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
            },
          },
          dataLabels: { enabled: false },
          markers: {
            strokeColors: "rgba(22, 28, 36, 0.8)",
          },
          stroke: {
            width: 2,
            curve: "smooth",
          },
          xaxis: {
            type: "numeric",
            labels: { show: false },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
            tooltip: {
              enabled: false,
            },
          },
          yaxis: {
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
            labels: {
              show: false,
            },
          },
          grid: {
            show: false,
            padding: {
              left: 0,
              right: 0,
              top: -10,
              bottom: 0,
            },
          },
          tooltip: {
            x: { show: false },
            y: {
              formatter: (value) => `${useFormat(value.toFixed(2))}$`,
              title: {
                formatter: () => "",
              },
            },
            marker: {
              show: false,
            },
          },
        }}
        series={series}
        type="line"
        width={100}
        height={100}
        style={{ position: "absolute", right: 20, top: 40 }}
      />
    </Card>
  );
}

function CommissionItem({ data, today, last24Hours, isLoading }) {
  const [current, diff, series] = useMemo(() => {
    const now = Date.now();
    const counter = today.reduce((a, t) => a + t.commission, 0);

    return [
      counter,
      counter -
        data
          .filter((t) => {
            const entryTime = parseInt(t.entry_time);
            return (
              now - entryTime > 24 * 60 * 60 * 1000 &&
              now - entryTime <= 48 * 60 * 60 * 1000
            );
          })
          .reduce((a, t) => a + t.commission, 0),
      [
        {
          data: Array.from({ length: 24 }, (_, hour) => {
            const hourStart = last24Hours + hour * 60 * 60 * 1000;
            const hourEnd = last24Hours + (hour + 1) * 60 * 60 * 1000;
            const hourProfit = today.reduce((a, t) => {
              const entryTime = parseInt(t.entry_time);
              if (entryTime >= hourStart && entryTime < hourEnd) {
                return a + t.commission;
              }
              return a;
            }, 0);
            return { x: hour, y: hourProfit };
          }),
          name: "aboba",
          color: "rgb(0, 184, 217)",
        },
      ],
    ];
  }, [data]);

  return isLoading ? (
    <Skeleton height={166} />
  ) : (
    <Card
      sx={{
        display: "flex",
        padding: "24px",
        alignItems: "center",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">Комиссия</Typography>
        <Stack
          gap={1}
          marginTop="16px"
          marginBottom="8px"
          alignItems="center"
          flexDirection="row"
        >
          {diff < 0 ? (
            <Iconify
              icon="solar:double-alt-arrow-down-bold-duotone"
              color="error.main"
            />
          ) : (
            <Iconify
              icon="solar:double-alt-arrow-up-bold-duotone"
              color="success.main"
            />
          )}
          <Tooltip
            title={`Изменение комиссии относительно вчера в ${DateTime.now().toFormat(
              "HH:mm"
            )}`}
            arrow
            placement="right-start"
          >
            {diff < 0 ? (
              <Typography variant="subtitle2" sx={{ color: "error.main" }}>
                {diff.toFixed(3)}$
              </Typography>
            ) : (
              <Typography variant="subtitle2" sx={{ color: "success.main" }}>
                +{diff.toFixed(3)}$
              </Typography>
            )}
          </Tooltip>
        </Stack>
        <Stack>
          <Typography variant="h3">{current.toFixed(3)}$</Typography>
        </Stack>
      </Box>
      <Box sx={{ position: "absolute", right: 20, top: 40 }}>
        <Chart
          options={{
            chart: {
              type: "line",
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
              },
            },
            dataLabels: { enabled: false },
            markers: {
              strokeColors: "rgba(22, 28, 36, 0.8)",
            },
            stroke: {
              width: 2,
              curve: "smooth",
            },
            xaxis: {
              type: "numeric",
              labels: { show: false },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              tooltip: {
                enabled: false,
              },
            },
            yaxis: {
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
              },
            },
            grid: {
              show: false,
              padding: {
                left: 0,
                right: 0,
                top: -10,
                bottom: 0,
              },
            },
            tooltip: {
              x: { show: false },
              y: {
                formatter: (value) => `${useFormat(value.toFixed(3))}$`,
                title: {
                  formatter: () => "",
                },
              },
              marker: {
                show: false,
              },
            },
          }}
          series={series}
          type="line"
          width={100}
          height={100}
        />
      </Box>
    </Card>
  );
}

function VolumeItem({ data, today, last24Hours, isLoading }) {
  const [current, diff, series] = useMemo(() => {
    const now = Date.now();
    const counter = today.reduce((a, t) => a + t.volume, 0);

    return [
      counter,
      counter -
        data
          .filter((t) => {
            const entryTime = parseInt(t.entry_time, 10);
            return (
              now - entryTime > 24 * 60 * 60 * 1000 &&
              now - entryTime <= 48 * 60 * 60 * 1000
            );
          })
          .reduce((a, t) => a + t.volume, 0),
      [
        {
          data: Array.from({ length: 24 }, (_, hour) => {
            const hourStart = last24Hours + hour * 60 * 60 * 1000;
            const hourEnd = last24Hours + (hour + 1) * 60 * 60 * 1000;
            const hourProfit = today.reduce((a, t) => {
              const entryTime = parseInt(t.entry_time);
              if (entryTime >= hourStart && entryTime < hourEnd) {
                return a + t.volume;
              }
              return a;
            }, 0);
            return { x: hour, y: hourProfit };
          }),
          name: "aboba",
          color: "rgb(142, 51, 255)",
        },
      ],
    ];
  }, [data]);

  return isLoading ? (
    <Skeleton height={166} />
  ) : (
    <Card
      sx={{
        display: "flex",
        padding: "24px",
        alignItems: "center",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">Объём</Typography>
        <Stack
          gap={1}
          marginTop="16px"
          marginBottom="8px"
          alignItems="center"
          flexDirection="row"
        >
          {diff < 0 ? (
            <Iconify
              icon="solar:double-alt-arrow-down-bold-duotone"
              color="error.main"
            />
          ) : (
            <Iconify
              icon="solar:double-alt-arrow-up-bold-duotone"
              color="success.main"
            />
          )}
          <Tooltip
            title={`Изменение объёма относительно вчера в ${DateTime.now().toFormat(
              "HH:mm"
            )}`}
            arrow
            placement="right-start"
          >
            {diff < 0 ? (
              <Typography variant="subtitle2" sx={{ color: "error.main" }}>
                {useFormat(diff.toFixed(0))}$
              </Typography>
            ) : (
              <Typography variant="subtitle2" sx={{ color: "success.main" }}>
                +{useFormat(diff.toFixed(0))}$
              </Typography>
            )}
          </Tooltip>
        </Stack>
        <Stack>
          <Typography variant="h3">{useFormat(current.toFixed(0))}$</Typography>
        </Stack>
      </Box>
      <Box sx={{ position: "absolute", right: 20, top: 40 }}>
        <Chart
          options={{
            chart: {
              type: "line",
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
              },
            },
            stroke: {
              width: 2,
              curve: "smooth",
            },
            dataLabels: { enabled: false },
            markers: {
              strokeColors: "rgba(22, 28, 36, 0.8)",
            },
            xaxis: {
              type: "numeric",
              labels: { show: false },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              tooltip: {
                enabled: false,
              },
            },
            yaxis: {
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
              },
            },
            grid: {
              show: false,
              padding: {
                left: 0,
                right: 0,
                top: -10,
                bottom: 0,
              },
            },
            tooltip: {
              x: { show: false },
              y: {
                formatter: (value) => `${useFormat(value.toFixed(0))}$`,
                title: {
                  formatter: () => "",
                },
              },
              marker: {
                show: false,
              },
            },
          }}
          series={series}
          type="line"
          width={100}
          height={100}
        />
      </Box>
    </Card>
  );
}

function StatisticsItem({ data, isLoading }) {
  const [openInfo, setOpenInfo] = useState(false);

  const seriesData = useMemo(
    () =>
      Array(10)
        .fill(0)
        .map((_, index) => {
          if (data.length === 0) {
            return { profit: 0, commission: 0, volume: 0, loss: 0 };
          }
          const startOfDay = DateTime.now()
            .minus({ days: index })
            .startOf("day")
            .toMillis();
          const endOfDay = DateTime.now()
            .minus({ days: index })
            .endOf("day")
            .toMillis();
          const dailyLoss = data
            .filter((trade) => {
              const entryTime = parseInt(trade.entry_time);
              return entryTime >= startOfDay && entryTime <= endOfDay;
            })
            .reduce((acc, trade) => acc + Math.max(-trade.profit, 0), 0);
          const netValue =
            data
              .filter((trade) => {
                const entryTime = parseInt(trade.entry_time);
                return entryTime >= startOfDay && entryTime <= endOfDay;
              })
              .reduce((acc, trade) => acc + trade.profit, 0) - dailyLoss;

          return {
            profit: netValue > 0 ? netValue : 0,
            commission: data
              .filter((trade) => {
                const entryTime = parseInt(trade.entry_time);
                return entryTime >= startOfDay && entryTime <= endOfDay;
              })
              .reduce((acc, trade) => acc + trade.commission, 0),
            volume: data
              .filter((trade) => {
                const entryTime = parseInt(trade.entry_time);
                return entryTime >= startOfDay && entryTime <= endOfDay;
              })
              .reduce((acc, trade) => acc + trade.volume, 0),
            loss: dailyLoss,
          };
        })
        .reverse(),
    [data]
  );

  return isLoading ? (
    <Skeleton height={586} />
  ) : (
    <Card>
      <CardHeader
        title="Статистика за 10 дней"
        action={
          <IconButton onClick={() => setOpenInfo((prev) => !prev)}>
            <Iconify icon="solar:info-circle-linear" color="text.disabled" />
          </IconButton>
        }
      />
      <Collapse in={openInfo} timeout="auto" unmountOnExit>
        <Typography padding={3} color="text.secondary">
          Сводка данных за последние 10 дней в виде графика. Слева на графике
          значения прибыли/убытка и комиссии, справа - значения объёма. Чтобы
          отобразить или скрыть тип данных, нажмите на цветовые маркеры.
        </Typography>
      </Collapse>
      <Box
        sx={{
          p: "15px",
        }}
      >
        <Chart
          options={{
            chart: {
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
              },
            },
            stroke: {
              width: [0, 0, 3, 2],
              curve: "smooth",
            },
            plotOptions: {
              bar: {
                borderRadius: 3,
                columnWidth: "20%",
                borderRadiusApplication: "end",
              },
            },
            fill: {
              type: ["solid", "solid", "solid", "gradient"],
              gradient: {
                type: "vertical",
                shadeIntensity: 0.1,
                opacityFrom: 0.4,
                opacityTo: 0.2,
              },
            },
            legend: {
              showForSingleSeries: true,
              position: "top",
              horizontalAlign: "right",
              formatter: (legendName) => {
                switch (legendName) {
                  case "profit":
                    return "Прибыль";
                  case "commission":
                    return "Комиссия";
                  case "volume":
                    return "Объём";

                  default:
                    return "Убыток";
                }
              },
              labels: {
                colors: "text.primary",
              },
              fontWeight: 500,
              fontSize: "13px",
              fontFamily: "inherit",
              itemMargin: {
                horizontal: 14,
                vertical: 5,
              },
              markers: {
                width: 11,
                height: 11,
                offsetX: -2,
              },
            },
            grid: {
              borderColor: "rgba(145, 158, 171, 0.2)",
              strokeDashArray: 3,
            },
            xaxis: {
              categories: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(
                (i) =>
                  moment().subtract(i, "days").format("L").split("/")[1] +
                  "." +
                  moment().subtract(i, "days").format("L").split("/")[0]
              ),
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              labels: {
                style: {
                  colors: "#637381",
                  fontSize: "12px",
                  fontFamily: "inherit",
                },
              },
            },
            markers: {
              strokeColors: "rgba(22, 28, 36, 0.8)",
            },
            yaxis: [
              {
                max:
                  data.length === 0
                    ? 6
                    : Math.max(
                        Math.max(...seriesData.map((day) => day.profit)),
                        Math.max(...seriesData.map((day) => day.loss))
                      ),
                min: 0,
                showAlways: true,
                tickAmount: 7,
                seriesName: ["profit", "commission", "loss"],
                labels: {
                  style: {
                    fontSize: "12px",
                    colors: "#637381",
                    fontFamily: "inherit",
                  },
                  offsetX: -10,
                  formatter: (val) => `${useFormat(val.toFixed())}$`,
                },
              },
              {
                max:
                  data.length === 0
                    ? 500
                    : Math.max(...seriesData.map((day) => day.volume)),
                min: 0,
                showAlways: true,
                tickAmount: 5,
                seriesName: "volume",
                opposite: true,
                labels: {
                  align: "right",
                  style: {
                    fontSize: "12px",
                    colors: "#637381",
                    fontFamily: "inherit",
                  },
                  offsetX: -10,
                  formatter: (val) => `$${useFormat(val.toFixed())}`,
                },
              },
            ],
            tooltip: {
              x: {
                show: false,
              },
              y: {
                formatter: (val) => `${useFormat(val?.toFixed())}$`,
                title: {
                  formatter: (seriesName) => {
                    switch (seriesName) {
                      case "profit":
                        return "Прибыль";
                      case "commission":
                        return "Комиссия";
                      case "volume":
                        return "Объём";

                      default:
                        return "Убыток";
                    }
                  },
                },
              },
              style: {
                fontSize: "12px",
                fontFamily: "inherit",
              },
            },
          }}
          series={[
            {
              name: "profit",
              type: "column",
              color: "rgb(34, 197, 94)",
              data: seriesData.map((day) => day.profit),
            },
            {
              name: "loss",
              type: "column",
              color: "rgb(255, 86, 48)",
              data: seriesData.map((day) => day.loss),
            },
            {
              name: "commission",
              type: "line",
              color: "rgb(0, 184, 217)",
              data: seriesData.map((day) => day.commission),
            },
            {
              name: "volume",
              type: "area",
              color: "rgb(142, 51, 255)",
              data: seriesData.map((day) => day.volume),
            },
          ]}
          height={384}
        />
      </Box>
      <Divider
        sx={{
          borderStyle: "solid",
        }}
      />
      <Stack flexDirection="row">
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            paddingTop: "16px",
            paddingBottom: "16px",
          }}
        >
          <Typography color="text.secondary" gutterBottom>
            Прибыль
          </Typography>
          <Typography variant="h4">
            {useFormat(
              data
                .reduce(
                  (acc, trade) => acc + (trade.income - trade.commission),
                  0
                )
                .toFixed(2)
            )}
            $
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            borderWidth: "0px thin 0px 0px",
            borderStyle: "solid",
          }}
        />
        <Box
          sx={{
            width: "100%",
            paddingTop: "16px",
            textAlign: "center",
            paddingBottom: "16px",
          }}
        >
          <Typography color="text.secondary" gutterBottom>
            Комиссия
          </Typography>
          <Typography variant="h4">
            {useFormat(
              data
                .reduce((acc, trade) => acc + parseFloat(trade.commission), 0)
                .toFixed(3)
            )}
            $
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            borderWidth: "0px thin 0px 0px",
            borderStyle: "solid",
          }}
        />
        <Box
          sx={{
            width: "100%",
            paddingTop: "16px",
            textAlign: "center",
            paddingBottom: "16px",
          }}
        >
          <Typography color="text.secondary" gutterBottom>
            Объём
          </Typography>
          <Typography variant="h4">
            {useFormat(
              data
                .reduce((acc, trade) => acc + parseFloat(trade.volume), 0)
                .toFixed(0)
            )}
            $
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}

export default function GridLayoutItems() {
  const { user } = useUser();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/overview`, {
      headers: {
        "X-ABOBA-UID": user.id,
      },
    })
      .then((res) => res.json())
      .then((r) => {
        setData(r);
        setLoading(false);
      });
  }, []);

  const today = data.filter(
    (trade) => Date.now() - parseInt(trade.entry_time) <= 24 * 60 * 60 * 1000
  );

  const last24Hours = DateTime.now().minus({ hours: 24 }).toMillis();

  return (
    <>
      <Grid item xs={12} md={4}>
        <ProfitItem
          data={data}
          today={today}
          isLoading={loading}
          last24Hours={last24Hours}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <CommissionItem
          data={data}
          today={today}
          isLoading={loading}
          last24Hours={last24Hours}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <VolumeItem
          data={data}
          today={today}
          isLoading={loading}
          last24Hours={last24Hours}
        />
      </Grid>
      <Grid item xs={12} md={12} xl={12}>
        <StatisticsItem data={data} isLoading={loading} />
      </Grid>
    </>
  );
}
