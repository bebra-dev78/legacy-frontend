import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

import Script from "next/script";
import Image from "next/image";

import RootPrimaryHeader from "#/components/root-primary-header";
import SmoothAnimation from "#/app/(landing)/smooth-animation";
import NProgressLink from "#/components/nprogress-link";
import MainButtons from "#/app/(landing)/link-buttons";
import OverlayBox from "#/app/(landing)/overlay-box";
import AppLogo from "#/components/app-logo";
import Iconify from "#/utils/iconify";

import versatility from "#/public/svg/versatility.svg";
import complexity from "#/public/svg/complexity.svg";
import tools from "#/public/svg/tools.svg";

export const metadata = {
  title: "Tradify — современный дневник трейдера",
  description:
    "Криптовалютный дневник трейдера, предназначенный для улучшения стратегии вашей торговли",
};

export default function Landing() {
  return (
    <>
      <RootPrimaryHeader />
      <Box component="main">
        <Box
          sx={{
            height: "100vh",
          }}
        >
          <OverlayBox>
            <Container>
              <Grid container alignItems="center">
                <Grid xs={12} md={6}>
                  <Stack
                    sx={{
                      gap: "40px",
                      p: "120px 0",
                      maxWidth: "520px",
                      textAlign: "center",
                      alignItems: "center",
                      "@media (min-width: 900px)": {
                        textAlign: "left",
                        alignItems: "start",
                      },
                    }}
                  >
                    <SmoothAnimation />
                    <Stack gap="12px" flexDirection="row">
                      <MainButtons />
                    </Stack>
                    <Stack
                      sx={{
                        opacity: 0.4,
                      }}
                    >
                      <Typography variant="overline" color="text.primary">
                        Подходит для
                      </Typography>
                      <Stack flexDirection="row" color="text.primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 4010 1024"
                          width={100}
                        >
                          <path
                            fill="currentColor"
                            d="M1443.84 511.573333h-188.416V115.370667h184.32c81.237333 0 130.773333 40.576 130.773333 102.314666v1.621334c0 44.672-23.552 69.845333-51.968 85.248 45.482667 17.877333 73.898667 43.861333 73.898667 97.450666v0.853334c-0.853333 73.045333-59.306667 108.8-148.608 108.8z m38.954667-279.338666c0-25.984-20.266667-40.576-56.832-40.576h-86.058667v83.626666h80.384c38.144 0 62.506667-12.16 62.506667-42.24v-0.810666z m22.741333 159.146666c0-26.752-19.456-43.008-64.128-43.008h-101.546667V435.2h103.978667c38.144 0 61.696-13.781333 61.696-43.008v-0.853333z m181.930667 120.234667V115.328h86.869333v396.288H1687.466667z m481.536 0l-191.658667-251.733333v251.733333h-86.058667V115.328h80.384l185.941334 244.394667V115.328h86.101333v396.288h-74.709333z m466.133333 0l-36.565333-88.533333h-167.253334l-35.754666 88.533333h-89.344l169.728-399.573333h80.384l170.538666 399.573333h-91.733333zM2514.944 217.6l-52.778667 128.298667h105.557334L2514.944 217.6z m552.96 293.973333l-191.573333-251.733333v251.733333h-86.101334V115.328h80.384l185.941334 244.394667V115.328h86.101333v396.288h-74.709333z m362.24 7.253334c-116.949333 0-203.050667-90.112-203.050667-203.776v-0.853334c0-112.853333 85.290667-204.629333 207.061334-204.629333 74.752 0 119.381333 25.173333 155.946666 60.928L3534.890667 234.666667c-30.890667-27.605333-61.738667-44.629333-101.546667-44.629334-66.56 0-115.285333 55.210667-115.285333 123.434667v0.810667c0 68.181333 47.104 124.245333 115.328 124.245333 45.44 0 73.045333-17.92 103.936-46.293333l55.210666 56.021333c-40.618667 43.050667-86.101333 70.656-162.432 70.656z m232.234667-7.253334V115.328h298.837333V193.28h-211.968v80.384h186.794667v77.952h-186.794667v83.626667h215.210667v76.373333h-302.08z m-1447.893334 160.768h-159.146666v76.330667h141.269333v44.672h-141.312v114.474667h-49.493333v-280.96h208.64v45.482666z m301.226667 113.706667c0 83.626667-47.061333 125.866667-120.96 125.866667-73.088 0-119.381333-42.24-119.381333-123.434667v-161.621333h49.536v159.146666c0 52.010667 26.794667 80.426667 70.656 80.426667s70.656-26.794667 70.656-77.952v-161.621333h49.493333v159.146666z m198.997333 121.770667h-49.536v-234.666667H2575.786667v-45.482667h227.413333v45.482667h-89.344v234.666667h0.810667z m388.949334-121.770667c0 83.626667-47.104 125.866667-121.002667 125.866667-73.088 0-119.338667-42.24-119.338667-123.434667v-161.621333h49.493334v159.146666c0 52.010667 26.837333 80.426667 70.656 80.426667 43.861333 0 70.656-26.794667 70.656-77.952v-161.621333h49.536v159.146666z m265.557333 121.770667l-69.034667-97.450667h-61.696v97.450667H3188.906667v-280.96h125.013333c64.170667 0 103.978667 34.133333 103.978667 89.344 0 46.293333-27.605333 74.666667-66.56 85.248l75.52 106.368h-57.685334z m-58.453333-235.52H3239.253333v94.250666h72.277334c34.901333 0 57.6-18.688 57.6-47.104-0.768-30.848-21.888-47.104-58.453334-47.104z m392.192-0.768h-158.336v73.088h140.501333v43.861333h-140.501333v75.52h160.768v43.818667h-210.346667v-280.96h207.914667v44.672z m185.173333 73.898666c59.306667 14.592 90.112 35.712 90.112 82.816 0 52.778667-41.386667 84.48-99.84 84.48a171.477333 171.477333 0 0 1-116.949333-44.672l30.037333-34.944c26.794667 23.552 53.589333 36.565333 88.490667 36.565334 30.890667 0 49.536-13.824 49.536-35.754667 0-20.266667-11.349333-31.658667-63.317334-43.008-60.117333-14.634667-93.397333-31.701333-93.397333-84.48 0-48.725333 39.808-82.005333 95.829333-82.005333 40.576 0 73.088 12.202667 101.504 34.901333l-26.794666 37.376c-25.173333-18.688-50.346667-29.226667-76.373334-29.226667-29.184 0-45.44 14.592-45.44 33.28 0.810667 21.930667 13.013333 31.658667 66.56 44.672z m-2063.445333-0.853333h-570.026667v47.146667h570.026667v-47.104zM115.328 396.330667L0 511.573333l115.328 115.285334 116.096-115.285334-116.096-115.328z m396.288-164.864l198.101333 198.144 115.328-115.285334-197.333333-198.954666L511.616 0 396.288 115.328 198.144 313.472l115.328 115.285333 198.144-197.333333z m396.245333 164.864l-115.285333 115.328 115.285333 115.285333L1024 511.616l-116.138667-115.328z m-396.245333 396.288l-198.144-198.144-115.328 115.285333 198.144 198.144L511.573333 1024l115.285334-115.328 198.144-198.101333-115.328-116.138667-198.101334 198.144z m0-164.864l116.096-116.096-116.096-115.328-115.328 115.328 115.328 116.096z"
                          ></path>
                        </svg>
                        <svg
                          width={100}
                          clipRule="evenodd"
                          fillRule="evenodd"
                          strokeLinejoin="round"
                          strokeMiterlimit="2"
                          viewBox="0 0 560 400"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ marginBottom: "5px" }}
                        >
                          <path
                            d="m356.58476344 139.99979h18.59585742v92.51170101h-18.59585742z"
                            fill="currentColor"
                            strokeWidth="4.13793"
                          />
                          <g
                            fill="currentColor"
                            fillRule="nonzero"
                            transform="matrix(4.13793 0 0 4.13793 100 127.586)"
                          >
                            <path d="m9.634 31.998h-9.634v-22.357h9.247c4.494 0 7.112 2.449 7.112 6.28 0 2.48-1.682 4.083-2.846 4.617 1.39.627 3.168 2.04 3.168 5.024 0 4.175-2.94 6.436-7.047 6.436zm-.743-18.462h-4.397v5.149h4.397c1.907 0 2.974-1.036 2.974-2.575 0-1.538-1.067-2.574-2.974-2.574zm.291 9.074h-4.688v5.496h4.688c2.037 0 3.005-1.256 3.005-2.764 0-1.507-.97-2.732-3.005-2.732z" />
                            <path d="m30.388 22.829v9.169h-4.462v-9.169l-6.919-13.188h4.882l4.3 9.012 4.235-9.012h4.881z" />
                            <path d="m50.046 31.998h-9.634v-22.357h9.246c4.494 0 7.113 2.449 7.113 6.28 0 2.48-1.682 4.083-2.846 4.617 1.389.627 3.168 2.04 3.168 5.024 0 4.175-2.941 6.436-7.047 6.436zm-.743-18.462h-4.397v5.149h4.397c1.907 0 2.974-1.036 2.974-2.575 0-1.538-1.067-2.574-2.974-2.574zm.29 9.074h-4.687v5.496h4.687c2.038 0 3.006-1.256 3.006-2.764 0-1.507-.968-2.732-3.006-2.732z" />
                            <path d="m80.986 13.536v18.464h-4.494v-18.464h-6.013v-3.895h16.521v3.895z" />
                          </g>
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 157.42708 44.185417"
                          version="1.1"
                          width={90}
                        >
                          <g transform="translate(-62.058587,-90.445746)">
                            <g
                              fill="currentColor"
                              transform="matrix(0.39972707,0,0,0.34817986,61.931647,90.445746)"
                            >
                              <path
                                id="path839"
                                d="M 115.822,0 H 2.94268 C 2.24645,0 1.57875,0.297103 1.08644,0.825953 0.594137,1.3548 0.317566,2.07208 0.317566,2.81999 V 124.079 c 0,0.748 0.276571,1.466 0.768874,1.995 0.49231,0.528 1.16001,0.825 1.85624,0.825 H 115.822 c 0.697,0 1.364,-0.297 1.857,-0.825 0.492,-0.529 0.769,-1.247 0.769,-1.995 V 2.81999 c 0,-0.74791 -0.277,-1.46519 -0.769,-1.994037 C 117.186,0.297103 116.519,0 115.822,0 Z M 79.0709,81.7797 c 0,0.7479 -0.2766,1.4651 -0.7689,1.994 -0.4923,0.5288 -1.16,0.8259 -1.8562,0.8259 H 42.3193 c -0.6962,0 -1.3639,-0.2971 -1.8562,-0.8259 -0.4923,-0.5289 -0.7689,-1.2461 -0.7689,-1.994 V 45.1198 c 0,-0.7479 0.2766,-1.4652 0.7689,-1.994 0.4923,-0.5289 1.16,-0.826 1.8562,-0.826 h 34.1265 c 0.6962,0 1.3639,0.2971 1.8562,0.826 0.4923,0.5288 0.7689,1.2461 0.7689,1.994 z"
                                fill="currentColor"
                              />
                              <path
                                id="path841"
                                d="m 352.131,42.305 h -34.127 c -1.449,0 -2.625,1.2625 -2.625,2.82 v 36.6598 c 0,1.5574 1.176,2.82 2.625,2.82 h 34.127 c 1.45,0 2.625,-1.2626 2.625,-2.82 V 45.125 c 0,-1.5575 -1.175,-2.82 -2.625,-2.82 z"
                                fill="currentColor"
                              />
                              <path
                                id="path843"
                                d="m 312.763,0.00204468 h -34.126 c -1.45,0 -2.625,1.26255532 -2.625,2.81998532 V 39.4819 c 0,1.5574 1.175,2.82 2.625,2.82 h 34.126 c 1.45,0 2.626,-1.2626 2.626,-2.82 V 2.82203 c 0,-1.55743 -1.176,-2.81998532 -2.626,-2.81998532 z"
                                fill="currentColor"
                              />
                              <path
                                id="path845"
                                d="m 391.529,0.00204468 h -34.127 c -1.449,0 -2.625,1.26255532 -2.625,2.81998532 V 39.4819 c 0,1.5574 1.176,2.82 2.625,2.82 h 34.127 c 1.45,0 2.625,-1.2626 2.625,-2.82 V 2.82203 c 0,-1.55743 -1.175,-2.81998532 -2.625,-2.81998532 z"
                                fill="currentColor"
                              />
                              <path
                                id="path847"
                                d="m 312.763,84.6038 h -34.126 c -1.45,0 -2.625,1.2625 -2.625,2.8199 v 36.6603 c 0,1.557 1.175,2.82 2.625,2.82 h 34.126 c 1.45,0 2.626,-1.263 2.626,-2.82 V 87.4237 c 0,-1.5574 -1.176,-2.8199 -2.626,-2.8199 z"
                                fill="currentColor"
                              />
                              <path
                                id="path849"
                                d="m 391.529,84.6038 h -34.127 c -1.449,0 -2.625,1.2625 -2.625,2.8199 v 36.6603 c 0,1.557 1.176,2.82 2.625,2.82 h 34.127 c 1.45,0 2.625,-1.263 2.625,-2.82 V 87.4237 c 0,-1.5574 -1.175,-2.8199 -2.625,-2.8199 z"
                                fill="currentColor"
                              />
                              <path
                                id="path851"
                                d="m 253.651,0.00204468 h -34.126 c -1.45,0 -2.626,1.26255532 -2.626,2.81998532 V 39.4819 c 0,1.5574 1.176,2.82 2.626,2.82 h 34.126 c 1.45,0 2.625,-1.2626 2.625,-2.82 V 2.82203 c 0,-1.55743 -1.175,-2.81998532 -2.625,-2.81998532 z"
                                fill="currentColor"
                              />
                              <path
                                id="path853"
                                d="m 253.651,84.6038 h -34.126 c -1.45,0 -2.626,1.2625 -2.626,2.8199 v 36.6603 c 0,1.557 1.176,2.82 2.626,2.82 h 34.126 c 1.45,0 2.625,-1.263 2.625,-2.82 V 87.4237 c 0,-1.5574 -1.175,-2.8199 -2.625,-2.8199 z"
                                fill="currentColor"
                              />
                              <path
                                id="path855"
                                d="m 216.888,45.0881 c 0,-0.7479 -0.277,-1.4652 -0.769,-1.994 -0.492,-0.5289 -1.16,-0.826 -1.856,-0.826 H 177.511 V 2.81999 c 0,-0.74791 -0.277,-1.46519 -0.769,-1.994037 C 176.25,0.297103 175.582,0 174.886,0 H 140.76 c -0.697,0 -1.364,0.297103 -1.857,0.825953 -0.492,0.528847 -0.769,1.246127 -0.769,1.994037 V 124.016 c 0,0.748 0.277,1.465 0.769,1.994 0.493,0.529 1.16,0.826 1.857,0.826 h 34.126 c 0.696,0 1.364,-0.297 1.856,-0.826 0.492,-0.529 0.769,-1.246 0.769,-1.994 V 84.5679 h 36.752 c 0.696,0 1.364,-0.2971 1.856,-0.8259 0.492,-0.5289 0.769,-1.2462 0.769,-1.9941 z"
                                fill="currentColor"
                              />
                            </g>
                          </g>
                        </svg>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid
                  xs={0}
                  md={6}
                  sx={{ justifyContent: "flex-end", display: "flex", pb: 10 }}
                >
                  <tgs-player
                    autoplay
                    loop
                    mode="normal"
                    src="/video/genshin_gamer.tgs"
                    style={{ height: "250px", width: "250px" }}
                  />
                </Grid>
              </Grid>
            </Container>
            <Box
              sx={{
                top: 0,
                right: 0,
                width: "480px",
                height: "480px",
                borderRadius: "50%",
                position: "absolute",
                WebkitFilter: "blur(100px)",
                backgroundColor: "rgba(32, 10, 105, 0.12)",
                "@media (min-width: 900px)": {
                  top: "-80px",
                  right: "-80px",
                },
              }}
            />
            <Box
              sx={{
                left: "10%",
                right: "10%",
                height: "400px",
                bottom: "-200px",
                borderRadius: "50%",
                position: "absolute",
                filter: "blur(100px)",
                backgroundColor: "rgba(32, 10, 105, 0.12)",
              }}
            />
          </OverlayBox>
        </Box>
        <Box
          sx={{
            zIndex: 9,
            left: "0px",
            width: "50%",
            bottom: "0px",
            height: "70px",
            position: "absolute",
            backdropFilter: "blur(6px)",
            backgroundColor: "background.paper",
            clipPath: "polygon(0% 0%, 100% 100%, 0% 100%)",
            "@media (max-width: 1599px)": {
              display: "none",
            },
          }}
        />
        <Box
          sx={{
            zIndex: 9,
            right: "0px",
            width: "50%",
            opacity: 0.4,
            bottom: "0px",
            height: "80px",
            position: "absolute",
            transform: "scaleX(-1)",
            backdropFilter: "blur(6px)",
            clipPath: "polygon(0% 0%, 100% 100%, 0% 100%)",
            backgroundColor: "background.paper",
            "@media (max-width: 1599px)": {
              display: "none",
            },
          }}
        />
        <Box
          sx={{
            zIndex: 10,
            right: "0px",
            width: "50%",
            opacity: 0.45,
            bottom: "0px",
            height: "48px",
            position: "absolute",
            transform: "scaleX(-1)",
            backdropFilter: "blur(6px)",
            clipPath: "polygon(0% 0%, 100% 100%, 0% 100%)",
            backgroundColor: "background.paper",
            "@media (max-width: 1599px)": {
              display: "none",
            },
          }}
        />
        <Box
          sx={{
            zIndex: 11,
            right: "0px",
            width: "50%",
            bottom: "0px",
            height: "24px",
            position: "absolute",
            transform: "scaleX(-1)",
            backdropFilter: "blur(6px)",
            clipPath: "polygon(0% 0%, 100% 100%, 0% 100%)",
            backgroundColor: "background.paper",
            "@media (max-width: 1599px)": {
              display: "none",
            },
          }}
        />
        <Box
          sx={{
            position: "relative",
            backgroundColor: "background.paper",
          }}
        >
          <Container
            sx={{
              pb: "100px",
            }}
          >
            <Box
              sx={{
                p: "100px 0",
                textAlign: "center",
              }}
            >
              <Typography variant="overline" color="text.secondary" paragraph>
                Почему же мы?
              </Typography>
              <Typography variant="h2" color="text.primary">
                Наши главные преимущества
              </Typography>
            </Box>
            <Box
              sx={{
                mt: "100px",
                gap: "80px",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                "@media (max-width: 899px)": {
                  gap: "40px",
                  gridTemplateColumns: "repeat(1, 1fr)",
                },
              }}
            >
              <Card
                sx={{
                  p: "80px 40px",
                  textAlign: "center",
                  backgroundColor: "background.paper",
                  "@media (min-width: 900px)": {
                    boxShadow: "none",
                  },
                }}
              >
                <Box
                  sx={{
                    mb: "80px",
                    filter: "drop-shadow(2px 2px 2px rgba(0, 184, 217, 0.48))",
                  }}
                >
                  <Image src={versatility} alt="Универсальность" />
                </Box>
                <Typography variant="h5" paragraph>
                  Универсальность
                </Typography>
                <Typography color="text.secondary">
                  Мы предоставляем возможность интеграции сразу с несколькими
                  криптобиржами через API в одном аккаунте бесплатно. Без
                  альтернатив, подобных нам.
                </Typography>
              </Card>
              <Card
                variant="shadow"
                sx={{
                  p: "80px 40px",
                  textAlign: "center",
                  backgroundColor: "background.paper",
                }}
              >
                <Box
                  sx={{
                    mb: "80px",
                    filter: "drop-shadow(2px 2px 2px rgba(255, 86, 48, 0.48))",
                  }}
                >
                  <Image src={tools} alt="Простые инструменты" />
                </Box>
                <Typography variant="h5" paragraph>
                  Простые инструменты
                </Typography>
                <Typography color="text.secondary">
                  Множество виджетов, подробная аналитика, мобильная адаптация и
                  интуитивно-понятный интерфейс в нашей панели управления.
                </Typography>
              </Card>
              <Card
                sx={{
                  p: "80px 40px",
                  textAlign: "center",
                  backgroundColor: "background.paper",
                  "@media (min-width: 900px)": {
                    boxShadow: "none",
                  },
                }}
              >
                <Box
                  sx={{
                    mb: "80px",
                    filter: "drop-shadow(2px 2px 2px rgba(54, 179, 126, 0.48))",
                  }}
                >
                  <Image src={complexity} alt="Комплексность" />
                </Box>
                <Typography variant="h5" paragraph>
                  Комплексность
                </Typography>
                <Typography color="text.secondary">
                  Сервис крупно интегрирован со множеством криптовалютных бирж,
                  таких как Binance и Bybit, для комплексной работы над любыми
                  видами торговли.
                </Typography>
              </Card>
            </Box>
            <Box
              sx={{
                mt: "200px",
                p: "30px 10px",
                borderRadius: "16px",
                boxShadow: "rgba(142, 51, 255, 0.24) 0px 8px 16px 0px",
                background:
                  "linear-gradient(135deg, rgb(118, 53, 220), rgb(67, 26, 158))",
                "@media (min-width: 900px)": {
                  display: "flex",
                  alignItems: "center",
                },
              }}
            >
              <Stack alignItems="center">
                <tgs-player
                  autoplay
                  loop
                  mode="normal"
                  src="/video/rocket.tgs"
                  style={{ height: "250px", width: "250px" }}
                />
              </Stack>
              <Box
                sx={{
                  m: "0 10px",
                  "@media (min-width: 0px)": {
                    textAlign: "center",
                  },
                  "@media (min-width: 900px)": {
                    pl: "50px",
                    textAlign: "left",
                  },
                }}
              >
                <Typography variant="h2" paragraph>
                  Начните уже
                  <br />
                  сейчас
                </Typography>
                <Typography marginBottom={4}>
                  Здесь, в этом сервисе, мы собрали всё, чтобы Вам было
                  комфортно. Каждая страница веб-приложения и каждая внутренняя
                  служба проекта выполнена людьми, влюблёнными в своё дело.
                </Typography>
                <Stack
                  justifyContent="flex-start"
                  flexDirection="row"
                  gap={2}
                  sx={{
                    "@media (max-width: 899px)": {
                      justifyContent: "center",
                      flexDirection: "column",
                    },
                  }}
                >
                  <NProgressLink path="/register">
                    <Button
                      variant="contained"
                      color="inherit"
                      size="large"
                      fullWidth
                      startIcon={<Iconify icon="line-md:play-filled" />}
                      sx={{
                        borderRadius: "24px",
                        color: "rgb(22, 28, 36)",
                        backgroundColor: "rgb(255,255,255)",
                        transition:
                          "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                        "&:hover": {
                          backgroundColor: "rgb(196, 205, 213)",
                          boxShadow: "none",
                        },
                      }}
                    >
                      Начать
                    </Button>
                  </NProgressLink>
                  <NProgressLink path="/faq">
                    <Button
                      variant="outlined"
                      color="inherit"
                      size="large"
                      fullWidth
                      startIcon={<Iconify icon="line-md:question-circle" />}
                      sx={{
                        borderColor: "rgba(145, 158, 171, 0.32)",
                        color: "rgb(255,255,255)",
                        "&:hover": {
                          borderColor: "rgb(255,255,255)",
                        },
                      }}
                    >
                      Часто задаваемые вопросы
                    </Button>
                  </NProgressLink>
                </Stack>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
      <Box
        component="footer"
        sx={{
          p: "30px 0",
          textAlign: "center",
          position: "relative",
          backgroundColor: "background.paper",
        }}
      >
        <Container>
          <Box sx={{ m: "8px auto" }}>
            <AppLogo />
          </Box>
          <Typography variant="caption" color="text.primary">
            © Все права защищены
            <br />
            made by
            <Typography variant="span" color="primary.main">
              {" "}
              Tradify
            </Typography>
          </Typography>
        </Container>
      </Box>
      <Script src="https://unpkg.com/@lottiefiles/lottie-player@2.0.3/dist/tgs-player.js" />
    </>
  );
}
