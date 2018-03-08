import React, { Component } from 'react';
import Chart from 'chart.js'


class Showstats extends Component {
  componentDidUpdate(){
    console.log("Data Recieved",this.props.seasonStats)
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["1", "2", "3", "4", "5", "6", "7"],
            datasets: [{
                label: 'Watchers per Season',
                data:this.props.seasonStats,
                backgroundColor: 'rgba(25, 99, 132,1)',
                borderColor:'rgba(25,99,132,1)',
                borderWidth: 1
            }
        ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
 }
    render() {
      return (
        <div className="statsDisplay">
            <p>Here are the show season stats!</p>
            <canvas id="myChart"></canvas>
            
        </div>
      );
    }
  }
  
  export default Showstats;