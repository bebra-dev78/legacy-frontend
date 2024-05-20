"use client";

import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState, useRef } from "react";
import { start } from "nprogress";
import axios from "axios";

import AlertSnackbar from "#/components/alert-snackbar";
import Iconify from "#/utils/iconify";

export default function Form({ token, email }) {
  const router = useRouter();

  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [statusSnackbar, setStatusSnackbar] = useState({});
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const repeatPasswordRef = useRef(null);
  const passwordRef = useRef(null);

  function handleSubmit() {
    let passwordErrorMessage = "";
    let repeatPasswordErrorMessage = "";

    const repeatPassword = repeatPasswordRef.current.value;
    const password = passwordRef.current.value;

    switch (true) {
      case password.length < 8:
        passwordErrorMessage = "Не менее 8 символов";
        break;
      case password.length > 24:
        passwordErrorMessage = "Не более 24 символов";
        break;
      case /\s/.test(password):
        passwordErrorMessage = "Пароль не должен содержать пробелы";
        break;
      case !/^[A-Za-zА-Яа-яЁё\d\s.,!?()-]+$/.test(password):
        passwordErrorMessage = "Некорректный пароль";
        break;
      case password.trim() !== repeatPassword.trim():
        passwordErrorMessage = "Пароли не совпадают";
        repeatPasswordErrorMessage = "Пароли не совпадают";
        break;
      default:
        break;
    }

    if (passwordErrorMessage) {
      setPasswordError(passwordErrorMessage);
      setRepeatPasswordError(repeatPasswordErrorMessage);
      return;
    }

    setLoading(true);

    try {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/reset-password`,
          {
            token,
            email,
            password,
            password_confirmation: password,
          },
          { withCredentials: true }
        )
        .then(({ data }) => {
          setLoading(false);
          start();
          if (data.status === "Your password has been reset.") {
            signIn("credentials", {
              email,
              password,
              redirect: false,
            }).finally(() => {
              router.push("/my/overview");
            });
          } else {
            setStatusSnackbar({ show: true, variant: "error" });
          }
        })
        .catch((e) => {
          setLoading(false);
          setStatusSnackbar({ show: true, variant: "error" });
        });
    } catch (error) {
      setLoading(false);
      setStatusSnackbar({ show: true, variant: "error" });
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        handleSubmit();
      }}
    >
      <Typography variant="h3" color="text.primary" gutterBottom>
        Смена пароля
      </Typography>
      <Typography color="text.secondary" paragraph>
        Введите новый пароль для аккаунта
      </Typography>
      <Stack gap={3} marginTop="40px">
        <TextField
          label="Новый пароль"
          name="password"
          type={show ? "text" : "password"}
          autoComplete="new-password"
          inputRef={passwordRef}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ paddingRight: 1 }}>
                <IconButton
                  onClick={() => setShow((prev) => !prev)}
                  color="text.disabled"
                  edge="end"
                >
                  <Iconify
                    icon={
                      show ? "solar:eye-bold" : "solar:eye-closed-bold-duotone"
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={() => {
            setPasswordError("");
          }}
          error={Boolean(passwordError)}
          helperText={passwordError}
        />
        <TextField
          label="Повторите новый пароль"
          name="password"
          type={show ? "text" : "password"}
          inputRef={repeatPasswordRef}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ paddingRight: 1 }}>
                <IconButton
                  onClick={() => setShow((prev) => !prev)}
                  color="text.disabled"
                  edge="end"
                >
                  <Iconify
                    icon={
                      show ? "solar:eye-bold" : "solar:eye-closed-bold-duotone"
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={() => {
            setRepeatPasswordError("");
          }}
          error={Boolean(repeatPasswordError)}
          helperText={repeatPasswordError}
        />
        <LoadingButton
          variant="contained"
          color="inherit"
          size="large"
          fullWidth
          type="submit"
          loading={loading}
          sx={{
            marginTop: "20px",
          }}
        >
          Сменить пароль
        </LoadingButton>
      </Stack>
      <AlertSnackbar
        statusSnackbar={statusSnackbar}
        setStatusSnackbar={setStatusSnackbar}
      />
    </form>
  );
}
