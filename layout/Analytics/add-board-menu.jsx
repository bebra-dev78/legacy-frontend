"use client";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { useState } from "react";

import { createBoard } from "#/server/boards";
import { useUser } from "#/app/my/layout";

export default function AddBoardMenu({
  boards,
  setValue,
  setBoards,
  setAnchorEl,
  boardsDataRef,
  currentBoardRef,
}) {
  const { user } = useUser();

  const [titleError, setTitleError] = useState("");
  const [title, setTitle] = useState("");

  function handleSubmit() {
    let titleErrorMessage = "";

    switch (true) {
      case !/[a-zA-Zа-яА-Я]/.test(title):
        titleErrorMessage = "Название не указано";
        break;
      case title.length > 26:
        titleErrorMessage = "Слишком длинное название";
        break;
      case Object.keys(boards).some((t) => t === title):
        titleErrorMessage = "Доска с таким названием уже существует";
        break;
      default:
        break;
    }

    if (titleErrorMessage) {
      setTitleError(titleErrorMessage);
      return;
    }

    setAnchorEl(null);

    createBoard(user.id, title).then((b) => {
      setBoards((prev) => ({ ...prev, [b.title]: b.widgets }));
      boardsDataRef.current = [...boardsDataRef.current, b];
      currentBoardRef.current = b.title;
      setValue(b.title);
    });
  }

  return (
    <Stack margin={2}>
      <TextField
        label="Название"
        autoFocus
        autoComplete="off"
        variant="outlined"
        color="info"
        onChange={(e) => {
          setTitleError("");
          setTitle(e.target.value);
        }}
        error={Boolean(titleError)}
        helperText={titleError}
      />
      <Stack marginTop={2} flexDirection="row" justifyContent="space-between">
        <Button
          variant="outlined"
          color="inherit"
          size="medium"
          onClick={() => {
            setAnchorEl(null);
            setTitleError("");
            setTitle("");
          }}
        >
          Отмена
        </Button>
        <Button
          variant="contained"
          color="inherit"
          size="medium"
          onClick={handleSubmit}
        >
          Добавить
        </Button>
      </Stack>
    </Stack>
  );
}
