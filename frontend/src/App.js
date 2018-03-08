import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import Showstats from './Showstats';
import ShowDetails from './ShowDetails';

import key from './config';

let config = {
  headers: {"Content-Type":"application/json","trakt-api-version":2,"trakt-api-key":key.SECRET_KEY}
}

class App extends Component {
  constructor(){
    super()
    this.state = {
      seasonData:{},
      seasonStats:[], 
      exists: false
    }
    this.fetchShow=this.fetchShow.bind(this)
  }
  fetchShow(event){
    event.preventDefault()
    let show= this.refs.show.value
    let url="http://www.omdbapi.com/?apikey="+key.SECRET_KEY_2+"&s="+show;
      axios.get(url)
      .then(result => {
            console.log(result.data)
            if(result.data.Response==='True')
            {
              this.setState({
                exists:true
              })
              let id=result.data.Search[0].imdbID
              url="http://www.omdbapi.com/?apikey=f6960a9&i="+id
              return axios.get(url)
            }
            else{
              this.setState({
                exists:false
              })
            }
      })
      .then(result=>{
            this.setState({
              seasonData: result.data
            })

            let totalSeasons=Number(result.data.totalSeasons)
            console.log("Total seasons:",totalSeasons)
            if(totalSeasons>7){
              totalSeasons=7
            }

            let showName= result.data.Title.toLowerCase().split(' ').join('-')
            console.log(showName)

            let urlArray=[];
            for(let i=1;i<=totalSeasons;i++){
              url = axios.get("https://api.trakt.tv/shows/"+showName+"/seasons/"+i+'/stats', config)
              urlArray.push(url)
            }

            return Promise.all(urlArray)
      })
      .then(results=>{
            results=results.map((result)=>{return Number(result.data.watchers)})
            console.log(results)
            this.setState({
                        seasonStats: results
                        })
        
      })
      .catch(error => {
            console.log(error)
      })  
  }

  render() {
    console.log("season stats state", this.state.seasonStats)
    console.log("season data state", this.state.seasonData)
    return (
      <div className="App">
          <h1>When TV shows started to suck</h1>
          <form onSubmit={this.fetchShow}>
            <input type="text" ref="show" />
            <input type="submit" />
          </form>

          <ShowDetails seasonData={this.state.seasonData}/>
          <Showstats seasonStats={this.state.seasonStats}/>
      </div>
    );
  }
}

export default App;
