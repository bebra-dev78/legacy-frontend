"use client";

import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NProgress from "nprogress";
import Script from "next/script";
import axios from "axios";

import ErrorIcon from "#/components/other/error-icon";

export default function Form() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/my/overview");
    if (status === "authenticated") {
      NProgress.start();
      router.push("/my/overview");
    }
  }, [status]);

  const [showError, setShowError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(false);

  const emailRef = useRef("");

  function handleSubmit() {
    let emailErrorMessage = "";

    const email = emailRef.current;

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

    if (emailErrorMessage) {
      setEmailError(emailErrorMessage);
      return;
    }

    setLoading(true);
    setShowError(false);

    try {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/forgot-password`,
          {
            email,
          },
          {
            withCredentials: true,
          }
        )
        .then(({ data }) => {
          setLoading(false);
          if (data.status === "We have emailed your password reset link.") {
            setAction(true);
          } else {
            setShowError(true);
          }
        })
        .catch((e) => {
          setLoading(false);
          setShowError(true);
        });
    } catch (error) {
      setLoading(false);
      setShowError(true);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        handleSubmit();
      }}
    >
      <Stack gap={3}>
        {action ? (
          <>
            <tgs-player
              autoplay
              loop
              mode="normal"
              src="/video/duck_send_message.tgs"
              style={{
                height: "250px",
                width: "250px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <Typography variant="h3" color="text.primary" paragraph>
              Запрос успешно отправлен!
            </Typography>
            <Typography color="text.secondary" paragraph>
              Мы отправили письмо с подтверждением на <br />
              <a href="https://mail.google.com/" target="_blank">
                <Typography
                  component="strong"
                  color="warning.main"
                  sx={{
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {emailRef.current}
                </Typography>
              </a>
              <br />
              Пожалуйста, проверьте свою электронную почту.
            </Typography>
          </>
        ) : (
          <>
            <div>
              <tgs-player
                autoplay
                loop
                mode="normal"
                src="/video/duck_secret.tgs"
                style={{
                  height: "250px",
                  width: "250px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            </div>
            <Typography variant="h3" color="text.primary">
              Забыли свой пароль?
            </Typography>
            <Typography color="text.secondary" marginBottom="40px">
              Пожалуйста, введите адрес электронной почты, связанный с вашим
              аккаунтом, и мы отправим вам ссылку для сброса пароля.
            </Typography>
            {showError && (
              <Alert severity="error" icon={<ErrorIcon />}>
                Произошла ошибка. Либо аккаунта с данной почтой не существует
                или он не активирован, либо недавно уже был создан запрос на
                восстановление аккаунта.
              </Alert>
            )}
            <TextField
              label="Эл. почта"
              name="email"
              type="email"
              variant="outlined"
              inputRef={emailRef}
              onChange={(e) => {
                emailRef.current = e.target.value;
                setEmailError("");
              }}
              error={Boolean(emailError)}
              helperText={emailError}
            />
            <LoadingButton
              variant="contained"
              color="inherit"
              size="large"
              fullWidth
              type="submit"
              loading={loading}
            >
              Сбросить пароль
            </LoadingButton>
          </>
        )}
      </Stack>
      <Script src="https://unpkg.com/@lottiefiles/lottie-player@2.0.3/dist/tgs-player.js" />
    </form>
  );
}
