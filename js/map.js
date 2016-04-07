var map;
var infowindow;

function initMap() {
  var pyrmont = {lat: -33.867, lng: 151.195};

  map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
<<<<<<< HEAD
    zoom: 17,
    scaleControl: false,
    streetViewControl: false,
    mapTypeControl: false
=======
    zoom: 17
>>>>>>> 4a229b23076120ade6610a403eb1e844574447f3
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: pyrmont,
    radius: 500,
<<<<<<< HEAD
    type: ['tourist','store']
=======
    type: ['store']
>>>>>>> 4a229b23076120ade6610a403eb1e844574447f3
  }, callback);
}

function callback(results, status) {
<<<<<<< HEAD
  var placesList = document.getElementById('places');
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      placesList.innerHTML += '<button class="list-group-item"><h2 class="list-item">' + results[i].name + '</h2></button>';
=======
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
>>>>>>> 4a229b23076120ade6610a403eb1e844574447f3
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
<<<<<<< HEAD
    position: place.geometry.location,
    icon: 'images/pins-dark/star-3.png'
=======
    position: place.geometry.location
>>>>>>> 4a229b23076120ade6610a403eb1e844574447f3
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

