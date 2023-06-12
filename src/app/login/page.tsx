"use client";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Alert, Box, Card, Grid, Snackbar, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-hot-toast";
const LoginPage: FC<any> = () => {
    const router = useRouter();
    const onSubmit = async (values: any) => {
        try {
            const response = await axios.post("/api/user/login", values);
            toast.success("Тавтай морил " + response.data.firstname);
            localStorage.setItem("data", JSON.stringify(response.data));
            router.push("/dashboard/user");
        } catch (error: any) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    };

    const form: any = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().email("Зөв и-мэйл оруулна уу").required("Заавал и-мэйлээ оруулна уу"),
            password: yup
                .string()
                .min(8, "Хамгийн багадаа 8 тэмдэгт оруулна уу")
                .required("Заавал нууц үгээ оруулна уу"),
        }),
        onSubmit,
    });

    useEffect(() => {
        const tmp = localStorage.getItem("data");
        if (tmp) router.push("/dashboard/user");
    }, [router]);

    return (
        <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
            {/* <Card sx={{width: 450px}}> */}
            <Grid container spacing={2}>
                <Grid item xs={12} md={8} lg={6} xl={4}>
                    <form onSubmit={form.handleSubmit}>
                        <TextField
                            label="И-мэйл"
                            fullWidth
                            name="email"
                            type="email"
                            onChange={form.handleChange}
                            error={form.errors.email}
                            helperText={form.errors.email}
                            required
                            size="small"
                        />
                        <TextField
                            sx={{ marginY: 2 }}
                            fullWidth
                            label="Нууц үг"
                            name="password"
                            type="password"
                            onChange={form.handleChange}
                            error={form.errors.password}
                            helperText={form.errors.password}
                            required
                            size="small"
                        />
                        <LoadingButton fullWidth variant="contained" type="submit" loading={form.isSubmitting}>
                            Нэвтрэх
                        </LoadingButton>
                    </form>
                </Grid>
            </Grid>
            {/* </Card> */}
        </Box>
    );
};

export default LoginPage;
