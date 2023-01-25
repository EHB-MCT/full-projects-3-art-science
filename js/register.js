document.getElementById("btn-register").addEventListener("click", e => {
    let newUser = {};
    newUser.firstname = document.getElementById("firstname").value;
    newUser.lastname = document.getElementById("lastname").value;
    newUser.email = document.getElementById("email").value;
    newUser.password = document.getElementById("password").value;
    newUser.confirmPassword = document.getElementById("confirmPassword").value;


    if (newUser.password == newUser.confirmPassword) {
        getData("http://localhost:3000/register", "POST", newUser).then(data => {
            if (data.status) {
                document.getElementById("messageRegister").style.display = "block";
                document.getElementById("messageRegister").style.color = "#00BC85";
                document.getElementById("messageRegister").innerHTML = data.message;
                setTimeout(function () {
                    location.replace('login.html')
                }, 2500)
            } else {
                document.getElementById("messageRegister").innerHTML = data.message;
                document.getElementById("messageRegister").style.display = "block";
                document.getElementById("messageRegister").style.color = "red";
            }

        })
    } else {
        document.getElementById("messageRegister").innerHTML = "wachtwoord komt niet overeen";
        document.getElementById("messageRegister").style.display = "block";
        document.getElementById("messageRegister").style.color = "red";
    }
})

async function getData(url, method, data) {
    try {
        console.log(data, method)
        let resp = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)
        });
        const json = await resp.json();
        console.log('success', json);
        return json
    } catch (error) {
        console.log('catch', error)
    }

}