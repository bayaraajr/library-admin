"use client";
import { ThemeProvider } from "@emotion/react";
import "./globals.css";
import { Inter } from "next/font/google";
// import { useRouter } from "next/router";
import theme from "@library/theme";
import { Toaster } from "react-hot-toast";
// import NextTopLoader from "nextjs-toploader";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import NextNProgress from "nextjs-progressbar";

import "@library/utils/interceptor";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <NextNProgress />
                {/* <NProgress /> */}
                {/* <NextTopLoader color="#FF0000" height={100} /> */}
                <Toaster />
                <ThemeProvider theme={theme}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
