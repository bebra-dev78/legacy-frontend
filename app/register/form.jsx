"use client";

import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { start } from "nprogress";
import bcrypt from "bcryptjs";

import ErrorIcon from "#/components/other/error-icon";
import { createUser } from "#/server/users";
import Iconify from "#/utils/iconify";

export default function Form() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/my/overview");
    if (status === "authenticated") {
      start();
      router.push("/my/overview");
    }
  }, [status]);

  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(false);
  const [show, setShow] = useState(false);

  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    function handleKeyPress(event) {
      if (event.key === "Enter" || event.key === " ") {
        handleSubmit();
      }
    }

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  async function handleSubmit() {
    let nameErrorMessage = "";
    let emailErrorMessage = "";
    let passwordErrorMessage = "";

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    switch (true) {
      case name.length < 4:
        nameErrorMessage = "Не менее 4 символов";
        break;
      case name.length > 16:
        nameErrorMessage = "Не более 10 символов";
        break;
      case /\s/.test(name):
        nameErrorMessage = "Имя не должно содержать пробелы";
        break;
      case !/^[A-Za-zА-Яа-яЁё\d\s.,!?()-]+$/.test(name):
        nameErrorMessage = "Некорректное имя";
        break;
      default:
        break;
    }

    switch (true) {
      case !email:
        emailErrorMessage = "Эл. почта не указана";
        break;
      case !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email):
        emailErrorMessage = "Некорректная эл. почта";
        break;
      default:
        break;
    }

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
      default:
        break;
    }

    if (nameErrorMessage || emailErrorMessage || passwordErrorMessage) {
      setNameError(nameErrorMessage);
      setEmailError(emailErrorMessage);
      setPasswordError(passwordErrorMessage);
      return;
    }

    setLoading(true);
    setAction(false);

    createUser(email, name, bcrypt.hashSync(password, 10)).then((r) => {
      setLoading(false);
      if (r === 200) {
        signIn("credentials", {
          email,
          password,
          redirect: false,
        });
      } else {
        setAction(true);
      }
    });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        handleSubmit();
      }}
    >
      <Stack gap={3}>
        {action && (
          <Alert severity="error" icon={<ErrorIcon />}>
            Пользователь с такой почтой уже существует.
          </Alert>
        )}
        <TextField
          label="Имя пользователя"
          name="firstName"
          type="text"
          variant="outlined"
          inputRef={nameRef}
          onChange={() => {
            setNameError("");
          }}
          error={Boolean(nameError)}
          helperText={nameError}
        />
        <TextField
          label="Эл. почта"
          name="email"
          type="email"
          variant="outlined"
          inputRef={emailRef}
          onChange={() => {
            setEmailError("");
          }}
          error={Boolean(emailError)}
          helperText={emailError}
        />
        <TextField
          label="Пароль"
          name="password"
          type={show ? "text" : "password"}
          variant="outlined"
          autoComplete="new-password"
          inputRef={passwordRef}
          onChange={() => {
            setPasswordError("");
          }}
          error={Boolean(passwordError)}
          helperText={passwordError || "В пароле должно быть 8+ символов"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ mr: 1 }}>
                <IconButton
                  aria-label={show ? "Скрыть пароль" : "Показать пароль"}
                  onClick={() => setShow((prev) => !prev)}
                  edge="end"
                >
                  <Iconify
                    icon={
                      show ? "solar:eye-bold" : "solar:eye-closed-bold-duotone"
                    }
                    color="text.disabled"
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <LoadingButton
        variant="contained"
        color="inherit"
        size="large"
        type="submit"
        fullWidth
        loading={loading}
        sx={{
          mt: "32px",
        }}
      >
        Создать аккаунт
      </LoadingButton>
    </form>
  );
}
