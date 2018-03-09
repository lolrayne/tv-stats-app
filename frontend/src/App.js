import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Showstats from './Showstats';
import key from './config';


let config = {
  headers: {"Content-Type":"application/json","trakt-api-version":2,"trakt-api-key":key.SECRET_KEY}
}

// const url = "https://api.trakt.tv/shows/game-of-thrones/seasons/2/stats"

// axios.get(url,config)
//   .then(result => {
//     console.log(result.data);
//   })
//   .catch(error => {
//     console.log(error)
//   })


class App extends Component {
  constructor(){
    super()
    this.state = {
      seasonData:{},
      seasonStats:{}, 
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
        // let totalSeasons=Number(result.data.totalSeasons)
        let totalSeasons=2;
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
        console.log(results)
      })
      .catch(error => {
        console.log(error)
      })

      
  }

  // if ((movie_data.Response)==="False")
  // {
  //     //res.send('Movie you entered was not found!');
  //     req.answer=false;
  //     next();
  // }
  // else {
  //     id=movie_data.Search[0].imdbID;
  //     api_url_2="http://www.omdbapi.com/?apikey=f6960a9&i="+id;
  //     request(api_url_2, function(error, response, body){



  render() {
    return (

    <div class="container">
      <div class="center-align">
      <div class="card-panel blue lighten-4 col 4">
        <h1>When TV shows started to suck</h1>
      </div>
      </div>

      <div class="input-field col s3">  
          <form onSubmit={this.fetchShow}>
            <input type="text" ref="show" />
          <div class = "waves-effect waves-light btn blue accent-2">
            <input type="submit" />
          </div>
          </form>
      
          <Showstats data={this.state.seasonData}/>
      </div>

        
    </div>

      

      
    );
  }
}

export default App;
