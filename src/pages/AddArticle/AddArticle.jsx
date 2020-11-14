import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { ArticleService } from "components/Article";
import { useForm, Controller } from "react-hook-form"
import JoditEditor from "jodit-react";
import { storage, db } from "services/firebase"
import { toast } from "react-toastify";
import { AuthContext } from "helpers/AuthProvider"
import Button from "components/Button/Button"
import { useGetArticles } from "hook/GetArticles";

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center"
  }
}));

export default function AddArticle(props) {
  const classes = useStyles();
  const { register, handleSubmit, errors: fieldsErrors, setValue } = useForm();
  const [rte, setRte] = React.useState();
  const { user } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const [selectedArticle, setSelectedArticle] = React.useState({ key: null, prop: [] });
  const { values } = useGetArticles();
  const onEditorChange = (data) => {
    setRte(data)
  }

  React.useEffect(() => {
    const articles = values ? Object.values(values) : [];
    articles.forEach((item, i) => {
      if (item.key === props.match.params.key) {
        setSelectedArticle({ key: Object.keys(values)[i], prop: item });
        setValue("title", item.title)
      }
    })
  }, [values])

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const { title, picture } = data;
    setLoading(true);
    const key = db.ref().child(user.uid).push().key
    const img = storage.ref("/images").child(props.match.params && props.match.params.key ? selectedArticle.prop.key : key);
    await img.put(picture[0]);
    const url = await img.getDownloadURL();

    if (props.match.params && props.match.params.key) {
      const finalData = {
        title: title,
        body: rte,
        image: url,
      }
      ArticleService.update(selectedArticle.key, finalData)
        .then(() => toast.success("Article was successfully edited"))
        .catch(error => toast.error(error.message))
        .finally(() => setLoading(false));
    } else {
      const finalData = {
        title: title,
        body: rte,
        uid: user.uid,
        datePublished: Date.now(),
        key: key,
        image: url,
        name: user.displayName
      }
      ArticleService.create(finalData)
        .then(() => toast.success("Article was successfully added"))
        .catch(error => toast.error(error.message))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Grid container spacing={2} style={{ marginTop: 16 }}>
      <Grid item xs={12} className={classes.buttonContainer}>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          type="file"
          name="picture"
          ref={register({ required: props.match.params.key ? true : false })}
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
          tabIndex={1}
          value={selectedArticle.key && selectedArticle.prop.body}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          loading={loading}
          onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}
