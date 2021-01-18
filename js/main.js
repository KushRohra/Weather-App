const api = {
    key: '52272358b1bbd36f9820c327ca4fe861',
    base: "https://api.openweathermap.org/data/2.5/",
    historic: "http://history.openweathermap.org/data/2.5/history/city"
}

window.onload = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } 
}

function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    weatherBalloonLatLon(latitude, longitude);
    historicData(latitude, longitude);
}

function weatherBalloonLatLon(lat, lon) {
    fetch(api.base+'weather?lat='+lat+'&lon='+lon+'&appid='+api.key)  
    .then(function(resp) { return resp.json() }) 
    .then(function(data) {
      displayData(data);
    })
}

function citySearch() {
    city = document.getElementById("city").value;
    weatherBalloonCity(city);
    historicData(latitude, longitude);
    return false;
}

function weatherBalloonCity(city) {
    fetch(api.base+'weather?q='+city+'&appid='+api.key)  
    .then(function(resp) { return resp.json() }) 
    .then(function(data) {
      displayData(data);
    })
}

function displayData(data) {
    document.getElementById("lat").innerHTML = data.coord.lat;
    document.getElementById("lon").innerHTML = data.coord.lon;

    document.getElementById("cityName").innerHTML = data.name;
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
}

function historicData(lat, lon) {
    fetch(api.base+'?lat='+lat+'&lon='+lon+'&type=hour&appid='+api.key)  
    .then(function(resp) { return resp.json() }) 
    .then(function(data) {
      console.log(data, "hello");
    })
}

function KtoC(temp) {
    return (temp-272.15).toFixed(2);
}

function KtoF(temp) {
    tempC = KtoC(temp)
    return ((tempC*9/5)+32).toFixed(2);
}