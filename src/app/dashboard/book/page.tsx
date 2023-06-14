"use client";
import Book from "@library/components/common/Book";
import { Grid } from "@mui/material";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";

const BookPage: FC<any> = () => {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        try {
            const response = await axios.post("/api/book/find", {});
            setBooks(response.data.content);
        } catch (error) {}
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <Grid container spacing={2}>
            {books.map((book: any, index: number) => {
                return (
                    <Grid item xs={6} lg={3} key={index}>
                        <Book {...book} />
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default BookPage;
