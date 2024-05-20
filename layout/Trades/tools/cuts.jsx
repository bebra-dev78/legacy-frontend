"use client";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Popper from "@mui/material/Popper";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Grow from "@mui/material/Grow";

import { useState } from "react";

import Iconify from "#/utils/iconify";

export default function Cuts({ addOverlay }) {
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
          onClick={(event) => {
            setAnchorEl(open ? null : event.currentTarget);
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
          <Iconify icon="ph:line-segments-fill" />
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
                      addOverlay.current("sampleThreeWaves");
                    }}
                  >
                    <Iconify icon="ph:line-segments-bold" />
                    <Typography sx={{ ml: 2 }}>3 волны</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      addOverlay.current("sampleFiveWaves");
                    }}
                  >
                    <Iconify icon="ph:line-segments-bold" />
                    <Typography sx={{ ml: 2 }}>5 волн</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      addOverlay.current("sampleEightWaves");
                    }}
                  >
                    <Iconify icon="ph:line-segments-bold" />
                    <Typography sx={{ ml: 2 }}>8 волн</Typography>
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
