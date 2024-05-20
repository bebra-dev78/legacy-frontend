"use client";

import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CircularProgress from "@mui/material/CircularProgress";
import MuiPagination from "@mui/material/Pagination";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { ruRU } from "@mui/x-data-grid/locales";
import MenuItem from "@mui/material/MenuItem";
import Collapse from "@mui/material/Collapse";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";
import Slider from "@mui/material/Slider";
import Popper from "@mui/material/Popper";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Grow from "@mui/material/Grow";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridPagination,
  GridToolbarExport,
  GridToolbarContainer,
  GridColumnMenuSortItem,
  GridColumnMenuHideItem,
  GridToolbarFilterButton,
  GridColumnMenuContainer,
  GridToolbarColumnsButton,
  GridColumnMenuManageItem,
  GridColumnMenuFilterItem,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import { useState, useEffect, useRef, useMemo, useCallback, memo } from "react";
import { DateTime } from "luxon";
import Image from "next/image";

import { useMode } from "#/components/global/theme-registry";
import { updateTags, updateRating } from "#/server/trades";
import { useKeys, useUser } from "#/app/my/layout";
import useFormat from "#/utils/format-thousands";
import Iconify from "#/utils/iconify";

import overlay from "#/public/svg/illustration_empty_content.svg";

const Pagination = memo(function Pagination({
  page,
  pagesCount,
  onPageChange,
  className,
}) {
  return (
    <MuiPagination
      color="error"
      className={className}
      count={pagesCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event, newPage - 1);
      }}
    />
  );
});

const CustomPagination = memo(function CustomPagination({
  pagesCount,
  ...props
}) {
  return (
    <GridPagination
      ActionsComponent={(paginationProps) => (
        <Pagination pagesCount={pagesCount} {...paginationProps} />
      )}
      {...props}
    />
  );
});

const LoadingOverlay = memo(function LoadingOverlay() {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress color="error" disableShrink />
    </Box>
  );
});

const NoRowsOverlay = memo(function NoRowsOverlay() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Image
        src={overlay}
        width={320}
        height={240}
        style={{ marginBottom: "25px" }}
      />
      <Typography variant="h4" gutterBottom>
        Нет сделок
      </Typography>
    </Box>
  );
});

const CustomToolbar = memo(function CustomToolbar({
  height,
  setHeight,
  autoHeight,
  setAutoHeight,
}) {
  const { mode } = useMode();

  const dark = mode === "dark";

  return (
    <GridToolbarContainer
      sx={{
        padding: "14px",
        borderColor: dark ? "rgb(46, 50, 54)" : "rgb(241, 243, 244)",
        backgroundColor: dark
          ? "rgba(145, 158, 171, 0.12)"
          : "rgb(244, 246, 248)",
        borderBottom: dark
          ? "1px dashed rgba(145, 158, 171, 0.24)"
          : "1px dashed rgba(145, 158, 171, 0.5)",
      }}
    >
      <GridToolbarColumnsButton slotProps={ToolbatSlotProps} />
      <GridToolbarFilterButton slotProps={ToolbatSlotProps} />
      <GridToolbarDensitySelector slotProps={ToolbatSlotProps} />
      <GridToolbarExport slotProps={ToolbatSlotProps} />
      <GridToolbarAddTag />
      <GridToolbarTableHeight
        height={height}
        setHeight={setHeight}
        autoHeight={autoHeight}
        setAutoHeight={setAutoHeight}
      />
    </GridToolbarContainer>
  );
});

const CustomColumnMenu = memo(function CustomColumnMenu({ hideMenu, colDef }) {
  return (
    <GridColumnMenuContainer hideMenu={hideMenu} colDef={colDef}>
      <GridColumnMenuSortItem onClick={hideMenu} colDef={colDef} />
      <Divider />
      <GridColumnMenuFilterItem onClick={hideMenu} colDef={colDef} />
      <Divider />
      <GridColumnMenuHideItem onClick={hideMenu} colDef={colDef} />
      <GridColumnMenuManageItem onClick={hideMenu} colDef={colDef} />
    </GridColumnMenuContainer>
  );
});

const AutoHeightPopover = memo(function AutoHeightPopover() {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      <IconButton
        onMouseEnter={(e) => {
          setAnchorEl(e.currentTarget);
        }}
        onMouseLeave={() => {
          setAnchorEl(null);
        }}
      >
        <Iconify
          icon="solar:question-circle-linear"
          color="text.secondary"
          width={20}
        />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        disableRestoreFocus
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={() => {
          setAnchorEl(null);
        }}
        sx={{
          pointerEvents: "none",
        }}
      >
        <Box sx={{ p: 2, width: 300 }}>
          <Typography variant="subtitle1" paragraph>
            Режим автоматической высоты
          </Typography>
          <Typography color="text.secondary">
            При включении этого режима высота таблицы будет автоматически
            подстраиваться под общее количество сделок на странице. Этот
            параметр почти полностью отключает <b>виртуализацию</b>, в
            результате чего незначительно снижается оптимизация таблицы.
          </Typography>
        </Box>
      </Popover>
    </>
  );
});

const HeightPopover = memo(function HeightPopover() {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      <IconButton
        onMouseEnter={(e) => {
          setAnchorEl(e.currentTarget);
        }}
        onMouseLeave={() => {
          setAnchorEl(null);
        }}
      >
        <Iconify
          icon="solar:question-circle-linear"
          color="text.secondary"
          width={20}
        />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        disableRestoreFocus
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={() => {
          setAnchorEl(null);
        }}
        sx={{
          pointerEvents: "none",
        }}
      >
        <Box sx={{ p: 2, width: 300 }}>
          <Typography variant="subtitle1" paragraph>
            Режим фиксированной высоты
          </Typography>
          <Typography color="text.secondary">
            При включении этого режима высота таблицы всегда будет равна
            выбранному <b>количеству пикселей</b>, вне зависимости от общего
            количества сделок на странице.
          </Typography>
        </Box>
      </Popover>
    </>
  );
});

const GridToolbarAddTag = memo(function GridToolbarAddTag() {
  const [anchorEl, setAnchorEl] = useState(null);

  const popperRef = useRef(null);

  const open = Boolean(anchorEl);

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={() => {
        setAnchorEl(null);
      }}
    >
      <div>
        <Button
          variant="text"
          color="info"
          size="small"
          onClick={(event) => {
            setAnchorEl(open ? null : event.currentTarget);
          }}
        >
          <Iconify icon="solar:add-square-outline" width={20} sx={{ mr: 1 }} />
          Добавить причину
        </Button>
        <Popper
          open={open}
          anchorEl={anchorEl}
          ref={popperRef}
          transition
          placement="bottom-start"
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [0, 8],
              },
            },
          ]}
          sx={{ zIndex: 1051, position: "absolute" }}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              timeout={200}
              style={{
                transformOrigin: "top left",
              }}
            >
              <Paper
                sx={{
                  p: 2,
                  maxWidth: "250px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.24) 0px 0px 2px 0px, rgba(0, 0, 0, 0.24) -20px 20px 40px -4px",
                }}
              >
                <GridToolbarAddTagPaper setAnchorEl={setAnchorEl} />
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </ClickAwayListener>
  );
});

const GridToolbarAddTagPaper = memo(function GridToolbarAddTagPaper({
  setAnchorEl,
}) {
  const tagRef = useRef(null);

  return (
    <>
      <TextField
        label="Причина"
        variant="outlined"
        color="secondary"
        size="medium"
        fullWidth
        autoFocus
        inputRef={tagRef}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="inherit"
        size="medium"
        fullWidth
        onClick={() => {
          if (!/[a-zA-Zа-яА-Я]/.test(tagRef.current.value)) {
            return;
          }
          setAnchorEl(null);
          localStorage.setItem(
            "tags",
            JSON.stringify([
              ...(JSON.parse(localStorage.getItem("tags")) ?? []),
              tagRef.current.value,
            ])
          );
        }}
        sx={{ mb: 2 }}
      >
        Добавить
      </Button>
      <Button
        variant="contained"
        color="error"
        size="medium"
        fullWidth
        onClick={() => {
          setAnchorEl(null);
          localStorage.setItem("tags", JSON.stringify([]));
        }}
      >
        Очистить всё
      </Button>
    </>
  );
});

const GridToolbarTableHeight = memo(function GridToolbarTableHeight({
  height,
  setHeight,
  autoHeight,
  setAutoHeight,
}) {
  const [openHeightTable, setOpenHeightTable] = useState(false);
  const [activate, setActivate] = useState(autoHeight);
  const [onChange, setOnChange] = useState(height);

  return (
    <>
      <Button
        variant="text"
        color="info"
        size="small"
        onClick={() => {
          setOpenHeightTable((prev) => !prev);
        }}
      >
        <Iconify icon="solar:ruler-bold-duotone" sx={{ mr: 1 }} />
        Высота таблицы
      </Button>
      {openHeightTable && (
        <Box sx={{ width: "100%", mt: 1 }}>
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Typography
              variant="body2"
              alignItems="center"
              display="inline-flex"
            >
              <AutoHeightPopover />
              Автоматическая высота:
            </Typography>
            <Switch
              checked={activate}
              onChange={(e) => {
                setActivate(e.target.checked);
                localStorage.setItem("autoHeight", e.target.checked);
              }}
            />
          </Box>
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Typography
              variant="body2"
              alignItems="center"
              display="inline-flex"
            >
              <HeightPopover />
              Фиксированная высота:
            </Typography>
            <Slider
              valueLabelDisplay="auto"
              defaultValue={height}
              disabled={activate}
              color="secondary"
              size="small"
              step={100}
              max={2000}
              min={300}
              sx={{ width: "20%", mr: 3, mt: "18px" }}
              onChange={(e, v) => {
                setOnChange(v);
                localStorage.setItem("height", v);
              }}
              marks={[
                {
                  value: height,
                  label: height,
                },
                {
                  value: 2000,
                  label: 2000,
                },
              ]}
            />
          </Box>
          <Collapse
            in={activate !== autoHeight || onChange !== height}
            timeout="auto"
            unmountOnExit
            sx={{ width: "100%" }}
          >
            <Button
              variant="text"
              color="warning"
              size="small"
              onClick={() => {
                setHeight(onChange);
                setAutoHeight(activate);
              }}
            >
              <Iconify icon="line-md:backup-restore" sx={{ mr: 1 }} />
              Обновить таблицу
            </Button>
          </Collapse>
        </Box>
      )}
    </>
  );
});

const DataTable = memo(function DataTable({ setActivate, setHidden, apiRef }) {
  const { keys } = useKeys();
  const { mode } = useMode();
  const { user } = useUser();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: JSON.parse(localStorage.getItem("pageSize")) ?? 25,
  });
  const [autoHeight, setAutoHeight] = useState(
    JSON.parse(localStorage.getItem("autoHeight")) ?? false
  );
  const [height, setHeight] = useState(
    JSON.parse(localStorage.getItem("height")) ?? 800
  );
  const [pagesCount, setPagesCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [onLoad, setOnLoad] = useState(false);
  const [total, setTotal] = useState(0);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/table?page=${
        paginationModel.page + 1
      }&pageSize=${paginationModel.pageSize}`,
      {
        headers: {
          "X-ABOBA-UID": user.id,
        },
      }
    )
      .then((res) => res.json())
      .then((r) => {
        setRows(
          r.data.map((trade) => ({
            id: trade.id,
            kid: trade.kid,
            side: trade.side,
            symbol: trade.symbol,
            rating: trade.rating,
            income: trade.income,
            profit: trade.profit,
            deposit: trade.deposit,
            procent: trade.procent,
            exchange: trade.exchange,
            duration: trade.duration,
            turnover: trade.turnover,
            volume: trade.volume / 2,
            maxVolume: trade.max_volume,
            tags: JSON.parse(trade.tags),
            commission: trade.commission,
            deals: JSON.parse(trade.deals),
            exitTime: parseInt(trade.exit_time),
            entryTime: parseInt(trade.entry_time),
            averageExitPrice: trade.avg_exit_price,
            averageEntryPrice: trade.avg_entry_price,
            apikey: keys.find((key) => key.id === trade.kid)?.title,
          }))
        );
        setLoading(false);
        setTotal(r.total);
        setPagesCount(r.last_page);
        setOnLoad(true);
      });
  }, [paginationModel]);

  // useEffect(() => {
  //   if (onLoad && rows.length > 0 && keys.length > 0) {
  //     const key1 = keys.find((key) => key.exchange === 1);
  //     const key2 = keys.find((key) => key.exchange === 2);

  //     const now = Date.now();

  //     if (key1 !== undefined) {
  //       const bynanceRows = rows.filter((r) => r.exchange === 1);

  //       const diff =
  //         bynanceRows.length === 0
  //           ? rows[0].exitTime + 500
  //           : bynanceRows[0].exitTime + 500;

  //       const startTime = now - diff >= 604800000 ? now - 604790000 : diff;

  //       console.log("startTime (bynance): ", startTime);

  //       fetch("https://fapi.binance.com/fapi/v1/time")
  //         .then((res) => res.json())
  //         .then(({ serverTime }) => {
  //           fetch(
  //             `https://fapi.binance.com/fapi/v1/userTrades?timestamp=${serverTime}&signature=${crypto
  //               .createHmac("sha256", key1.secret_key)
  //               .update(
  //                 `timestamp=${serverTime}&recvWindow=60000&limit=1000&startTime=${startTime}`
  //               )
  //               .digest(
  //                 "hex"
  //               )}&recvWindow=60000&limit=1000&startTime=${startTime}`,
  //             {
  //               headers: {
  //                 "X-MBX-APIKEY": key1.api_key,
  //               },
  //             }
  //           )
  //             .then((res) => res.json())
  //             .then((data) => {
  //               console.log("data (binance): ", data);

  //               var aboba = [];

  //               Object.values(
  //                 data.reduce((result, trade) => {
  //                   const symbol = trade.symbol;
  //                   if (!result[symbol]) {
  //                     result[symbol] = [];
  //                   }
  //                   result[symbol].push(trade);
  //                   return result;
  //                 }, {})
  //               ).forEach((deal) => {
  //                 let currentTrade = [];

  //                 for (let i = 0; i < deal.length; i++) {
  //                   var currentTradeEmpty = currentTrade.length === 0;
  //                   var isClosingTrade =
  //                     i === deal.length - 1 ||
  //                     (i < deal.length - 1 &&
  //                       parseFloat(deal[i].realizedPnl) !== 0 &&
  //                       parseFloat(deal[i + 1].realizedPnl) === 0);
  //                   var isOpeningTrade =
  //                     i === 0 ||
  //                     (i > 0 &&
  //                       parseFloat(deal[i].realizedPnl) === 0 &&
  //                       parseFloat(deal[i - 1].realizedPnl) !== 0);

  //                   if (currentTradeEmpty || isOpeningTrade) {
  //                     currentTrade.push(deal[i]);
  //                   } else if (isClosingTrade) {
  //                     currentTrade.push(deal[i]);
  //                     aboba.push([...currentTrade]);
  //                     currentTrade = [];
  //                   } else {
  //                     currentTrade.push(deal[i]);
  //                   }
  //                 }
  //               });

  //               const trades = aboba.map((trade) => {
  //                 var deals = [];
  //                 var ut = new Set();
  //                 var b = trade.filter((t) => t.side === "BUY");
  //                 var s = trade.filter((t) => t.side === "SELL");
  //                 var bt = b.reduce((a, c) => a + parseFloat(c.qty), 0);
  //                 var st = s.reduce((a, c) => a + parseFloat(c.qty), 0);
  //                 var bv = b.reduce((a, c) => a + parseFloat(c.quoteQty), 0);
  //                 var sv = s.reduce((a, c) => a + parseFloat(c.quoteQty), 0);

  //                 trade.forEach((t) => {
  //                   if (!ut.has(t.time)) {
  //                     ut.add(t.time);
  //                     deals.push({
  //                       time: t.time,
  //                       side: t.side,
  //                       price: parseFloat(t.price).toFixed(2),
  //                       income: parseFloat(t.realizedPnl).toFixed(3),
  //                       volume: parseFloat(t.qty + t.price).toFixed(0),
  //                       commission: parseFloat(t.commission).toFixed(3),
  //                     });
  //                   }
  //                 });

  //                 const income = trade.reduce(
  //                   (a, c) => a + parseFloat(c.realizedPnl),
  //                   0
  //                 );

  //                 const commission = trade.reduce(
  //                   (a, d) => a + parseFloat(d.commission),
  //                   0
  //                 );

  //                 const profit = parseFloat((income - commission).toFixed(2));

  //                 return {
  //                   uid: user.id,
  //                   kid: key1.id,
  //                   exchange: 1,
  //                   symbol: trade[0].symbol,
  //                   entry_time: String(trade[0].time),
  //                   exit_time: String(trade[trade.length - 1].time),
  //                   side: trade[0].side,
  //                   avg_entry_price: parseFloat(
  //                     (
  //                       b.reduce(
  //                         (a, c) => a + parseFloat(c.price) * parseFloat(c.qty),
  //                         0
  //                       ) / bt
  //                     ).toFixed(4)
  //                   ),
  //                   avg_exit_price: parseFloat(
  //                     (
  //                       s.reduce(
  //                         (a, c) => a + parseFloat(c.price) * parseFloat(c.qty),
  //                         0
  //                       ) / st
  //                     ).toFixed(4)
  //                   ),
  //                   duration: trade[trade.length - 1].time - trade[0].time,
  //                   procent: parseFloat(
  //                     (((sv / st - bv / bt) / (bv / bt)) * 100).toFixed(2)
  //                   ),
  //                   income: parseFloat(income.toFixed(3)),
  //                   profit:
  //                     profit >= 0
  //                       ? Math.max(0.01, profit)
  //                       : Math.min(-0.01, profit),
  //                   turnover: parseFloat(((bt + st) / 2).toFixed(1)),
  //                   max_volume: parseFloat(
  //                     Math.max(
  //                       ...trade.map(
  //                         (p) => (parseFloat(p.price) * parseFloat(p.qty)) / 2
  //                       )
  //                     ).toFixed(1)
  //                   ),
  //                   volume: parseFloat(
  //                     trade
  //                       .reduce(
  //                         (a, d) => a + parseFloat(d.price) * parseFloat(d.qty),
  //                         0
  //                       )
  //                       .toFixed(2)
  //                   ),
  //                   commission: parseFloat(commission.toFixed(3)),
  //                   transfer: 0,
  //                   deals,
  //                 };
  //               });

  //               console.log("сделки (binance):", trades);

  //               if (trades.length > 0) {
  //                 Promise.all([
  //                   fetch(
  //                     `https://fapi.binance.com/fapi/v2/account?timestamp=${serverTime}&recvWindow=60000&signature=${crypto
  //                       .createHmac("sha256", key1.secret_key)
  //                       .update(`timestamp=${serverTime}&recvWindow=60000`)
  //                       .digest("hex")}`,
  //                     {
  //                       headers: {
  //                         "X-MBX-APIKEY": key1.api_key,
  //                       },
  //                     }
  //                   )
  //                     .then((res) => res.json())
  //                     .then((r) => r.totalWalletBalance),
  //                   fetch(
  //                     `https://fapi.binance.com/fapi/v1/income?timestamp=${serverTime}&recvWindow=60000&limit=1000&incomeType=TRANSFER&startTime=${startTime}&endTime=${now}&signature=${crypto
  //                       .createHmac("sha256", key1.secret_key)
  //                       .update(
  //                         `timestamp=${serverTime}&recvWindow=60000&limit=1000&incomeType=TRANSFER&startTime=${startTime}&endTime=${now}`
  //                       )
  //                       .digest("hex")}`,
  //                     {
  //                       headers: {
  //                         "X-MBX-APIKEY": key1.api_key,
  //                       },
  //                     }
  //                   )
  //                     .then((res) => res.json())
  //                     .then((r) => r.reverse()),
  //                 ]).then((res) => {
  //                   console.log("res ", res);

  //                   let balance = parseFloat(res[0]);

  //                   res[1].forEach((transaction) => {
  //                     const filteredTrades = trades.filter(
  //                       (trade) => parseInt(trade.entry_time) < transaction.time
  //                     );
  //                     const latestTrade = filteredTrades.reduce(
  //                       (maxTrade, currentTrade) => {
  //                         return parseInt(currentTrade.entry_time) >
  //                           parseInt(maxTrade.entry_time)
  //                           ? currentTrade
  //                           : maxTrade;
  //                       },
  //                       filteredTrades[0]
  //                     );

  //                     if (latestTrade) {
  //                       latestTrade.transfer += parseFloat(transaction.income);
  //                     }
  //                   });

  //                   createTrades(
  //                     trades.reverse().map((p) => {
  //                       balance -= p.profit + p.transfer;

  //                       delete p.transfer;

  //                       return {
  //                         ...p,
  //                         deposit: Math.max(0, parseInt(balance.toFixed())),
  //                       };
  //                     })
  //                   ).then((b) => {
  //                     console.log("createTrades (binance): ", b);
  //                     b.forEach((trade) => {
  //                       apiRef.current.updateRows([
  //                         {
  //                           id: trade.id,
  //                           kid: trade.kid,
  //                           side: trade.side,
  //                           tags: trade.tags,
  //                           deals: trade.deals,
  //                           symbol: trade.symbol,
  //                           rating: trade.rating,
  //                           income: trade.income,
  //                           profit: trade.profit,
  //                           deposit: trade.deposit,
  //                           procent: trade.procent,
  //                           exchange: trade.exchange,
  //                           duration: trade.duration,
  //                           turnover: trade.turnover,
  //                           volume: trade.volume / 2,
  //                           maxVolume: trade.max_volume,
  //                           commission: trade.commission,
  //                           exitTime: parseInt(trade.exit_time),
  //                           entryTime: parseInt(trade.entry_time),
  //                           averageExitPrice: trade.avg_exit_price,
  //                           averageEntryPrice: trade.avg_entry_price,
  //                           apikey: keys.find((key) => key.id === trade.kid)
  //                             ?.title,
  //                         },
  //                       ]);
  //                     });
  //                   });
  //                 });
  //               }
  //             });
  //         })
  //         .catch((e) => {
  //           console.log("хуйня от binance: ", e);
  //         });
  //     }

  //     if (key2 !== undefined) {
  //       const bybitRows = rows.filter((r) => r.exchange === 2);

  //       const diff =
  //         bybitRows.length === 0
  //           ? rows[0].exitTime + 500
  //           : bybitRows[0].exitTime + 500;

  //       const startTime = now - diff >= 604800000 ? now - 604790000 : diff;

  //       console.log("startTime (bybit): ", startTime);

  //       var bybit = [];

  //       fetch("https://api.bybit.com/v5/market/time")
  //         .then((res) => res.json())
  //         .then(async ({ time }) => {
  //           let cursor = "";
  //           do {
  //             await fetch(
  //               `https://api.bybit.com/v5/execution/list?category=linear&limit=100&startTime=${startTime}&endTime=${now}&cursor=${cursor}`,
  //               {
  //                 headers: {
  //                   "X-BAPI-SIGN": crypto
  //                     .createHmac("sha256", key2.secret_key)
  //                     .update(
  //                       time +
  //                         key2.api_key +
  //                         60000 +
  //                         `category=linear&limit=100&startTime=${startTime}&endTime=${now}&cursor=${cursor}`
  //                     )
  //                     .digest("hex"),
  //                   "X-BAPI-API-KEY": key2.api_key,
  //                   "X-BAPI-TIMESTAMP": time,
  //                   "X-BAPI-RECV-WINDOW": 60000,
  //                 },
  //               }
  //             )
  //               .then((res) => res.json())
  //               .then((data) => {
  //                 cursor = data.result.nextPageCursor;
  //                 bybit.push(data.result.list);
  //               });
  //           } while (cursor !== "");

  //           console.log("сделки (bybit): ", bybit);

  //           if (bybit[0]?.length > 1) {
  //             var g = bybit.flat().reduce((groups, deal) => {
  //               if (!groups[deal.symbol]) {
  //                 groups[deal.symbol] = [];
  //               }
  //               groups[deal.symbol].push(deal);
  //               return groups;
  //             }, {});
  //             for (var symbol in g) {
  //               g[symbol].sort((a, b) =>
  //                 a.execTime > b.execTime ? 1 : a.execTime < b.execTime ? -1 : 0
  //               );
  //             }
  //             var s = Object.values(g).reduce(
  //               (sorted, deals) => sorted.concat(deals),
  //               []
  //             );
  //             var aboba = [];
  //             let currentTrade = [];
  //             for (var deal of s) {
  //               if (
  //                 (deal.closedSize === "0" &&
  //                   (currentTrade.length === 0 ||
  //                     currentTrade[currentTrade.length - 1].closedSize !==
  //                       "0")) ||
  //                 (currentTrade.length > 0 &&
  //                   deal.symbol !== currentTrade[0].symbol)
  //               ) {
  //                 if (currentTrade.length > 0) {
  //                   aboba.push(currentTrade);
  //                   currentTrade = [];
  //                 }
  //               }

  //               currentTrade.push(deal);
  //             }

  //             aboba.push(currentTrade);

  //             const trades = aboba.map((trade) => {
  //               var deals = [];
  //               var ut = new Set();
  //               var b = trade.filter((t) => t.side === "Buy");
  //               var s = trade.filter((t) => t.side === "Sell");
  //               var bt = b.reduce((a, c) => a + parseFloat(c.execQty), 0);
  //               var st = s.reduce((a, c) => a + parseFloat(c.execQty), 0);
  //               var bv = b.reduce((a, c) => a + parseFloat(c.execValue), 0);
  //               var sv = s.reduce((a, c) => a + parseFloat(c.execValue), 0);

  //               trade.forEach((t) => {
  //                 if (!ut.has(t.execTime)) {
  //                   ut.add(t.execTime);
  //                   deals.push({
  //                     time: t.execTime,
  //                     side: t.side.toUpperCase(),
  //                     price: t.execPrice,
  //                     income: parseFloat(t.execQty).toFixed(3),
  //                     volume: parseFloat(t.execValue).toFixed(2),
  //                     commission: parseFloat(t.execFee).toFixed(3),
  //                   });
  //                 }
  //               });

  //               const income = sv - bv;

  //               const commission = trade.reduce(
  //                 (a, d) => a + parseFloat(d.execFee),
  //                 0
  //               );

  //               const profit = parseFloat((income - commission).toFixed(2));

  //               return {
  //                 uid: user.id,
  //                 kid: key2.id,
  //                 exchange: 2,
  //                 symbol: trade[0].symbol,
  //                 entry_time: String(trade[0].execTime),
  //                 exit_time: String(trade[trade.length - 1].execTime),
  //                 side: trade[0].side.toUpperCase(),
  //                 avg_entry_price: parseFloat(
  //                   (
  //                     b.reduce(
  //                       (a, c) =>
  //                         a + parseFloat(c.execPrice) * parseFloat(c.execQty),
  //                       0
  //                     ) / bt
  //                   ).toFixed(4)
  //                 ),
  //                 avg_exit_price: parseFloat(
  //                   (
  //                     s.reduce(
  //                       (a, c) =>
  //                         a + parseFloat(c.execPrice) * parseFloat(c.execQty),
  //                       0
  //                     ) / st
  //                   ).toFixed(4)
  //                 ),
  //                 duration:
  //                   trade[trade.length - 1].execTime - trade[0].execTime,
  //                 procent: parseFloat(
  //                   (((sv / st - bv / bt) / (bv / bt)) * 100).toFixed(2)
  //                 ),
  //                 income: parseFloat(income.toFixed(3)),
  //                 profit:
  //                   profit >= 0
  //                     ? Math.max(0.01, profit)
  //                     : Math.min(-0.01, profit),
  //                 turnover: parseFloat(((bt + st) / 2).toFixed(1)),
  //                 max_volume: parseFloat(
  //                   Math.max(
  //                     ...trade.map((p) => parseFloat(p.execValue) / 2)
  //                   ).toFixed(1)
  //                 ),
  //                 volume: parseFloat(
  //                   trade
  //                     .reduce((a, d) => a + parseFloat(d.execValue), 0)
  //                     .toFixed(2)
  //                 ),
  //                 commission: parseFloat(commission.toFixed(3)),
  //                 transfer: 0,
  //                 deals,
  //               };
  //             });

  //             console.log("trades (bybit): ", trades);

  //             if (trades.length > 0) {
  //               const newTime = await fetch(
  //                 "https://api.bybit.com/v5/market/time"
  //               )
  //                 .then((res) => res.json())
  //                 .then((r) => r.time);
  //               let balance = await fetch(
  //                 `https://api.bybit.com/v5/account/wallet-balance?accountType=UNIFIED`,
  //                 {
  //                   headers: {
  //                     "X-BAPI-SIGN": crypto
  //                       .createHmac("sha256", key2.secret_key)
  //                       .update(
  //                         newTime + key2.api_key + 60000 + "accountType=UNIFIED"
  //                       )
  //                       .digest("hex"),
  //                     "X-BAPI-API-KEY": key2.api_key,
  //                     "X-BAPI-TIMESTAMP": newTime,
  //                     "X-BAPI-RECV-WINDOW": 60000,
  //                   },
  //                 }
  //               )
  //                 .then((res) => res.json())
  //                 .then(({ result }) => result.list[0].totalWalletBalance);
  //               const transfers = await Promise.all([
  //                 fetch(
  //                   `https://api.bybit.com/v5/account/transaction-log?accountType=UNIFIED&category=linear&type=TRANSFER_IN&limit=50&startTime=${startTime}&endTime=${now}`,
  //                   {
  //                     headers: {
  //                       "X-BAPI-SIGN": crypto
  //                         .createHmac("sha256", key2.secret_key)
  //                         .update(
  //                           newTime +
  //                             key2.api_key +
  //                             60000 +
  //                             `accountType=UNIFIED&category=linear&type=TRANSFER_IN&limit=50&startTime=${startTime}&endTime=${now}`
  //                         )
  //                         .digest("hex"),
  //                       "X-BAPI-API-KEY": key2.api_key,
  //                       "X-BAPI-TIMESTAMP": newTime,
  //                       "X-BAPI-RECV-WINDOW": 60000,
  //                     },
  //                   }
  //                 )
  //                   .then((res) => res.json())
  //                   .then(({ result }) => result.list),
  //                 fetch(
  //                   `https://api.bybit.com/v5/account/transaction-log?accountType=UNIFIED&category=linear&type=TRANSFER_OUT&limit=50&startTime=${startTime}&endTime=${now}`,
  //                   {
  //                     headers: {
  //                       "X-BAPI-SIGN": crypto
  //                         .createHmac("sha256", key2.secret_key)
  //                         .update(
  //                           newTime +
  //                             key2.api_key +
  //                             60000 +
  //                             `accountType=UNIFIED&category=linear&type=TRANSFER_OUT&limit=50&startTime=${startTime}&endTime=${now}`
  //                         )
  //                         .digest("hex"),
  //                       "X-BAPI-API-KEY": key2.api_key,
  //                       "X-BAPI-TIMESTAMP": newTime,
  //                       "X-BAPI-RECV-WINDOW": 60000,
  //                     },
  //                   }
  //                 )
  //                   .then((res) => res.json())
  //                   .then(({ result }) => result.list),
  //               ]).then((r) => [...r[0], ...r[1]]);

  //               console.log("transfers: ", transfers);

  //               transfers.forEach((transaction) => {
  //                 const filteredTrades = trades.filter(
  //                   (trade) =>
  //                     parseInt(trade.entry_time) <
  //                     parseInt(transaction.transactionTime)
  //                 );
  //                 const latestTrade = filteredTrades.reduce(
  //                   (maxTrade, currentTrade) => {
  //                     return parseInt(currentTrade.entry_time) >
  //                       parseInt(maxTrade.entry_time)
  //                       ? currentTrade
  //                       : maxTrade;
  //                   },
  //                   filteredTrades[0]
  //                 );

  //                 if (latestTrade) {
  //                   latestTrade.transfer += parseFloat(transaction.change);
  //                 }
  //               });

  //               createTrades(
  //                 trades.map((p) => {
  //                   balance -= p.profit + p.transfer;

  //                   delete p.transfer;

  //                   return {
  //                     ...p,
  //                     deposit: Math.max(0, parseInt(balance.toFixed())),
  //                   };
  //                 })
  //               ).then((b) => {
  //                 console.log("createTrades (bybit): ", b);

  //                 b.forEach((trade) => {
  //                   apiRef.current.updateRows([
  //                     {
  //                       id: trade.id,
  //                       kid: trade.kid,
  //                       side: trade.side,
  //                       tags: trade.tags,
  //                       deals: trade.deals,
  //                       symbol: trade.symbol,
  //                       rating: trade.rating,
  //                       income: trade.income,
  //                       profit: trade.profit,
  //                       deposit: trade.deposit,
  //                       procent: trade.procent,
  //                       exchange: trade.exchange,
  //                       duration: trade.duration,
  //                       turnover: trade.turnover,
  //                       volume: trade.volume / 2,
  //                       maxVolume: trade.max_volume,
  //                       commission: trade.commission,
  //                       exitTime: parseInt(trade.exit_time),
  //                       entryTime: parseInt(trade.entry_time),
  //                       averageExitPrice: trade.avg_exit_price,
  //                       averageEntryPrice: trade.avg_entry_price,
  //                       apikey: keys.find((key) => key.id === trade.kid)?.title,
  //                     },
  //                   ]);
  //                 });
  //               });
  //             }
  //           }
  //         })
  //         .catch((e) => {
  //           console.log("хуйня от bybit: ", e);
  //         });
  //     }
  //   }
  // }, [onLoad]);

  const columns = useMemo(
    () => [
      {
        field: "symbol",
        headerName: "Тикер",
        width: 150,
        renderCell: ({ value, row }) => (
          <MenuItem
            noWrap
            onClick={() => {
              setActivate({
                deals: row.deals,
                symbol: row.symbol,
                procent: row.procent,
                exchange: row.exchange,
                entryTime: row.entryTime,
              });
              window.scrollTo(0, 0);
            }}
            sx={{
              mt: "auto",
              mb: "auto",
            }}
          >
            {value}
          </MenuItem>
        ),
      },
      {
        field: "tags",
        headerName: "Причины входа",
        width: 350,
        renderCell: ({ value, row }) => (
          <Autocomplete
            multiple
            fullWidth
            noOptionsText="Нет данных"
            value={value ?? []}
            options={JSON.parse(localStorage.getItem("tags")) ?? []}
            onChange={(e, n) => {
              apiRef.current.updateRows([{ id: row.id, tags: n }]);
              updateTags(row.id, n);
            }}
            renderOption={(props, option, state, ownerState) => (
              <Box
                sx={{
                  borderRadius: "8px",
                  marginTop: "6px",
                  [`&.${autocompleteClasses.option}`]: {
                    padding: "8px",
                  },
                }}
                component="li"
                {...props}
              >
                {ownerState.getOptionLabel(option)}
              </Box>
            )}
            ChipProps={{ variant: "soft", color: "info", size: "medium" }}
            popupIcon={<Iconify icon="solar:alt-arrow-down-bold-duotone" />}
            renderInput={(params) => (
              <TextField {...params} variant="standard" color="secondary" />
            )}
          />
        ),
      },
      {
        field: "rating",
        headerName: "Оценка",
        width: 150,
        renderCell: ({ value, row }) => (
          <Rating
            value={value}
            icon={<StarRoundedIcon color="warning" />}
            emptyIcon={<StarRoundedIcon color="text.secondary" />}
            onChange={(e, n) => {
              apiRef.current.updateRows([{ id: row.id, rating: n }]);
              updateRating(row.id, n);
            }}
          />
        ),
      },
      {
        field: "entryTime",
        headerName: "Время входа",
        width: 140,
        renderCell: ({ value }) => (
          <Stack textAlign="right">
            {DateTime.fromMillis(value).toLocaleString({
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
            <Typography variant="caption" color="text.secondary">
              {DateTime.fromMillis(value).toLocaleString({
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
            </Typography>
          </Stack>
        ),
      },
      {
        field: "exitTime",
        headerName: "Время выхода",
        width: 140,
        renderCell: ({ value }) => (
          <Stack textAlign="right">
            {DateTime.fromMillis(value).toLocaleString({
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
            <Typography variant="caption" color="text.secondary">
              {DateTime.fromMillis(value).toLocaleString({
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
            </Typography>
          </Stack>
        ),
      },
      {
        field: "side",
        headerName: "Сторона",
        description: "Направление сделки",
        renderCell: ({ value }) =>
          value === "BUY" ? (
            <Typography variant="subtitle1" color="info.main">
              LONG
            </Typography>
          ) : (
            <Typography variant="subtitle1" color="warning.main">
              SHORT
            </Typography>
          ),
      },
      {
        type: "number",
        field: "leverage",
        headerName: "Плечо",
        headerAlign: "center",
        valueGetter: (v, row) => row.volume / row.deposit,
        renderCell: ({ value }) => (
          <Typography
            variant="caption"
            marginLeft="auto"
            marginRight="auto"
            color="text.secondary"
          >
            x{value.toFixed(2)}
          </Typography>
        ),
      },
      {
        field: "averageEntryPrice",
        headerName: "Цена входа",
        description: "Средняя цена входа",
        width: 120,
        valueGetter: (value, row) =>
          row.side === "BUY" ? value : row.averageExitPrice,
        valueFormatter: (value) => `$${value}`,
        renderCell: ({ value }) => (
          <Typography variant="subtitle2">{value}</Typography>
        ),
      },
      {
        field: "averageExitPrice",
        headerName: "Цена выхода",
        description: "Средняя цена выхода",
        width: 130,
        valueGetter: (value, row) =>
          row.side === "BUY" ? value : row.averageEntryPrice,
        valueFormatter: (value) => `$${value}`,
        renderCell: ({ value }) => (
          <Typography variant="subtitle2">{value}</Typography>
        ),
      },
      {
        field: "duration",
        headerName: "Длительность",
        width: 200,
        valueFormatter: (value) => {
          const hours = Math.floor(value / 1000 / 3600);
          const minutes = Math.floor((value / 1000 / 60) % 60);
          const seconds = Math.floor((value / 1000) % 60);
          return `${hours > 0 ? `${hours} час. ` : ""}${
            minutes > 0 ? `${minutes} мин. ` : ""
          }${seconds > 0 ? `${seconds} сек. ` : `${value % 1000} мс. `}`.trim();
        },
      },
      {
        type: "number",
        field: "procent",
        headerName: "Процент",
        renderCell: ({ value }) =>
          value >= 0 ? (
            <Box
              component="span"
              sx={{
                pl: "6px",
                pr: "6px",
                width: "54px",
                height: "24px",
                display: "flex",
                fontWeight: "700",
                borderRadius: "6px",
                fontSize: "0.75rem",
                alignItems: "center",
                justifyContent: "center",
                color: "rgb(119, 237, 139)",
                backgroundColor: "rgba(34, 197, 94, 0.16)",
              }}
            >
              {value}%
            </Box>
          ) : (
            <Box
              component="span"
              sx={{
                pl: "6px",
                pr: "6px",
                width: "54px",
                height: "24px",
                display: "flex",
                fontWeight: "700",
                borderRadius: "6px",
                fontSize: "0.75rem",
                alignItems: "center",
                justifyContent: "center",
                color: "rgb(255, 172, 130)",
                backgroundColor: "rgba(255, 86, 48, 0.16)",
              }}
            >
              {value}%
            </Box>
          ),
      },
      {
        type: "number",
        field: "income",
        headerName: "Доход",
        width: 150,
        valueFormatter: (value) => `${value}$`,
      },
      {
        type: "number",
        field: "profit",
        headerName: "Прибыль ($)",
        width: 150,
        valueFormatter: (value) => `${useFormat(value)}$`,
      },
      {
        type: "number",
        field: "procentProfit",
        headerName: "Прибыль (%)",
        width: 130,
        valueGetter: (v, row) => (row.profit / row.deposit) * 100,
        valueFormatter: (value) => `${value.toFixed(3)}%`,
      },
      {
        type: "number",
        field: "turnover",
        headerName: "Оборот",
        width: 150,
        renderCell: ({ value }) => (
          <Typography variant="subtitle2">{useFormat(value)}</Typography>
        ),
      },
      {
        type: "number",
        field: "maxVolume",
        headerName: "Макс. объём",
        width: 150,
        renderCell: ({ value }) => (
          <Typography variant="subtitle2">${useFormat(value)}</Typography>
        ),
      },
      {
        type: "number",
        field: "deposit",
        headerName: "Депозит",
        description: "Сумма собственных средств при открытии сделки",
        width: 130,
        valueFormatter: (value) => `$${value}`,
      },
      {
        type: "number",
        field: "volume",
        headerName: "Объём",
        width: 150,
        valueFormatter: (value) => `$${useFormat(value.toFixed(2))}`,
      },
      {
        type: "number",
        field: "commission",
        headerName: "Комиссия",
        width: 150,
        valueFormatter: (value) => `$${value}`,
      },
      {
        field: "apikey",
        headerAlign: "right",
        headerName: "API-ключ",
        width: 150,
        renderCell: ({ value }) => (
          <Typography
            color="text.disabled"
            variant="subtitle2"
            marginLeft="auto"
            noWrap
          >
            {value}
          </Typography>
        ),
      },
    ],
    []
  );

  const sx = useMemo(
    () => ({
      border: "none",
      "--DataGrid-overlayHeight": "600px",
      "--unstable_DataGrid-radius": "0px",
      "--DataGrid-rowBorderColor": "transparent",
      "--DataGrid-containerBackground": mode === "dark" ? "#2F3944" : "#F4F6F8",
      "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
        alignItems: "center",
        display: "flex",
        py: "5px",
      },
      "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
        alignItems: "center",
        display: "flex",
        py: "10px",
      },
      "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
        alignItems: "center",
        display: "flex",
        py: "15px",
      },
      "& .MuiDataGrid-columnHeaderTitle": {
        color: "text.secondary",
      },
      "&.MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
        borderBottom:
          mode === "dark"
            ? "1px dashed rgba(145, 158, 171, 0.24)"
            : "1px dashed rgba(145, 158, 171, 0.5)",
      },
      "& .MuiDataGrid-withBorderColor": {
        borderColor: "transparent",
      },
    }),
    [mode]
  );

  const slotProps = useMemo(
    () => ({
      toolbar: {
        height,
        setHeight,
        autoHeight,
        setAutoHeight,
      },
      pagination: {
        pagesCount,
      },
    }),
    [height, autoHeight, pagesCount]
  );

  const initialState = useMemo(
    () => ({
      pagination: {
        paginationModel,
      },
      sorting: {
        sortModel: [{ field: "entryTime", sort: "desc" }],
      },
    }),
    []
  );

  const onRowSelectionModelChange = useCallback(
    (n) => setHidden(n.length > 0 ? false : true),
    []
  );

  const onPaginationModelChange = useCallback(({ page, pageSize }) => {
    setPaginationModel({ page, pageSize });
    localStorage.setItem("pageSize", pageSize);
  }, []);

  return autoHeight ? (
    <DataGrid
      autoHeight
      pagination
      checkboxSelection
      disableRowSelectionOnClick
      keepNonExistentRowsSelected
      localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
      onRowSelectionModelChange={onRowSelectionModelChange}
      onPaginationModelChange={onPaginationModelChange}
      pageSizeOptions={pageSizeOptions}
      getRowHeight={getRowHeight}
      initialState={initialState}
      paginationMode="server"
      slotProps={slotProps}
      columns={columns}
      loading={loading}
      rowCount={total}
      apiRef={apiRef}
      slots={slots}
      rows={rows}
      sx={sx}
    />
  ) : (
    <Box sx={{ height }}>
      <DataGrid
        pagination
        checkboxSelection
        disableRowSelectionOnClick
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        onRowSelectionModelChange={onRowSelectionModelChange}
        onPaginationModelChange={onPaginationModelChange}
        pageSizeOptions={pageSizeOptions}
        getRowHeight={getRowHeight}
        initialState={initialState}
        paginationMode="server"
        slotProps={slotProps}
        columns={columns}
        loading={loading}
        rowCount={total}
        apiRef={apiRef}
        slots={slots}
        rows={rows}
        sx={sx}
      />
    </Box>
  );
});

const getRowHeight = () => "auto";

const slots = {
  loadingOverlay: LoadingOverlay,
  noRowsOverlay: NoRowsOverlay,
  columnMenu: CustomColumnMenu,
  pagination: CustomPagination,
  toolbar: CustomToolbar,
};

const pageSizeOptions = [10, 25, 50, 100];

const ToolbatSlotProps = { button: { color: "info" } };

export default DataTable;
