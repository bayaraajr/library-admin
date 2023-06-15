"use client";
import React, { FC } from "react";
import { Grid } from "@mui/material";

import { Navbar, Sidebar } from "@library/components/dashboard";
import { SessionProvider } from "@library/context/SessionContext";

const DashboardLayout: FC<any> = ({ children, ...props }) => {
    return (
        <SessionProvider>
            <Navbar />
            <Grid container sx={{ marginTop: 10 }}>
                <Grid item xs={0} lg={2}>
                    <Sidebar />
                </Grid>
                <Grid container spacing={2} item xs={0} lg={10}>
                    {children}
                </Grid>
            </Grid>
        </SessionProvider>
    );
};

export default DashboardLayout;
