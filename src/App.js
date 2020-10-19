import React from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Form from './components/Form/Form';
import ShowInfo from './components/ShowInfo/ShowInfo';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: undefined,
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      birthDate: "",
      title: "",
      isEmailVisible: true,
      gender: "",
      address: "",
      imageAddress : ""
    }
  }

  render() {
    return (
      <React.Fragment>
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Learning React
          </Typography>
          </Toolbar>
        </AppBar>
        <Grid container component="main">
          <CssBaseline />
          <Grid item xs={12} sm={4} md={3}>
            <ShowInfo />
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <Form />
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

export default App

