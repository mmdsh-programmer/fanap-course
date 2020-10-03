import React from 'react';
import logo from './logo.svg';
import './App.css';
import './components/Album/Album'
import Album from './components/Album/Album';

class App extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }
  render() {
    return (
      <Album />
    )
  }
}

export default App;
