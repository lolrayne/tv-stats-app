import React, { Component } from 'react';
import Stats from './Stats'



class Showstats extends Component {
    render() {
      return (
        <div className="statsDisplay">
            <p>Here's your search results</p>
            <ul>
                <Stats />
            </ul>
        </div>
      );
    }
  }
  
  export default Showstats;