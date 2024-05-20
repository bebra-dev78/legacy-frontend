"use client";

import { useMediaQuery } from "@mui/material";
import Button from "@mui/material/Button";

import { useSession } from "next-auth/react";

import NProgressLink from "#/components/nprogress-link";
import Iconify from "#/utils/iconify";

export default function MainButtons() {
  const isBigScreen = useMediaQuery("(min-width:600px)");
  const { status } = useSession();

  return status === "authenticated" ? (
    <NProgressLink path="/my/overview">
      <Button
        variant="outlined"
        color="inherit"
        size="large"
        startIcon={<Iconify icon="line-md:login" />}
      >
        Панель управления
      </Button>
    </NProgressLink>
  ) : (
    <>
      <NProgressLink path="/register">
        <Button
          variant="contained"
          color="inherit"
          size="large"
          startIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeDasharray="18"
                strokeDashoffset="18"
                strokeLinecap="round"
                strokeWidth="2"
              >
                <path d="M12 5V19">
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.4s"
                    dur="0.3s"
                    values="18;0"
                  />
                </path>
                <path d="M5 12H19">
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="0.3s"
                    values="18;0"
                  />
                </path>
              </g>
            </svg>
          }
        >
          Создать аккаунт
        </Button>
      </NProgressLink>
      {isBigScreen && (
        <NProgressLink path="/login">
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            startIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                >
                  <path
                    strokeDasharray="32"
                    strokeDashoffset="32"
                    d="M13 4L20 4C20.5523 4 21 4.44772 21 5V19C21 19.5523 20.5523 20 20 20H13"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      dur="0.4s"
                      values="32;0"
                    />
                  </path>
                  <path
                    strokeDasharray="12"
                    strokeDashoffset="12"
                    d="M3 12h11.5"
                    opacity="0"
                  >
                    <set attributeName="opacity" begin="0.5s" to="1" />
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      begin="0.5s"
                      dur="0.2s"
                      values="12;0"
                    />
                  </path>
                  <path
                    strokeDasharray="6"
                    strokeDashoffset="6"
                    d="M14.5 12l-3.5 -3.5M14.5 12l-3.5 3.5"
                    opacity="0"
                  >
                    <set attributeName="opacity" begin="0.7s" to="1" />
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      begin="0.7s"
                      dur="0.2s"
                      values="6;0"
                    />
                  </path>
                </g>
              </svg>
            }
          >
            Войти
          </Button>
        </NProgressLink>
      )}
    </>
  );
}
