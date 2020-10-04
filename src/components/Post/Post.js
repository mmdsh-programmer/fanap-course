import React from 'react';
import './Post.css';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
});

class Post extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container className={this.props.classes.cardGrid} maxWidth="md">
        <CssBaseline />
        <Typography variant="h5" component="h2" gutterBottom>
          {this.props.title}
        </Typography>
        <Typography variant="caption" color="textSecondary" display="block">
          {`by : ${this.props.author}`}
        </Typography>
        <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
          date: <Moment format="ddd [,] MMMM Do YYYY">{this.props.created}</Moment>
        </Typography>
        <div className={'image-holder'}>
          <img src={require(`../../images/${this.props.cover}`)} className={'post-image'} />
        </div>
        <Typography variant="h6" component="p" gutterBottom>
          {this.props.description}
        </Typography>
        <Typography variant="subtitle2" component="p" gutterBottom>
          {this.props.body}
        </Typography>
        <Button variant="contained" color="primary" onClick={this.props.action}>
          BACK TO LIST
        </Button>
      </Container>
    )
  }
}

export default withStyles(styles)(Post);
