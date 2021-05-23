const users = [
    {
        name: 'admina',
        password: 'pass123',
        role: "admin",
        contacts: [
            {
                firstName: 'Maxime',
                lastName: 'Musterfrau',
                street: 'Sonnenalle',
                number: '12',
                zip: '12345',
                city: 'Berlin',
                state: 'Berlin',
                country: 'Deutschland',
                private: true
            },
            {
                firstName: 'Todd',
                lastName: 'Chavez',
                street: 'Carl-Herz-Ufer',
                number: '25',
                zip: '10961',
                city: 'Berlin',
                state: 'Berlin',
                country: 'Deutschland',
                private: false
            }
        ]
    },
    {
        name: "normalo",
        password: "pass321",
        role: "user",
        contacts: [
            {
                firstName: 'Jo',
                lastName: 'Guenther',
                street: "Mittenwalder Straße",
                number: '12',
                zip: '23433',
                city: 'Berlin',
                state: 'Berlin',
                country: 'Deutschland',
                private: true
            },
            {
                firstName: 'Hans',
                lastName: 'Herbert',
                street: 'Pfarrstraße',
                number: '113',
                zip: '10961',
                city: 'Berlin',
                state: 'Berlin',
                country: 'Deutschland',
                private: false
            }
        ]
    }
]
let loggedInUser

/**
 * Log out currently logged in user
 */
function logout() {
    loggedInUser = null
    displayElements('login')
    hideElements('mainContent', 'changeContacts')
    clearContactsView()
}

function login() {
    let givenUsername = document.getElementById('usernameInput').value
    let givenPassword = document.getElementById('passwordInput').value

    let userNotFound = true
    let currentUserIndex = 0
    while (userNotFound && currentUserIndex < users.length) {
        let currentUser = users[currentUserIndex]
        if (currentUser.name === givenUsername && currentUser.password === givenPassword) {
            hideElements('login', 'changeContacts')
            displayElements('mainContent')
            document.getElementById('welcomeHeader').innerHTML = "Welcome " + givenUsername + "!"
            document.getElementById('errorMessageLogin').innerHTML = ''
            loggedInUser = currentUser;
            displayOwnContacts()
            userNotFound = false
        }
        currentUserIndex++
    }
    if (userNotFound) document.getElementById('errorMessageLogin').innerHTML = "Login credentials where incorrect! Please try again!"
    document.getElementById('usernameInput').value = null;
    document.getElementById('passwordInput').value = null;
}

//TODO: Enter = LogInButton-click
/**
 * Display all contacts depending on the currently logged in role
 */
function displayAllContacts() {
    clearContactsView()
    let currentUserRole = loggedInUser.role
    if (currentUserRole === 'admin') {
        users.forEach(function (user) {
            displayContacts(user.contacts)
        })
    } else if (currentUserRole === 'user') {
        users.forEach(function (user) {
            if (user.name === loggedInUser.name) {
                displayContacts(user.contacts)
            } else {
                displayPublicContactsOnly(user.contacts)
            }
        })
    }
}

/**
 * Display only contacts from currently logged in user
 */
function displayOwnContacts() {
    clearContactsView()
    displayContacts(loggedInUser.contacts)
}

/**
 * Display a given contact array
 * @param contacts given contact array
 */
function displayContacts(contacts) {
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
function displayPublicContactsOnly(contacts) {
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

function addContact(){

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

    if(loggedInUser.role == "user"){
        loggedInUser.contacts.push(newContact)
    }
    else if (loggedInUser.role == 'admin'){

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
    displayMainContentScreen()
}

function readContactInput(newContact, inputID, attributeName){
    newContact[attributeName] = document.getElementById(inputID).value
}


/**
 * Display the "change contacts" screen
 */
function displayAddContactScreen() {
    displayElements('changeContacts', 'saveButton')
    hideElements('mainContent', 'updateButtonUpdateForm', 'deleteButtonUpdateForm')

    if (loggedInUser.role == "user"){
        hideElements('ownerListElement')
    }
}

/**
 * Display the "main Content" screen
 */
function displayMainContentScreen() {
    displayElements('mainContent')
    hideElements('changeContacts')
}


/**
 * Remove all contacts from the view
 */
function clearContactsView() {
    document.getElementById('contactsDiv').innerHTML = ""
}

/**
 * Display all html elements which IDs are given as parameter
 * @param args variable amount of html element IDs
 */
function displayElements(...args) {
    args.forEach(function (elementID) {
        document.getElementById(elementID).style.display = 'block'
    });
}

/**
 * Hide all html elements which IDs are given as parameter
 * @param args variable amount of html element IDs
 */
function hideElements(...args) {
    args.forEach(function (elementID) {
        document.getElementById(elementID).style.display = 'none'
    });
}

