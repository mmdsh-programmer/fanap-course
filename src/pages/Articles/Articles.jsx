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
import { PostContext } from "helpers/PostProvider"

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
  const { setPost } = React.useContext(PostContext);
  const [articles, setArticles] = React.useState([]);
  const [serverData, setServerData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const storageRef = storage.ref();

  const showPost = (key, name, image, title, body, date, uid) => {
    setPost({
      key: key,
      name: name,
      image: image,
      title: title,
      body: body,
      datePublished: date,
      uid: uid
    })
    props.history.push("/post")
  }

  React.useEffect(() => {
    console.log("user", user)
    setLoading(true);
    db.once("value", function (snapshot) {
      let dataArray = [];
      let imageUrl = "";
      setServerData(snapshot.val())
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
            setArticles(dataArray);
            imageUrl = "";
          });
      })
      setLoading(false);
    }, function (errorObject) {
      toast.error("Could not read data!")
    });
  }, []);



  const data = articles;
  return (
    <Container className={classes.cardGrid} maxWidth="md">
      {loading ? (
        <CircularProgress size={60} />
      ) : (
          <Grid container spacing={4}>
            {data.map((card, i) => (
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
                      showPost(card.key, card.name, card.image, card.title, card.body, card.datePublished, card.uid)
                    }
                    }>
                      Read More
                    </Button>
                    {user && user.uid === card.uid && (
                      <Button size="small" color="secondary" className={classes.editPost}>
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
