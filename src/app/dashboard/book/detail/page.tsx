"use client";

import { Card, Typography, Grid, Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import Image from "next/image";
import { ArrowLeft } from "@mui/icons-material";

interface BookProps {
    isbn: string;
    name: string;
    coverUrl: string;
    description: string;
}

const Book: FC<BookProps> = ({ isbn, name, coverUrl, description }) => {
    const router = useRouter();

    return (
        <Card style={{ height: "100%" }}>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Button variant="contained" onClick={() => router.back()} startIcon={<ArrowLeft />}>
                        Буцах
                    </Button>
                </Box>
            </Grid>
            <Typography>{isbn}</Typography>
            <Typography>{name}</Typography>
            {/* <Typography>
                {
                    // eslint-disable-next-line
                }
                <img alt={name} src={"/public/uploads/" + coverUrl} style={{ height: "100%" }} />
            </Typography> */}
        </Card>
    );
};

export default Book;
