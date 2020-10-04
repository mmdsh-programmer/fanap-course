import React from 'react';
import './App.css';
import './components/Album/Album'
import Album from './components/Album/Album';
import Post from './components/Post/Post';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: "Album",
      postData: {
        title: "",
        author: "",
        created: "",
        description: "",
        body: "",
        cover: ""
      }
    }
  }

  goToAlbum = () => {
    this.setState({ currentPage: "Album" });
  }

  goToPost = (recieved) => {
    this.setState({
      currentPage: "Post",
      postData: {
        title: recieved.title,
        author: recieved.author,
        created: recieved.created,
        description: recieved.description,
        body: recieved.body,
        cover: recieved.cover
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Learning React
          </Typography>
          </Toolbar>
        </AppBar>
        {this.state.currentPage === "Album" ?
          <Album handleChange={this.goToPost} /> :
          <Post
            action={this.goToAlbum}
            title={this.state.postData.title}
            author={this.state.postData.author}
            created={this.state.postData.created}
            description={this.state.postData.description}
            body={this.state.postData.body}
            cover={this.state.postData.cover}
          />}
      </React.Fragment>
    )
  }
}

export default App;
