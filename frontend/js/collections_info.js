fetch("../js/artworksData.json")
    .then(res => res.json())
    .then(data => searchInJson(data))


function searchInJson(jsonData) {
    const artworkID = sessionStorage.getItem("artworkID");
    var result = jsonData.filter(x => x.Identificatienummer == artworkID);
    artworkData(result);
}

function artworkData(artworkFound) {
    let artworkToRender = artworkFound[0];

    var input = artworkToRender.Identificatienummer.toString();
    var result = [];

    while (input.length) {
        result.push(input.substr(0, 4));
        input = input.substr(4);
    }
    let availabilityString = "";

    switch (artworkToRender['Zichtbaar op site']) {
        case "Ja":
            availabilityString = `Beschibaar <i class="fa-solid fa-check"></i>`;

            break;
        case "Nee":
            availabilityString = `Niet Beschikbaar <i class="fa-solid fa-xmark"></i>`;

            break;
        default:

    }
    const imgArr = ["https://create.overlyapp.com/webar/e30c1d7393267baa26da8e6ca23b6b5c", "https://create.overlyapp.com/webar/0ecfb404f50a83b8ba1d310dcbacd7ec",
        "https://create.overlyapp.com/webar/c271fff94f937a9d77edab7e0c544da2", "https://create.overlyapp.com/webar/341d709af20f0f2458dccf013c88a059",
        "https://create.overlyapp.com/webar/ccbfbb153f2473d481fda1f8f2d21db3", "https://create.overlyapp.com/webar/edb6500fe796222b7b1960c181bc1eb4",
        "https://create.overlyapp.com/webar/11a1dd6a7b3534acaa85c57af7cfd75c", "https://create.overlyapp.com/webar/91f83fbf7be6bd857d6c2be5862494cb"
    ];
    let number = Math.floor(Math.random() * 8);
    htmlString = ` <div class="paragraph">
    <h1 class="greenBackground-title">${artworkToRender.Titel}</h1>
    <p>Door ${artworkToRender.Kunstenaar}</p>
</div>
<div class="card">
    <img src="https://kunstinhuis.be/assets/files/artworks/_grid/${result[0]}_${result[1]}.jpg">
    <div class="card-text dimensions">
    <main>
    <p>Height</p>
    <p>${artworkToRender['Algemene hoogte']} cm</p>
    <p>Breedte</p>
    <p>${artworkToRender['Algemene breedte']} cm</p>
    <p>Diepte</p>
    <p>${artworkToRender['Algemene diepte']} cm</p>
    <p>Waarde</p>
    <p>€ ${artworkToRender.Verkoopprijs}</p>
    <p>${availabilityString}</p>
    <a href="${imgArr[number]}"/>AR <i class="fa-solid fa-vr-cardboard"></i></a>
</main>
        <div class="button">
            <button class="button button-red"><a href="#">Nu reserveren</a></button>
            <button class="button button-blue" id="popupBtn"><a href="#">Toevoegen aan collectie</a></button>
        </div>
    </div>
</div>`;

    let container = document.getElementById("paragraph-everything");
    container.innerHTML = htmlString;
}