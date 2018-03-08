import React, { Component } from 'react';

let showdetails = <div></div>

class ShowDetails extends Component {
        
    componentWillUpdate()
    {   let details=this.props.seasonData;
            showdetails = <div>
                            <h1>{details.Title}</h1>
                            <img src={details.Poster}/>
                            <h5>Year: {details.Year}</h5>
                            <h5> Rated:{details.Rated}</h5>
                            <h5> Released:{details.Released}</h5>
                            <h5> Runtime:{details.Runtime}</h5>
                            <h5> Actors:{details.Actors}</h5>
                            <h5> Awards:{details.Awards}</h5>
                            <h5> Country:{details.Country}</h5>
                            <h5> Director:{details.Director}</h5>
                            <h5> Genre:{details.Genre}</h5>
                            <h5> Language:{details.Language}</h5>
                            <h5>Plot:{details.Plot}</h5>
                            <h5>Writer: {details.Writer}</h5>
                      </div>
    }
    render() {
      return (
        <div className="statsDisplay">
                {showdetails}
        </div>
      );
    }
  }
  
  export default ShowDetails;


// <h5> Ratings:{details.Ratings[0].value}</h5>