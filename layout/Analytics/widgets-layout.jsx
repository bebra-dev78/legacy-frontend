"use client";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import DialogContentText from "@mui/material/DialogContentText";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { useState, useEffect, useCallback, useRef, useMemo, memo } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import dynamic from "next/dynamic";
import { DateTime } from "luxon";

import AddBoardMenu from "#/layout/Analytics/add-board-menu";
import { deleteBoard, updateBoard } from "#/server/boards";
import CounterBox from "#/components/counter-box";
import { useUser } from "#/app/my/layout";
import Iconify from "#/utils/iconify";

const CoinVolume = dynamic(() =>
  import("#/layout/Analytics/widgets/coin-volume")
);
const CounterOfTrades = dynamic(() =>
  import("#/layout/Analytics/widgets/counter-of-trades")
);
const CumulativeProfit = dynamic(() =>
  import("#/layout/Analytics/widgets/cumulative-profit")
);
const DistributionByCoin = dynamic(() =>
  import("#/layout/Analytics/widgets/distribution-by-coin")
);
const DistributionBySide = dynamic(() =>
  import("#/layout/Analytics/widgets/distribution-by-side")
);
const CumulativeCommission = dynamic(() =>
  import("#/layout/Analytics/widgets/cumulative-commission")
);
const ProfitByTags = dynamic(() =>
  import("#/layout/Analytics/widgets/profit-by-tags")
);
const Profit = dynamic(() => import("#/layout/Analytics/widgets/profit"));

const ResponsiveGridLayout = WidthProvider(Responsive);

const DeleteBoardButton = memo(function DeleteBoardButton({
  boards,
  setValue,
  setBoards,
  boardsDataRef,
  currentBoardRef,
  widgetsParamsRef,
}) {
  const [confirmation, setConfirmation] = useState(false);

  return (
    <>
      <Button
        variant="text"
        color="error"
        startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        disabled={Object.keys(boards).length === 0}
        onClick={() => {
          setConfirmation(true);
        }}
        sx={{ height: "36px" }}
      >
        Удалить доску
      </Button>
      <Dialog
        open={confirmation}
        onClose={() => {
          setConfirmation(false);
        }}
      >
        <Typography padding={3} variant="h6">
          Подтвердите действие
        </Typography>
        <DialogContent sx={{ p: "0px 24px" }}>
          <DialogContentText>
            Вы уверены, что хотите удалить доску «{currentBoardRef.current}»?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            variant="outlined"
            color="inherit"
            size="medium"
            onClick={() => {
              setConfirmation(false);
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
              setConfirmation(false);
              const { [currentBoardRef.current]: omit, ...newBoards } = boards;
              setBoards(newBoards);
              const did = boardsDataRef.current.find(
                (c) => c.title === currentBoardRef.current
              ).id;
              deleteBoard(did);
              boardsDataRef.current = boardsDataRef.current.filter(
                (b) => b !== did
              );
              const {
                [currentBoardRef.current]: omitWidgetParams,
                ...newWidgetParams
              } = widgetsParamsRef.current;
              widgetsParamsRef.current = newWidgetParams;
              currentBoardRef.current =
                Object.keys(boards).length === 1
                  ? ""
                  : Object.keys(newBoards)[0];
              setValue(currentBoardRef.current);
              localStorage.setItem(
                "widgetsParams",
                JSON.stringify(newWidgetParams)
              );
            }}
          >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

const AddBoardButton = memo(function AddBoardButton({
  boards,
  setValue,
  setBoards,
  boardsDataRef,
  currentBoardRef,
}) {
  const { user } = useUser();

  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      <Button
        color="inherit"
        variant="text"
        startIcon={<Iconify icon="ic:round-plus" />}
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
        // disabled={Object.keys(boards).length > 0 && !user.activated_at}
        sx={{ height: "36px" }}
      >
        Добавить доску
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={() => {
          setAnchorEl(null);
        }}
        slotProps={{
          paper: {
            style: { backgroundImage: "none" },
          },
        }}
      >
        <AddBoardMenu
          boards={boards}
          setValue={setValue}
          setBoards={setBoards}
          setAnchorEl={setAnchorEl}
          boardsDataRef={boardsDataRef}
          currentBoardRef={currentBoardRef}
        />
      </Popover>
    </>
  );
});

const TimeRangeSelect = memo(function TimeRangeSelect({
  setTimeRangeStatus,
  timeRangeStatus,
  setTimeRange,
}) {
  const [customItem, setCustomItem] = useState("Указать вручную");
  const [confirmation, setConfirmation] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const initDateRef = useRef(null);
  const endDateRef = useRef(null);

  return (
    <>
      <FormControl>
        <InputLabel>Временной диапазон</InputLabel>
        <Select
          label="Временной диапазон"
          value={timeRangeStatus}
          onChange={(e) => {
            setTimeRangeStatus(e.target.value);
            localStorage.setItem("timeRange", e.target.value);
          }}
        >
          <MenuItem value="current-day">Сегодня</MenuItem>
          <MenuItem value="current-week">Текущая неделя</MenuItem>
          <MenuItem value="current-month">Текущий месяц</MenuItem>
          <MenuItem value="last-7">Последние 7 дней</MenuItem>
          <MenuItem value="last-30">Последние 30 дней</MenuItem>
          <MenuItem
            value="custom"
            onClick={() => {
              setConfirmation(true);
            }}
          >
            {customItem}
          </MenuItem>
        </Select>
      </FormControl>
      <Dialog
        open={confirmation}
        maxWidth="xs"
        fullWidth
        onClose={() => {
          setConfirmation(false);
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          padding={3}
          color="text.primary"
        >
          Выберите диапазон дат
        </Typography>
        <DialogContent sx={{ p: "0px 24px" }}>
          <Stack gap={2} paddingTop="8px" justifyContent="center">
            <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="ru">
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Начало"
                  slots={{
                    openPickerIcon: () => (
                      <Iconify
                        icon="solar:calendar-mark-bold-duotone"
                        color="text.secondary"
                      />
                    ),
                  }}
                  slotProps={{
                    textField: { fullWidth: true, error: disabled },
                  }}
                  defaultValue={DateTime.now()}
                  inputRef={initDateRef}
                  onChange={() => {
                    setDisabled(false);
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="ru">
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Конец"
                  slots={{
                    openPickerIcon: () => (
                      <Iconify
                        icon="solar:calendar-mark-bold-duotone"
                        color="text.secondary"
                      />
                    ),
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      helperText: disabled
                        ? "Начало не может быть больше конца."
                        : "",
                      error: disabled,
                    },
                  }}
                  defaultValue={DateTime.now()}
                  inputRef={endDateRef}
                  onChange={() => {
                    setDisabled(false);
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            variant="outlined"
            color="inherit"
            size="medium"
            onClick={() => {
              setConfirmation(false);
            }}
          >
            Отмена
          </Button>
          <Button
            variant="contained"
            color="inherit"
            size="medium"
            autoFocus
            disabled={disabled}
            onClick={() => {
              const start = DateTime.fromFormat(
                initDateRef.current?.value,
                "dd.MM.yyyy"
              ).toMillis();
              const end = DateTime.fromFormat(
                endDateRef.current?.value,
                "dd.MM.yyyy"
              ).toMillis();
              if (start > end) {
                setDisabled(true);
              } else {
                setConfirmation(false);
                setTimeRange([start, end]);
                setCustomItem(
                  `${DateTime.fromMillis(start).toLocaleString({
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })} - ${DateTime.fromMillis(end).toLocaleString({
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}`
                );
              }
            }}
          >
            Применить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

const StackContainer = memo(function StackContainer({
  boards,
  setValue,
  setBoards,
  setTimeRange,
  boardsDataRef,
  timeRangeStatus,
  currentBoardRef,
  widgetsParamsRef,
  setTimeRangeStatus,
}) {
  return (
    <Stack justifyContent="space-between" flexDirection="row" marginTop={3}>
      <Stack gap={1} flexDirection="row" marginTop={1}>
        <DeleteBoardButton
          boards={boards}
          setValue={setValue}
          setBoards={setBoards}
          boardsDataRef={boardsDataRef}
          currentBoardRef={currentBoardRef}
          widgetsParamsRef={widgetsParamsRef}
        />
        <AddBoardButton
          boards={boards}
          setValue={setValue}
          setBoards={setBoards}
          boardsDataRef={boardsDataRef}
          currentBoardRef={currentBoardRef}
        />
      </Stack>
      <TimeRangeSelect
        setTimeRange={setTimeRange}
        timeRangeStatus={timeRangeStatus}
        setTimeRangeStatus={setTimeRangeStatus}
      />
    </Stack>
  );
});

function GridLayout({
  value,
  boards,
  setBoards,
  timeRange,
  boardsDataRef,
  currentBoardRef,
  timeRangeStatus,
  widgetsParamsRef,
}) {
  const { user } = useUser();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const now = Date.now();

    switch (timeRangeStatus) {
      case "current-day":
        fetch(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL
          }/time?startTime=${DateTime.now()
            .startOf("day")
            .toMillis()}&endTime=${now}`,
          {
            headers: {
              "X-ABOBA-UID": user.id,
            },
          }
        )
          .then((res) => res.json())
          .then((r) => {
            setData(r);
            setLoading(false);
          });
        break;
      case "current-week":
        fetch(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL
          }/time?startTime=${DateTime.now()
            .startOf("week")
            .toMillis()}&endTime=${now}`,
          {
            headers: {
              "X-ABOBA-UID": user.id,
            },
          }
        )
          .then((res) => res.json())
          .then((r) => {
            setData(r);
            setLoading(false);
          });
        break;
      case "current-month":
        fetch(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL
          }/time?startTime=${DateTime.now()
            .startOf("month")
            .toMillis()}&endTime=${now}`,
          {
            headers: {
              "X-ABOBA-UID": user.id,
            },
          }
        )
          .then((res) => res.json())
          .then((r) => {
            setData(r);
            setLoading(false);
          });
        break;
      case "last-7":
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/time?startTime=${
            now - 604800000
          }&endTime=${now}`,
          {
            headers: {
              "X-ABOBA-UID": user.id,
            },
          }
        )
          .then((res) => res.json())
          .then((r) => {
            setData(r);
            setLoading(false);
          });
        break;
      case "last-30":
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/time?startTime=${
            now - 2592000000
          }&endTime=${now}`,
          {
            headers: {
              "X-ABOBA-UID": user.id,
            },
          }
        )
          .then((res) => res.json())
          .then((r) => {
            setData(r);
            setLoading(false);
          });
        break;
      case "custom":
        if (timeRange.length === 0) {
          setLoading(false);
        } else {
          fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/time?startTime=${timeRange[0]}&endTime=${timeRange[1]}`,
            {
              headers: {
                "X-ABOBA-UID": user.id,
              },
            }
          )
            .then((res) => res.json())
            .then((r) => {
              setData(r);
              setLoading(false);
            });
        }
        break;
      default:
        setData([]);
        setLoading(false);
        break;
    }
  }, [timeRangeStatus, timeRange]);

  const chartTypesRef = useRef(
    JSON.parse(localStorage.getItem("chartTypes")) ?? {}
  );

  const widgets = useMemo(() => boards[value] ?? [], [boards, value]);

  const handleDeleteWidget = useCallback((ID) => {
    setBoards((prev) => {
      const { current } = currentBoardRef;
      const n = prev[current].filter((i) => i !== ID);
      const did = boardsDataRef.current.find((c) => c.title === current).id;
      updateBoard(did, n);
      delete widgetsParamsRef.current[current]?.[ID];
      localStorage.setItem(
        "widgetsParams",
        JSON.stringify(widgetsParamsRef.current)
      );
      return {
        ...prev,
        [current]: n,
      };
    });
  }, []);

  return (
    <ResponsiveGridLayout
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 16, md: 14, sm: 10, xs: 8, xxs: 6 }}
      draggableHandle=".drag-header"
      rowHeight={35}
      onResizeStop={(l, o, n) => {
        var k = n.i.split("-");
        const b = {
          ...widgetsParamsRef.current,
          [k[0]]: {
            ...widgetsParamsRef.current[k[0]],
            [k[1]]: {
              x: n.x,
              y: n.y,
              w: n.w,
              h: n.h,
            },
          },
        };
        widgetsParamsRef.current = b;
        localStorage.setItem("widgetsParams", JSON.stringify(b));
      }}
      onDragStop={(l, o, n) => {
        var k = n.i.split("-");
        const b = {
          ...widgetsParamsRef.current,
          [k[0]]: {
            ...widgetsParamsRef.current[k[0]],
            [k[1]]: {
              x: n.x,
              y: n.y,
              w: n.w,
              h: n.h,
            },
          },
        };
        widgetsParamsRef.current = b;
        localStorage.setItem("widgetsParams", JSON.stringify(b));
      }}
    >
      {widgets.map((w) => {
        var params = widgetsParamsRef.current[value]?.[w] ?? {
          x: 0,
          y: 0,
          w: 7,
          h: 12,
        };
        switch (w) {
          case 1:
            return (
              <div
                key={`${value}-1`}
                data-grid={{
                  x: params.x,
                  y: params.y,
                  w: params.w,
                  h: params.h,
                }}
              >
                <DistributionBySide
                  data={data}
                  isLoading={loading}
                  handleDeleteWidget={handleDeleteWidget}
                />
              </div>
            );
          case 2:
            return (
              <div
                key={`${value}-2`}
                data-grid={{
                  x: params.x,
                  y: params.y,
                  w: params.w,
                  h: params.h,
                }}
              >
                <CoinVolume
                  data={data}
                  isLoading={loading}
                  handleDeleteWidget={handleDeleteWidget}
                />
              </div>
            );
          case 3:
            return (
              <div
                key={`${value}-3`}
                data-grid={{
                  x: params.x,
                  y: params.y,
                  w: params.w,
                  h: params.h,
                }}
              >
                <DistributionByCoin
                  data={data}
                  isLoading={loading}
                  handleDeleteWidget={handleDeleteWidget}
                />
              </div>
            );
          case 4:
            return (
              <div
                key={`${value}-4`}
                data-grid={{
                  x: params.x,
                  y: params.y,
                  w: params.w,
                  h: params.h,
                }}
              >
                <CounterOfTrades
                  data={data}
                  isLoading={loading}
                  chartTypesRef={chartTypesRef}
                  timeRangeStatus={timeRangeStatus}
                  handleDeleteWidget={handleDeleteWidget}
                />
              </div>
            );
          case 5:
            return (
              <div
                key={`${value}-5`}
                data-grid={{
                  x: params.x,
                  y: params.y,
                  w: params.w,
                  h: params.h,
                }}
              >
                <CumulativeCommission
                  data={data}
                  isLoading={loading}
                  chartTypesRef={chartTypesRef}
                  handleDeleteWidget={handleDeleteWidget}
                />
              </div>
            );
          case 6:
            return (
              <div
                key={`${value}-6`}
                data-grid={{
                  x: params.x,
                  y: params.y,
                  w: params.w,
                  h: params.h,
                }}
              >
                <CumulativeProfit
                  data={data}
                  isLoading={loading}
                  chartTypesRef={chartTypesRef}
                  handleDeleteWidget={handleDeleteWidget}
                />
              </div>
            );
          case 7:
            return (
              <div
                key={`${value}-7`}
                data-grid={{
                  x: params.x,
                  y: params.y,
                  w: params.w,
                  h: params.h,
                }}
              >
                <Profit
                  data={data}
                  isLoading={loading}
                  chartTypesRef={chartTypesRef}
                  handleDeleteWidget={handleDeleteWidget}
                />
              </div>
            );
          case 8:
            return (
              <div
                key={`${value}-8`}
                data-grid={{
                  x: params.x,
                  y: params.y,
                  w: params.w,
                  h: params.h,
                }}
              >
                <ProfitByTags
                  data={data}
                  isLoading={loading}
                  handleDeleteWidget={handleDeleteWidget}
                />
              </div>
            );
          default:
            break;
        }
      })}
    </ResponsiveGridLayout>
  );
}

export default function WidgetsLayout({
  value,
  boards,
  setValue,
  setBoards,
  boardsDataRef,
}) {
  const [timeRange, setTimeRange] = useState([]);
  const [timeRangeStatus, setTimeRangeStatus] = useState(() => {
    const n = localStorage.getItem("timeRange") ?? "current-week";
    return n === "custom" ? "current-week" : n;
  });

  const widgetsParamsRef = useRef(
    JSON.parse(localStorage.getItem("widgetsParams")) ?? {}
  );

  const currentBoardRef = useRef(Object.keys(boards)[0]);

  return (
    <>
      <StackContainer
        boards={boards}
        setValue={setValue}
        setBoards={setBoards}
        setTimeRange={setTimeRange}
        boardsDataRef={boardsDataRef}
        timeRangeStatus={timeRangeStatus}
        currentBoardRef={currentBoardRef}
        widgetsParamsRef={widgetsParamsRef}
        setTimeRangeStatus={setTimeRangeStatus}
      />

      <Tabs
        scrollButtons
        variant="scrollable"
        allowScrollButtonsMobile
        value={value}
        onChange={(e, n) => {
          setValue(n);
          currentBoardRef.current = n;
        }}
        sx={{
          "& .MuiTab-root.Mui-selected": {
            color: "text.primary",
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "text.primary",
          },
        }}
      >
        {Object.keys(boards).map((board_title) => (
          <Tab
            key={board_title}
            label={board_title}
            value={board_title}
            iconPosition="end"
            disableTouchRipple
            icon={
              <CounterBox
                variant="info"
                count={boards[board_title]?.length ?? 0}
                sx={{ ml: 1 }}
              />
            }
          />
        ))}
      </Tabs>
      <GridLayout
        value={value}
        boards={boards}
        setBoards={setBoards}
        timeRange={timeRange}
        boardsDataRef={boardsDataRef}
        currentBoardRef={currentBoardRef}
        timeRangeStatus={timeRangeStatus}
        widgetsParamsRef={widgetsParamsRef}
      />
    </>
  );
}
