import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { ArticleService } from "components/Article";
import { useForm, Controller } from "react-hook-form"

export default function AddArticle() {
  const { register, handleSubmit, errors: fieldsErrors, control } = useForm();
  const onSubmit = (data, e) => {
    e.preventDefault();
    ArticleService.create(data)
      .then(() => alert("Your article successfully added"))
      .catch(error => console.log(error));
  };

  return (
    <Grid container spacing={2} style={{ marginTop: 16 }}>
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
        <TextField
          inputRef={register({ required: true })}
          error={fieldsErrors.body}
          helperText={fieldsErrors.body ? "body is required" : null}
          name="body"
          fullWidth
          variant="outlined"
          label="Body"
          multiline
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}
