"use client";

import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import ListItemIcon from "@mui/material/ListItemIcon";
import CardContent from "@mui/material/CardContent";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { useState, useRef, useEffect } from "react";
import { createHmac } from "crypto";
import { DateTime } from "luxon";
import Image from "next/image";
import axios from "axios";

import { useKeys, useNotifications, useUser } from "#/app/my/layout";
import { updateTitle, deleteKey, createKey } from "#/server/keys";
import { useMode } from "#/components/global/theme-registry";
import { createNotification } from "#/server/notifications";
import AlertSnackbar from "#/components/alert-snackbar";
import CounterBox from "#/components/counter-box";
import Iconify from "#/utils/iconify";

const EXCHANGES = {
  1: "Binance Futures",
  // 2: "Binance Spot",
  3: "Bybit Linear Futures",
  // 4: "Bybit Inverse Futures",
  // 5: "Bybit Spot",
  6: "OKX Swap",
  // 7: "OKX Spot",
};

const exchanges_cards = [
  { id: 1, title: "Binance Futures" },
  // { id: 2, title: "Binance Spot" },
  { id: 3, title: "Bybit Linear Futures" },
  // { id: 4, title: "Bybit Inverse Futures" },
  // { id: 5, title: "Bybit Spot" },
  { id: 6, title: "OKX Swap" },
  // { id: 7, title: "OKX Spot" },
];

function AddKeyPanel() {
  const { setNotifications } = useNotifications();
  const { keys, setKeys } = useKeys();
  const { user } = useUser();
  const { mode } = useMode();

  const [statusSnackbar, setStatusSnackbar] = useState({});
  const [secretkeyError, setSecretkeyError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [apikeyError, setApikeyError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const secretkeyRef = useRef("");
  const apikeyRef = useRef("");
  const phraseRef = useRef("");
  const titleRef = useRef("");

  useEffect(() => {
    setTitleError("");
    setApikeyError("");
    setSecretkeyError("");
    titleRef.current = "";
    apikeyRef.current = "";
    secretkeyRef.current = "";
  }, [value, openDialog]);

  function handleSubmit() {
    let secretkeyMessage = "";
    let apikeyMessage = "";
    let titleMessage = "";

    const secretkey = secretkeyRef.current;
    const apikey = apikeyRef.current;
    const phrase = phraseRef.current;
    const title = titleRef.current;

    switch (true) {
      case apikey.length < 10:
        apikeyMessage = "Слишком короткий ключ";
        break;
      case apikey.length > 256:
        apikeyMessage = "Слишком длинный ключ";
        break;
      case /\s/.test(apikey):
        apikeyMessage = "Ключ не должен содержать пробелы";
        break;
      default:
        break;
    }

    switch (true) {
      case secretkey.length < 10:
        secretkeyMessage = "Слишком короткий ключ";
        break;
      case secretkey.length > 256:
        secretkeyMessage = "Слишком длинный ключ";
        break;
      case /\s/.test(secretkey):
        secretkeyMessage = "Ключ не должен содержать пробелы";
        break;
      default:
        break;
    }

    switch (true) {
      case title.length < 3:
        titleMessage = "Не менее 3 символов";
        break;
      case title.length > 18:
        titleMessage = "Не более 18 символов";
        break;
      case !/^[A-Za-zА-Яа-яЁё\d\s.,!?()-]+$/.test(title):
        titleMessage = "Некорректное название";
        break;
      default:
        break;
    }

    if (apikeyMessage || secretkeyMessage || titleMessage) {
      setSecretkeyError(secretkeyMessage);
      setApikeyError(apikeyMessage);
      setTitleError(titleMessage);
      return;
    }

    setLoading(true);

    switch (value) {
      case "Binance Futures":
        createKey(user.id, apikey, secretkey, title, 1).then((k) => {
          setLoading(false);

          if (k === null) {
            setApikeyError("Такой ключ уже существует");
            return;
          }

          setOpenDialog(false);
          setStatusSnackbar({ show: true, variant: "info" });
          setKeys((prev) => [...prev, k]);

          const serverTime = DateTime.now().ts;

          var promises = [];

          for (
            let start = serverTime - 2592000000 * 24;
            start < serverTime;
            start += 432000000
          ) {
            const end = Math.min(start + 432000000, serverTime);

            promises.push(
              axios
                .get(
                  `https://fapi.binance.com/fapi/v1/userTrades?startTime=${start}&endTime=${end}&timestamp=${serverTime}&recvWindow=60000&limit=1000&signature=${createHmac(
                    "sha256",
                    k.secret_key
                  )
                    .update(
                      `startTime=${start}&endTime=${end}&timestamp=${serverTime}&recvWindow=60000&limit=1000`
                    )
                    .digest("hex")}`,
                  {
                    headers: { "X-MBX-APIKEY": k.api_key },
                  }
                )
                .then((r) => r.data)
            );
          }

          Promise.all(promises)
            .then((deals) => {
              var aboba = [];

              Object.values(
                deals.flat().reduce((result, trade) => {
                  const symbol = trade.symbol;
                  if (!result[symbol]) {
                    result[symbol] = [];
                  }
                  result[symbol].push(trade);
                  return result;
                }, {})
              ).forEach((deal) => {
                let currentTrade = [];
                for (let i = 0; i < deal.length; i++) {
                  var currentTradeEmpty = currentTrade.length === 0;
                  var isClosingTrade =
                    i === deal.length - 1 ||
                    (i < deal.length - 1 &&
                      parseFloat(deal[i].realizedPnl) !== 0 &&
                      parseFloat(deal[i + 1].realizedPnl) === 0);
                  var isOpeningTrade =
                    i === 0 ||
                    (i > 0 &&
                      parseFloat(deal[i].realizedPnl) === 0 &&
                      parseFloat(deal[i - 1].realizedPnl) !== 0);

                  if (currentTradeEmpty || isOpeningTrade) {
                    currentTrade.push(deal[i]);
                  } else if (isClosingTrade) {
                    currentTrade.push(deal[i]);
                    aboba.push([...currentTrade]);
                    currentTrade = [];
                  } else {
                    currentTrade.push(deal[i]);
                  }
                }
              });

              const trades = aboba
                .map((trade) => {
                  var deals = [];
                  var ut = new Set();
                  var b = trade.filter((t) => t.side === "BUY");
                  var s = trade.filter((t) => t.side === "SELL");
                  var bt = b.reduce((a, c) => a + parseFloat(c.qty), 0);
                  var st = s.reduce((a, c) => a + parseFloat(c.qty), 0);
                  var bv = b.reduce((a, c) => a + parseFloat(c.quoteQty), 0);
                  var sv = s.reduce((a, c) => a + parseFloat(c.quoteQty), 0);

                  trade.forEach((t) => {
                    if (!ut.has(t.time)) {
                      ut.add(t.time);
                      deals.push({
                        time: t.time,
                        side: t.side,
                        price: parseFloat(t.price).toFixed(2),
                        income: parseFloat(t.realizedPnl).toFixed(3),
                        volume: parseFloat(t.qty + t.price).toFixed(0),
                        commission: parseFloat(t.commission).toFixed(3),
                      });
                    }
                  });

                  const income = trade.reduce(
                    (a, c) => a + parseFloat(c.realizedPnl),
                    0
                  );

                  const commission = trade.reduce(
                    (a, d) => a + parseFloat(d.commission),
                    0
                  );

                  const profit = parseFloat((income - commission).toFixed(2));

                  return {
                    uid: user.id,
                    kid: k.id,
                    exchange: 1,
                    symbol: trade[0].symbol,
                    entry_time: String(trade[0].time),
                    exit_time: String(trade[trade.length - 1].time),
                    side: trade[0].side,
                    avg_entry_price: parseFloat(
                      (
                        b.reduce(
                          (a, c) => a + parseFloat(c.price) * parseFloat(c.qty),
                          0
                        ) / bt
                      ).toFixed(4)
                    ),
                    avg_exit_price: parseFloat(
                      (
                        s.reduce(
                          (a, c) => a + parseFloat(c.price) * parseFloat(c.qty),
                          0
                        ) / st
                      ).toFixed(4)
                    ),
                    duration: trade[trade.length - 1].time - trade[0].time,
                    procent: parseFloat(
                      (((sv / st - bv / bt) / (bv / bt)) * 100).toFixed(2)
                    ),
                    income: parseFloat(income.toFixed(3)),
                    profit:
                      profit >= 0
                        ? Math.max(0.01, profit)
                        : Math.min(-0.01, profit),
                    turnover: parseFloat(((bt + st) / 2).toFixed(1)),
                    max_volume: parseFloat(
                      Math.max(
                        ...trade.map(
                          (p) => (parseFloat(p.price) * parseFloat(p.qty)) / 2
                        )
                      ).toFixed(1)
                    ),
                    volume: parseFloat(
                      trade
                        .reduce(
                          (a, d) => a + parseFloat(d.price) * parseFloat(d.qty),
                          0
                        )
                        .toFixed(2)
                    ),
                    commission: parseFloat(commission.toFixed(3)),
                    transfer: 0,
                    deals,
                  };
                })
                .sort((a, b) => parseInt(b.entry_time) - parseInt(a.exit_time));

              Promise.all([
                fetch(
                  `https://fapi.binance.com/fapi/v2/account?timestamp=${serverTime}&recvWindow=60000&signature=${createHmac(
                    "sha256",
                    k.secret_key
                  )
                    .update(`timestamp=${serverTime}&recvWindow=60000`)
                    .digest("hex")}`,
                  {
                    headers: {
                      "X-MBX-APIKEY": k.api_key,
                    },
                  }
                )
                  .then((res) => res.json())
                  .then((r) => r.totalWalletBalance),
                fetch(
                  `https://fapi.binance.com/fapi/v1/income?timestamp=${serverTime}&recvWindow=60000&limit=1000&incomeType=TRANSFER&startTime=${
                    serverTime - 2592000000 * 3
                  }&endTime=${serverTime}&signature=${createHmac(
                    "sha256",
                    k.secret_key
                  )
                    .update(
                      `timestamp=${serverTime}&recvWindow=60000&limit=1000&incomeType=TRANSFER&startTime=${
                        serverTime - 2592000000 * 3
                      }&endTime=${serverTime}`
                    )
                    .digest("hex")}`,
                  {
                    headers: {
                      "X-MBX-APIKEY": k.api_key,
                    },
                  }
                )
                  .then((res) => res.json())
                  .then((r) => r.reverse()),
                fetch(
                  `https://fapi.binance.com/fapi/v1/income?timestamp=${serverTime}&recvWindow=60000&limit=1000&incomeType=FUNDING_FEE&startTime=${
                    serverTime - 2592000000 * 3
                  }&endTime=${serverTime}&signature=${createHmac(
                    "sha256",
                    k.secret_key
                  )
                    .update(
                      `timestamp=${serverTime}&recvWindow=60000&limit=1000&incomeType=FUNDING_FEE&startTime=${
                        serverTime - 2592000000 * 3
                      }&endTime=${serverTime}`
                    )
                    .digest("hex")}`,
                  {
                    headers: {
                      "X-MBX-APIKEY": k.api_key,
                    },
                  }
                )
                  .then((res) => res.json())
                  .then((r) => r.reverse()),
                fetch(
                  `https://fapi.binance.com/fapi/v1/income?timestamp=${serverTime}&recvWindow=60000&limit=1000&incomeType=INTERNAL_TRANSFER&startTime=${
                    serverTime - 2592000000 * 3
                  }&endTime=${serverTime}&signature=${createHmac(
                    "sha256",
                    k.secret_key
                  )
                    .update(
                      `timestamp=${serverTime}&recvWindow=60000&limit=1000&incomeType=INTERNAL_TRANSFER&startTime=${
                        serverTime - 2592000000 * 3
                      }&endTime=${serverTime}`
                    )
                    .digest("hex")}`,
                  {
                    headers: {
                      "X-MBX-APIKEY": k.api_key,
                    },
                  }
                )
                  .then((res) => res.json())
                  .then((r) => r.reverse()),
              ]).then((res) => {
                console.log("res ", res);

                let balance = parseFloat(res[0]);

                [...res[1], ...res[2], ...res[3]].forEach((transaction) => {
                  const filteredTrades = trades.filter(
                    (trade) => parseInt(trade.entry_time) < transaction.time
                  );
                  const latestTrade = filteredTrades.reduce(
                    (maxTrade, currentTrade) => {
                      return parseInt(currentTrade.entry_time) >
                        parseInt(maxTrade.entry_time)
                        ? currentTrade
                        : maxTrade;
                    },
                    filteredTrades[0]
                  );

                  if (latestTrade) {
                    latestTrade.transfer += parseFloat(transaction.income);
                  }
                });

                fetch("/api/aboba", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(
                    trades.map((p) => {
                      balance -= p.profit + p.transfer;

                      delete p.transfer;

                      return {
                        ...p,
                        deposit: Math.max(0, parseInt(balance.toFixed())),
                      };
                    })
                  ),
                })
                  .then((res) => res.json())
                  .then((b) => {
                    if (b === null) {
                      createNotification(
                        user.id,
                        `Binance Futures: произошла ошибка при сохранении сделок по API-ключу «${k.title}». Попробуйте перезагрузить ключ или обратиться в поддержку.`,
                        "/svg/error_load.svg"
                      ).then((n) => {
                        setNotifications((prev) => [n, ...prev]);
                      });
                    } else {
                      createNotification(
                        user.id,
                        `Binance Futures: загружены сделки (${b.count}) по API-ключу «${k.title}».`,
                        "/svg/success_load.svg"
                      ).then((n) => {
                        setNotifications((prev) => [n, ...prev]);
                      });
                    }
                  });
              });
            })
            .catch((error) => {
              createNotification(
                user.id,
                "Binance Futures: получена ошибка при загрузке сделок: " +
                  error.response.data?.msg,
                "/svg/error_load.svg"
              ).then((n) => {
                setNotifications((prev) => [n, ...prev]);
              });
            });
        });
        break;

      case "Bybit Linear Futures":
        createKey(user.id, apikey, secretkey, title, 3).then(async (k) => {
          setLoading(false);

          if (k === null) {
            setApikeyError("Такой ключ уже существует");
            return;
          }

          setOpenDialog(false);
          setStatusSnackbar({ show: true, variant: "info" });
          setKeys((prev) => [...prev, k]);

          try {
            const time = DateTime.now().ts;

            var requests = [];

            let cursor = "";
            let deals = [];

            for (
              let start = time - 2592000000 * 12;
              start < time;
              start += 604800000
            ) {
              const end = Math.min(start + 604800000, time);

              requests.push(async () => {
                let chunkCursor = cursor;
                do {
                  await fetch(
                    `https://api.bybit.com/v5/execution/list?category=linear&limit=100&startTime=${start}&endTime=${end}&cursor=${chunkCursor}`,
                    {
                      headers: {
                        "X-BAPI-SIGN": createHmac("sha256", k.secret_key)
                          .update(
                            time +
                              k.api_key +
                              60000 +
                              `category=linear&limit=100&startTime=${start}&endTime=${end}&cursor=${chunkCursor}`
                          )
                          .digest("hex"),
                        "X-BAPI-API-KEY": k.api_key,
                        "X-BAPI-TIMESTAMP": time,
                        "X-BAPI-RECV-WINDOW": 60000,
                      },
                    }
                  )
                    .then((res) => res.json())
                    .then(({ result }) => {
                      chunkCursor = result.nextPageCursor;
                      deals.push(result.list);
                    });
                } while (chunkCursor !== "");
              });
            }

            await Promise.all(requests.map((request) => request()));

            var g = deals.flat().reduce((groups, deal) => {
              if (!groups[deal.symbol]) {
                groups[deal.symbol] = [];
              }
              groups[deal.symbol].push(deal);
              return groups;
            }, {});
            for (var symbol in g) {
              g[symbol].sort((a, b) =>
                a.execTime > b.execTime ? 1 : a.execTime < b.execTime ? -1 : 0
              );
            }
            var s = Object.values(g).reduce(
              (sorted, deals) => sorted.concat(deals),
              []
            );
            var aboba = [];
            let currentTrade = [];
            for (var deal of s) {
              if (
                (deal.closedSize === "0" &&
                  (currentTrade.length === 0 ||
                    currentTrade[currentTrade.length - 1].closedSize !==
                      "0")) ||
                (currentTrade.length > 0 &&
                  deal.symbol !== currentTrade[0].symbol)
              ) {
                if (currentTrade.length > 0) {
                  aboba.push(currentTrade);
                  currentTrade = [];
                }
              }
              currentTrade.push(deal);
            }

            aboba.push(currentTrade);

            const newTime = DateTime.now().ts;

            let balance = await fetch(
              "https://api.bybit.com/v5/account/wallet-balance?accountType=UNIFIED",
              {
                headers: {
                  "X-BAPI-SIGN": createHmac("sha256", k.secret_key)
                    .update(newTime + k.api_key + 60000 + "accountType=UNIFIED")
                    .digest("hex"),
                  "X-BAPI-API-KEY": k.api_key,
                  "X-BAPI-TIMESTAMP": newTime,
                  "X-BAPI-RECV-WINDOW": 60000,
                },
              }
            )
              .then((res) => res.json())
              .then(({ result }) => result.list[0].totalWalletBalance);

            const transfers = await Promise.all([
              fetch(
                "https://api.bybit.com/v5/account/transaction-log?accountType=UNIFIED&category=linear&type=TRANSFER_IN&limit=50",
                {
                  headers: {
                    "X-BAPI-SIGN": createHmac("sha256", k.secret_key)
                      .update(
                        newTime +
                          k.api_key +
                          60000 +
                          "accountType=UNIFIED&category=linear&type=TRANSFER_IN&limit=50"
                      )
                      .digest("hex"),
                    "X-BAPI-API-KEY": k.api_key,
                    "X-BAPI-TIMESTAMP": newTime,
                    "X-BAPI-RECV-WINDOW": 60000,
                  },
                }
              )
                .then((res) => res.json())
                .then(({ result }) => result.list),
              fetch(
                "https://api.bybit.com/v5/account/transaction-log?accountType=UNIFIED&category=linear&type=TRANSFER_OUT&limit=50",
                {
                  headers: {
                    "X-BAPI-SIGN": createHmac("sha256", k.secret_key)
                      .update(
                        newTime +
                          k.api_key +
                          60000 +
                          "accountType=UNIFIED&category=linear&type=TRANSFER_OUT&limit=50"
                      )
                      .digest("hex"),
                    "X-BAPI-API-KEY": k.api_key,
                    "X-BAPI-TIMESTAMP": newTime,
                    "X-BAPI-RECV-WINDOW": 60000,
                  },
                }
              )
                .then((res) => res.json())
                .then(({ result }) => result.list),
            ]).then((r) => [...r[0], ...r[1]]);

            const trades = aboba
              .map((trade) => {
                var deals = [];
                var ut = new Set();
                var b = trade.filter((t) => t.side === "Buy");
                var s = trade.filter((t) => t.side === "Sell");
                var bt = b.reduce((a, c) => a + parseFloat(c.execQty), 0);
                var st = s.reduce((a, c) => a + parseFloat(c.execQty), 0);
                var bv = b.reduce((a, c) => a + parseFloat(c.execValue), 0);
                var sv = s.reduce((a, c) => a + parseFloat(c.execValue), 0);

                trade.forEach((t) => {
                  if (!ut.has(t.execTime)) {
                    ut.add(t.execTime);
                    deals.push({
                      time: t.execTime,
                      side: t.side.toUpperCase(),
                      price: t.execPrice,
                      income: parseFloat(t.execQty).toFixed(3),
                      volume: parseFloat(t.execValue).toFixed(2),
                      commission: parseFloat(t.execFee).toFixed(3),
                    });
                  }
                });

                const income = sv - bv;

                const commission = trade.reduce(
                  (a, d) => a + parseFloat(d.execFee),
                  0
                );

                const profit = parseFloat((income - commission).toFixed(2));

                return {
                  uid: user.id,
                  kid: k.id,
                  exchange: 2,
                  symbol: trade[0].symbol,
                  entry_time: String(trade[0].execTime),
                  exit_time: String(trade[trade.length - 1].execTime),
                  side: trade[0].side.toUpperCase(),
                  avg_entry_price: parseFloat(
                    (
                      b.reduce(
                        (a, c) =>
                          a + parseFloat(c.execPrice) * parseFloat(c.execQty),
                        0
                      ) / bt
                    ).toFixed(4)
                  ),
                  avg_exit_price: parseFloat(
                    (
                      s.reduce(
                        (a, c) =>
                          a + parseFloat(c.execPrice) * parseFloat(c.execQty),
                        0
                      ) / st
                    ).toFixed(4)
                  ),
                  duration:
                    trade[trade.length - 1].execTime - trade[0].execTime,
                  procent: parseFloat(
                    (((sv / st - bv / bt) / (bv / bt)) * 100).toFixed(2)
                  ),
                  income: parseFloat(income.toFixed(3)),
                  profit:
                    profit >= 0
                      ? Math.max(0.01, profit)
                      : Math.min(-0.01, profit),
                  turnover: parseFloat(((bt + st) / 2).toFixed(1)),
                  max_volume: parseFloat(
                    Math.max(
                      ...trade.map((p) => parseFloat(p.execValue) / 2)
                    ).toFixed(1)
                  ),
                  volume: parseFloat(
                    trade
                      .reduce((a, d) => a + parseFloat(d.execValue), 0)
                      .toFixed(2)
                  ),
                  commission: parseFloat(commission.toFixed(3)),
                  transfer: 0,
                  deals,
                };
              })
              .sort((a, b) => parseInt(b.entry_time) - parseInt(a.exit_time));

            transfers.forEach((transaction) => {
              const filteredTrades = trades.filter(
                (trade) =>
                  parseInt(trade.entry_time) <
                  parseInt(transaction.transactionTime)
              );
              const latestTrade = filteredTrades.reduce(
                (maxTrade, currentTrade) => {
                  return parseInt(currentTrade.entry_time) >
                    parseInt(maxTrade.entry_time)
                    ? currentTrade
                    : maxTrade;
                },
                filteredTrades[0]
              );

              if (latestTrade) {
                latestTrade.transfer += parseFloat(transaction.change);
              }
            });

            fetch("/api/aboba", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(
                trades.map((p) => {
                  balance -= p.profit + p.transfer;

                  delete p.transfer;

                  return {
                    ...p,
                    deposit: Math.max(0, parseInt(balance.toFixed())),
                  };
                })
              ),
            })
              .then((res) => res.json())
              .then((b) => {
                if (b === null) {
                  createNotification(
                    user.id,
                    `Bybit Linear Futures: произошла ошибка при сохранении сделок по API-ключу «${k.title}». Попробуйте перезагрузить ключ или обратиться в поддержку.`,
                    "/svg/error_load.svg"
                  ).then((n) => {
                    setNotifications((prev) => [n, ...prev]);
                  });
                } else {
                  createNotification(
                    user.id,
                    `Bybit Linear Futures: загружены сделки (${b.count}) по API-ключу «${k.title}».`,
                    "/svg/success_load.svg"
                  ).then((n) => {
                    setNotifications((prev) => [n, ...prev]);
                  });
                }
              });
          } catch (error) {
            createNotification(
              user.id,
              "Bybit Linear Futures: получена ошибка при загрузке сделок: " +
                error?.msg,
              "/svg/error_load.svg"
            ).then((n) => {
              setNotifications((prev) => [n, ...prev]);
            });
          }
        });
        break;

      case "OKX Swap":
        createKey(user.id, apikey, secretkey, title, 6, phrase).then((k) => {
          setLoading(false);

          if (k === null) {
            setApikeyError("Такой ключ уже существует");
            return;
          }

          setOpenDialog(false);
          setStatusSnackbar({ show: true, variant: "info" });
          setKeys((prev) => [...prev, k]);

          const serverTime = new Date(DateTime.now().ts).toISOString();

          fetch("https://www.okx.com/api/v5/account/positions-history", {
            headers: {
              "Content-Type": "application/json",
              "OK-ACCESS-KEY": k.api_key,
              "OK-ACCESS-SIGN": createHmac("sha256", k.secret_key)
                .update(
                  serverTime + "GET" + "/api/v5/account/positions-history"
                )
                .digest("Base64"),
              "OK-ACCESS-TIMESTAMP": serverTime,
              "OK-ACCESS-PASSPHRASE": phrase,
            },
          })
            .then((res) => res.json())
            .then((r) => {
              console.log("r: ", r);
            });
          fetch("https://www.okx.com/api/v5/account/positions-history", {
            headers: {
              "Content-Type": "application/json",
              "OK-ACCESS-KEY": k.api_key,
              "OK-ACCESS-SIGN": createHmac("sha256", k.secret_key)
                .update(
                  serverTime + "GET" + "/api/v5/account/positions-history"
                )
                .digest("Base64"),
              "OK-ACCESS-TIMESTAMP": serverTime,
              "OK-ACCESS-PASSPHRASE": phrase,
            },
          })
            .then((res) => res.json())
            .then((r) => {
              console.log("r: ", r);
            });
        });

      default:
        break;
    }
  }

  return (
    <>
      <Typography variant="h5" marginTop={4} display="flex" alignItems="center">
        доступно ключей
        <CounterBox
          count={3 - keys.length}
          variant="info"
          sx={{ ml: 1, padding: "10px 8px", height: "24px" }}
        />
      </Typography>
      <Button
        variant="contained"
        color="inherit"
        disabled={keys.length > 2}
        startIcon={<Iconify icon="line-md:plus" width={20} />}
        onClick={() => {
          setOpenDialog(true);
          setValue("");
        }}
        sx={{ position: "absolute", top: "24px", right: "24px" }}
      >
        Новый ключ
      </Button>
      <Dialog
        open={openDialog}
        fullWidth
        scroll="paper"
        PaperProps={{
          sx: {
            borderRadius: "16px",
            backgroundSize: "50%, 50%",
            backdropFilter: "blur(20px)",
            backgroundRepeat: "no-repeat, no-repeat",
            backgroundPosition: "right top, left bottom",
            backgroundImage:
              'url("/images/cyan-blur.png"), url("/images/red-blur.png")',
            backgroundColor:
              mode === "dark" ? "rgb(33, 43, 54)" : "rgb(255, 255, 255)",
            boxShadow:
              mode === "dark"
                ? "rgba(0, 0, 0, 0.24) -40px 40px 80px -8px"
                : "rgba(145, 158, 171, 0.24) -40px 40px 80px -8px",
          },
        }}
      >
        <DialogTitle padding="24px 24px 16px">Новый API-ключ</DialogTitle>
        <DialogContent sx={{ pr: 3, pl: 3, mt: 1 }}>
          <Grid container spacing={2} direction="column">
            {exchanges_cards.map((card) => (
              <ExchangeCard
                id={card.id}
                key={card.id}
                value={value}
                title={card.title}
                setValue={setValue}
                titleRef={titleRef}
                phraseRef={phraseRef}
                apikeyRef={apikeyRef}
                titleError={titleError}
                apikeyError={apikeyError}
                secretkeyRef={secretkeyRef}
                setTitleError={setTitleError}
                secretkeyError={secretkeyError}
                setApikeyError={setApikeyError}
                setSecretkeyError={setSecretkeyError}
              />
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="inherit"
            size="medium"
            onClick={() => {
              setOpenDialog(false);
              setValue("");
            }}
          >
            Отмена
          </Button>
          <LoadingButton
            variant="contained"
            color="inherit"
            loading={loading}
            onClick={handleSubmit}
            disabled={value === ""}
          >
            Добавить
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <AlertSnackbar
        statusSnackbar={statusSnackbar}
        setStatusSnackbar={setStatusSnackbar}
      />
    </>
  );
}

function ExchangeCard({
  id,
  title,
  value,
  setValue,
  titleRef,
  phraseRef,
  apikeyRef,
  titleError,
  apikeyError,
  secretkeyRef,
  setTitleError,
  setApikeyError,
  secretkeyError,
  setSecretkeyError,
}) {
  const { keys } = useKeys();

  const checked = title === value;

  return (
    keys.every((key) => key.exchange !== id) && (
      <Grid item>
        <Card
          sx={{
            cursor: "pointer",
            border: "1px solid rgba(145, 158, 171, 0.16)",
          }}
          onClick={() => {
            setValue(title);
          }}
        >
          <CardContent>
            <Grid container>
              <Grid item>
                <Radio
                  size="small"
                  checked={checked}
                  value={title}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
              </Grid>
              <Grid item>
                <span
                  style={{
                    right: 0,
                    width: "64px",
                    height: "64px",
                    position: "absolute",
                  }}
                >
                  <Image
                    src="/images/tiktok.png"
                    width={48}
                    height={48}
                    style={{
                      borderRadius: "12px",
                    }}
                  />
                </span>
                <Typography component="div" variant="overline" marginTop="11px">
                  {title}
                </Typography>
                {checked && (
                  <Stack gap={2} paddingTop={2} marginTop={4} maxWidth={360}>
                    <TextField
                      label="API-ключ"
                      name="api"
                      type="text"
                      size="small"
                      variant="outlined"
                      color="warning"
                      fullWidth
                      autoFocus
                      onChange={(e) => {
                        apikeyRef.current = e.target.value;
                        setApikeyError("");
                      }}
                      error={Boolean(apikeyError)}
                      helperText={
                        apikeyError ||
                        "Ключ должен быть доступен с любого IP-адреса."
                      }
                    />
                    <TextField
                      label="Cекретный ключ"
                      name="secret"
                      type="text"
                      size="small"
                      variant="outlined"
                      color="info"
                      fullWidth
                      onChange={(e) => {
                        secretkeyRef.current = e.target.value;
                        setSecretkeyError("");
                      }}
                      error={Boolean(secretkeyError)}
                      helperText={secretkeyError}
                    />
                    <TextField
                      label="Название ключа"
                      name="title"
                      type="text"
                      size="small"
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      onChange={(e) => {
                        titleRef.current = e.target.value;
                        setTitleError("");
                      }}
                      error={Boolean(titleError)}
                      helperText={titleError}
                    />
                    {(id === 6 || id === 7) && (
                      <TextField
                        label="Кодовая фраза"
                        name="phrase"
                        type="text"
                        size="small"
                        variant="outlined"
                        color="error"
                        fullWidth
                        onChange={(e) => {
                          phraseRef.current = e.target.value;
                        }}
                      />
                    )}
                  </Stack>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    )
  );
}

function KeysContainer() {
  const { keys } = useKeys();

  const [statusSnackbar, setStatusSnackbar] = useState({});

  return (
    <Card
      sx={{
        p: 3,
      }}
    >
      <CardHeader
        title="Ваши API-ключи"
        titleTypographyProps={{
          variant: "overline",
          color: "text.secondary",
        }}
        sx={{ p: 0, mb: 2 }}
      />
      {keys.length > 0 ? (
        <Grid container spacing={2}>
          {keys.map((k) => (
            <KeyGridItem
              key={k.id}
              apikey={k}
              setStatusSnackbar={setStatusSnackbar}
            />
          ))}
        </Grid>
      ) : (
        <Typography variant="caption" color="text.secondary">
          Нет данных
        </Typography>
      )}
      <AlertSnackbar
        statusSnackbar={statusSnackbar}
        setStatusSnackbar={setStatusSnackbar}
      />
    </Card>
  );
}

function KeyGridItem({ apikey, setStatusSnackbar }) {
  const { setKeys } = useKeys();

  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [editedTitleError, setEditedTitleError] = useState("");
  const [anchorEl, setAnchorEl] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const editedTitleRef = useRef("");

  return (
    <>
      <Grid item xs={12} md={6}>
        <Paper
          sx={{
            p: 3,
            borderRadius: "8px",
            backgroundColor: "transparent",
            border: "1px solid rgba(145, 158, 171, 0.16)",
          }}
        >
          <Stack flexDirection="row" justifyContent="space-between">
            <Image
              src="/images/tiktok.png"
              width={48}
              height={48}
              style={{ borderRadius: "12px" }}
            />
            <div>
              <IconButton
                onClick={(e) => {
                  setAnchorEl(e.currentTarget);
                }}
              >
                <Iconify
                  icon="solar:menu-dots-bold-duotone"
                  color="text.secondary"
                />
              </IconButton>
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => {
                  setAnchorEl(null);
                }}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    setEditMode(true);
                    editedTitleRef.current = apikey.title;
                  }}
                >
                  <ListItemIcon>
                    <Iconify
                      color="text.secondary"
                      icon="solar:pen-bold"
                      width={20}
                    />
                  </ListItemIcon>
                  <Typography variant="body2" color="text.primary">
                    изменить
                  </Typography>
                </MenuItem>
                <Divider sx={{ mt: "0px !important", mb: "4px !important" }} />
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    setDeleteConfirmation(true);
                  }}
                  sx={{ mb: 0 }}
                >
                  <ListItemIcon>
                    <Iconify
                      icon="solar:trash-bin-trash-bold"
                      width={20}
                      color="error.main"
                    />
                  </ListItemIcon>
                  <Typography variant="button" color="error.main">
                    удалить
                  </Typography>
                </MenuItem>
              </Popover>
            </div>
          </Stack>
          <Stack>
            {editMode ? (
              <>
                <Box sx={{ mt: 1, mb: 1 }}>
                  <TextField
                    variant="standard"
                    size="small"
                    defaultValue={apikey.title}
                    onChange={(e) => {
                      editedTitleRef.current = e.target.value;
                      setEditedTitleError("");
                    }}
                    error={Boolean(editedTitleError)}
                    helperText={editedTitleError}
                  />
                  <IconButton
                    onClick={() => {
                      let editedTitleMessage = "";

                      const newTitle = editedTitleRef.current;

                      switch (true) {
                        case newTitle.length < 3:
                          editedTitleMessage = "Не менее 3 символов";
                          break;
                        case newTitle.length > 18:
                          editedTitleMessage = "Не более 18 символов";
                          break;
                        case !/^[A-Za-zА-Яа-яЁё\d\s.,!?()-]+$/.test(newTitle):
                          editedTitleMessage = "Некорректное название";
                          break;
                        default:
                          break;
                      }

                      if (editedTitleMessage) {
                        setEditedTitleError(editedTitleMessage);
                        return;
                      }

                      setEditMode(false);

                      updateTitle(apikey.id, newTitle).then((r) => {
                        if (r === 200) {
                          setKeys((prev) =>
                            prev.map((key) =>
                              key.id === apikey.id
                                ? { ...key, title: newTitle }
                                : key
                            )
                          );
                          setStatusSnackbar({
                            show: true,
                            variant: "success",
                          });
                        } else {
                          setStatusSnackbar({
                            show: true,
                            variant: "error",
                          });
                        }
                        editedTitleRef.current = "";
                      });
                    }}
                  >
                    <Iconify icon="solar:sd-card-bold-duotone" width={20} />
                  </IconButton>
                </Box>
              </>
            ) : (
              <Typography color="text.primary" gutterBottom marginTop={1}>
                {apikey.title}
              </Typography>
            )}
            <Typography variant="overline" color="text.disabled">
              {EXCHANGES[apikey.exchange]}
            </Typography>
          </Stack>
        </Paper>
      </Grid>
      <Dialog
        open={deleteConfirmation}
        onClose={() => {
          setDeleteConfirmation(false);
        }}
      >
        <Typography variant="h6" padding={3} color="text.primary">
          Подтвердите действие
        </Typography>
        <DialogContent sx={{ p: "0px 24px" }}>
          <DialogContentText>
            Вы уверены, что хотите удалить этот ключ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="inherit"
            size="medium"
            onClick={() => {
              setDeleteConfirmation(false);
            }}
          >
            Отмена
          </Button>
          <Button
            variant="contained"
            color="error"
            size="medium"
            autoFocus
            onClick={() => {
              setDeleteConfirmation(false);

              deleteKey(apikey.id).then((r) => {
                if (r === 200) {
                  setKeys((prev) => prev.filter((k) => k.id !== apikey.id));
                  setStatusSnackbar({
                    show: true,
                    variant: "success",
                    text: "Ключ успешно удалён",
                  });
                } else {
                  setStatusSnackbar({ show: true, variant: "error" });
                }
              });
            }}
          >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default function TabKeys() {
  return (
    <Grid container spacing={5} flexWrap="wrap">
      <Grid item xs={12} md={8}>
        <Stack gap={3}>
          <Card
            sx={{
              p: 3,
              height: 130,
            }}
          >
            <Typography
              component="span"
              marginBottom={4}
              variant="overline"
              color="text.secondary"
            >
              Добавить API-ключ
            </Typography>
            <AddKeyPanel />
          </Card>
          <KeysContainer />
        </Stack>
      </Grid>
    </Grid>
  );
}
