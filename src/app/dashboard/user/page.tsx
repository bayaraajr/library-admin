"use client";
import useSession from "@library/hooks/useSession";
import { IUser } from "@library/types";
import { AddOutlined, Delete, SearchOutlined, Edit } from "@mui/icons-material";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    MenuItem,
    Pagination,
    Radio,
    RadioGroup,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { FC, useCallback, useEffect, useState } from "react";

const LoginPage: FC<any> = () => {
    const { user } = useSession();
    const router = useRouter();
    const [users, setUsers] = useState<Array<IUser>>([]);
    const [selectedUser, setSelectedUser] = useState<string | null>(null); //user iin idg end avna
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(100);
    const [totalPage, setTotalPage] = useState<number>(1);

    const fetchUsers = useCallback(
        async (values: any) => {
            try {
                const response = await axios.post("/api/user/find", values, { params: { page, size } });
                setUsers(response.data.content);
                setTotalPage(response.data.totalPage);
            } catch (error) {}
        },
        [page, size]
    );

    const form = useFormik({
        initialValues: {},
        onSubmit: fetchUsers,
    });

    useEffect(() => {
        fetchUsers({});
        //eslint-disable-next-line
    }, [page, size]);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (userId: string) => {
        setSelectedUser(userId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const deleteUser = useCallback(
        async (userId: string) => {
            console.log(userId);
            try {
                await axios.delete(`/api/user/${selectedUser}`); //temdeglegdsen idg selected duudaj avna
                fetchUsers({});
                handleClose();
            } catch (error) {
                console.log(error);
            }
        },
        [fetchUsers, selectedUser]
    );

    const [value, setValue] = React.useState("female");
    return (
        <Grid item xs={12} container spacing={2}>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography>Хэрэлэгчийн жагсаалт</Typography>
                    <Button
                        variant="contained"
                        onClick={() => router.push("/dashboard/user/register")}
                        startIcon={<AddOutlined />}
                    >
                        Хэрэглэгч бүртгэх
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <form onSubmit={form.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                label="Нэр"
                                size="small"
                                name="firstname"
                                onChange={form.handleChange}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                label="Овог"
                                size="small"
                                name="lastname"
                                onChange={form.handleChange}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                label="И-мэйл"
                                size="small"
                                name="email"
                                onChange={form.handleChange}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                label="Утасны дугаар"
                                size="small"
                                name="phone"
                                onChange={form.handleChange}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                size="small"
                                // value={form.values.gender}
                                name="gender"
                                fullWidth
                                select
                                onChange={form.handleChange}
                            >
                                <MenuItem>Бүгд</MenuItem>
                                <MenuItem value="M">Эрэгтэй</MenuItem>
                                <MenuItem value="F">Эмэгтэй</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={2}>
                            <Button size="large" startIcon={<SearchOutlined />} type="submit">
                                Хайх
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
            <Grid item xs={12}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Нэр</TableCell>
                                <TableCell>Овог</TableCell>
                                <TableCell>И-мэйл</TableCell>
                                <TableCell>Утасны дугаар</TableCell>
                                <TableCell>Хүйс</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user: IUser, index: number) => (
                                <TableRow key={index}>
                                    <TableCell>{user._id}</TableCell>
                                    <TableCell>{user.firstname}</TableCell>
                                    <TableCell>{user.lastname}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.gender === "F" ? "Эмэгтэй" : "Эрэгтэй"}</TableCell>
                                    <TableCell>
                                        <IconButton color="error" onClick={() => handleClickOpen(user._id)}>
                                            <Delete />
                                            <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle id="alert-dialog-title">{"Хэрэглэгч устгах"}</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                        Та дараах хэрэглэгчийг устгахыг зөвшөөрч байна уу?
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleClose}>Үгүй</Button>
                                                    <Button onClick={() => deleteUser(user._id)}>Тийм</Button>
                                                </DialogActions>
                                            </Dialog>
                                        </IconButton>
                                        <IconButton>
                                            <Edit onClick={() => router.push("/dashboard/user/update")} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <TextField
                                            size="small"
                                            select
                                            value={size}
                                            onChange={(e: any) => setSize(e.target.value)}
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>
                                            <MenuItem value={10}>10</MenuItem>
                                            <MenuItem value={25}>25</MenuItem>
                                            <MenuItem value={100}>100</MenuItem>
                                        </TextField>
                                        <Pagination
                                            count={totalPage}
                                            page={page + 1}
                                            onChange={(e: any, val: number) => setPage(val - 1)}
                                            color="primary"
                                        />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
};

export default LoginPage;
