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
    document.getElementById("city").innerHTML = data.name
    document.getElementById("mainWeather").innerHTML = '<h5>'+data.weather[0].main+'</h5>';
}
