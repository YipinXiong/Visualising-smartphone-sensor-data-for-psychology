    // Initialize and add the map
    function initMap() {
      // The location of Uluru
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( position => {
          initMarker(position.coords.latitude, position.coords.longitude);
        });
      }
    }

    function initMarker(latitude, longitude) {
      var mylocation = {lat: +latitude, lng: +longitude};
      // The map, centered at Uluru
      var map = new google.maps.Map(
          document.getElementById('map'), {zoom: 8, center: mylocation});
      // The marker, positioned at Uluru
      var marker = new google.maps.Marker({position: mylocation, map: map});
    }