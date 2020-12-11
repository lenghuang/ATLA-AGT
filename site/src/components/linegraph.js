import React from "react"
import { Line } from '@reactchartjs/react-chart.js'

function randomColor() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
}

function lightenColor(color) {
    return "rgba" + color.substring(3, color.length - 1) + ',' + String(0.2) + ')'
}

const getLabels = () => {
    var labels = []
    for(var i = 0; i <= 50000; i += 500) {
        labels.push(String(i))
    }
    return labels
}

const makeDataset = (array, i) => {
    const color = randomColor()
    return {
        label: "P(Action " + i + ")",
        data: array,
        fill: false,
        backgroundColor: color,
        borderColor: lightenColor(color)
    }
}

const LineGraph = ({data, dummy}) => {

    var playerA = {}
    var playerB = {}
    var a = "press the button and see these graphs populate!"
    var b = "press the button and see these graphs populate!"

    if(dummy) {
        playerA = {
            labels: ['1', '2', '3', '4', '5', '6'],
            datasets: [
              {
                label: 'Church',
                data: [1, 2, 5, -1, 2, 3],
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
              },
              {
                label: 'Turing',
                data: [-1, 2, 9, -6, 3, 2],
                fill: false,
                backgroundColor: 'rgb(100, 90, 132)',
                borderColor: 'rgba(100, 90, 132, 0.2)',
              },
            ]
          }
          playerB = playerA
    } else {
        const { seriesA, stratA, seriesB, stratB } = data
        playerA = {
            labels: getLabels(),
            datasets: seriesA.map((arr, i) => makeDataset(arr, i))
        }
        playerB = {
            labels: getLabels(),
            datasets: seriesB.map((arr, i) => makeDataset(arr, i))
        }
        a = JSON.stringify(stratA.map(n => n.toFixed(3)))
        b = JSON.stringify(stratB.map(n => n.toFixed(3)))
    }
    return (
        <>
        <div className="content" style={{textAlign: "center"}}>
            <h3>Player A's Strategy:</h3>
            <p>{a}</p>
            <div style={{paddingLeft: "7rem", paddingRight: "7rem"}}>
                <Line data={playerA} />
            </div>
        </div>
        <div className="content" style={{paddingTop: "2rem", textAlign: "center"}}>
          <h3>Player B's Strategy:</h3>
          <p>{b}</p>
          <div style={{paddingLeft: "7rem", paddingRight: "7rem"}}>
            <Line data={playerB} />
          </div>
        </div>
      </>
    )

}

export default LineGraph