const locations = [{
    lat: -31.563910,
    lng: 147.154312
  },
  {
    lat: -33.718234,
    lng: 150.363181
  },
  {
    lat: -33.727111,
    lng: 150.371124
  },
  {
    lat: -33.848588,
    lng: 151.209834
  },
  {
    lat: -33.851702,
    lng: 151.216968
  },
  {
    lat: -34.671264,
    lng: 150.863657
  },
  {
    lat: -35.304724,
    lng: 148.662905
  },
  {
    lat: -36.817685,
    lng: 175.699196
  },
  {
    lat: -36.828611,
    lng: 175.790222
  },
  {
    lat: -37.750000,
    lng: 145.116667
  },
  {
    lat: -37.759859,
    lng: 145.128708
  },
  {
    lat: -37.765015,
    lng: 145.133858
  },
  {
    lat: -37.770104,
    lng: 145.143299
  },
  {
    lat: -37.773700,
    lng: 145.145187
  },
  {
    lat: -37.774785,
    lng: 145.137978
  },
  {
    lat: -37.819616,
    lng: 144.968119
  },
  {
    lat: -38.330766,
    lng: 144.695692
  },
  {
    lat: -39.927193,
    lng: 175.053218
  },
  {
    lat: -41.330162,
    lng: 174.865694
  },
  {
    lat: -42.734358,
    lng: 147.439506
  },
  {
    lat: -42.734358,
    lng: 147.501315
  },
  {
    lat: -42.735258,
    lng: 147.438000
  },
  {
    lat: -43.999792,
    lng: 170.463352
  }
];
let map;
let infowindow;
let service;

// Initialize and add the map
function initMap() {
  infowindow = new google.maps.InfoWindow();
  let center = calCenter();
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: center
  });
  service = new google.maps.places.PlacesService(map);
  locations.forEach(location => {
    createMarker(location);
  });
}

function createMarker(location) {
  let marker = new google.maps.Marker({
    position: location,
    map: map
  });
  new ClickEventHandler(marker, location);
}

class ClickEventHandler {
  constructor(marker, location) {
    this.location = location;
    this.marker = marker;
    this.placesService = service;
    this.infowindow = infowindow;
    this.infowindowContent = document.getElementById('infowindow-content');
    this.infowindow.setContent(this.infowindowContent);
    this.marker.addListener('click', () => this.handleClick);
  }

  handleClick(event) {
    console.log('You clicked on: ' + event.latLng);
    // If the event has a placeId, use it.
    if (event.placeId) {
      console.log('You clicked on place:' + event.placeId);
      event.stop();
      this.getPlaceInformation(event.placeId);
    }
  }

  getPlaceInformation(placeId) {
    let me = this;
    this.placesService.getDetails({
      placeId: placeId
    }, function (place, status) {
      if (status === 'OK') {
        me.infowindow.close();
        me.infowindow.setPosition(place.geometry.location);
        me.infowindowContent.children['place-name'].textContent = place.name;
        me.infowindowContent.children['place-id'].textContent = `Place-id: ${place.place_id}`;
        me.infowindowContent.children['place-address'].textContent =
          place.formatted_address;
        me.infowindow.open(me.marker);
      }
    });
  }
}

function calCenter() {
  let preCenter = locations.reduce(([latitude, longitude], currentLocation) => [latitude + currentLocation.lat,
    longitude + currentLocation.lng
  ], [0, 0]);
  return {
    lat: preCenter[0] / locations.length,
    lng: preCenter[1] / locations.length
  };
}