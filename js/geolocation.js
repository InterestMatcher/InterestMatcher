var x = document.getElementById("geo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

//this function is only being used for testing purposes currently
function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
}

//the acutal function to use in the future
/*
function getPosition(position) {
    var location = new Array(2);
    location[0] = position.coords.latitude;
    location[1] = position.coords.longitude;
    return location;
}
*/
