// Us_Energy.year,
// Us_Energy.produced_renewable,
// Us_Energy.total_consumed,
// Us_Energy.gdp,
// Us_Energy.population,
// Us_Energy.energy_price
// "/api/us_energy")
var g4 = new Dygraph(
  document.getElementById("graphdiv4"),
  "../static/csv/us_combined.csv",
  {
    rollPeriod: 7,
    showRoller: true,
    errorBars: true,
    valueRange: [50,125]
  }
);
