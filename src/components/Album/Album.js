import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import { grey } from '@material-ui/core/colors';
import data from '../../data.json'
import Moment from 'react-moment';


const styles = theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%',
  },
  cardContent: {
    flexGrow: 1,
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  avatar: {
    backgroundColor: grey[400],
  },
  description: {
    display: 'block',
    display: '-webkit-box',
    maxWidth: 300,
    height: 160,
    webkitLineClamp: 3,
    webkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
});

class Album extends React.Component {
    
  constructor(props) {
    super(props)
  }

  sendData = (id) =>{
    this.props.handleChange(data[id]);
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <main>
          <Container className={this.props.classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {data.map((card , i) => (
                <Grid item key={card.id} xs={12} sm={6} md={4}>
                  <Card className={this.props.classes.root}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" className={this.props.classes.avatar}>
                          {card.author.charAt(0)}
                        </Avatar>
                      }
                      title={card.title.substr(0, 50) + "..."}
                      subheader={
                        <Moment format="ddd [,] MMMM Do YYYY">
                          {card.created}
                        </Moment>}
                    />
                    <CardMedia
                      className={this.props.classes.media}
                      image={require(`../../images/${card.cover}`)}
                      title={card.category}
                    />
                    <CardContent>
                      <Typography variant="body2" color="textSecondary" component="p" className={this.props.classes.description}>
                        {card.description}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <Button size="small" color="primary" onClick={() => this.sendData(i)}>
                        Read More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Album);
