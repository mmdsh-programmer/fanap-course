import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Signin from "pages/Signin";
import Signup from "pages/Signup";
import Main from "./Main";
import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider from "../helpers/AuthProvider";

export default function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <AuthContextProvider>
        <Router>
          <Switch>
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route component={Main} />
          </Switch>
        </Router>
      </AuthContextProvider>
      <ToastContainer />
    </React.Fragment>
  )
}
