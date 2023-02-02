const collectionID = sessionStorage.getItem("collectionID");
const collectionName1 = sessionStorage.getItem("collectionName");

jsonDATA = [];
fetch("../js/artworksData.json")
    .then(res => res.json())
    .then(data => jsonDATA = data)

getData(`https://kunstinhuis-6ha5.onrender.com/getCollectionByID?id=${collectionID}`).then(data => {
    initArtworks(data.data.listOfArtworks);
    document.getElementById("collection-title").innerHTML = data.data.collectionName;
    sessionStorage.setItem("collectionName", data.data.collectionName)
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
        htmlString += `       <div class="card">
        <img src="https://kunstinhuis.be/assets/files/artworks/_grid/${resultImage[0]}_${resultImage[1]}.jpg">
        <div class="card-text ${availableStripe}">
            <h3>${item.Titel}</h3>
            <h4>${item.Kunstenaar}</h4>
            <div class="availability-mycoll">
            <p>${availabilityString}</p>
            <button class="button-mycol button-blue"><a><i
                        class="fa-solid fa-circle-info fa-xl"></i></a></button>
            <button class="button-mycol button-red" id='${item.Identificatienummer}' onClick="deleteArtwork(this.id)"><a><i
                        class="fa-solid fa-trash-can fa-xl"></i></a></button>
        </div>
        </div>
    </div>`;
        // deleteArtwork(item.Identificatienummer)
    });
    let container = document.getElementById("artworks-cards");
    container.innerHTML = htmlString;
}

function deleteArtwork(artworkId, collectionName) {
    document.getElementById("background-shadow").innerHTML =
        `<div id="box-messeage">
    <h1>Kunstwerk verwijderen</h1>
    <h3>Wil je het kunstwerk uit je collectie verwijderen?</h3>
    <div class="cancel-btn"><button id="cancel-btn">NEE</button></div>
    <div class="delete-btn"><button id="delete-btn">JA</button></div>
</div>`;
    document.getElementById("background-shadow").style.display = "flex";
    document.getElementById("cancel-btn").addEventListener("click", e => {
        document.getElementById("background-shadow").style.display = "none";
    })
    document.getElementById("delete-btn").addEventListener("click", e => {

        getData(`https://kunstinhuis-6ha5.onrender.com/deleteArtwork?id=${collectionID}`, "POST", { "listOfArtworks": artworkId })
        document.getElementById("box-messeage").innerHTML = `<h1 id="h1-success-message">Het kunstwerk is succesvol verwijderd uit ${collectionName1}</h1>`;
        document.getElementById("h1-success-message").style.color = "#f1f0eb";
        document.getElementById("box-messeage").style.backgroundColor = "#00BC85";

        setTimeout(function () {
            window.location.reload();
        }, 2500)
    })
}
document.getElementById("btn-deleteCollectie").addEventListener("click", e => {
    document.getElementById("background-shadow").innerHTML =
        `<div id="box-messeage">
            <h1>Collectie verwijderen</h1>
            <h3>Wil je de collectie verwijderen?</h3>
            <div class="cancel-btn"><button id="cancel-btn">NEE</button></div>
            <div class="delete-btn"><button id="delete-btn">JA</button></div>
    </div>`;
    document.getElementById("background-shadow").style.display = "flex";
    document.getElementById("cancel-btn").addEventListener("click", e => {
        document.getElementById("background-shadow").style.display = "none";
    })
    document.getElementById("delete-btn").addEventListener("click", e => {
        getData(`https://kunstinhuis-6ha5.onrender.com/deleteCollection?id=${collectionID}`, "delete")
        document.getElementById("box-messeage").innerHTML = `<h1>De collectie is succesvol verwijderd</h1>`;
        document.getElementById("box-messeage").style.color = "#00BC85";
        setTimeout(function () {
            location.replace("profile.html");
        }, 2500)
    })

})
async function getData(url, method, data) {
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