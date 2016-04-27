var map;
var infowindow;



function initMap() {
    
    var mapOptions = {
        center: {lat: -34.397, lng: 150.644},
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        panControl: false,
        streetViewControl: false,
        mapTypeControl: false
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
            
            /*var circle = new google.maps.Circle({
              center: pos,
              radius: position.coords.accuracy,
              map: map,
              fillColor: '#08B3D9',
              fillOpacity: 0.5,
              strokeColor: '#086788',
              strokeOpacity: 1.0
            });*/
            
            var current_location_icon = {
                url: 'images/current.png', // url
                scaledSize: new google.maps.Size(25, 25), // scaled size
                origin: new google.maps.Point(0,0), // origin
                anchor: new google.maps.Point(0,0) // anchor
            };
            
            marker = new google.maps.Marker({
              position: pos,
              map: map,
              icon: current_location_icon
             });
            
            infowindow = new google.maps.InfoWindow();
              var service = new google.maps.places.PlacesService(map);
              service.nearbySearch({
                location: pos,
                radius: 1000,
                keyword:"tourist"
              }, callback);

             var service4 = new google.maps.places.PlacesService(map);
              service.nearbySearch({
                location: pos,
                radius: 1000,
                keyword:"sports stadium"
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
                radius: 900,
                keyword:"restaurant"
              }, callback3);
            
            var service5 = new google.maps.places.PlacesService(map);
              service2.nearbySearch({
                location: pos,
                radius: 800,
                keyword:"mall"
              }, callback4);
            
            map.setCenter(pos);
            map.setZoom(15);
        });
  } else {
      alert("Location service not enabled.");
  }
}

function callback(results, status) {
  var placesList = document.getElementById('poi');
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      placesList.innerHTML += '<button class="list-group-item"><h2 class="list-item">' + results[i].name + '</h2> Rating: ' + results[i].rating + '/5 </button>';
    }
  }
}

function callback2(results, status) {
  var placesList = document.getElementById('museum');
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker2(results[i]);
      placesList.innerHTML += '<button class="list-group-item"><h2 class="list-item">' + results[i].name + '</h2> Rating: ' + results[i].rating + '/5 </button>';
    }
  }
}

function callback3(results, status) {
  var placesList = document.getElementById('restaurant');
  var temp  = new google.maps.places.PlacesService(map);
  var address = 'temp';
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker3(results[i]);
      placesList.innerHTML += '<button class="list-group-item"><h2 class="list-item">' + results[i].name + '</h2> Rating: ' + results[i].rating + '/5 </button>';
    }
  }
}


function callback4(results, status) {
  var placesList = document.getElementById('shopping');
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker4(results[i]);
      placesList.innerHTML += '<button class="list-group-item"><h2 class="list-item">' + results[i].name + '</h2> Rating: ' + results[i].rating + '/5 </button>';
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: 'images/map-pins/star-3.png'
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent('<div style="font-size: 16px;text-align:center"><strong>' + place.name + '</strong><br>'+ place.vicinity + '<br> Rating: ' + place.rating + '/5 </div>');    
    infowindow.open(map, this);
    
  });
}

function createMarker2(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: 'images/map-pins/temple-2.png'
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent('<div style="font-size: 16px;text-align:center"><strong>' + place.name + '</strong><br>' + place.vicinity + '<br>' + place.rating + '/5 </div>');    
    infowindow.open(map, this);
  });
}

function createMarker3(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: 'images/map-pins/restaurant.png'
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent('<div style="font-size: 16px;text-align:center"><strong>' + place.name + '</strong><br>' + place.vicinity + '<br>' + place.rating + '/5 </div>');    
    infowindow.open(map, this);
  });
}

function createMarker4(place) { 
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: 'images/map-pins/mall.png'
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent('<div style="font-size: 16px;text-align:center"><strong>' + place.name + '</strong><br>' + place.vicinity + '<br>' + place.rating + '/5 </div>');    
    infowindow.open(map, this);
  });
}


                    
function handleLocationError(browserHasGeolocation) {
  infowindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}


function getLocation() {
    initMap();
}
