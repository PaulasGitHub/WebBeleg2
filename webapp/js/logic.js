const users = [
    {
        name: 'admina',
        password: 'pass123',
        contacts: [
            {
                firstName: 'Maxime',
                lastName: 'Musterfrau',
                street: 'Sonnenalle',
                number: 12,
                zip: 12345,
                city: 'Berlin',
                state: 'Berlin',
                country: 'Deutschland',
                private: true
            },
            {
                firstName: 'Todd',
                lastName: 'Chavez',
                street: 'Carl-Herz-Ufer',
                number: 25,
                zip: 10961,
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
        contacts: [
            {
                firstName: 'Jo',
                lastName: 'Guenther',
                street: "Mittenwalder Straße",
                number: 12,
                zip: 23433,
                city: 'Berlin',
                state: 'Berlin',
                country: 'Deutschland',
                private: true
            },
            {
                firstName: 'Hans',
                lastName: 'Herbert',
                street: 'Pfarrstraße',
                number: 113,
                zip: 10961,
                city: 'Berlin',
                state: 'Berlin',
                country: 'Deutschland',
                private: false
            }
        ]
    }
]
let loggedInUser

function logout() {
    document.getElementById("login").style.display = 'block'
    document.getElementById("mainContent").style.display = 'none'

    document.getElementById('contactsDiv').innerHTML = "";
}

function login() {
    let givenUsername = document.getElementById('usernameInput').value
    let givenPassword = document.getElementById('passwordInput').value

    let userNotFound = true
    let currentUserIndex = 0
    while (userNotFound && currentUserIndex < users.length) {
        let currentUser = users[currentUserIndex]
        if (currentUser.name === givenUsername && currentUser.password === givenPassword) {
            document.getElementById("login").style.display = 'none'
            document.getElementById("mainContent").style.display = 'block'
            document.getElementById('welcomeHeader').innerHTML = "Welcome " + givenUsername + "!"
            document.getElementById('errorMessageLogin').innerHTML = ''
            loggedInUser = currentUser;
            displayContacts()
            userNotFound = false
        }
        currentUserIndex++
    }
    if (userNotFound) document.getElementById('errorMessageLogin').innerHTML = "Login credentials where incorrect! Please try again!"
    document.getElementById('usernameInput').value = null;
    document.getElementById('passwordInput').value = null;
}

function displayContacts() {
    let contactsDiv = document.getElementById('contactsDiv')
    loggedInUser
    loggedInUser.contacts.forEach(function (contact) {
        let contactList = document.createElement('UL')
        for (var propertyName in contact) {
            addContactListElement(contactList, contact[propertyName])
        }
        contactsDiv.appendChild(contactList)
    });
}

function addContactListElement(contactList, contactAttribute) {
    let listElement = document.createElement("LI");          // Create a <li> node
    let listElementText = document.createTextNode(contactAttribute);         // Create a text node
    listElement.appendChild(listElementText);
    contactList.appendChild(listElement)
}