import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from "helpers/AuthProvider"
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Moment from 'react-moment';
import { grey } from '@material-ui/core/colors';
import { CircularProgress } from "@material-ui/core";
import { useGetArticles } from "hook/GetArticles"

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    textAlign: "center"
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%',
  },
  cardHeader: {
    textAlign: "left"
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
    webkitLineClamp: 3,
    webkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  editPost: {
    marginLeft: "auto"
  }
}));

export default function Articles(props) {
  const classes = useStyles();
  const { user } = React.useContext(AuthContext);
  const { articles, loading } = useGetArticles();

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      {loading ? (
        <CircularProgress size={60} />
      ) : (
          <Grid container spacing={4}>
            {articles.map((card, i) => (
              <Grid item key={card.key} xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                  <CardHeader
                    className={classes.cardHeader}
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        {card.name.charAt(0)}
                      </Avatar>
                    }
                    nowrap={true}
                    title={card.title}
                    subheader={
                      <Moment format="ddd [,] MMMM Do YYYY">
                        {card.datePublished}
                      </Moment>}
                  />
                  <CardMedia
                    className={classes.media}
                    image={card.image !== "" ? card.image : require("images/no-image.png")}
                    title={card.title}
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      className={classes.description}
                      dangerouslySetInnerHTML={{ __html: card.body }}
                      noWrap={true}>
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Button size="small" color="primary" onClick={() => {
                      props.history.push(`/edit/${card.key}`)
                    }
                    }>
                      Read More
                    </Button>
                    {user && user.uid === card.uid && (
                      <Button size="small" color="secondary" className={classes.editPost} onClick={() => {
                        props.history.push(`/post/${card.key}`)
                      }}>
                        Edit Post
                      </Button>
                    )
                    }
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
    </Container>
  )
}
