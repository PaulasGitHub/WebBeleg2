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

function logout() {
    document.getElementById("login").style.display = 'block'
    document.getElementById("mainContent").style.display = 'none'
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
            userNotFound = false
        }
        currentUserIndex++
    }
    if (userNotFound) document.getElementById('errorMessageLogin').innerHTML = "Login credentials where incorrect! Please try again!"
    document.getElementById('usernameInput').value = null;
    document.getElementById('passwordInput').value = null;

}