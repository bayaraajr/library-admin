"use client";
import IUSer from "@library/types/IUser";
import { ArrowLeft } from "@mui/icons-material";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import * as yup from "yup";

const RegisterPage: FC<any> = () => {
    const router = useRouter();
    const [users, setUsers] = useState();

    const onSubmit = async (values: IUSer) => {};

    const form = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            gender: "F",
            email: "",
            password: "",
            phone: "",
            registrationNumber: "",
        },
        validationSchema: yup.object({
            firstname: yup.string().required("Заавал оруулна уу"),
            lastname: yup.string().required("Заавал оруулна уу"),
            gender: yup.string().required("Хүйс сонгоно уу"),
            email: yup.string().email("Зөв и-мэйл оруулна уу").required("Заавал оруулна уу"),
            // @TODO: validation regex
            registrationNumber: yup.string().matches(/0-9/, "Зөв РД оруул").required("Заавал оруулна уу"),
            phone: yup
                .number()
                .min(10000000, "8 урттай байна")
                .max(99999999, "8 урттай байна")
                .required("Заавал оруулна уу"),
        }),
        onSubmit,
    });

    return (
        <Grid container spacing={2} item xs={12}>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography>Хэрэглэгч бүртгэх </Typography>
                    <Button variant="contained" onClick={() => router.back()} startIcon={<ArrowLeft />}>
                        Буцах
                    </Button>
                </Box>
            </Grid>
            <Grid container item spacing={2}>
                <Grid item xs={12} md={6} lg={3}>
                    <TextField
                        name="firstname"
                        label="Нэр"
                        onChange={form.handleChange}
                        error={Boolean(form.errors.firstname)}
                        helperText={form.errors.firstname}
                        value={form.values.firstname}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <TextField
                        name="registrationNumber"
                        label="РД"
                        onChange={form.handleChange}
                        error={Boolean(form.errors.registrationNumber)}
                        helperText={form.errors.registrationNumber}
                        value={form.values.registrationNumber}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default RegisterPage;
