let map
let geocoder
let markers = []

function initMap() {
    map = new google.maps.Map(document.getElementById("googleMap"),
        {
            zoom: 12,
            center: new google.maps.LatLng(52.520008, 13.404954),
        });

    geocoder = new google.maps.Geocoder()
}

function addContactsAsMarker(contacts) {
    deleteMarkers()
    contacts.forEach(function (contact) {
        addMarkerToMap(contact)
    })

}

function addMarkerToMap(address) {
    let latLng = {lat: address.lat, lng: address.lng}
    map.setCenter(latLng)
    let marker = new google.maps.Marker({
        map: map,
        position: latLng
    })
    markers.push(marker)
}

function validateAddress(address) {
    return geocoder.geocode({'address': address}, function (results, status) {
        if (!status === 'OK') {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    setMapOnAll(null);
    markers = [];
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}