import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import { auth, signout } from "services";
import { withStyles } from '@material-ui/core';
import { AuthContext } from "helpers/AuthProvider"

const styles = theme => ({
  toolbar: {
    flexWrap: "wrap"
  },
  title: { flexGrow: 1 },
  link: {
    margin: theme.spacing(1, 1.5)
  }
});

export class TopBar extends React.Component {

  static contextType = AuthContext

  componentDidMount = () => {
    const { changeStatus } = this.context;
    auth.onAuthStateChanged(u => {
      if (!!u) {
        changeStatus(true , u);
      } else {
       changeStatus(false);
      }
      
    });
  }

  render() {
    const { classes } = this.props;
    const { isSignedIn } = this.context;
    return (
      <AppBar position="relative" color="default">
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Learning React
        </Typography>
          <nav>
            <Link
              component={RouterLink}
              to="/"
              className={classes.link}
              variant="button"
            >
              Home
          </Link>
            <Link
              component={RouterLink}
              to="/new"
              className={classes.link}
              variant="button"
            >
              New
          </Link>
            {!!isSignedIn && (
              <Link
                component={RouterLink}
                to="/profile"
                className={classes.link}
                variant="button"
              >
                Profile
              </Link>
            )}
          </nav>
          {!!isSignedIn ? (
            <Button variant="outlined" onClick={signout}>
              Sign Out
            </Button>
          ) : (
              <Button variant="outlined" component={RouterLink} to="/signin">
                Sign In
              </Button>
            )}
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(TopBar)
