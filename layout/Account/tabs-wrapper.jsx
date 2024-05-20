"use client";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import TabsContent from "#/layout/Account/tabs-content";
import IconBox from "#/components/other/icon-box";
import Iconify from "#/utils/iconify";

export default function TabsWrapper() {
  const [value, setValue] = useState(0);

  return (
    <>
      <Tabs
        value={value}
        onChange={(e, n) => setValue(n)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          "& .MuiTab-root.Mui-selected": {
            color: "text.primary",
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "text.primary",
          },
          maxWidth: { xs: 360, sm: 480 },
        }}
      >
        <Tab
          label="Основное"
          disableTouchRipple
          iconPosition="start"
          icon={<Iconify icon="solar:user-id-bold" sx={{ mr: "8px" }} />}
        />
        <Tab
          label="Ключи"
          disableTouchRipple
          iconPosition="start"
          icon={
            <Iconify
              icon="solar:key-minimalistic-square-bold"
              sx={{ mr: "8px" }}
            />
          }
        />
        <Tab
          label="Безопасность"
          disableTouchRipple
          iconPosition="start"
          icon={<IconBox iconUrl="/svg/security.svg" iconMarginRight="8px" />}
        />
      </Tabs>
      <Box sx={{ mb: "40px" }} />
      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <TabsContent value={value} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
