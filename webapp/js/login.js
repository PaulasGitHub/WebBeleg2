function showLoginContent() {
    let loginDiv = document.getElementById("login");
    let mainContentDiv = document.getElementById("mainContent")
    loginDiv.style.display = 'block'
    mainContentDiv.style.display = 'none'
}

function showLoggedInContent() {
    let loginDiv = document.getElementById("login");
    let mainContentDiv = document.getElementById("mainContent")
    loginDiv.style.display = 'none'
    mainContentDiv.style.display = 'block'
}