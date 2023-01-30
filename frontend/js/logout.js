const logoutButton = document.getElementById("log-out");


logoutButton.addEventListener("click", event => {
    sessionStorage.clear();
    window.location.href = "login.html";
})