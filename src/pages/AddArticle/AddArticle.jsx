import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { ArticleService } from "components/Article";
import AuthProvider from "../../helpers/AuthProvider"

export class AddArticle extends React.Component {
  state = {
    title : "",
    body : ""
  }

  static contextType = AuthProvider;

  handleSubmit = () => {
    ArticleService.create(this.state)
      .then(() => alert("done"))
      .catch(error => console.log(error));
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({[name] : value});
  };

  render() {
    return (
      <Grid container spacing={2} style={{ marginTop: 16 }}>
      <Grid item xs={12}>
        <TextField
          name="title"
          fullWidth
          variant="outlined"
          label="Title"
          value={this.title}
          onChange={this.handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="body"
          fullWidth
          variant="outlined"
          label="Body"
          multiline
          value={this.body}
          onChange={this.handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={this.handleSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
    )
  }
}

export default AddArticle
