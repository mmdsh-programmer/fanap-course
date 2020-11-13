import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { ArticleService } from "components/Article";
import { useForm, Controller } from "react-hook-form"
import JoditEditor from "jodit-react";
import { storage, db } from "services/firebase"
import { toast } from "react-toastify";
import { AuthContext } from "helpers/AuthProvider"
import { PostContext } from "helpers/PostProvider"

const useStyles = makeStyles((theme) => ({
    input: {
        display: 'none',
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "center"
    }
}));

export default function ShowPost(props) {
    const classes = useStyles();
    const { register, handleSubmit, errors: fieldsErrors, control } = useForm();
    const { post } = React.useContext(PostContext)
    const { user } = React.useContext(AuthContext);
    const [rte, setRte] = React.useState()

    const onEditorChange = (data) => {
        setRte(data)
    }

    const onSubmit = (data, e) => {
        e.preventDefault();
        const { title, picture } = data;
        console.log(picture, title, rte);
    }

    React.useEffect(() => {
        post.name == "" && props.history.push("/");
    }, [])

    return (
        <Grid container spacing={2} style={{ marginTop: 16 }}>
            <Grid item xs={12} className={classes.buttonContainer}>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                    name="picture"
                    ref={register({ required: true })}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                        Upload Picture
                    </Button>
                </label>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    inputRef={register({ required: true })}
                    error={fieldsErrors.title}
                    helperText={fieldsErrors.title ? "title is required" : null}
                    name="title"
                    fullWidth
                    variant="outlined"
                    label="Title"
                />
            </Grid>
            <Grid item xs={12}>
                <JoditEditor
                    name="body"
                    onChange={onEditorChange}
                    inputRef={register}
                    tabIndex={1} // tabIndex of textarea
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                    Edit
                </Button>
            </Grid>
        </Grid>
    )
}
