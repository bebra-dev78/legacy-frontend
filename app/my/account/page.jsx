import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import TabsWrapper from "#/layout/Account/tabs-wrapper";

export const metadata = {
  title: "Аккаунт | Tradify",
  description: "💊",
};

export default function Account() {
  return (
    <Box
      sx={{
        marginLeft: "auto",
        marginRight: "auto",
        "@media (min-width: 1200px)": {
          maxWidth: "1200px",
        },
      }}
    >
      <Typography variant="h4" color="text.primary" paragraph>
        Аккаунт
      </Typography>
      <TabsWrapper />
    </Box>
  );
}
