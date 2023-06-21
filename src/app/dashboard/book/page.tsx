"use client";
import Book from "@library/components/common/Book";
import { Grid, MenuItem, Pagination } from "@mui/material";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { AddOutlined, SearchOutlined } from "@mui/icons-material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { IBook } from "@library/types";

const BookPage: FC<any> = () => {
    const [books, setBooks] = useState<Array<IBook>>([]);
    const router = useRouter();
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(100);
    const [totalPage, setTotalPage] = useState<number>(1);

    const fetchBooks = async (values: any) => {
        try {
            const response = await axios.post("/api/book/find", values, { params: { page, size } });
            setBooks(response.data.content);
            setTotalPage(response.data.totalPage);
        } catch (error) {}
        [page, size];
    };

    useEffect(() => {
        fetchBooks({});
        //eslint-disable-next-line
    }, [page, size]);

    const form = useFormik({
        initialValues: {},
        onSubmit: fetchBooks,
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} marginTop={"20px"}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography>Номын жагсаалт</Typography>
                    <Button
                        variant="contained"
                        onClick={() => router.push("/dashboard/book/register")}
                        startIcon={<AddOutlined />}
                    >
                        Ном бүртгэх
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <form onSubmit={form.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={6} lg={3}>
                            <TextField fullWidth label="Нэр" size="small" name="name" onChange={form.handleChange} />
                        </Grid>
                        <Grid item xs={6} lg={3}>
                            <TextField
                                fullWidth
                                label="Зохиолч"
                                size="small"
                                name="author"
                                onChange={form.handleChange}
                            />
                        </Grid>
                        <Grid item xs={6} lg={3} container spacing={3}>
                            <Button size="small" startIcon={<SearchOutlined />} type="submit">
                                Хайх
                            </Button>
                        </Grid>
                        <Box display="flex" justifyContent="space-between" alignItems="center" marginLeft={"40px"}>
                            <TextField size="small" select value={size} onChange={(e: any) => setSize(e.target.value)}>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={16}>16</MenuItem>
                                <MenuItem value={40}>40</MenuItem>
                            </TextField>
                            <Pagination
                                count={totalPage}
                                page={page + 1}
                                onChange={(e: any, val: number) => setPage(val - 1)}
                                color="primary"
                            />
                        </Box>
                    </Grid>
                </form>
            </Grid>
            {books.map((book: any, index: number) => {
                return (
                    <Grid item xs={6} lg={3} key={index}>
                        <Book {...book} fetchBooks={fetchBooks} />
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default BookPage;
