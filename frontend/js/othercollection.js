const collectionID = sessionStorage.getItem("collectionID");


// GET JSON FILE DATA
jsonDATA = [];
fetch("../js/artworksData.json")
    .then(res => res.json())
    .then(data => jsonDATA = data)
getData(`http://localhost:3000/getCollectionByID?id=${collectionID}`)
    .then(data => {
        initArtworks(data.data.listOfArtworks);
        document.getElementById("person-name").innerHTML = `<h1 class="greenBackground-title">${data.data.userFirstname}</h1>
        <h1 class="greenBackground-title">${data.data.userLastname}</h1>`;
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