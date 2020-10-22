import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Form from './components/Form/Form';
import ShowInfo from './components/ShowInfo/ShowInfo';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

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
    }
  }

  updateAppState = (data) => {
    this.setState({
      avatar: data.avatar,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      birthDate: data.birthDate,
      title: data.title,
      isEmailVisible: data.isEmailVisible,
      gender: data.gender,
      address: data.address,
    })
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
              <ErrorBoundary>
                <ShowInfo recievedData={this.state} />
              </ErrorBoundary>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <ErrorBoundary>
                <Form updateAppState={this.updateAppState} />
              </ErrorBoundary>
            </Grid>
          </Grid>
      </React.Fragment>
    )
  }
}

export default App

