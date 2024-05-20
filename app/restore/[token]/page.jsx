import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import RootSecondaryHeader from "#/components/root-secondary-header";
import { getPasswordResetToken } from "#/server/users";
import Form from "#/app/restore/[token]/form";
import { authConfig } from "#/utils/auth";

export const metadata = {
  title: "Сброс пароля | Tradify",
  description: "Tradify —	сброс пароля аккаунта",
};

export default async function Reset({ params, searchParams }) {
  const { email } = searchParams;

  if (
    email === undefined ||
    (await getPasswordResetToken(email)) === null ||
    (await getServerSession(authConfig)) !== null
  ) {
    redirect("/my/overview");
  } else {
    return (
      <>
        <RootSecondaryHeader />
        <Box
          component="main"
          sx={{
            display: "flex",
            minHeight: "100vh",
            padding: "96px 0px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Container>
            <Box
              sx={{
                maxWidth: "480px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Form token={params.token} email={email} />
            </Box>
          </Container>
        </Box>
      </>
    );
  }
}
