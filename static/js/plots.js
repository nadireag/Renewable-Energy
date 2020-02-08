// Us_Energy.year,
// Us_Energy.produced_renewable,
// Us_Energy.total_consumed,
// Us_Energy.gdp,
// Us_Energy.population,
// Us_Energy.energy_price
// "/api/us_energy")

// var data = "/api/us_energy"
// // define colors as needed
// var visualization = d3plus.viz()
//     .container("#plot1")
//     .data(data)
//     .type("line")
//     .id("difference")
//     .y("total_consumed")
//     .x("year")
//     .draw()
$(document).ready(function() {
    new Dygraph(
        document.getElementById("graphdiv4"),
            "../static/csv/predictions.csv",
            {
                rollPeriod: 14,
                showRoller: false,
                customBars: false,
                ylabel: 'Tot.Energy',
                legend: 'always',
                showRangeSelector: false,
                rangeSelectorPlotFillColor: 'blue',
                rangeSelectorPlotFillGradientColor: 'rgba(123, 104, 238, 0)',
                colorValue: 0.9,
                fillAlpha: 0.4
            }
  );
}
);