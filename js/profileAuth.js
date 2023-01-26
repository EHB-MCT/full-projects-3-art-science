// check the session storage

let user = JSON.parse(sessionStorage.getItem('user'));

if (user) {

    document.getElementById("profile-firstname").innerText = `${user.firstname}`;
    document.getElementById("profile-lastname").innerText = `${user.lastname}`;

    // set navigation data
    // fill in username
    // load in user specific data: favorites, pictures, recipes,...etc
} else {
    window.location.href = "login.html";
}
