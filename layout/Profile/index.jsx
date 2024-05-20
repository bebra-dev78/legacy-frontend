"use client";

import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

import React from "react";

import { useUser } from "#/app/my/layout";

export default function Index() {
  const { user } = useUser();

  return (
    <>
      <Card sx={{ mb: 3, height: "290px" }}>
        <Box
          sx={{
            height: "100%",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundImage:
              "linear-gradient(rgba(0, 75, 80, 0.8), rgba(0, 75, 80, 0.8)), url(/images/cover_4.jpg)",
          }}
        >
          <Stack
            sx={{
              "@media (min-width: 900px)": {
                left: "24px",
                bottom: "24px",
                zIndex: 10,
                paddingTop: "0px",
                position: "absolute",
                flexDirection: "row",
              },
              "@media (min-width: 0px)": { pt: "48px" },
            }}
          >
            <Avatar
              sx={{
                m: "auto",
                width: "120px",
                height: "120px",
                fontSize: "3.5rem",
              }}
            >
              {user.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Stack textAlign="center" marginLeft={3} marginTop={2}>
              <Typography variant="h5">
                {user.name} {user.surname}
              </Typography>
              <Typography></Typography>
            </Stack>
          </Stack>
        </Box>
        <Card
          sx={{
            zIndex: 9,
            bottom: "0px",
            width: "100%",
            display: "flex",
            minHeight: "48px",
            overflow: "hidden",
            borderRadius: "0px",
            position: "absolute",
          }}
        />
      </Card>
      <Grid container xs={3}>
        <Grid item xs={12} md={4}>
          <Stack gap={3}>
            <Card>
              <Stack flexDirection="row">
                <Stack>dsadad</Stack>
                <Divider flexItem orientation="vertical" />
                <Stack>dsadadafsdff</Stack>
              </Stack>
            </Card>
            <Card>
              <CardHeader title="О себе" />
              <CardContent>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
                nam illo molestias. Consectetur molestiae aut, minima sunt
                eveniet a alias.
              </CardContent>
            </Card>
            <Card></Card>
          </Stack>
        </Grid>
        <Grid item xs={12} md={8}>
          <Stack gap={3}>
            <Card></Card>
            <Card></Card>
            <Card></Card>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
