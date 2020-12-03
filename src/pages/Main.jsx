import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from "helpers/AuthContext"
import TopBar from "components/TopBar"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import UserTable from "components/UserTable"
import CategoryTable from "components/CategoryTable"
import momentJalaali from 'moment-jalaali';
import { Calendar } from 'react-datepicker2';
import Entries from 'components/Entries'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
        overflowX: 'auto',
    },
    margin: {
        marginTop: theme.spacing(1)
    }
}));

export default function Main() {
    const classes = useStyles();
    const { user, setUser } = React.useContext(AuthContext);
    const [time, setTime] = React.useState(momentJalaali())

    return (
        <TopBar displayName={user.name} logOut={setUser} >
            <Grid container spacing={2} alignItems="stretch">
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <UserTable />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Paper className={classes.paper}>
                        <CategoryTable />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Calendar
                        value={time}
                        isGregorian={false}
                        onChange={value => { setTime(value) }}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} className={classes.margin}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Entries />
                    </Paper>
                </Grid>
            </Grid>
        </TopBar>
    )
}
