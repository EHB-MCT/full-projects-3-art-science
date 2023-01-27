// let artworkID = JSON.parse(sessionStorage.getItem('artworkID'));

fetch("../js/artworksData.json")
    .then(res => res.json())
    .then(data =>searchInJson(data))

function searchInJson(jsonData){
   
    const artworkID = sessionStorage.getItem("artworkID");
    console.log(artworkID)



    var result = jsonData.filter(x => x.Identificatienummer === artworkID);
    artworkData(result);


}

function artworkData(artworkFound){
    let artworkToRender = artworkFound[0];
    console.log(artworkToRender)

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
   


    let htmlString = "";

   
       
     
        htmlString += `
        <div class="paragraph">
                <h1 class="greenBackground-title">${artworkToRender.Titel}</h1>
                <p>Door ${artworkToRender.Kunstenaar}</p>
            </div>
            <div class="card">
                <img alt="art
                 one" src="https://kunstinhuis.be/assets/files/artworks/_grid/${result[0]}_${result[1]}.jpg">
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

                    </main>
                    <div class="button">
                        <button class="button button-red"><a href="#">Nu reserveren</a></button>
                        <button class="button button-blue"><a href="#">Toevoegen aan collectie</a></button>
                    </div>
                </div>
            </div>
       `;
    let container = document.getElementById("artworkDetails");
    container.insertAdjacentHTML("afterbegin", htmlString);
}