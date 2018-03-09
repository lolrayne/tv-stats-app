import React, { Component } from 'react';
import Chart from 'chart.js'

var ctx
var myChart


class Showstats extends Component {
  componentDidMount(){
    ctx = document.getElementById('myChart').getContext('2d');
    myChart=new Chart(ctx,{})
  }

  componentDidUpdate(){
    console.log("Data Recieved",this.props.seasonStats)
    // document.getElementById('myChart').remove();
    // document.getElementById('graph-container').append('<canvas id="myChart"></canvas>')
    myChart.destroy()
    ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
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
        <div className="statsDisplay" id="graph-container">
            <p>Here are the show season stats!</p>
            <canvas id="myChart"></canvas>  
        </div>
      );
    }
  }
  
  export default Showstats;