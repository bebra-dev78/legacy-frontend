import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

import { Inter } from "next/font/google";

import NavigationEvents from "#/components/global/navigation-events";
import ThemeRegistry from "#/components/global/theme-registry";
import AuthProvider from "#/components/global/auth-provider";

import "./globals.css";

export const metadata = {
  manifest: "/manifest.json",
};

export const viewport = {
  colorScheme: "dark",
  themeColor: "#161C24",
};

const inter = Inter({ subsets: ["cyrillic"] });

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={inter.className} data-theme="dark">
        <AppRouterCacheProvider>
          <AuthProvider>
            <ThemeRegistry>{children}</ThemeRegistry>
          </AuthProvider>
        </AppRouterCacheProvider>
        <NavigationEvents />
      </body>
    </html>
  );
}
