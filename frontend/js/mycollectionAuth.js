// check the session storage

let user = JSON.parse(sessionStorage.getItem('user'));

if (user) {

    document.getElementById("myCollection-Voornaam").innerText = `${user.firstname}`;
    document.getElementById("myCollection-Achternaam").innerText = `${user.lastname}`;

    // set navigation data
    // fill in username
    // load in user specific data: favorites, pictures, recipes,...etc
} else {
    window.location.href = "login.html";
}
