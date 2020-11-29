import React from "react";
import RTL from "components/RTL"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { faIR } from '@material-ui/core/locale';
import Shabnam from "fonts/Shabnam.ttf"
import Main from "pages/Main"
import Signin from "pages/Signin"
import Signup from "pages/Signup"
import NotFound from "pages/NotFound"
import { PrivateRoute } from "components/PrivateRoute"
import AuthContextProvider from "helpers/AuthContext";


const shabnam = {
  fontFamily: 'Shabnam',
  fontStyle: 'normal',
  src: `
    local('Shabnam'),
    local('Shabnam-Regular'),
    url(${Shabnam}) format('ttf')
  `,
};

const theme = createMuiTheme({
  typography: {
    fontFamily: "Shabnam , Arial"
  },
  direction: "rtl"
}, faIR);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <RTL>
        <AuthContextProvider>
          <Router>
            <Switch>
              <Route exact path="/signin" component={Signin} />
              <Route exact path="/signup" component={Signup} />
              <PrivateRoute exact path={["/", "/home"]} component={Main} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </AuthContextProvider>
      </RTL>
    </ThemeProvider>
  )
}
