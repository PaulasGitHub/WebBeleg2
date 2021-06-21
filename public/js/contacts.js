let currentSelectedContactID

/**
 * Display all contacts depending on the currently logged in role
 */
function displayAllContacts() {
    clearContactsView()
    displayAllContactsOnMapAsMarkers()
    if (loggedInUser.isAdmin) {
        users.forEach(function (user) {
            displayContactArray(user.contacts)
        })
    } else {
        users.forEach(function (user) {
            if (user.userId === loggedInUser.userId) {
                displayContactArray(user.contacts)
            } else {
                displayPublicContactsFromArray(user.contacts)
            }
        })
    }
}

/**
 * Display only contacts from currently logged in user
 */
function displayOwnContacts() {
    clearContactsView()
    displayOwnContactsOnMapAsMarkers()
    displayContactArray(loggedInUser.contacts)
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

/**
 * Display only contacts from a given contact array where the private attribute is set to false
 * @param contacts given contact array
 */
function displayPublicContactsFromArray(contacts) {
    let contactDiv = document.getElementById('contactsDiv')
    contacts.forEach(function (contact) {
        if (!contact.private) {
            addContactListElement(contactDiv, contact)
        }
    })
}

function displayChangeContact(event) {
    let contactWithOwner = getContactByID(event.target.id)
    if (loggedInUser.isAdmin || (!loggedInUser.isAdmin && loggedInUser.userId == contactWithOwner.owner)) {
        displayChangeContactView()
        if (!loggedInUser.isAdmin) {
            hideHTMLElements('ownerSelectAddForm', 'ownerLabelAddForm')
        }
        document.getElementById('firstNameInputAddForm').value = contactWithOwner.contact.firstName
        document.getElementById('lastNameInputAddForm').value = contactWithOwner.contact.lastName
        document.getElementById('streetInputAddForm').value = contactWithOwner.contact.street
        document.getElementById('numberInputAddForm').value = contactWithOwner.contact.number
        document.getElementById('zipInputAddForm').value = contactWithOwner.contact.zip
        document.getElementById('cityInputAddForm').value = contactWithOwner.contact.city
        document.getElementById('zipInputAddForm').value = contactWithOwner.contact.zip
        document.getElementById('stateInputAddForm').value = contactWithOwner.contact.state
        document.getElementById('countryInputAddForm').value = contactWithOwner.contact.country
        document.getElementById('privateCheckAddForm').checked = contactWithOwner.contact.private
        document.getElementById('ownerSelectAddForm').value = contactWithOwner.owner
        currentSelectedContactID = contactWithOwner.contact.id
    }
}

function getContactByID(id) {
    let contactWithOwner
    users.forEach(function (user) {
        user.contacts.forEach(function (contact) {
            if (contact.id == id) {
                contactWithOwner = {
                    owner: user.userId,
                    contact: contact
                }
            }
        })
    })
    return contactWithOwner
}

/**
 * Add a single contact attribute to a single contact
 * @param contactList contact where the attribute is added to
 * @param contactAttribute attribute which will be added
 */
function addContactListElement(contactList, contact) {
    let listElement = document.createElement("p");
    listElement.setAttribute("id", contact.id)
    listElement.innerHTML = contact.firstName + " " + contact.lastName
    listElement.addEventListener("click", displayChangeContact)
    contactList.appendChild(listElement)
}

function addContact() {
    let newContact = {}
    newContact.id = nextID++
    readContactInput(newContact, "firstNameInputAddForm", 'firstName')
    readContactInput(newContact, "lastNameInputAddForm", 'lastName')
    readContactInput(newContact, "streetInputAddForm", 'street')
    readContactInput(newContact, "numberInputAddForm", 'number')
    readContactInput(newContact, "zipInputAddForm", 'zip')
    readContactInput(newContact, "cityInputAddForm", 'city')
    readContactInput(newContact, "stateInputAddForm", 'state')
    readContactInput(newContact, "countryInputAddForm", 'country')
    newContact["private"] = document.getElementById("privateCheckAddForm").checked
    let validAddress = validateAddress(newContact.street + " " + newContact.number + " " + newContact.zip + " " + newContact.city)
    validAddress.then(function () {
        if (!loggedInUser.isAdmin) {
            loggedInUser.contacts.push(newContact)
        } else if (loggedInUser.isAdmin) {
            if (document.getElementById('ownerSelectAddForm').value == 'admina')
                loggedInUser.contacts.push(newContact)
            else {
                let newArray = users.filter(function (user) {
                    return user.userId == 'normalo'
                });
                newArray[0].contacts.push(newContact)
            }
        }
    }).catch(error => {
        console.error('The given address was not valid')
    })
    displayOwnContacts()
    displayMapView()
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
    let deletedUser
    users.forEach(function (user) {
        user.contacts.forEach(function (contact, index) {
            if (contact.id == currentSelectedContactID) {
                deletedUser = user.contacts.splice(index, 1)[0]
            }
        })
    })
    displayMapView()
    displayOwnContacts()
    return deletedUser
}

function updateContact() {
    users.forEach(function (user) {
        user.contacts.forEach(function (contact, index) {
            if (contact.id == currentSelectedContactID) {
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
    displayMapView()
    displayOwnContacts()
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
