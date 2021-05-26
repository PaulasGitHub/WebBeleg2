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
            showOwnContactsOnMapAsMarkers()
            userNotFound = false
        }
        currentUserIndex++
    }
    if (userNotFound) document.getElementById('errorMessageLogin').innerHTML = "Login credentials where incorrect! Please try again!"
    document.getElementById('usernameInput').value = null;
    document.getElementById('passwordInput').value = null;
}

/**
 * Display the "change contacts" screen
 */
function displayAddContactScreen() {
    displayElements('changeContacts', 'saveButton')
    hideElements('mainContent', 'updateButtonUpdateForm', 'deleteButtonUpdateForm')

    if (loggedInUser.role == "user") {
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

//TODO Check: required fields ausgefüllt bzw. richtig ausgefüllt
//TODO Check: real existierende geo-data angegeben

//TODO contacts clickable -> go to change/delete Contact Screen
//TODO Change/DeleteContactScreen

//TODO hübsch machen
//TODO Daten in JSON-Objekt (optional)

