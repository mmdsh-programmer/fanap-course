import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { toast } from "react-toastify";
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
import { db } from "components/Article/article.service"
import { storage } from "services/firebase"
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
}));

export default function Articles() {
  const classes = useStyles();
  const [articles, setArticles] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState(true)
  const storageRef = storage.ref();
  React.useEffect(() => {
    db.on("value", function (snapshot) {
      let dataArray = [];
      let imageUrl = "";
      snapshot.forEach(userSnapshot => {
        let data = userSnapshot.val();
        let imageRef = storageRef.child(`images/${data.key}`)
        imageRef.getDownloadURL().then((url) => {
          imageUrl = url;
        }).catch(error => console.log(error.message))
          .finally(() => {
            dataArray.push(
              {
                title: data.title,
                body: data.body,
                uid: data.uid,
                key: data.key,
                datePublished: data.datePublished,
                dateEdited: data.dateEdited,
                image: imageUrl,
                name: data.name
              }
            );
            imageUrl = "";
          })
      })
      setArticles(dataArray)
      setLoading(false);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

  }, []);
  return (
    <Container className={classes.cardGrid} maxWidth="md">
      {loading ? (
        <CircularProgress size={60} />
      ) : (
          <Grid container spacing={4}>
            {articles.map((card, i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        {card.name.charAt(0)}
                      </Avatar>
                    }
                    title={card.title.substr(0, 50) + "..."}
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
                      nowrap>
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Button size="small" color="primary">
                      Read More
                </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
    </Container>
  )
}
