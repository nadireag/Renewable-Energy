
console.log("loaded");

// get our url for the data
var url = "/api/us_energy";


d3.json(url, function(data){
    // console.log(data);

    // grab values
    var year = data.map(item => item.year)
    var renewable_production = data.map(item => item.produced_renewable)
    var total_consumed = data.map(item => item.total_consumed)


    var trace1 ={
        x: year,
        y: renewable_production,
        type: "bar",
        name: "Renewable Production"
        
    };

    var trace2= {
        x: year,
        y:  total_consumed,
        type: "bar",
        name: "Total Energy Consumption"
    }

    data =  [trace1, trace2]

    layout = {
        yaxis:{
            title: "Billion BTU"
        },
        xaxis: {
            title: "Year"
        }
    }

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
            line: {width: 1, color: 'gray'},
            fill: {color: "green"},
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

    
    // var layout_p = {
    //     title: "Energy Predictions"
    // }


    // plot the table
    Plotly.newPlot('table', predData);
});

