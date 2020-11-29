import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Zoom from '@material-ui/core/Zoom';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from "react-hook-form"

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(3)
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Signin() {
    const classes = useStyles();
    const { register, handleSubmit, errors: fieldsErrors } = useForm();

    const onSubmit = (data, e) => {
        e.preventDefault();
        const { username, password } = data;
        console.log(data);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Zoom in={true}>
                <Paper className={classes.paper} elevation={5}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                        <TextField
                            inputRef={register({ required: true })}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="username"
                            label="نام کاربری"
                            name="username"
                            autoComplete="current-username"
                            autoFocus
                            helperText={fieldsErrors.username ? "نام کاربری را وارد کنید" : null}
                            error={fieldsErrors.username}
                        />
                        <TextField
                            inputRef={register({ required: true })}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="password"
                            label="گذرواژه"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            helperText={fieldsErrors.password ? "گذرواژه را وارد کنید" : null}
                            error={fieldsErrors.password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            ورود
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to="/signup" variant="body2">
                                    {"ثبت نام"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Zoom>
        </Container>
    );
}
