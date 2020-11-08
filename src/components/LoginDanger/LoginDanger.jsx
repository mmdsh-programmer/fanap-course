import React from 'react'
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  });

export class LoginDanger extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Grid container>
                        <Grid item>
                            <Link to="/signup" variant="body2">
                                You are not signed in! please sign in first
                    </Link>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        )
    }
}

export default withStyles(styles)(LoginDanger)
