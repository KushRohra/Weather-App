var latitude, longitude;

window.onload = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } 
}

function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    function weatherBalloon() {
        var key = '52272358b1bbd36f9820c327ca4fe861';
        fetch('https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=' + key)  
        .then(function(resp) { return resp.json() }) // Convert data to json
        .then(function(data) {
          console.log(data);
          displayData(data);
        })
        .catch(function() {
          // catch any errors
        });
    }
    weatherBalloon();
}

function displayData(data) {
    document.getElementById("lat").innerHTML = latitude;
    document.getElementById("lon").innerHTML = longitude;

    document.getElementById("city").innerHTML = data.name
    document.getElementById("mainWeather").innerHTML = data.weather[0].main;
    document.getElementById("description").innerHTML = data.weather[0].description;

    var iconCode = data.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    document.getElementById("weatherIcon").src = iconurl;

    document.getElementById("clouds").innerHTML = data.clouds.all;
    document.getElementById("windSpeed").innerHTML = data.wind.speed;
    document.getElementById("pressure").innerHTML = data.main.pressure;
    document.getElementById("humidity").innerHTML = data.main.humidity;

    document.getElementById("temp").innerHTML = data.main.temp;
    document.getElementById("tempC").innerHTML = KtoC(data.main.temp);
    document.getElementById("tempF").innerHTML = KtoF(data.main.temp);

    document.getElementById("minTemp").innerHTML = data.main.temp_min;
    document.getElementById("minTempC").innerHTML = KtoC(data.main.temp_min);
    document.getElementById("minTempF").innerHTML = KtoF(data.main.temp_min);

    document.getElementById("maxTemp").innerHTML = data.main.temp_max;
    document.getElementById("maxTempC").innerHTML = KtoC(data.main.temp_max);
    document.getElementById("maxTempF").innerHTML = KtoF(data.main.temp_max);
}

function KtoC(temp) {
    return temp-272.15;
}

function KtoF(temp) {
    tempC = KtoC(temp)
    return (tempC*9/5)+32;
}