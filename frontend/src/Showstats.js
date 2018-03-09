import React, { Component } from 'react';
import Stats from './Stats'



class Showstats extends Component {
    render() {
      return (
        <div class="center-align">
            <h5>Here's your search results</h5>
            <ul>
                <Stats />
            </ul>
        </div>
      );
    }
  }
  
  export default Showstats;