const users = [
    {
        name: 'admina',
        password: 'pass123',
        role: "admin",
        contacts: [
            {
                id: 1,
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
                id: 2,
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
                id: 3,
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
                id: 4,
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
let nextID = 5

/**
 * Log out currently logged in user
 */
function logout() {
    loggedInUser = null
    displayHTMLElements('login')
    hideHTMLElements('mainContent', 'changeContacts')
    clearContactsView()
}

function initApp() {
    logout()
}

function login() {
    let givenUsername = document.getElementById('usernameInput').value
    let givenPassword = document.getElementById('passwordInput').value

    let userNotFound = true
    let currentUserIndex = 0
    while (userNotFound && currentUserIndex < users.length) {
        let currentUser = users[currentUserIndex]
        if (currentUser.name === givenUsername && currentUser.password === givenPassword) {
            hideHTMLElements('login', 'changeContacts')
            displayHTMLElements('mainContent')
            document.getElementById('welcomeHeader').innerHTML = "Welcome " + givenUsername + "!"
            document.getElementById('errorMessageLogin').innerHTML = ''
            loggedInUser = currentUser;
            displayOwnContacts()
            displayOwnContactsOnMapAsMarkers()
            userNotFound = false
        }
        currentUserIndex++
    }
    if (userNotFound) document.getElementById('errorMessageLogin').innerHTML = "Login credentials where incorrect! Please try again!"
    document.getElementById('usernameInput').value = null;
    document.getElementById('passwordInput').value = null;
}

/**
 * Display the "add contacts" screen
 */
function displayAddContactView() {
    displayHTMLElements('changeContacts', 'saveButton')
    hideHTMLElements('mainContent', 'updateButtonUpdateForm', 'deleteButtonUpdateForm')

    if (loggedInUser.role == "user") {
        hideHTMLElements('ownerListElement')
    }
}

/**
 * Display the "update/delete contacts" screen
 */
function displayChangeContactView() {
    displayHTMLElements('changeContacts', 'updateButtonUpdateForm', 'deleteButtonUpdateForm')
    hideHTMLElements('mainContent', 'saveButton')

    if (loggedInUser.role == "user") {
        hideHTMLElements('ownerListElement')
    }
}

/**
 * Display the "main Content" screen
 */
function displayMapView() {
    displayHTMLElements('mainContent')
    hideHTMLElements('changeContacts')
}

/**
 * Display all html elements which IDs are given as parameter
 * @param args variable amount of html element IDs
 */
function displayHTMLElements(...args) {
    args.forEach(function (elementID) {
        document.getElementById(elementID).style.display = 'block'
    });
}

/**
 * Hide all html elements which IDs are given as parameter
 * @param args variable amount of html element IDs
 */
function hideHTMLElements(...args) {
    args.forEach(function (elementID) {
        document.getElementById(elementID).style.display = 'none'
    });
}

