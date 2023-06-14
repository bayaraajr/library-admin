import { Box, Card, Typography } from "@mui/material";
import Image from "next/image";
import React, { FC } from "react";

interface BookProps {
    isbn: string;
    name: string;
    coverUrl: string;
}

const Book: FC<BookProps> = ({ isbn, name, coverUrl }) => {
    return (
        <Card elevation={4} sx={{ padding: 0, borderRadius: 2 }}>
            {
                // eslint-disable-next-line
            }<img alt={name} src={"/public/uploads/" + coverUrl} style={{ width: "100%" }} />
            <Box padding={2}>
                <Typography>{isbn}</Typography>
                <Typography>{name}</Typography>
            </Box>
        </Card>
    );
};

export default Book;
