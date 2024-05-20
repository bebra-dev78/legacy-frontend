import Typography from "@mui/material/Typography";

import Index from "#/layout/Journal/index";

export const metadata = {
  title: "Журнал | Tradify",
  description: "💊",
};

export default function Journal() {
  return (
    <>
      <Typography variant="h4" color="text.primary" paragraph>
        Журнал
      </Typography>
      <Index />
    </>
  );
}
