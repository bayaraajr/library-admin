"use client";
import { ThemeProvider } from "@emotion/react";
import "./globals.css";
import { Inter } from "next/font/google";
// import { useRouter } from "next/router";
import theme from "@library/theme";
import { Toaster } from "react-hot-toast";
import "@library/utils/interceptor";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    // const router = useRouter();
    // useEffect(() => {
    //     const handleRouteStart = () => NProgress.start();
    //     const handleRouteDone = () => NProgress.done();

    //     router.events.on("routeChangeStart", handleRouteStart);
    //     router.events.on("routeChangeComplete", handleRouteDone);
    //     router.events.on("routeChangeError", handleRouteDone);

    //     return () => {
    //         // Make sure to remove the event handler on unmount!
    //         router.events.off("routeChangeStart", handleRouteStart);
    //         router.events.off("routeChangeComplete", handleRouteDone);
    //         router.events.off("routeChangeError", handleRouteDone);
    //     };
    // }, []);
    return (
        <html lang="en">
            <body className={inter.className}>
                {/* <NProgress /> */}
                <Toaster />
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </body>
        </html>
    );
}
