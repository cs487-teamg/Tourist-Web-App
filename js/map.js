var map;
var infowindow;

function initMap() {
    
    var mapOptions = {
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        panControl: false,
        streetViewControl: false,
        mapTypeControl: false,
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    //HTML5 geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            infowindow = new google.maps.InfoWindow({
                map: map,
                position: pos,
                content: 'You Are Here'
            });
            
            infowindow = new google.maps.InfoWindow();
              var service = new google.maps.places.PlacesService(map);
              service.nearbySearch({
                location: pos,
                radius: 5000,
                keyword:"tourist"
              }, callback);

              var service2 = new google.maps.places.PlacesService(map);
              service2.nearbySearch({
                location: pos,
                radius: 2000,
                keyword:"museum"
              }, callback2);

              var service3 = new google.maps.places.PlacesService(map);
              service2.nearbySearch({
                location: pos,
                radius: 1000,
                keyword:"restaurant"
              }, callback3);

            map.setCenter(pos);
        },

        function () {
            handleNoGeolocation(true);
        });
    } else {
        handleNoGeolocation(false);
    }
}

function callback(results, status) {
  var placesList = document.getElementById('poi');
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      placesList.innerHTML += '<button class="list-group-item"><h2 class="list-item">' + results[i].name + '</h2></button>';
    }
  }
}

function callback2(results, status) {
  var placesList = document.getElementById('museum');
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker2(results[i]);
      placesList.innerHTML += '<button class="list-group-item"><h2 class="list-item">' + results[i].name + '</h2></button>';
    }
  }
}

function callback3(results, status) {
  var placesList = document.getElementById('restaurant');
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker3(results[i]);
      placesList.innerHTML += '<button class="list-group-item"><h2 class="list-item">' + results[i].name + '</h2></button>';
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: 'images/pins-dark/star-3.png'
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

function createMarker2(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: 'images/pins-dark/temple-2.png'
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

function createMarker3(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: 'images/pins-dark/restaurant.png'
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

function getLocation() {
    initMap();
}