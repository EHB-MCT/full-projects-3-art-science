const collectionID = sessionStorage.getItem("collectionID");
let user = JSON.parse(sessionStorage.getItem('user'));




// GET JSON FILE DATA
jsonDATA = [];
fetch("../js/artworksData.json")
    .then(res => res.json())
    .then(data => jsonDATA = data)
getData(`https://kunstinhuis-6ha5.onrender.com/getCollectionByID?id=${collectionID}`)
    .then(data => {
        initArtworks(data.data.listOfArtworks);
        sessionStorage.setItem("collectionName", data.data.collectionName)
        let collectionName = sessionStorage.getItem("collectionName");
        console.log(collectionName)
        document.getElementById("person-name").innerHTML = `<h1 class="greenBackground-title">${data.data.userFirstname}</h1>
        <h1 class="greenBackground-title">${data.data.userLastname}</h1>`;
        document.getElementById("collection-box-title").innerHTML =
            ` <h1 class="collection-title" id="collection-title">${collectionName}</h1>
        <h3 class="collection-name">Collectie</h3>`;
    })







function initArtworks(data) {
    let artworksFoundFromJSON = [];

    data.forEach(element => {
        const value = element;
        const key = "Identificatienummer";
        const result = jsonDATA.filter(d => d[key] == value);
        let artwork = result[0];
        artworksFoundFromJSON.push(artwork);
    });
    renderArtworks(artworksFoundFromJSON)
}

function renderArtworks(artworks) {
    let htmlString = "";
    artworks.forEach(item => {
        let availabilityString = "";
        let availableStripe = "";
        switch (item['Zichtbaar op site']) {
            case "Ja":
                availabilityString = `Beschibaar <i class="fa-solid fa-check"></i>`;
                availableStripe = `is-available`;
                break;
            case "Nee":
                availabilityString = `Niet Beschikbaar <i class="fa-solid fa-xmark"></i>`;
                availableStripe = `not-available`;
                break;
            default:

        }

        var input = item.Identificatienummer.toString();
        var resultImage = [];

        while (input.length) {
            resultImage.push(input.substr(0, 4));
            input = input.substr(4);
        }
        htmlString += `
        <div class="card" id="${item.Identificatienummer}" onClick="reply_click(this.id)">
            <img src="https://kunstinhuis.be/assets/files/artworks/_grid/${resultImage[0]}_${resultImage[1]}.jpg">
            <div class="card-text ${availableStripe}">
                <h3>${item.Titel}</h3>
                <h4>${item.Kunstenaar}</h4>
                <div class="availability">
                <p>${availabilityString}</p>
                    <button class="button button-blue">Details <i
                            class="fa-solid fa-circle-info"></i></button>
                </div>
            </div>
       
            
    </div>`;
    });
    let container = document.getElementById("artworks-cards");
    container.insertAdjacentHTML("afterbegin", htmlString);

}




// const followButton = document.getElementById("follow-button");
// followButton.addEventListener("click", event => {
//     console.log("werkt dit?")


//     let userId = user.userId;
//     console.log(userId)

// })








getData(`https://kunstinhuis-6ha5.onrender.com/findFollowedCollection?id=${user.userId}`)
    .then(data => {

        let array = data.data;

        var result = array.find(item => item.collectionId === collectionID);
        if (result == undefined) {
            let htmlString = "";
            htmlString = `
            <button class="follow-col" id="follow-button"> Collectie volgen <i
                    class="fa-solid fa-square-plus"></i></button>`;
            let collectionHead = document.getElementById("collection-head");
            collectionHead.innerHTML = htmlString;
            // collectionHead.insertAdjacentHTML("afterbegin", htmlString)

            const followButton = document.getElementById("follow-button");
            followButton.addEventListener("click", event => {
                let userId = user.userId;


                updateData(`https://kunstinhuis-6ha5.onrender.com/addFollowerToCollection?id=${collectionID}`, "PATCH", {
                    "followers": userId
                })
                setTimeout(function () {
                    location.reload();
                }, 500)

            });
        } else {
            let htmlString = "";
            htmlString = ` 

            <button class="follow-col" id="unfollow-button"> Collectie gevolgd <i class="fa-solid fa-check"></i></button>`;
            let collectionHead = document.getElementById("collection-head");
            collectionHead.innerHTML = "";
            collectionHead.insertAdjacentHTML("afterbegin", htmlString)

            const followButton = document.getElementById("unfollow-button");
            followButton.addEventListener("click", event => {
                // console.log("werkt deze knop nu voor de stoppen met volgen?")
                let userId = user.userId;
                updateData(`https://kunstinhuis-6ha5.onrender.com/unfollowCollection?id=${collectionID}`, "POST", {
                    "followers": userId
                })
                setTimeout(function () {
                    location.reload()
                }, 500)

            });

        }


    })
async function getData(url) {
    try {
        let resp = await fetch(url, {
            headers: {
                'Content-Type': "application/json"
            },
        });
        const json = await resp.json();
        return json
    } catch (error) { }
}
async function updateData(url, method, data) {
    try {
        let resp = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)
        });
        const json = await resp.json();
        return json
    } catch (error) {
        console.log('catch', error)
    }
}