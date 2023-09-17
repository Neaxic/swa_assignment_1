import Temperature from "./models/Temperature"
$('.forecastbtn').click(async function() {
    var thebuttonclicked =$(this).attr("value");
   // var response = await getForecast(`${thebuttonclicked}`);
   // console.log(response);
   console.log("Haj");

    getMinTemp(`${thebuttonclicked}`);

   //var minTemp = await getMinTemp(`${thebuttonclicked}`)
   //console.log("Min: " + minTemp)
   //var maxTemp = await getMaxTemp(`${thebuttonclicked}`)
   //console.log("Max: " + maxTemp)
    // console.log(getForecast(`${thebuttonclicked}`));
   /* $.ajax({
      url: `http://localhost:8080/forecast/${thebuttonclicked}`,
      method: "GET",
      dataType: "json", // Expected response data type
      success: function(data) {
        //NEXT 24 HOURS IN x CITY
        console.log("Response Data:", data);

        $("#nextForecast").text("Next forecast in " + thebuttonclicked);
        $("#nextForecastFrom").text(data[0].type + ": from " + data[0].from + data[0].unit + " to " + data[0].to + data[0].unit);

        console.log(data[0].type);
        console.log(data[0].from);
        console.log(data[0].to);
        console.log(data[0].unit);
        console.log(data[0].time);
      },
      error: function(xhr, status, error) {
        console.error("AJAX Error:", status, error);
      }
    });*/
});

async function getForecast(city) {
    let url = `http://localhost:8080/forecast/${city}`;
    try {
      let response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }

 async function mapForecast(city){
    const response = await getForecast(city)
    console.log("response: ", response)
    // response.map((item) => {
    //   switch(type)
    //   if(item.type === "wind speed")
    // }
    
 }



async function getMaxTemp(city) {
  let weatherData = await getForecast(city);

  let max = -99;
  for (x in weatherData) {
    let to = weatherData[x].to;
    if(to > max) {
      max = to;
    }
  }
  return max;

}