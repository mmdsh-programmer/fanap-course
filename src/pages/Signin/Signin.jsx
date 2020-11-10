import React from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "components/Button";
import { signin } from "services";
import { useForm, Controller } from "react-hook-form"


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignIn(props) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const { register, handleSubmit, errors: fieldsErrors, control } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = data;
    signin(email, password)
      .catch(error => {
        toast.error(error.message) ; 
        props.history.push("/signin");
      })
      .then(props.history.replace("/"))
      .finally(() => setLoading(false));
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="email"
            as={
              <TextField
                inputRef={register}
                error={fieldsErrors.email}
                helperText={fieldsErrors.email ? "Email is not valid" : null}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
            }
            control={control}
            defaultValue=""
            rules={{
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'invalid email address'
              }
            }}
          />
          <TextField
            inputRef={register({required : true})}
            error={fieldsErrors.password}
            helperText={fieldsErrors.password ? "Password is not valid" : null}
            variant="outlined"
            margin="normal"
            name="password"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            loading={loading}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
