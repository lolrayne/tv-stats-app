import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Showstats from './Showstats';
import key from './config';

let config = {
  headers: {"Content-Type":"application/json","trakt-api-version":2,"trakt-api-key":key.SECRET_KEY}
}

const url = "https://api.trakt.tv/shows/the-big-bang-theory/stats"

axios.get(url,config)
  .then(result => {
    console.log(result.data);
  })
  .catch(error => {
    console.log(error)
  })


class App extends Component {
  constructor(){
    super()
    this.state = {
      seasonData:[]
    }
  }
  render() {
    
    return (
      <div className="App">
          <h1>When TV shows started to suck</h1>
          <Showstats data={this.state.seasonData}/>
      </div>
    );
  }
}

export default App;
