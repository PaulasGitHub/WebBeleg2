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
    let contactsDiv = document.getElementById('contactsDiv')
    contacts.forEach(function (contact) {
        let contactList = document.createElement('UL')
        for (let propertyName in contact) {
            addContactListElement(contactList, contact[propertyName])
        }
        contactsDiv.appendChild(contactList)
    });
}

/**
 * Display only contacts from a given contact array where the private attribute is set to false
 * @param contacts given contact array
 */
function displayPublicContactsFromArray(contacts) {
    let contactsDiv = document.getElementById('contactsDiv')
    contacts.forEach(function (contact) {
        if (!contact.private) {
            let contactList = document.createElement('UL')
            for (let propertyName in contact) {
                addContactListElement(contactList, contact[propertyName])
            }
            contactsDiv.appendChild(contactList)
        }
    })
}

/**
 * Add a single contact attribute to a single contact
 * @param contactList contact where the attribute is added to
 * @param contactAttribute attribute which will be added
 */
function addContactListElement(contactList, contactAttribute) {
    let listElement = document.createElement("LI");          // Create a <li> node
    let listElementText = document.createTextNode(contactAttribute);         // Create a text node
    listElement.appendChild(listElementText);
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

function validateContactInput(){
    console.log("lets validate");
    let valid = false
    let fname = document.getElementById("firstNameInputAddForm");
    fname.addEventListener("input", function (event){
        if(fname.validity.valueMissing){
            valid = false
            console.log("valid: " + valid)
            fname.setCustomValidity("pw not correct");
        } else {
            valid = true
            console.log("valid: " + valid)
            fname.setCustomValidity("");
        }
    })
}

/**
 * Remove all contacts from the view
 */
function clearContactsView() {
    document.getElementById('contactsDiv').innerHTML = ""
}