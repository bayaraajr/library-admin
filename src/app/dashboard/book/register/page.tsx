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
    const [category, setCategory] = useState([]);

    const onSubmit = async (values: IBook) => {
        try {
            await axios.post("/api/book", values);
            toast.success("YES SIR");
            router.push("/dashboard/book");
        } catch (error: any) {
            toast.error(error.response ? error.response.data.message : "Алдаа гарлаа");
        }
    };

    const fetchCategory = async () => {
        try {
            const response = await axios.get("/api/catergory/find");
            setCategory(response.data.content);
        } catch (error) {}
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    const form = useFormik({
        initialValues: {
            isbn: "",
            name: "",
            author: "",
            publicationDate: new Date(),
            category: "",
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
                            error={Boolean(form.errors.name)}
                            helperText={form.errors.name}
                            value={form.values.name}
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
                        <TextField fullWidth select name="category" onChange={form.handleChange}>
                            {category.map((c: any, i) => (
                                <MenuItem key={i} value={c._id}>
                                    {c.name}
                                </MenuItem>
                            ))}
                        </TextField>
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
                    <Grid item xs={12} md={6} lg={3} boxSizing={"30px"}>
                        <input type="file" name="file" />
                    </Grid>
                    <Grid item align="right" xs={12}>
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
