// check the session storage

let user = JSON.parse(sessionStorage.getItem('user'));

if (user) {
    document.getElementById("greatUser-artworksInfo").innerText = `Hey, ${user.firstname}!`;
    document.getElementById("greatUser-collectionInfo").innerText = `Hey, ${user.firstname}!`;


    // set navigation data
    // fill in username
    // load in user specific data: favorites, pictures, recipes,...etc
} else {
    window.location.href = "login.html";
}
