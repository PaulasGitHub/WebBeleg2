const users = [
    {name: "admina", password: "pass123"},
    {name: "normalo", password: "pass321"}
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