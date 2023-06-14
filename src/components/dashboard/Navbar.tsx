"use client";
import useSession from "@library/hooks/useSession";
import { Logout } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/system";

const Navbar: FC<any> = (props) => {
    const { user } = useSession();
    const router = useRouter();
    const logout = () => {
        localStorage.clear();
        router.push("/login");
    };
    return (
        <AppBar>
            <Toolbar>
                {/* <div>Hello {user.firstname}</div> */}
                <IconButton>
                    <Logout />
                </IconButton>
                <IconButton>
                    <DehazeIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
