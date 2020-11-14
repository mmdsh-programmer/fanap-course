import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { PostContext } from "helpers/PostProvider"
import { AuthContext } from "helpers/AuthProvider"
import Grid from '@material-ui/core/Grid';
import { useGetArticles } from "hook/GetArticles"
import { CircularProgress } from "@material-ui/core";

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
    const { values, loading } = useGetArticles()
    const { user } = React.useContext(AuthContext);
    const [selectedArticle, setSelectedArticle] = React.useState([]);

    React.useEffect(() => {
        if (props.match.params && props.match.params.key) {
            const article = values ? Object.values(values) : [];
            article.forEach((item) => {
                item.key === props.match.params.key && setSelectedArticle(item)
            })
        }
    }, [values])
    return (
        <Container className={classes.cardGrid} maxWidth="md">
            <Typography
                variant="h5"
                component="h2"
                gutterBottom
            >
                {selectedArticle.title}
            </Typography>
            <Typography
                variant="caption"
                color="textSecondary"
                display="block"
            >
                {`by :${selectedArticle.name} `}
            </Typography>
            <Typography
                variant="caption"
                color="textSecondary"
                display="block"
                gutterBottom
            >
                date: <Moment format="ddd [,] MMMM Do YYYY">{selectedArticle.datePublished}</Moment>
            </Typography>
            <div className={classes.imageHolder}>
                <img src={selectedArticle.image} className={classes.postImage} />
            </div>
            <Typography
                variant="h6"
                component="p"
                gutterBottom
                dangerouslySetInnerHTML={{ __html: selectedArticle.body }}
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
                {user && selectedArticle.uid && selectedArticle.uid === user.uid && (
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.editButton}
                        onClick={() => props.history.push(`/edit/${selectedArticle.key}`)}
                    >
                        Edit Post
                    </Button>
                )}
            </Grid>
        </Container>
    )
}
