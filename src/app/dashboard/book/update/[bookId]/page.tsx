"use client";
import { ArrowLeft, SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { IBook } from "@library/types";
const UpdatePage: FC<any> = ({ params }: { params: { bookId: string } }) => {
    const router = useRouter();
    const bookId = params.bookId;
    const [category, setCategory] = useState<Array<IBook>>([]);
    const onFileChange = (event: any) => {
        setFile(event.target.files[0]);
    };
    const onSubmit = async (values: IBook) => {
        try {
            await axios.put("/api/book/" + bookId, values);
            toast.success("Book updated");
            router.push("/dashboard/book");
        } catch (error: any) {
            toast.error(error.response ? error.response.data.message : "Алдаа гарлаа");
        }
    };
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
    const fetchData = async () => {
        try {
            const response = await axios.get("/api/book/find/" + bookId);
            if (response.status === 200) {
                const data = response.data ? response.data._doc : {};
                form.setValues({
                    isbn: data.isbn,
                    name: data.name,
                    author: data.author,
                    publicationDate: data.publicationDate,
                    category: data.category,
                    description: data.description,
                    coverUrl: data.coverUrl,
                    filePath: data.filePath,
                });
            }
        } catch (error: any) {
            toast.error(error.response ? error.response.data.message : "Алдаа гарлаа");
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Grid container spacing={2} item xs={12}>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography>Номын мэдээлэл шинэчлэх</Typography>
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
                            label="нэр"
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
                    <Grid item xs={12} md={6} lg={4}>
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
                        <div>
                            <form action="/api/file/upload" method="post" encType="multipart/form-data">
                                <input type="file" name="coverUrl" onChange={onFileChange} />
                            </form>{" "}
                        </div>
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
export default UpdatePage;
function setFile(arg0: any) {
    throw new Error("Function not implemented.");
}
