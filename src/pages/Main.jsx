import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from "helpers/AuthContext"
import TopBar from "components/TopBar"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import UserTable from "components/UserTable"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
    },
}));

export default function Main() {
    const classes = useStyles();
    const { user, setUser } = React.useContext(AuthContext);

    return (
        <TopBar displayName={user.name} logOut={setUser} >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <UserTable />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Paper className={classes.paper}>xs</Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Paper className={classes.paper}>xs</Paper>
                </Grid>
            </Grid>
        </TopBar>
    )
}
