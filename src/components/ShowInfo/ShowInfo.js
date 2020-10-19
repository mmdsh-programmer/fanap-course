import React from 'react';
import './ShowInfo.css';
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
    margin : theme.spacing(2)
  },
  paperPadding : {
    padding : theme.spacing(2),
    width : '100%',
    display : 'flex',
    justifyContent : 'center'
  },
  large: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    marginBottom : theme.spacing(3)
  },
})

class ShowInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.classes.paper}>
        <Paper className={this.props.classes.paperPadding}>
          <Grid container direction="column" alignItems="center">
            <Avatar className={this.props.classes.large} src="">M</Avatar>
            <Typography variant="subtitle1" component="p" gutterBottom align="center">
              Mohammad Shakeri
            </Typography>
            <Typography variant="body1" component="p" gutterBottom align="center">
              example@gmail.com
            </Typography>
            <Typography variant="body1" component="p" gutterBottom align="center">
              09906855658
            </Typography>
            <Typography variant="body1" component="p" gutterBottom align="center">
              2000/12/14
            </Typography>
            <Typography variant="body1" component="p" gutterBottom align="center">
              Writer
            </Typography>
          </Grid>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(ShowInfo)


