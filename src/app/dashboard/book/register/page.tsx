"use client";
import { ArrowLeft, DonutLarge, SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as yup from "yup";
import IBook from "@library/types/IBook";

const RegisterPage: FC<any> = () => {
    const router = useRouter();
    const [books, setBooks] = useState();
    const [file, setFile] = useState<File>();
    const [category, setCategory] = useState<Array<IBook>>([]);

    const onFileChange = (event: any) => {
        setFile(event.target.files[0]);
    };
    const fetchCategory = async () => {
        try {
            const response = await axios.post("/api/category/find/", {});
            setCategory(response.data.content);
            console.log(response.data.content);
        } catch (error: any) {
            toast.error(error.response ? error.response.data.message : "Алдаа гарлаа");
        }
    };
    useEffect(() => {
        fetchCategory();
        //eslint-disable-next-line
    }, []);

    const onSubmit = async (values: IBook) => {
        const formData = new FormData();
        if (file !== undefined) {
            formData.append("files", file);
            try {
                const response = await axios.post("/api/file/upload", formData);
                await axios.post("/api/book", {
                    ...values,
                    coverUrl: response.data.files[0].filename,
                    filePath: response.data.files[0].filename,
                });
                toast.success("YES SIR");
                router.push("/dashboard/book");
            } catch (error: any) {
                toast.error(error.response ? error.response.data.message : "Алдаа гарлаа");
            }
        }
    };

    const form = useFormik({
        initialValues: {
            isbn: "",
            name: "",
            author: "",
            publicationDate: new Date(),
            category: "hello",
            description: "",
            coverUrl: "",
            filePath: "",
        },
        validationSchema: yup.object({
            isbn: yup.string().required("Заавал оруулна уу"),
            name: yup.string().required("Заавал оруулна уу"),
            author: yup.string().required("Заавал оруулна уу"),
            description: yup.string().required("Заавал оруулна уу"),
        }),
        onSubmit,
    });

    return (
        <Grid container spacing={2} item xs={12}>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography>Hoм бүртгэх </Typography>
                    <Button variant="contained" onClick={() => router.back()} startIcon={<ArrowLeft />}>
                        Буцах
                    </Button>
                </Box>
            </Grid>
            <form onSubmit={form.handleSubmit} style={{ marginTop: "16px" }}>
                <Grid container item spacing={2}>
                    <Grid item xs={12} md={6} lg={3}>
                        <TextField
                            fullWidth
                            name="isbn"
                            label="isbn"
                            onChange={form.handleChange}
                            error={Boolean(form.errors.isbn)}
                            helperText={form.errors.isbn}
                            value={form.values.isbn}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <TextField
                            fullWidth
                            name="name"
                            label="Нэр"
                            onChange={form.handleChange}
                            error={Boolean(form.errors.name)}
                            helperText={form.errors.name}
                            value={form.values.name}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <TextField
                            fullWidth
                            name="author"
                            label="Зохиолч"
                            onChange={form.handleChange}
                            error={Boolean(form.errors.author)}
                            helperText={form.errors.author}
                            value={form.values.author}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={2}>
                        <DatePicker
                            label="Хэвлэгдсэн огноо"
                            value={form.values.publicationDate}
                            onChange={(newValue) => form.setFieldValue("publicationDate", newValue)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={2}>
                        {category.length > 0 ? (
                            <TextField fullWidth select label="category" name="category" onChange={form.handleChange}>
                                {category.map((c: IBook, index: number) => (
                                    <MenuItem key={index} value={c.name}>
                                        {c.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        ) : null}
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <TextField
                            fullWidth
                            name="description"
                            label="Тайлбар"
                            onChange={form.handleChange}
                            error={Boolean(form.errors.description)}
                            helperText={form.errors.description}
                            value={form.values.description}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <form action="/api/file/upload" method="post" encType="multipart/form-data">
                            <input type="file" name="file" onChange={onFileChange} />
                        </form>{" "}
                    </Grid>
                    <Grid container item display="flex" justifyContent="flex-end" xs={12}>
                        <LoadingButton
                            loading={form.isSubmitting}
                            variant="contained"
                            type="submit"
                            startIcon={<SaveOutlined />}
                        >
                            Хадгалах
                        </LoadingButton>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    );
};

export default RegisterPage;
