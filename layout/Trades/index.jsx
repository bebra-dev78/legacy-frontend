"use client";

import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { useGridApiRef } from "@mui/x-data-grid";
import SpeedDial from "@mui/material/SpeedDial";
import Collapse from "@mui/material/Collapse";
import Backdrop from "@mui/material/Backdrop";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

import { useState, useMemo, memo } from "react";

import { useMode } from "#/components/global/theme-registry";
import KlinesChart from "#/layout/Trades/klines-chart";
import DataTable from "#/layout/Trades/data-table";
import { deleteTrades } from "#/server/trades";
import Iconify from "#/utils/iconify";

export default function Index() {
  const apiRef = useGridApiRef();
  const { mode } = useMode();
  const theme = useTheme();

  const [activate, setActivate] = useState(null);
  const [hidden, setHidden] = useState(true);

  const memoizedTheme = useMemo(
    () =>
      createTheme({
        ...theme,
        components: {
          ...theme.components,
          MuiPaper: {
            defaultProps: {
              elevation: 0,
            },
            styleOverrides: {
              root: {
                marginTop: 1,
                padding: "4px",
                borderRadius: "10px",
                backgroundSize: "50%, 50%",
                backdropFilter: "blur(20px)",
                backgroundRepeat: "no-repeat, no-repeat",
                backgroundPosition: "right top, left bottom",
                backgroundImage:
                  'url("/images/cyan-blur.png"), url("/images/red-blur.png")',
                backgroundColor:
                  mode === "dark"
                    ? "rgba(33, 43, 54, 0.9)"
                    : "rgba(255, 255, 255, 0.9)",
                boxShadow:
                  mode === "dark"
                    ? "rgba(0, 0, 0, 0.24) 0px 0px 2px 0px, rgba(0, 0, 0, 0.24) -20px 20px 40px -4px"
                    : "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={memoizedTheme}>
      <KlinesChart activate={activate} setActivate={setActivate} />
      <DataTableCardWrapper>
        <DataTable
          apiRef={apiRef}
          setHidden={setHidden}
          setActivate={setActivate}
        />
      </DataTableCardWrapper>
      <DealActions apiRef={apiRef} hidden={hidden} />
    </ThemeProvider>
  );
}

const DataTableCardWrapper = memo(function DataTableCardWrapper({ children }) {
  const [openInfo, setOpenInfo] = useState(false);

  return (
    <Card sx={{ backgroundImage: "none", p: 0 }}>
      <CardHeader
        title="Таблица сделок"
        titleTypographyProps={{ paragraph: true }}
        action={
          <IconButton onClick={() => setOpenInfo((prev) => !prev)}>
            <Iconify icon="solar:info-circle-linear" color="text.disabled" />
          </IconButton>
        }
      />
      <Collapse in={openInfo} timeout="auto" unmountOnExit>
        <Typography color="text.secondary" padding="0 24px" paragraph>
          Здесь вы можете просмотреть историю своих сделок и проанализировать
          их, взаимодействуя с ними или добавляя дополнительную информацию. Для
          открытия свечного графика по определённому тикеру нажмите на название
          нужного тикера. Чтобы горизонтально перемещаться по таблице можно
          использовать нижний скролл или зажать клавишу{" "}
          <Box
            component="span"
            sx={{
              height: "24px",
              fontWeight: 700,
              fontSize: "12px",
              cursor: "default",
              padding: "0px 6px",
              borderRadius: "6px",
              alignItems: "center",
              display: "inline-flex",
              color: "rgb(145, 158, 171)",
              backgroundColor: "rgba(145, 158, 171, 0.16)",
            }}
          >
            Shift
          </Box>{" "}
          и использовать колёсико мыши.
        </Typography>
      </Collapse>
      {children}
    </Card>
  );
});

const DealActions = memo(function DealActions({ apiRef, hidden }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Backdrop open={open} />
      <SpeedDial
        open={open}
        hidden={hidden}
        ariaLabel="SpeedDial"
        icon={
          <SpeedDialIcon
            openIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="24"
                height="24"
              >
                <path
                  fill="currentColor"
                  d="M2 17.5A4.5 4.5 0 0 1 6.5 13h2.7c.63 0 .945 0 1.186.123c.211.107.384.28.491.491c.123.24.123.556.123 1.186v2.7a4.5 4.5 0 1 1-9 0m11-11a4.5 4.5 0 1 1 4.5 4.5h-3.214c-.15 0-.224 0-.287-.007a1.125 1.125 0 0 1-.992-.992C13 9.938 13 9.864 13 9.714z"
                ></path>
                <path
                  fill="currentColor"
                  d="M2 6.5a4.5 4.5 0 0 1 9 0v3c0 .349 0 .523-.038.666a1.125 1.125 0 0 1-.796.796C10.023 11 9.85 11 9.5 11h-3A4.5 4.5 0 0 1 2 6.5m11 8c0-.349 0-.523.038-.666c.104-.388.408-.692.796-.796c.143-.038.317-.038.666-.038h3a4.5 4.5 0 1 1-4.5 4.5z"
                  opacity=".5"
                ></path>
              </svg>
            }
          />
        }
        onClose={() => {
          setOpen(false);
        }}
        onOpen={() => {
          setOpen(true);
        }}
        FabProps={{
          sx: {
            backgroundColor: "rgb(81, 25, 183)",
            boxShadow: "rgba(142, 51, 255, 0.24) 0px 8px 16px 0px",
            "&:hover": {
              backgroundColor: "rgb(81, 25, 183)",
              boxShadow: "none",
            },
          },
        }}
        sx={{ position: "fixed", bottom: 40, right: 40 }}
      >
        <SpeedDialAction
          icon={
            <Iconify icon="solar:trash-bin-trash-bold" color="error.main" />
          }
          tooltipTitle="Удалить"
          tooltipOpen
          onClick={() => {
            setOpen(false);
            const ids = [];
            apiRef.current.getSelectedRows().forEach(({ id }) => {
              ids.push(id);
              apiRef.current.updateRows([{ id, _action: "delete" }]);
            });
            deleteTrades(ids);
          }}
          sx={{
            "& .MuiSpeedDialAction-staticTooltipLabel": {
              color: "text.primary",
            },
          }}
        />
        <SpeedDialAction
          icon={
            <Iconify icon="solar:share-circle-bold-duotone" color="info.main" />
          }
          tooltipTitle="Объединить"
          tooltipOpen
          onClick={() => {
            setOpen(false);

            // const trades = [];

            // apiRef.current.getSelectedRows().forEach((trade) => {
            //   trades.push(trade);
            // });

            // trades.sort((a, b) => a.entryTime - b.entryTime);

            // const lastTrade = trades[0];
            // const firstTrade = trades[trades.length - 1];

            // if (
            //   trades.length < 2 ||
            //   !trades.every(
            //     (trade) =>
            //       trade.symbol === firstTrade.symbol &&
            //       trade.exchange === firstTrade.exchange
            //   )
            // ) {
            //   setStatusSnackbar({
            //     show: true,
            //     variant: "warning",
            //     text: "Нельзя объединить выбранные сделки",
            //     anchorOrigin: { vertical: "top", horizontal: "right" },
            //   });
            //   return;
            // }
            // const ids = trades
            //   .map((trade) => trade.id)
            //   .filter((t) => t !== firstTrade.id);

            // const income = trades.reduce(
            //   (sum, trade) => sum + parseFloat(trade.income || 0),
            //   0
            // );
            // const commission = trades.reduce(
            //   (sum, trade) => sum + parseFloat(trade.commission || 0),
            //   0
            // );
            // ids.forEach((id) => {
            //   apiRef.current.updateRows([{ id, _action: "delete" }]);
            // });
            // apiRef.current.updateRows([
            //   {
            //     id: firstTrade.id,
            //     tags: trades.flatMap((trade) => trade.tags ?? []),
            //     entryTime: lastTrade.entryTime,
            //     procent: trades
            //       .reduce(
            //         (sum, trade) => sum + parseFloat(trade.procent || 0),
            //         0
            //       )
            //       .toFixed(2),
            //     income: income.toFixed(3),
            //     profit: (income - commission).toFixed(2),
            //     turnover: trades
            //       .reduce(
            //         (sum, trade) => sum + parseFloat(trade.turnover || 0),
            //         0
            //       )
            //       .toFixed(1),
            //     maxVolume: trades
            //       .reduce(
            //         (max, trade) =>
            //           Math.max(max, parseFloat(trade.maxVolume || 0)),
            //         0
            //       )
            //       .toFixed(1),
            //     volume: trades
            //       .reduce(
            //         (sum, trade) => sum + parseFloat(trade.volume || 0),
            //         0
            //       )
            //       .toFixed(2),
            //     commission: commission.toFixed(3),
            //     averageEntryPrice: (
            //       parseFloat(firstTrade.averageEntryPrice) +
            //       parseFloat(lastTrade.averageEntryPrice)
            //     ).toFixed(4),
            //     averageExitPrice: (
            //       parseFloat(firstTrade.averageExitPrice) +
            //       parseFloat(lastTrade.averageExitPrice)
            //     ).toFixed(4),
            //     duration: trades.reduce(
            //       (sum, trade) => sum + parseFloat(trade.duration || 0),
            //       0
            //     ),
            //     deals: trades.flatMap((trade) => trade.deals ?? []),
            //   },
            // ]);
            // deleteTrades(ids);
            // updateTrade(firstTrade.id, {
            //   tags: trades.flatMap((trade) => trade.tags ?? []),
            //   entry_time: String(lastTrade.entryTime),
            //   exit_time: String(firstTrade.exitTime),
            //   procent: trades
            //     .reduce((sum, trade) => sum + parseFloat(trade.procent || 0), 0)
            //     .toFixed(2),
            //   income: income.toFixed(2).toFixed(3),
            //   profit: (income - commission).toFixed(2),
            //   turnover: trades
            //     .reduce(
            //       (sum, trade) => sum + parseFloat(trade.turnover || 0),
            //       0
            //     )
            //     .toFixed(1),
            //   max_volume: trades
            //     .reduce(
            //       (max, trade) =>
            //         Math.max(max, parseFloat(trade.maxVolume || 0)),
            //       0
            //     )
            //     .toFixed(1),
            //   volume: trades
            //     .reduce((sum, trade) => sum + parseFloat(trade.volume || 0), 0)
            //     .toFixed(2),
            //   commission: commission.toFixed(3),
            //   avg_entry_price: (
            //     parseFloat(firstTrade.averageEntryPrice) +
            //     parseFloat(lastTrade.averageEntryPrice)
            //   ).toFixed(4),
            //   avg_exit_price: (
            //     parseFloat(firstTrade.averageExitPrice) +
            //     parseFloat(lastTrade.averageExitPrice)
            //   ).toFixed(4),
            //   duration: String(
            //     trades.reduce(
            //       (sum, trade) => sum + parseFloat(trade.duration || 0),
            //       0
            //     )
            //   ),
            //   deals: trades.flatMap((trade) => trade.deals ?? []),
            // });
          }}
          sx={{
            "& .MuiSpeedDialAction-staticTooltipLabel": {
              color: "text.primary",
            },
          }}
        />
        <SpeedDialAction
          icon={<Iconify icon="solar:star-bold-duotone" color="warning.main" />}
          tooltipTitle="Архивировать"
          tooltipOpen
          onClick={() => {
            setOpen(false);
            apiRef.current.getSelectedRows().forEach(({ id }) => {
              apiRef.current.updateRows([{ id, _action: "delete" }]);
            });
          }}
          sx={{
            "& .MuiSpeedDialAction-staticTooltipLabel": {
              color: "text.primary",
            },
          }}
        />
      </SpeedDial>
    </>
  );
});
