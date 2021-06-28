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

    validateUserCredentials({userId: givenUsername, password: givenPassword})

    document.getElementById('usernameInput').value = null;
    document.getElementById('passwordInput').value = null;
}

function validateUserCredentials(userCredentials) {
    let httpRequest = new XMLHttpRequest();
    let url = "http://localhost:3000/users/login"
    httpRequest.open("POST", url, true)
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.onerror = function () {
        console.log("Connecting to server with " + url + " failed!\n");
    };
    httpRequest.onload = loginValidatedUser
    let json = JSON.stringify(userCredentials)
    httpRequest.send(json);
}

function loginValidatedUser(e) {
    let data = this.response;
    let obj = JSON.parse(data);
    if (this.status == 200) {
        console.log(obj);
        loggedInUser = obj
        hideHTMLElements('login', 'changeContacts')
        displayHTMLElements('mainContent')
        document.getElementById('welcomeHeader').innerHTML = "Welcome " + loggedInUser.userId + "!"
        document.getElementById('errorMessageLogin').innerHTML = ''
        displayOwnContacts()
        displayOwnContactsOnMapAsMarkers()
    } else {
        document.getElementById('errorMessageLogin').innerHTML = "Login credentials where incorrect! Please try again!"
        console.log("HTTP-status code was: " + obj.status);
    }
}

// function login() {
//     let givenUsername = document.getElementById('usernameInput').value
//     let givenPassword = document.getElementById('passwordInput').value
//
//     let userNotFound = true
//     let currentUserIndex = 0
//     while (userNotFound && currentUserIndex < users.length) {
//         let currentUser = users[currentUserIndex]
//         if (currentUser.userId === givenUsername && currentUser.password === givenPassword) {
//             hideHTMLElements('login', 'changeContacts')
//             displayHTMLElements('mainContent')
//             document.getElementById('welcomeHeader').innerHTML = "Welcome " + givenUsername + "!"
//             document.getElementById('errorMessageLogin').innerHTML = ''
//             loggedInUser = currentUser;
//             displayOwnContacts()
//             displayOwnContactsOnMapAsMarkers()
//             userNotFound = false
//         }
//         currentUserIndex++
//     }
//     if (userNotFound) document.getElementById('errorMessageLogin').innerHTML = "Login credentials where incorrect! Please try again!"
//     document.getElementById('usernameInput').value = null;
//     document.getElementById('passwordInput').value = null;
// }

/**
 * Display the "add contacts" screen
 */
function displayAddContactView() {
    displayHTMLElements('changeContacts', 'saveButton')
    hideHTMLElements('mainContent', 'updateButtonUpdateForm', 'deleteButtonUpdateForm')

    if (loggedInUser.isAdmin) {
        displayHTMLElements('ownerListElement')
    } else {
        hideHTMLElements('ownerListElement')
    }
}

/**
 * Display the "update/delete contacts" screen
 */
function displayChangeContactView() {
    displayHTMLElements('changeContacts', 'updateButtonUpdateForm', 'deleteButtonUpdateForm')
    hideHTMLElements('mainContent', 'saveButton')

    if (loggedInUser.isAdmin) {
        displayHTMLElements('ownerListElement')
    } else {
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

