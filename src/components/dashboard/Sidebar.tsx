"use client";
import useSession from "@library/hooks/useSession";
import { MenuItem, MenuList, ListItemIcon, ListItemText, Box } from "@mui/material";
import React, { FC, useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BookIcon from "@mui/icons-material/Book";
import CategoryIcon from "@mui/icons-material/Category";

const Sidebar: FC<any> = (props) => {
    const { user } = useSession();
    return (
        <MenuList sx={{ marginTop: "60px", width: "150px" }}>
            <Box>
                <MenuItem>
                    <ListItemIcon>
                        <AdminPanelSettingsIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Админ</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>User</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <BookIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Book</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <CategoryIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Category</ListItemText>
                </MenuItem>
            </Box>
        </MenuList>
    );
};

export default Sidebar;
