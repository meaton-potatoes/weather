$(document).ready(function(){
  
  $.getJSON("http://api.wunderground.com/api/43ff24d7f4e1c6d4/geolookup/q/autoip.json", { },
  function(jsonData) {
    var location = jsonData["location"]["city"] + ", " + jsonData["location"]["state"];
    var zip = jsonData["location"]["zip"];
    var url = "http://api.wunderground.com/api/43ff24d7f4e1c6d4/conditions/EN/q/" + zip + ".json";
    weatherCall(url,location);
  });
  
  function weatherCall(url,location) {
    $.getJSON(url, {}, function(jsonData) {
      var image = jsonData["current_observation"]["icon_url"];
      var temp_f = jsonData["current_observation"]["temp_f"];
      var temp_c = jsonData["current_observation"]["temp_c"];
      var condition = jsonData["current_observation"]["weather"];
      var humidity = jsonData["current_observation"]["relative_humidity"];
      weatherInfo = {location: location,
                image: image,
                temp_f: temp_f,
                temp_c: temp_c,
                condition: condition,
                humidity: humidity};
      displayWeather(weatherInfo);
    });
  }
  
  function displayWeather(weatherInfo) {
    $("#location").html("Weather in " + weatherInfo.location);
    var temp = weatherInfo.temp_f + "&deg; F<br>";
    var output = "<img src='" + weatherInfo.image + "'><br>";
    output += "<table><tr><td>Condition: " + weatherInfo.condition + "</td>";
    output += "<td>" + weatherInfo.humidity + " Humidity </td></tr></table>";
    $("#top_display").html(temp + output);
    $("#temp").addClass("Fahrenheight");
  }
  
  
  $("#temp").on("click", function(){
    if ($("#temp").hasClass("Fahrenheight")) {
      var temp = weatherInfo.temp_c + "&deg; C<br>";
      var output = "<img src='" + weatherInfo.image + "'><br>";
      output += "<table><tr><td>Condition: " + weatherInfo.condition + "</td>";
      output += "<td>" + weatherInfo.humidity + " Humidity </td></tr></table>";
      $("#top_display").html(temp + output);
      $("#temp").removeClass("Fahrenheight");
      $("#temp").addClass("Celsius");
    } else {
        var temp = weatherInfo.temp_f + "&deg; F<br>";
        var output = "<img src='" + weatherInfo.image + "'><br>";
        output += "<table><tr><td>Condition: " + weatherInfo.condition + "</td>";
        output += "<td>" + weatherInfo.humidity + " Humidity </td></tr></table>";
        $("#top_display").html(temp + output);
        $("#temp").removeClass("Celsius");
        $("#temp").addClass("Fahrenheight");
    }
  });
});