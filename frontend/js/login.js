let firstTimeHere = sessionStorage.getItem("firstTimeHere");
console.log(firstTimeHere)

document.getElementById("btn-login").addEventListener("click", e => {
    let user = {};
    user.email = document.getElementById("email").value;
    user.password = document.getElementById("password").value;
    getData("https://kunstinhuis-6ha5.onrender.com/login", "POST", user).then(data => {
        if (data.status) {
            sessionStorage.setItem("user", JSON.stringify(data.data))

            if (firstTimeHere) {
                firstTimeHere = false;

                location.replace('interests.html')
            } else {
                location.replace('profile.html')

            }
        } else {
            document.getElementById("messageLogin").innerHTML = data.message;
            document.getElementById("messageLogin").style.color = "#FC6256";
        }
    })
})
async function getData(url, method, data) {
    let resp = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    });
    return await resp.json();
}