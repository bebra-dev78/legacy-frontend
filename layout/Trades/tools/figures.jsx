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

export default function Figures({ addOverlay }) {
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
          <Iconify icon="line-md:circle" />
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
                      addOverlay.current("sampleCircle");
                    }}
                  >
                    <Iconify icon="line-md:circle" />
                    <Typography sx={{ ml: 2 }}>Круг</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      addOverlay.current("sampleRect");
                    }}
                  >
                    <Iconify icon="line-md:square" />
                    <Typography sx={{ ml: 2 }}>Прямоугольник</Typography>
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
