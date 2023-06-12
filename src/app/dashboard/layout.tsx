import { Navbar, Sidebar } from "@library/components/dashboard";
import { SessionProvider } from "@library/context/SessionContext";
import React, { FC } from "react";

const DashboardLayout: FC<any> = ({ children, ...props }) => {
    return (
        <SessionProvider>
            <Navbar />
            <Sidebar />
            <div>{children}</div>
        </SessionProvider>
    );
};

export default DashboardLayout;
