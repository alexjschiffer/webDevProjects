function getWeatherData(data) {
  // Add the detected country to the city and state
  var lat = data.coord.lat;
  var lon = data.coord.lon;
  $.getJSON("https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&key=AIzaSyA9f0xyv_vs-WxHcPh6Gu-X8w0drFNsVZg", function(json){   
  var location = json.results[1].formatted_address;
  $("#location").html(location);
  });
  // Convert sunrise and sunset from UNIX EPOCH time to human, readable time
  var sunrise = data.sys.sunrise;
  var sunset = data.sys.sunset;
  sunrise = new Date(sunrise * 1000);
  sunset = new Date(sunset * 1000);
  $("#sunrise").html("Sunrise: " + sunrise);
  $("#sunset").html("Sunset: " + sunset);
  // Show the temperature in farenheight, store the celsius for later use
  var tempf = Math.round(data.main.temp);
  $("#tempf").html(tempf + "&#176" + "<span>F</span>");
  var tempc = Math.round((tempf - 32) * 5 / 9);
  $("#tempc").html(tempc + "&#176" + "<span>C</span>");
  // Show the humidity
  var hum = data.main.humidity;
  $("#humidity").html(hum + "% Humidity");
  // Show weather icon
  var description = data.weather[0].description;
  var icon = data.weather[0].icon;
  var iconUrl =
    "<img src=http://openweathermap.org/img/w/" + icon + ".png></img>";
  $("#icon").html(description + iconUrl);
}

// Switch between Celsius and Farenheit
$("#alter").click(function() {
  $(".toggle").toggle("slow");
});

// Get weather based on zipcode
$("#getWeather").click(function() {
  var zip = $("#zip").val();
  if (zip.length!==5){
    alert("Please enter a valid 5-digit zip code.")
  } else {
  $.getJSON(
    "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?zip=" +
      zip + "&units=imperial&appid=5342548220364fc8dc7050ac3f19171d",
    function(data) {
      getWeatherData(data);
    }
  );
}
});

// Get weather based on users current location
$.getJSON("https://cors-anywhere.herokuapp.com/http://ip-api.com/json/", function(locate) {
    var lat = locate.lat;
    var lon = locate.lon;
    // Set the detected state
    $.getJSON("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        lon +       "&units=imperial&appid=5342548220364fc8dc7050ac3f19171d",
      function(data) {
        getWeatherData(data);
      }
    );
  }
);