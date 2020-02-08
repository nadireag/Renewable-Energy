
console.log("loaded");

// get our url for the data
var url = "/api/us_energy";


d3.json(url, function(data){
    
    // grab values
    var year = data.map(item => item.year)
    var renewable_production = data.map(item => item.produced_renewable)
    var total_consumed = data.map(item => item.total_consumed)


    var trace1 ={
        x: year,
        y: renewable_production,
        type: "bar",
        name: "Renewable Production",
        marker: {color: 'rgb(26, 118, 255)'},
        
    };

    var trace2= {
        x: year,
        y:  total_consumed,
        type: "bar",
        name: "Total Energy Consumption",
        marker: {color: 'rgb(55, 83, 109)'},
    }

    data =  [trace1, trace2]


    var layout = {
        xaxis: {
            title : "Year",
            tickfont: {
            size: 14,
            color: 'rgb(107, 107, 107)'
          }},
        yaxis: {
          title: 'Billion BTU',
          titlefont: {
            size: 16,
            color: 'rgb(107, 107, 107)'
          },
          tickfont: {
            size: 14,
            color: 'rgb(107, 107, 107)'
          }
        },
        legend: {
          x: 0,
          y: 1.5,
          bgcolor: 'rgba(255, 255, 255, 0)',
          bordercolor: 'rgba(255, 255, 255, 0)'
        },
        barmode: 'group',
        bargap: 0.15,
        bargroupgap: 0.1
      };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("plot1", data, layout, {scroolZoom: true});

});

    // ///////////////////////////////

// read the data to create table for predicted values
Plotly.d3.csv("static/csv/predictions.csv", function(err, rows){

    // define unpack function to read csv by each row
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    // get first line as table headers
    var headerNames = Plotly.d3.keys(rows[0]);

    
    // assign table header and cell values
    var headerValues = [];
    var cellValues = [];
    for (i = 0; i < headerNames.length; i++) {
        headerValue = [headerNames[i]];
        headerValues[i] = headerValue;
        cellValue = unpack(rows, headerNames[i]);
        cellValues[i] = cellValue;
    }

    // console.log(headerNames)
    // console.log(headerValues)

    // create the predData variable for the table
    var predData = [{
        type: 'table',
        header: {
            values: headerValues,
            align: "center",
            line: {width: 1, color: 'rgb(55, 83, 109)'},
            fill: {color: "rgb(55, 83, 109"},
            font: {family: "Arial", size: 8, color: "white"}
        },
        cells: {
            values: cellValues,
            align: ["center", "center"],
            line: {color: "black", width: 1},
            fill: {color: "white"},
            font: {family: "Arial", size: 9, color: ["black"]}
        }
    }]

    // plot the table
    Plotly.newPlot('table', predData);
});

// ///////////////////////////////////////////////////////////////

Plotly.d3.csv("static/csv/us_combined.csv", function(err, rows){

  function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}

  var frames = []
  var x = unpack(rows, 'Year')
  var y = unpack(rows, 'Difference')

  var n = 100;
  for (var i = 0; i < n; i++) {
    frames[i] = {data: [{x: [], y: []}]}
    frames[i].data[0].x = x.slice(0, i+1);
    frames[i].data[0].y = y.slice(0, i+1);
  }

  Plotly.newPlot('plot', [{
    x: frames[1].data[0].x,
    y: frames[1].data[0].y,
    fill: 'tozeroy',
    type: 'scatter',
    mode: 'lines',
    line: {color: 'red'}
  }], {
    title: "Difference Between Renewable Production and Total Consumed Energy",
    xaxis: {
      title:"Year",
      range: [
        1970, 2030
      ]
    },
    yaxis: {
      title: "Difference(Bil. BTU)",
      range: [
        -110506126.9,
        90
      ]
    },
    updatemenus: [{
      x: 0.1,
      y: 0,
      yanchor: "top",
      xanchor: "right",
      showactive: false,
      direction: "left",
      type: "buttons",
      pad: {"t": 87, "r": 10},
      buttons: [{
        method: "animate",
        args: [null, {
          fromcurrent: true,
          transition: {
            duration: 0,
          },
          frame: {
            duration: 40,
            redraw: false
          }
        }],
        label: "Play"
      }, {
        method: "animate",
        args: [
          [null],
          {
            mode: "immediate",
            transition: {
              duration: 0
            },
            frame: {
              duration: 0,
              redraw: false
            }
          }
        ],
        label: "Pause"
      }]
    }]
  }).then(function() {
    Plotly.addFrames('plot', frames);
  });

})










// Plotly.d3.csv("static/csv/us_combined.csv", function(err, rows){

//   function unpack(rows, key) {
//   return rows.map(function(row) { return row[key]; });
// }

//   var frames = []
//   var x = unpack(rows, 'Year')
//   var y = unpack(rows, 'Total Consumed(Billion Btu)')
//   var x2 = unpack(rows, 'Year')
//   var y2 = unpack(rows, 'Population(Thousand)')

//   console.log(frames)

//   var n = 100;
//   for (var i = 0; i < n; i++) {
//     frames[i] = {data: [{x: [], y: []}, {x: [], y: []}]}
//     frames[i].data[1].x = x.slice(0, i+1);
//     frames[i].data[1].y = y.slice(0, i+1);
//     frames[i].data[0].x = x2.slice(0, i+1);
//     frames[i].data[0].y = y2.slice(0, i+1);
//   }

//   var trace4 = {
//     type: "scatter",
//     mode: "lines",
//     name: 'Population',
//     fill: 'tonexty',
//     x: frames[5].data[1].x,
//     y: frames[5].data[1].y,
//     line: {color: 'grey'}
//   }

//   var trace5 = {
//     type: "scatter",
//     mode: "lines",
//     name: 'Total Consumed',
//     x: frames[5].data[0].x,
//     y: frames[5].data[0].y,
//     line: {color: 'lightgrey'}
//   }

//   var data5= [trace4,trace5];

//   var layout5 = {
//     title: 'Total Consumed Energy - Population',
//     xaxis: {
//       range: [frames[99].data[0].x[0], frames[99].data[0].x[99]],
//       showgrid: false
//     },
//     yaxis: {
//       range: [120, 140],
//       showgrid: false
//     },
//     legend: {
//       orientation: 'h',
//       x: 0.5,
//       y: 1.2,
//       xanchor: 'center'
//     },
//     updatemenus: [{
//       x: 0.5,
//       y: 0,
//       yanchor: "top",
//       xanchor: "center",
//       showactive: false,
//       direction: "left",
//       type: "buttons",
//       pad: {"t": 87, "r": 10},
//       buttons: [{
//         method: "animate",
//         args: [null, {
//           fromcurrent: true,
//           transition: {
//             duration: 0,
//           },
//           frame: {
//             duration: 40,
//             redraw: false
//           }
//         }],
//         label: "Play"
//       }, {
//         method: "animate",
//         args: [
//           [null],
//           {
//             mode: "immediate",
//             transition: {
//               duration: 0
//             },
//             frame: {
//               duration: 0,
//               redraw: false
//             }
//           }
//         ],
//         label: "Pause"
//       }]
//     }]
//   };

//   Plotly.newPlot('plot', data5, layout5).then(function() {
//     Plotly.addFrames('plot', frames);
//   });
    
// })
