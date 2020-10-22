import React from 'react';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(2)
  },
  paperPadding: {
    padding: theme.spacing(2),
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  large: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    marginBottom: theme.spacing(3)
  },
  wrapText: {
    overflowWrap: 'anywhere'
  }
})

class ShowInfo extends React.Component {
  render() {
    const { recievedData, classes } = this.props;
    return (
      <div className={classes.paper}>
        <Paper className={classes.paperPadding}>
          <Grid container direction="column" alignItems="center">
            <Avatar className={classes.large} src={recievedData.avatar}>M</Avatar>
            <Typography
              variant="subtitle1"
              component="p"
              gutterBottom
              align="center"
              className={classes.wrapText}
            >
              {`${recievedData.firstName} ${recievedData.lastName}`}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              gutterBottom
              align="center"
              className={classes.wrapText}
            >
              {recievedData.isEmailVisible ? (recievedData.email) : ""}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              gutterBottom
              align="center"
              className={classes.wrapText}
            >
              {recievedData.phone}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              gutterBottom
              align="center"
            >
              {recievedData.birthDate}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              gutterBottom
              align="center"
            >
              {recievedData.title}
            </Typography>
          </Grid>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(ShowInfo)


