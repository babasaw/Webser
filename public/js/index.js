var map;

function initMap() {
    var marker;
    var mylatitude = -7.834013242667568; // YOUR LATITUDE VALUE
    var mylongitude = 110.38223263807595; // YOUR LONGITUDE VALUE
    var latitude = 27.7172453; // YOUR LATITUDE VALUE
    var longitude = 85.3239605; // YOUR LONGITUDE VALUE

    var LatLng = { lat: latitude, lng: longitude };
    var myLatLng = { lat: mylatitude, lng: mylongitude };

    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 13,
        disableDoubleClickZoom: true, // disable the default map zoom on double click
    });

    // Update lat/long value of div when anywhere in the map is clicked    
    google.maps.event.addListener(map, 'click', function (event) {

        latitude = event.latLng.lat();
        longitude = event.latLng.lng();

        displayLatLang(latitude, longitude);
        getWeatherData(latitude, longitude);

        if (marker) {
            marker.setMap(null);
        }

        placeMarker(event.latLng);
    });

    function placeMarker(location) {
        marker = new google.maps.Marker({
            position: location,
            map: map
        });
    }

    // Update lat/long value of div when the marker is clicked
    marker.addListener('click', function (event) {
        document.getElementById('latclicked').innerHTML = event.latLng.lat();
        document.getElementById('longclicked').innerHTML = event.latLng.lng();
    });
}

function displayLatLang(lat, lang) {
    $('#txt-lat').val(lat);
    $('#txt-lang').val(lang);
}


function getWeatherData(lat, lang) {
    $.get("/bas?lat=" + lat + '&lang=' + lang, function (data) {
        console.log(data);
        $('#weather-info').html(data);
    }).fail(function (error) {
        console.log(error);
    })
}
