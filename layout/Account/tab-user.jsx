"use client";

import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

import { useState, useRef } from "react";
import Image from "next/image";

import { updateUser, updatePrivate, updateConvert } from "#/server/users";
import AlertSnackbar from "#/components/alert-snackbar";
import { useUser } from "#/app/my/layout";
import Iconify from "#/utils/iconify";

import en from "#/public/svg/en.svg";
import ru from "#/public/svg/ru.svg";

function AvatarItem() {
  const { user } = useUser();

  return (
    <>
      <Avatar
        sx={{
          m: "auto",
          width: "115px",
          height: "115px",
          fontSize: "3.5rem",
        }}
      >
        {user.name?.charAt(0).toUpperCase()}
      </Avatar>
      <Typography
        gap={1}
        display="flex"
        variant="body2"
        marginTop="20px"
        color="text.secondary"
        justifyContent="center"
        gutterBottom
      >
        UID: {user.private ? <Skeleton width={200} /> : user.id ?? "."}
      </Typography>
      <Typography variant="subtitle1">
        {user.name ?? "."} {user.surname}
      </Typography>
    </>
  );
}

function PrivateItem() {
  const { user, setUser } = useUser();

  const [privateMode, setPrivateMode] = useState(user.private);

  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      gap={2}
      onClick={() => {
        setPrivateMode((prev) => {
          const n = !prev;
          setUser((prev) => ({ ...prev, private: n }));
          updatePrivate(user.id, n);
          return n;
        });
      }}
      sx={{ cursor: "pointer" }}
    >
      <Switch checked={privateMode} />
      <Typography variant="body2" sx={{ userSelect: "none" }}>
        Скрыть приватные данные
      </Typography>
    </Stack>
  );
}

function ConvertItem() {
  const { user, setUser } = useUser();

  const [convertMode, setConvertMode] = useState(user.convert);

  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      gap={2}
      onClick={() => {
        setConvertMode((prev) => {
          const n = !prev;
          setUser((prev) => ({ ...prev, convert: n }));
          updateConvert(user.id, n);
          return n;
        });
      }}
      sx={{ cursor: "pointer" }}
    >
      <Switch checked={convertMode} />
      <Typography variant="body2" sx={{ userSelect: "none" }}>
        Примерная сумма в рублях
      </Typography>
    </Stack>
  );
}

function LanguageItem() {
  const [language, setLanguage] = useState("ru");

  return (
    <>
      <Button
        onClick={() => {
          setLanguage("ru");
        }}
        sx={{
          width: "100%",
          height: "82px",
          border: "1px solid transparent",
          borderColor: language === "ru" ? "rgb(0, 120, 103)" : "transparent",
        }}
      >
        <Image src={ru} width={40} style={{ borderRadius: "4px" }} />
      </Button>
      <Button
        onClick={() => {
          setLanguage("en");
        }}
        sx={{
          width: "100%",
          height: "82px",
          border: "1px solid transparent",
          borderColor: language === "en" ? "rgb(0, 120, 103)" : "transparent",
        }}
      >
        <Image src={en} width={40} style={{ borderRadius: "4px" }} />
      </Button>
    </>
  );
}

function EditItem() {
  const { user, setUser } = useUser();

  const [publicNameError, setPublicNameError] = useState("");
  const [statusSnackbar, setStatusSnackbar] = useState({});
  const [surnameError, setSurnameError] = useState("");
  const [nameError, setNameError] = useState("");
  const [loading, setLoading] = useState(false);

  const publicNameRef = useRef(user.public);
  const surnameRef = useRef(user.surname);
  const nameRef = useRef(user.name);

  function handleSubmit() {
    let nameMessage = "";
    let surnameMessage = "";
    let publicNameMessage = "";

    const publicName = publicNameRef.current.value;
    const surname = surnameRef.current.value;
    const name = nameRef.current.value;

    switch (true) {
      case name.length < 4:
        nameMessage = "Не менее 4 символов";
        break;
      case name.length > 16:
        nameMessage = "Не более 16 символов";
        break;
      case /\s/.test(name):
        nameMessage = "Имя не должно содержать пробелы";
        break;
      default:
        break;
    }

    switch (true) {
      case surname.length > 16:
        surnameMessage = "Не более 16 символов";
        break;
      case /\s/.test(surname):
        surnameMessage = "Фамилия не должна содержать пробелы";
        break;
      default:
        break;
    }

    switch (true) {
      case publicName.length > 16:
        publicNameMessage = "Не более 16 символов";
        break;
      case /\s/.test(publicName):
        publicNameMessage = "Публичное имя не должно содержать пробелы";
        break;
      case publicName.length > 0 &&
        !/^[a-zA-Z0-9\s~`!@#$%^&*()-_+=\\|{}[\]:;"'<>,.?/]+$/.test(publicName):
        publicNameMessage =
          "Публичное имя должно содержать только латинские буквы";
        break;
      default:
        break;
    }

    if (nameMessage || surnameMessage || publicNameMessage) {
      setNameError(nameMessage);
      setSurnameError(surnameMessage);
      setPublicNameError(publicNameMessage);
      return;
    }

    setLoading(true);

    updateUser(user.id, name, surname, publicName).then((r) => {
      setLoading(false);
      if (r === 200) {
        setUser((prev) => ({ ...prev, name, surname, public: publicName }));
        setStatusSnackbar({
          show: true,
          variant: "success",
        });
      } else if (r === 409) {
        setPublicNameError("Такое публичное имя уже существует");
      } else {
        setStatusSnackbar({ show: true, variant: "error" });
      }
    });
  }

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gap: "24px 16px",
          "@media (min-width: 0px)": {
            gridTemplateColumns: "repeat(1, 1fr)",
          },
          "@media (min-width: 600px)": {
            gridTemplateColumns: "repeat(2, 1fr)",
          },
        }}
      >
        <TextField
          label="Имя"
          name="firstName"
          type="text"
          variant="outlined"
          inputRef={nameRef}
          defaultValue={user.name}
          onChange={() => {
            setNameError("");
          }}
          error={Boolean(nameError)}
          helperText={nameError}
        />
        <TextField
          label="Фамилия"
          name="lastName"
          type="text"
          variant="outlined"
          inputRef={surnameRef}
          defaultValue={user.surname}
          onChange={() => {
            setSurnameError("");
          }}
          error={Boolean(surnameError)}
          helperText={surnameError}
        />
        <TextField
          label="Публичное имя"
          type="text"
          variant="outlined"
          autoComplete="off"
          inputRef={publicNameRef}
          defaultValue={user.public}
          onChange={() => {
            setPublicNameError("");
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment>https://tradify.su/u/</InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end" sx={{ paddingRight: 1 }}>
                <IconButton
                  onClick={() => {
                    navigator.clipboard
                      .writeText(
                        "https://tradify.su/u/" + publicNameRef.current.value
                      )
                      .then(() => {
                        setStatusSnackbar({
                          show: true,
                          variant: "info",
                          text: "Ссылка скопирована",
                        });
                      });
                  }}
                  edge="end"
                >
                  <Iconify
                    icon="solar:copy-bold-duotone"
                    color="text.disabled"
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={Boolean(publicNameError)}
          helperText={publicNameError}
        />
        <TextField
          label="Эл. почта"
          name="email"
          type="text"
          variant="outlined"
          disabled
          defaultValue={user.email}
        />
      </Box>
      <Typography
        display="block"
        variant="caption"
        margin="16px auto 0"
        color="text.secondary"
      >
        При необходимости сменить почту, обратитесь в службу поддержки.
      </Typography>
      <Stack gap={3} marginTop={3} alignItems="flex-end">
        <LoadingButton
          variant="contained"
          color="inherit"
          size="medium"
          onClick={handleSubmit}
          loading={loading}
        >
          Сохранить
        </LoadingButton>
      </Stack>
      <AlertSnackbar
        statusSnackbar={statusSnackbar}
        setStatusSnackbar={setStatusSnackbar}
      />
    </>
  );
}

export default function TabUser() {
  return (
    <Grid container spacing={3} flexWrap="wrap">
      <Grid item xs={12} md={4}>
        <Card>
          <Stack padding="48px 24px" textAlign="center">
            <AvatarItem />
          </Stack>
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <Card
          sx={{
            p: "24px",
          }}
        >
          <EditItem />
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card
          sx={{
            p: "24px",
            height: 180,
          }}
        >
          <Stack gap={3}>
            <Typography variant="subtitle2">Язык</Typography>
            <Stack gap={2} flexDirection="row">
              <LanguageItem />
            </Stack>
          </Stack>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card
          sx={{
            p: "24px",
            height: 180,
          }}
        >
          <Stack gap={3}>
            <Typography variant="subtitle2">Приватность</Typography>
            <PrivateItem />
            <Typography variant="caption" color="text.secondary">
              Значения баланса, прибыли и т.п. будут заменены заглушкой на всех
              страницах (кроме страницы «Сделки»)
            </Typography>
          </Stack>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card
          sx={{
            p: "24px",
            height: 180,
          }}
        >
          <Stack gap={3}>
            <Typography variant="subtitle2">Валюта</Typography>
            <ConvertItem />
            <Typography variant="caption" color="text.secondary">
              Показывает рядом с $ показаниями сконвертированную по курсу валют
              сумму в ₽
            </Typography>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}
