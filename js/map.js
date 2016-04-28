var map;
var infowindow;
var gmarkers = new Array();
var current_location;
var directionsDisplay;
var directionsService;


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
                content: '<div style="font-size:16px;"><strong>You Are Here</strong</div>'
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
            
            
            current_loc = new google.maps.Marker({
              position: pos,
              map: map,
              icon: current_location_icon
             });
            
            current_location = current_loc;
            
            infowindow = new google.maps.InfoWindow();
            
            google.maps.event.addListener(map, 'click', function() {
                infowindow.close();
            });
            
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
            directionsDisplay = new google.maps.DirectionsRenderer;
            directionsService = new google.maps.DirectionsService;
            directionsDisplay.setMap(map);
            directionsDisplay.setPanel(document.getElementById('right-panel'));
            document.getElementById('right-panel').innerHTML = "";
            document.getElementById('right-panel').width = "0px";
            
        }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
    }
  else {
      alert('FAIL');
    handleLocationError(false, infoWindow, map.getCenter());
  }

}

function callback(results, status) {
  var placesList = document.getElementById('poi');
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
        var marker = new google.maps.Marker();
        gmarkers[results[i].id] = marker;
        var temp = results[i].id;
        createMarker(results[i]);
        if (String(results[i].rating) == "undefined"){
             placesList.innerHTML += '<button id="' + temp + '" onclick="showpin(this.id)" class="list-group-item"><h2 class="list-item">' + results[i].name + '</h2> No Rating </button>';
        }
        else{
            placesList.innerHTML += '<button id="' + temp + '" onclick="showpin(this.id)" class="list-group-item"><h2 class="list-item">' + results[i].name + '</h2> Rating: ' + results[i].rating + '/5 </button>';
        }
    }
  }
}

function callback2(results, status) {
  var placesList = document.getElementById('museum');
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
        var marker = new google.maps.Marker();
        gmarkers[results[i].id] = marker;
        var temp = results[i].id;
        createMarker2(results[i]);
        if (String(results[i].rating) == "undefined"){
             placesList.innerHTML += '<button id="' + temp + '" onclick="showpin(this.id)" class="list-group-item"><h2 class="list-item">' + results[i].name + '</h2> No Rating </button>';
        }
        else{
            placesList.innerHTML += '<button id="' + temp + '" onclick="showpin(this.id)" class="list-group-item"><h2 class="list-item">' + results[i].name + '</h2> Rating: ' + results[i].rating + '/5 </button>';
        }
    }
  }
}

function callback3(results, status) {
  var placesList = document.getElementById('restaurant');
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
        var marker = new google.maps.Marker();
        gmarkers[results[i].id] = marker;
       var temp = results[i].id;
        createMarker3(results[i]);
        if (String(results[i].rating) == "undefined"){
             placesList.innerHTML += '<button id="' + temp + '" onclick="showpin(this.id)" class="list-group-item"><h2 class="list-item">' + results[i].name + '</h2> No Rating </button>';
        }
        else{
            placesList.innerHTML += '<button id="' + temp + '" onclick="showpin(this.id)" class="list-group-item"><h2 class="list-item">' + results[i].name + '</h2> Rating: ' + results[i].rating + '/5 </button>';
        }
    }
  }
}


function callback4(results, status) {
  var placesList = document.getElementById('shopping');
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
        var marker = new google.maps.Marker();
        gmarkers[results[i].id] = marker;
       var temp = results[i].id;
        createMarker4(results[i]);
        if (String(results[i].rating) == "undefined"){
             placesList.innerHTML += '<button id="' + temp + '" onclick="showpin(this.id)" class="list-group-item"><h2 class="list-item">' + results[i].name + '</h2> No Rating </button>';
        }
        else{
            placesList.innerHTML += '<button id="' + temp + '" onclick="showpin(this.id)" class="list-group-item"><h2 class="list-item">' + results[i].name + '</h2> Rating: ' + results[i].rating + '/5 </button>';
        }
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
    if(String(place.rating) == 'undefined'){
          infowindow.setContent('<div style="font-size: 16px;text-align:center"><strong>' + place.name + '</strong><br>' + place.vicinity + '<br> No Rating </div>'); 
          infowindow.open(map, this);
      }
      else{
          infowindow.setContent('<div style="font-size: 16px;text-align:center"><strong>' + place.name + '</strong><br>' + place.vicinity + '<br>' + 'Rating: ' + place.rating + '/5 </div>'); 
          infowindow.open(map, this);
      }
    
  });
    gmarkers[place.id] = marker;
}

function createMarker2(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: 'images/map-pins/temple-2.png'
  });

  google.maps.event.addListener(marker, 'click', function() {
    if(String(place.rating) == 'undefined'){
          infowindow.setContent('<div style="font-size: 16px;text-align:center"><strong>' + place.name + '</strong><br>' + place.vicinity + '<br> No Rating </div>'); 
          infowindow.open(map, this);
      }
      else{
          infowindow.setContent('<div style="font-size: 16px;text-align:center"><strong>' + place.name + '</strong><br>' + place.vicinity + '<br>' + 'Rating: ' +place.rating + '/5 </div>'); 
          infowindow.open(map, this);
      }
  });
    gmarkers[place.id] = marker;
}

function createMarker3(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: 'images/map-pins/restaurant.png'
  });

  google.maps.event.addListener(marker, 'click', function() {
    if(String(place.rating) == 'undefined'){
          infowindow.setContent('<div style="font-size: 16px;text-align:center"><strong>' + place.name + '</strong><br>' + place.vicinity + '<br> No Rating </div>'); 
          infowindow.open(map, this);
      }
      else{
          infowindow.setContent('<div style="font-size: 16px;text-align:center"><strong>' + place.name + '</strong><br>' + place.vicinity + '<br>' + 'Rating: ' +place.rating + '/5 </div>'); 
          infowindow.open(map, this);
      }
  });
    gmarkers[place.id] = marker;
}

function createMarker4(place) { 
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: 'images/map-pins/mall.png'
  });

  google.maps.event.addListener(marker, 'click', function() {
      if(String(place.rating) == 'undefined'){
          infowindow.setContent('<div style="font-size: 16px;text-align:center"><strong>' + place.name + '</strong><br>' + place.vicinity + '<br> No Rating </div>'); 
          infowindow.open(map, this);
      }
      else{
          infowindow.setContent('<div style="font-size: 16px;text-align:center"><strong>' + place.name + '</strong><br>' + place.vicinity + '<br>' + 'Rating: ' +place.rating + '/5 </div>'); 
          infowindow.open(map, this);
      }
  });
    gmarkers[place.id] = marker;
}

function showpin(id){
    google.maps.event.trigger(gmarkers[id], 'click');
    document.getElementById('right-panel').innerHTML = "";
    calculateAndDisplayRoute(directionsService, directionsDisplay,id);
}
         

function calculateAndDisplayRoute(directionsService, directionsDisplay,end) {
    var start = current_location.position;
    var end = gmarkers[end].position;
    directionsService.route({
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  error = (browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  alert(error);
}


function getLocation() {
    initMap();
}
