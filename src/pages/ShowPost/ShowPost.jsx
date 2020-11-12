import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { PostContext } from "helpers/PostProvider"
import { AuthContext } from "helpers/AuthProvider"
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    imageHolder: {
        width: "100%",
        height: "400px",
    },
    postImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    editButton: {
        marginLeft: "auto"
    }
}));

export default function ShowPost(props) {
    const classes = useStyles();
    const { post } = React.useContext(PostContext)
    const { user } = React.useContext(AuthContext);
    React.useEffect(() => {
        post.name == "" && props.history.push("/");
    }, [])

    return (
        <Container className={classes.cardGrid} maxWidth="md">
            <Typography
                variant="h5"
                component="h2"
                gutterBottom
            >
                {post.title}
            </Typography>
            <Typography
                variant="caption"
                color="textSecondary"
                display="block"
            >
                {`by :${post.name} `}
            </Typography>
            <Typography
                variant="caption"
                color="textSecondary"
                display="block"
                gutterBottom
            >
                date: <Moment format="ddd [,] MMMM Do YYYY">{post.datePublished}</Moment>
            </Typography>
            <div className={classes.imageHolder}>
                <img src={post.image} className={classes.postImage} />
            </div>
            <Typography
                variant="h6"
                component="p"
                gutterBottom
                dangerouslySetInnerHTML={{ __html: post.body }}
            >
            </Typography>
            <Grid container>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => props.history.push("/")}
                >
                    BACK TO LIST
                </Button>
                {user && post.uid && post.uid === user.uid &&  (
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.editButton}
                        onClick={() => props.history.push("/edit")}
                    >
                        Edit Post
                    </Button>
                )}
            </Grid>
        </Container>
    )
}
