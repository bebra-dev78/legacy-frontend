"use client";

import ListItemText from "@mui/material/ListItemText";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

import { useEffect, useState } from "react";
import SimpleBar from "simplebar-react";

import { useMode } from "#/components/global/theme-registry";
import { updateBoard } from "#/server/boards";
import Iconify from "#/utils/iconify";

const widgets_cards = [
  {
    id: 1,
    icon_url: "solar:pie-chart-2-bold-duotone",
    title: "Распределение по LONG/SHORT",
    type: "Круговой",
  },
  {
    id: 2,
    icon_url: "solar:chart-square-bold-duotone",
    title: "Объём по монете",
    type: "Столбчатый",
  },
  {
    id: 3,
    icon_url: "solar:pie-chart-2-bold-duotone",
    title: "Распределение по монетам",
    type: "Круговой",
  },
  {
    id: 4,
    icon_url: "solar:diagram-up-bold-duotone",
    title: "Счетчик сделок",
    type: "Линейный",
  },
  {
    id: 5,
    icon_url: "solar:diagram-up-bold-duotone",
    title: "Кумулятивная комиссия",
    type: "Линейный",
  },
  {
    id: 6,
    icon_url: "solar:diagram-up-bold-duotone",
    title: "Кумулятивная прибыль",
    type: "Линейный",
  },
  {
    id: 7,
    icon_url: "solar:chart-square-bold-duotone",
    title: "Прибыль",
    type: "Столбчатый",
  },
  {
    id: 8,
    icon_url: "solar:chart-square-bold-duotone",
    title: "Прибыль по причинам входа",
    type: "Столбчатый",
  },
];

export default function WidgetsDialog({
  value,
  boards,
  setBoards,
  boardsDataRef,
}) {
  const { mode } = useMode();

  const [open, setOpen] = useState(false);

  var current = boards[value] ?? [];

  useEffect(() => {
    if (current.length >= 8) {
      setOpen(false);
    }
  }, [boards]);

  return (
    <>
      <Stack
        justifyContent="space-between"
        flexDirection="row"
        paddingBottom={3}
      >
        <Typography variant="h4" color="text.primary">
          Аналитика
        </Typography>
        <Button
          color="inherit"
          variant={open ? "contained" : "text"}
          startIcon={<Iconify icon="solar:widget-add-bold" />}
          disabled={Object.keys(boards).length === 0 || current.length >= 8}
          onClick={() => {
            setOpen((prev) => !prev);
          }}
          sx={{ maxHeight: "40px", p: "6px 10px" }}
        >
          Добавить виджеты ({current.length}/8)
        </Button>
      </Stack>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <SimpleBar>
          <Stack flexDirection="row" gap={3} paddingBottom={3}>
            {widgets_cards.map(
              (widget_card) =>
                !current.some((w) => w === widget_card.id) && (
                  <Paper
                    key={widget_card.id}
                    component="div"
                    onClick={() => {
                      setBoards((prev) => ({
                        ...prev,
                        [value]: [...current, widget_card.id],
                      }));
                      updateBoard(
                        boardsDataRef.current.find((c) => c.title === value).id,
                        [...current, widget_card.id]
                      );
                    }}
                    sx={{
                      height: "160px",
                      cursor: "pointer",
                      minWidth: "222px",
                      borderRadius: "10px",
                      position: "relative",
                      border: "1px solid rgba(145, 158, 171, 0.16)",
                      ":hover": {
                        borderColor: "transparent",
                        boxShadow: "rgba(0, 0, 0, 0.16) 0px 20px 40px -4px",
                        backgroundColor:
                          mode === "dark"
                            ? "rgb(33, 43, 54)"
                            : "rgb(255, 255, 255)",
                      },
                    }}
                  >
                    <CardContent>
                      <Iconify
                        icon={widget_card.icon_url}
                        color="rgb(32, 101, 209)"
                      />
                      <ListItemText
                        primary={widget_card.title}
                        primaryTypographyProps={{
                          variant: "body2",
                        }}
                        secondary={widget_card.type}
                        secondaryTypographyProps={{
                          variant: "caption",
                          sx: {
                            position: "absolute",
                            bottom: "20px",
                            left: "20px",
                          },
                        }}
                      />
                    </CardContent>
                  </Paper>
                )
            )}
          </Stack>
        </SimpleBar>
      </Collapse>
    </>
  );
}
