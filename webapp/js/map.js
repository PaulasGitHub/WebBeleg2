let map
let geocoder
let allMarkers = []

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    setMapOnAll(null);
    allMarkers = [];
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (let i = 0; i < allMarkers.length; i++) {
        allMarkers[i].setMap(map);
    }
}

function addContactsAsMarker(contacts) {
    contacts.forEach(function (contact) {
        addMarkerToMap(contact.street + " " + contact.number + " " + contact.zip + " " + contact.city)
    })

}

function addMarkerToMap(address) {
    geocoder.geocode({'address': address}, function (results, status) {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            let marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            allMarkers.push(marker)
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function initMap() {
    map = new google.maps.Map(document.getElementById("googleMap"),
        {
            zoom: 12,
            center: new google.maps.LatLng(52.520008, 13.404954),
        });

    geocoder = new google.maps.Geocoder()
}

function showOwnContactsOnMapAsMarkers() {
    deleteMarkers()
    addContactsAsMarker(loggedInUser.contacts)
}

function showAllContactsOnMapAsMarkers() {
    deleteMarkers()
    let currentUserRole = loggedInUser.role
    if (currentUserRole === 'admin') {
        users.forEach(function (user) {
            addContactsAsMarker(user.contacts)
        })
    } else if (currentUserRole === 'user') {
        users.forEach(function (user) {
            if (user.name === loggedInUser.name) {
                addContactsAsMarker(user.contacts)
            } else {
                showPublicContactsOnMapAsMarkers(user.contacts)
            }
        })
    }
}

function showPublicContactsOnMapAsMarkers(contacts) {
    let publicContacts = contacts.filter(contact => !contact.private)
    addContactsAsMarker(publicContacts)
}