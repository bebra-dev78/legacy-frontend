"use client";

import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import { useState, useRef } from "react";
import bcrypt from "bcryptjs";

import AlertSnackbar from "#/components/alert-snackbar";
import { updatePassword } from "#/server/users";
import { useUser } from "#/app/my/layout";
import Iconify from "#/utils/iconify";

function Form() {
  const { user, setUser } = useUser();

  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [statusSnackbar, setStatusSnackbar] = useState({});
  const [loading, setLoading] = useState(false);

  const userPasswordRef = useRef(user.password);
  const repeatPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const oldPasswordRef = useRef(null);

  function handleSubmit() {
    let oldPasswordMessage = "";
    let newPasswordMessage = "";
    let repeatPasswordMessage = "";

    const repeatPassword = repeatPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const oldPassword = oldPasswordRef.current.value;

    switch (false) {
      case bcrypt.compareSync(oldPassword, userPasswordRef.current):
        oldPasswordMessage = "Неверный пароль";
        break;
      default:
        break;
    }

    switch (true) {
      case newPassword.length < 8:
        newPasswordMessage = "Не менее 8 символов";
        break;
      case newPassword.length > 24:
        newPasswordMessage = "Не более 24 символов";
        break;
      case /\s/.test(newPassword):
        newPasswordMessage = "Пароль не должен содержать пробелы";
        break;
      case !/^[A-Za-zА-Яа-яЁё\d\s.,!?()-]+$/.test(newPassword):
        newPasswordMessage = "Некорректный пароль";
        break;
      case repeatPassword.trim() !== newPassword.trim():
        repeatPasswordMessage = "Пароли не совпадают";
        newPasswordMessage = "Пароли не совпадают";
        break;
      case oldPassword.trim() === newPassword.trim():
        oldPasswordMessage = "Пароли должны отличаться";
        newPasswordMessage = "Пароли должны отличаться";
        break;
      default:
        break;
    }

    if (oldPasswordMessage || newPasswordMessage) {
      setOldPasswordError(oldPasswordMessage);
      setNewPasswordError(newPasswordMessage);
      setRepeatPasswordError(repeatPasswordMessage);
      return;
    }

    setLoading(true);

    const hash = bcrypt.hashSync(newPassword, 10);

    updatePassword(user.id, hash).then((r) => {
      setLoading(false);

      if (r === 200) {
        setStatusSnackbar({ show: true, variant: "success" });
        setUser((prev) => ({ ...prev, password: hash }));
        setOldPasswordError("");
        setNewPasswordError("");
        setRepeatPasswordError("");

        userPasswordRef.current = hash;

        repeatPasswordRef.current.value = "";
        newPasswordRef.current.value = "";
        oldPasswordRef.current.value = newPassword;

        setShowOldPassword(false);
        setShowNewPassword(false);
      } else {
        setStatusSnackbar({ show: true, variant: "error" });
      }
    });
  }

  return (
    <>
      <TextField
        label="Старый пароль"
        name="password"
        type={showOldPassword ? "text" : "password"}
        fullWidth
        inputRef={oldPasswordRef}
        onChange={() => {
          setOldPasswordError("");
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ paddingRight: 1 }}>
              <IconButton
                onClick={() => setShowOldPassword((prev) => !prev)}
                edge="end"
              >
                <Iconify
                  icon={
                    showOldPassword
                      ? "solar:eye-bold"
                      : "solar:eye-closed-bold-duotone"
                  }
                  color="text.disabled"
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
        error={Boolean(oldPasswordError)}
        helperText={oldPasswordError}
      />
      <TextField
        label="Новый пароль"
        name="password"
        type={showNewPassword ? "text" : "password"}
        fullWidth
        autoComplete="new-password"
        inputRef={newPasswordRef}
        onChange={() => {
          setNewPasswordError("");
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ paddingRight: 1 }}>
              <IconButton
                onClick={() => setShowNewPassword((prev) => !prev)}
                edge="end"
              >
                <Iconify
                  icon={
                    showNewPassword
                      ? "solar:eye-bold"
                      : "solar:eye-closed-bold-duotone"
                  }
                  color="text.disabled"
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
        error={Boolean(newPasswordError)}
        helperText={newPasswordError}
      />
      <TextField
        label="Повторите новый пароль"
        type={showNewPassword ? "text" : "password"}
        fullWidth
        autoComplete="off"
        inputRef={repeatPasswordRef}
        onChange={() => {
          setRepeatPasswordError("");
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ paddingRight: 1 }}>
              <IconButton
                onClick={() => setShowNewPassword((prev) => !prev)}
                edge="end"
              >
                <Iconify
                  icon={
                    showNewPassword
                      ? "solar:eye-bold"
                      : "solar:eye-closed-bold-duotone"
                  }
                  color="text.disabled"
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
        error={Boolean(repeatPasswordError)}
        helperText={repeatPasswordError}
      />
      <LoadingButton
        variant="contained"
        color="inherit"
        size="medium"
        loading={loading}
        onClick={handleSubmit}
      >
        Сохранить
      </LoadingButton>
      <AlertSnackbar
        statusSnackbar={statusSnackbar}
        setStatusSnackbar={setStatusSnackbar}
      />
    </>
  );
}

export default function TabSecurity() {
  return (
    <Grid container spacing={3} flexWrap="wrap">
      <Grid item xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" paragraph>
            Изменить пароль
          </Typography>
          <Stack gap={3} alignItems="flex-end">
            <Form />
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}
