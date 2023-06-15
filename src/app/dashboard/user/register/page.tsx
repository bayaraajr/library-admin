"use client";
import { Grid, Typography } from "@mui/material";
import React, { FC, useState } from "react";

const RegisterPage: FC<any> = () => {
    const [users, setUsers] = useState();
    return <Grid>
      <Typography>
        Хэрэглэгч бүртгүүлэх
      </Typography>
    </Grid>
};

export default RegisterPage;
