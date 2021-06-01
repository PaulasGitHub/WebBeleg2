let currentSelectedContactID

//TODO: Enter = LogInButton-click
/**
 * Display all contacts depending on the currently logged in role
 */
function displayAllContacts() {
    clearContactsView()
    displayAllContactsOnMapAsMarkers()
    let currentUserRole = loggedInUser.role
    if (currentUserRole === 'admin') {
        users.forEach(function (user) {
            displayContactArray(user.contacts)
        })
    } else if (currentUserRole === 'user') {
        users.forEach(function (user) {
            if (user.name === loggedInUser.name) {
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
    displayChangeContactView()
    let contactWithOwner = getContactByID(event.target.id)
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
    //TODO owner
    currentSelectedContactID = contactWithOwner.contact.id
}

function getContactByID(id) {
    let contactWithOwner
    users.forEach(function (user) {
        user.contacts.forEach(function (contact) {
            if (contact.id == id) {
                contactWithOwner = {
                    owner: user.name,
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

    if (loggedInUser.role == "user") {
        loggedInUser.contacts.push(newContact)
    } else if (loggedInUser.role == 'admin') {

        if (document.getElementById('ownerSelectAddForm').value == 'self')
            loggedInUser.contacts.push(newContact)
        else {
            let newArray = users.filter(function (user) {
                return user.name == 'normalo'
            });
            newArray[0].contacts.push(newContact)
        }
    }
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
    console.log("Hallo")
    users.forEach(function (user) {
        user.contacts.forEach(function (contact, index) {
            console.log(currentSelectedContactID)
            console.log(contact.id)
            if (contact.id == currentSelectedContactID) {
                console.log(currentSelectedContactID + " " + index)
                user.contacts.splice(index, 1)
            }
        })
    })
    displayMapView()
    displayOwnContacts()
}