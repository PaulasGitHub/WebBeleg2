const users = [
    {name: "admina", password: "pass123"},
    {name: "normalo", password: "pass321"}
]

function logout() {
    let loginDiv = document.getElementById("login");
    let mainContentDiv = document.getElementById("mainContent")
    loginDiv.style.display = 'block'
    mainContentDiv.style.display = 'none'
}

function login() {
    let givenUsername = document.getElementById('usernameInput').value
    let givenPassword = document.getElementById('passwordInput').value

    users.forEach(function (item) {
        if (item.name === givenUsername && item.password === givenPassword) {
            let loginDiv = document.getElementById("login");
            let mainContentDiv = document.getElementById("mainContent")
            loginDiv.style.display = 'none'
            mainContentDiv.style.display = 'block'

            document.getElementById('usernameInput').value = null;
            document.getElementById('passwordInput').value = null;
        }
    });
}