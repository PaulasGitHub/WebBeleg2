let currentSelectedContact

function requestAllAccessibleContacts() {
    clearContactsView()
    getAllContacts()
}

function getAllContacts() {
    let httpRequest = new XMLHttpRequest()
    let url = "http://localhost:3000/contacts"
    httpRequest.open("GET", url, true)
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.onerror = function () {
        console.log("Connecting to server with " + url + " failed!\n");
    };
    httpRequest.onload = displayAllAccessibleContacts
    httpRequest.send()
}

function displayAllAccessibleContacts() {
    let data = this.response;
    let allContacts = JSON.parse(data);
    if (this.status == 200) {
        if (loggedInUser.isAdmin) {
            addContactsAsMarker(allContacts)
            displayContactArray(allContacts)
        } else {
            let allAccessibleContacts = []
            allContacts.forEach(function (contact) {
                if (contact.owner == loggedInUser.userId || !contact.private) {
                    allAccessibleContacts.push(contact)
                }
            })
            addContactsAsMarker(allAccessibleContacts)
            displayContactArray(allAccessibleContacts)
        }

    } else {
        console.log("HTTP-status code was: " + obj.status);
    }
}

function requestOwnContacts() {
    clearContactsView()
    requestContactByUserId(loggedInUser.userId)
}

function requestContactByUserId(userId) {
    let httpRequest = new XMLHttpRequest();
    let url = "http://localhost:3000/contacts?userId=" + userId
    httpRequest.open("GET", url, true)
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.onerror = function () {
        console.log("Connecting to server with " + url + " failed!\n");
    };
    httpRequest.onload = displayOwnContacts
    httpRequest.send()
}

function displayOwnContacts() {
    let data = this.response;
    let obj = JSON.parse(data);
    if (this.status == 200) {
        addContactsAsMarker(obj)
        displayContactArray(obj)
    } else {
        console.log("HTTP-status code was: " + obj.status);
    }
}

/**
 * Display a given contact array
 * @param contacts given contact array
 */
function displayContactArray(contacts) {
    let contactDiv = document.getElementById('contactsDiv')
    contacts.forEach(function (contact) {
        addContactListElement(contactDiv, contact)
    });
}


function requestContactById(id) {
    let httpRequest = new XMLHttpRequest();
    let url = "http://localhost:3000/contacts/" + id
    httpRequest.open("GET", url, true)
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.onerror = function () {
        console.log("Connecting to server with " + url + " failed!\n");
    };
    httpRequest.onload = displaySelectedContact
    httpRequest.send()
}

function displaySelectedContact() {
    let data = this.response;
    let selectedContact = JSON.parse(data);
    if (this.status == 200) {
        if (loggedInUser.isAdmin || (!loggedInUser.isAdmin && loggedInUser.userId == selectedContact.owner)) {
            displayChangeContactView()
            if (!loggedInUser.isAdmin) {
                hideHTMLElements('ownerSelectAddForm', 'ownerLabelAddForm')
            }
            document.getElementById('firstNameInputAddForm').value = selectedContact.firstName
            document.getElementById('lastNameInputAddForm').value = selectedContact.lastName
            document.getElementById('streetInputAddForm').value = selectedContact.street
            document.getElementById('numberInputAddForm').value = selectedContact.number
            document.getElementById('zipInputAddForm').value = selectedContact.zip
            document.getElementById('cityInputAddForm').value = selectedContact.city
            document.getElementById('zipInputAddForm').value = selectedContact.zip
            document.getElementById('stateInputAddForm').value = selectedContact.state
            document.getElementById('countryInputAddForm').value = selectedContact.country
            document.getElementById('privateCheckAddForm').checked = selectedContact.private
            document.getElementById('ownerSelectAddForm').value = selectedContact.owner
            currentSelectedContact = selectedContact
        }
    } else {
        console.log("HTTP-status code was: " + selectedContact.status);
    }
}


function displayChangeContact(event) {
    requestContactById(event.target.id)
}

/**
 * Add a single contact attribute to a single contact
 * @param contactList contact where the attribute is added to
 * @param contactAttribute attribute which will be added
 */
function addContactListElement(contactList, contact) {
    let listElement = document.createElement("p");
    listElement.setAttribute("id", contact._id)
    listElement.innerHTML = contact.firstName + " " + contact.lastName
    listElement.addEventListener("click", displayChangeContact)
    contactList.appendChild(listElement)
}

function addContact() {
    let newContact = {}
    readContactInput(newContact, "firstNameInputAddForm", 'firstName')
    readContactInput(newContact, "lastNameInputAddForm", 'lastName')
    readContactInput(newContact, "streetInputAddForm", 'street')
    readContactInput(newContact, "numberInputAddForm", 'number')
    readContactInput(newContact, "zipInputAddForm", 'zip')
    readContactInput(newContact, "cityInputAddForm", 'city')
    readContactInput(newContact, "stateInputAddForm", 'state')
    readContactInput(newContact, "countryInputAddForm", 'country')
    newContact["private"] = document.getElementById("privateCheckAddForm").checked
    if (loggedInUser.isAdmin) {
        newContact.owner = document.getElementById('ownerSelectAddForm').value
    } else {
        newContact.owner = loggedInUser.userId
    }
    let validAddress = validateAddress(newContact.street + " " + newContact.number + " " + newContact.zip + " " + newContact.city)
    validAddress
        .then(function (results) {
            let location = results.results[0].geometry.location
            newContact.lat = location.lat()
            newContact.lng = location.lng()
            postNewContact(newContact)
        })
        .catch(error => {
            console.error('The given address was not valid')
        })
}

function postNewContact(newContact) {
    let httpRequest = new XMLHttpRequest();
    let url = "http://localhost:3000/contacts"
    httpRequest.open("POST", url, true)
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.onerror = function () {
        console.log("Connecting to server with " + url + " failed!\n");
    };
    httpRequest.onload = function () {
        requestOwnContacts()
        displayMapView()
    }
    let json = JSON.stringify(newContact)
    httpRequest.send(json)
}

function readContactInput(newContact, inputID, attributeName) {
    newContact[attributeName] = document.getElementById(inputID).value
}

/**
 * Remove all contacts from the view
 */
function clearContactsView() {
    document.getElementById('contactsDiv').innerHTML = ""
}

function deleteContact() {
    let httpRequest = new XMLHttpRequest();
    let url = "http://localhost:3000/contacts/" + currentSelectedContact._id
    httpRequest.open("DELETE", url, true)
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.onerror = function () {
        console.log("Connecting to server with " + url + " failed!\n");
    };
    httpRequest.onload = function () {
        if (this.status == 204) {
            requestOwnContacts()
            displayMapView()
        } else {
            console.log("HTTP-status code was: " + this.status);
        }
    }
    httpRequest.send()
}

function updateContact() {
    users.forEach(function (user) {
        user.contacts.forEach(function (contact, index) {
            if (contact.id == currentSelectedContact.id) {
                contact.firstName = document.getElementById("firstNameInputAddForm").value
                contact.lastName = document.getElementById("lastNameInputAddForm").value
                contact.street = document.getElementById("streetInputAddForm").value
                contact.number = document.getElementById("numberInputAddForm").value
                contact.zip = document.getElementById("zipInputAddForm").value
                contact.city = document.getElementById("cityInputAddForm").value
                contact.state = document.getElementById("stateInputAddForm").value
                contact.country = document.getElementById("countryInputAddForm").value
                contact.private = document.getElementById("privateCheckAddForm").checked
                let selectedOwnerValue = document.getElementById('ownerSelectAddForm').value
                if (loggedInUser.isAdmin && user.userId != selectedOwnerValue) {
                    let deletedContact = deleteContact()
                    users.find(user => user.userId == selectedOwnerValue).contacts.push(deletedContact)
                }
            }
        })
    })
    requestOwnContacts()
    displayMapView()
}

function addressCorrect() {
    let addCorrect = false;

    geocoder.geocode({'address': address}, function (results, status) {
        if (status === 'OK') {
            addCorrect = true
        } else {
            addCorrect = false
        }
    })
    print(addCorrect)
    return addCorrect
}

