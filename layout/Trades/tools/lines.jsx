"use client";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Popper from "@mui/material/Popper";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Grow from "@mui/material/Grow";

import { useState } from "react";

import Iconify from "#/utils/iconify";

export default function Lines({ addOverlay }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={() => setAnchorEl(null)}
    >
      <div>
        <ListItemButton
          onClick={(e) => {
            setAnchorEl(open ? null : e.currentTarget);
          }}
          sx={{
            p: "4px",
            m: "0px 4px",
            borderRadius: "6px",
            "&:hover": {
              backgroundColor: "rgba(145, 158, 171, 0.08)",
            },
          }}
        >
          <Iconify icon="material-symbols:line-start" />
        </ListItemButton>
        <Popper
          open={open}
          anchorEl={anchorEl}
          transition
          placement="right-start"
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [0, 8],
              },
            },
          ]}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              timeout={200}
              style={{
                transformOrigin: "top left",
              }}
            >
              <Paper>
                <Stack>
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      addOverlay.current("straightLine");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g transform="rotate(130 12 12) translate(0 24) scale(1 -1)">
                        <path
                          fill="currentColor"
                          d="M2 11h7.17c.41-1.17 1.52-2 2.83-2s2.42.83 2.83 2H22v2h-7.17A2.99 2.99 0 0 1 12 15a2.99 2.99 0 0 1-2.83-2H2z"
                        />
                      </g>
                    </svg>
                    <Typography sx={{ ml: 2 }}>Прямая линия</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      console.log(addOverlay.current("horizontalStraightLine"));
                    }}
                  >
                    <Iconify icon="mdi:ray-vertex" />
                    <Typography sx={{ ml: 2 }}>
                      Горизонтальная прямая линия
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      addOverlay.current("verticalStraightLine");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g transform="rotate(90 12 12) translate(0 24) scale(1 -1)">
                        <path
                          fill="currentColor"
                          d="M2 11h7.17c.41-1.17 1.52-2 2.83-2s2.42.83 2.83 2H22v2h-7.17A2.99 2.99 0 0 1 12 15a2.99 2.99 0 0 1-2.83-2H2z"
                        />
                      </g>
                    </svg>
                    <Typography sx={{ ml: 2 }}>
                      Вертикальная прямая линия
                    </Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      addOverlay.current("rayLine");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g transform="rotate(130 12 12) translate(0 24) scale(1 -1)">
                        <path
                          fill="currentColor"
                          d="m1 12l4 4v-3h12.17c.41 1.17 1.52 2 2.83 2a3 3 0 0 0 3-3a3 3 0 0 0-3-3c-1.31 0-2.42.83-2.83 2H5V8z"
                        />
                      </g>
                    </svg>
                    <Typography sx={{ ml: 2 }}>Лучевая линия</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      addOverlay.current("horizontalRayLine");
                    }}
                  >
                    <Iconify icon="mdi:ray-end-arrow" />
                    <Typography sx={{ ml: 2 }}>
                      Горизонтальная лучевая линия
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      addOverlay.current("verticalRayLine");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g transform="rotate(90 12 12) translate(0 24) scale(1 -1)">
                        <path
                          fill="currentColor"
                          d="m1 12l4 4v-3h12.17c.41 1.17 1.52 2 2.83 2a3 3 0 0 0 3-3a3 3 0 0 0-3-3c-1.31 0-2.42.83-2.83 2H5V8z"
                        />
                      </g>
                    </svg>
                    <Typography sx={{ ml: 2 }}>
                      Вертикальная лучевая линия
                    </Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      addOverlay.current("segment");
                    }}
                  >
                    <Iconify icon="tabler:line" />
                    <Typography sx={{ ml: 2 }}>Cегмент</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      addOverlay.current("horizontalSegment");
                    }}
                  >
                    <Iconify icon="mdi:ray-start-end" />
                    <Typography sx={{ ml: 2 }}>
                      Горизонтальный сегмент
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      addOverlay.current("verticalSegment");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g transform="rotate(90 12 12) translate(0 24) scale(1 -1)">
                        <path
                          fill="currentColor"
                          d="M4 9c1.31 0 2.42.83 2.83 2h10.34c.41-1.17 1.52-2 2.83-2a3 3 0 0 1 3 3a3 3 0 0 1-3 3a2.99 2.99 0 0 1-2.83-2H6.83A2.99 2.99 0 0 1 4 15a3 3 0 0 1-3-3a3 3 0 0 1 3-3"
                        />
                      </g>
                    </svg>
                    <Typography sx={{ ml: 2 }}>Вертикальный сегмент</Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      addOverlay.current("priceLine");
                    }}
                  >
                    <Iconify icon="material-symbols:line-start" />
                    <Typography sx={{ ml: 2 }}>Линия цены</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      addOverlay.current("priceChannelLine");
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path
                        fill="currentColor"
                        d="M3.3367688759765626,12.63173C3.5320318759765623,12.82699,3.8486138759765627,12.82699,4.043876875976562,12.63173L11.822052875976562,4.853553C12.017312875976563,4.658291,12.017312875976563,4.341708,11.822052875976562,4.146446C11.626792875976562,3.9511843,11.310202875976563,3.9511843,11.114942875976563,4.146446L3.3367688759765626,11.92462C3.1415071759765625,12.11988,3.1415071759765625,12.43647,3.3367688759765626,12.63173ZM5.001492875976562,17.0351C4.806232875976562,16.8399,4.806232875976562,16.5233,5.001492875976562,16.328L7.304532875976562,14.025C7.210822875976563,13.82916,7.158352875976563,13.60984,7.158352875976563,13.37827C7.158352875976563,12.54984,7.829922875976562,11.87827,8.658352875976561,11.87827C8.889922875976563,11.87827,9.109232875976563,11.93075,9.305052875976562,12.02446L11.304532875976562,10.02498C11.210822875976563,9.82916,11.158352875976561,9.60984,11.158352875976561,9.37827C11.158352875976561,8.54984,11.829922875976562,7.8782700000000006,12.658352875976563,7.8782700000000006C12.889922875976563,7.8782700000000006,13.109232875976563,7.93075,13.305022875976562,8.024460000000001L15.608122875976562,5.72142C15.803322875976562,5.5261499999999995,16.119922875976563,5.5261499999999995,16.315222875976563,5.72142C16.510422875976563,5.9166799999999995,16.510422875976563,6.23326,16.315222875976563,6.42852L14.012122875976562,8.73156C14.105822875976562,8.92738,14.158322875976562,9.1467,14.158322875976562,9.37827C14.158322875976562,10.2067,13.486822875976562,10.87827,12.658352875976563,10.87827C12.426772875976562,10.87827,12.207452875976562,10.82579,12.011642875976563,10.73209L10.012162875976562,12.73156C10.105872875976562,12.92738,10.158352875976561,13.1467,10.158352875976561,13.37827C10.158352875976561,14.2067,9.486772875976563,14.8783,8.658352875976561,14.8783C8.426772875976562,14.8783,8.207452875976562,14.8258,8.011642875976563,14.7321L5.708602875976562,17.0351C5.513342875976562,17.2304,5.196752875976562,17.2304,5.001492875976562,17.0351ZM10.415712875976563,18.328C10.220452875976562,18.5233,9.903862875976563,18.5233,9.708602875976563,18.328C9.513342875976562,18.1328,9.513342875976562,17.816200000000002,9.708602875976563,17.6209L12.304532875976562,15.025C12.210822875976563,14.8292,12.158352875976563,14.6098,12.158352875976563,14.3783C12.158352875976563,13.54984,12.829922875976562,12.87827,13.658322875976562,12.87827C13.889922875976563,12.87827,14.109222875976563,12.93075,14.305022875976562,13.02446L17.486822875976564,9.84274C17.682022875976564,9.64747,17.99862287597656,9.64747,18.19392287597656,9.84274C18.38912287597656,10.038,18.38912287597656,10.35458,18.19392287597656,10.54984L15.012122875976562,13.73156C15.105822875976562,13.92738,15.158322875976562,14.1467,15.158322875976562,14.3783C15.158322875976562,15.2067,14.486822875976562,15.8783,13.658322875976562,15.8783C13.426822875976562,15.8783,13.207422875976562,15.8258,13.011642875976563,15.7321L10.415712875976563,18.328Z"
                        stroke-opacity="0"
                        stroke="none"
                      ></path>
                    </svg>
                    <Typography sx={{ ml: 2 }}>
                      Линия ценового канала
                    </Typography>
                  </MenuItem>
                </Stack>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </ClickAwayListener>
  );
}
