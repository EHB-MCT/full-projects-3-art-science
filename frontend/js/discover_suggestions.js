let userId = JSON.parse(sessionStorage.getItem('user'));
getAllData();
async function getAllData() {
    const jsonData = await getData("../js/artworksData.json");
    const userInterest = await getData(`https://kunstinhuis-6ha5.onrender.com/getUserInterest?id=${userId.userId}`);
    if (typeof userInterest === 'undefined') {
        console.log("geen data gevonden")

        let htmlString = "";



        htmlString = ` <div class="paragraph-photo-btn">
        <div id="paragraph">
            <h1 id="greatUser-artworksInfo">Whoops...</h1>
            <p>Je krijgt nog geen suggesties te zien! Hiervoor moet je eerst kunstwerken swipen om jouw eigen interesse te kunnen bepalen.
            </p>
        </div>
        <div class="buttons">
            <button class="button button-red"><a href="interests.html">Swipe Interesses</a></button>
        </div>
        <i class="fa-solid fa-circle-exclamation"></i>
    </div>
       
       `;
        let container = document.getElementById("artworks");
        container.innerHTML = htmlString;
        // container.insertAdjacentHTML("afterbegin", htmlString);


    } else {
        filterOnJson(jsonData, userInterest);
    }


}

async function getData(url) {
    try {
        let resp = await fetch(url, {
            headers: {
                'Content-Type': "application/json"
            },
        });
        const json = await resp.json();
        return json
    } catch (error) {}
}

function filterOnJson(jsonData, userInterest) {
    let allInterestChoices = [];
    for (const category in userInterest.categoriesInterest) {
        if (userInterest.categoriesInterest[category] > 4) {
            allInterestChoices.push(category)
        }
    }
    for (const color in userInterest.colorsInterest) {
        if (userInterest.colorsInterest[color] > 2) {
            allInterestChoices.push(color)
        }
    }
    let array = [];
    for (let i = 0; i < 200; i++) {
        array.push(jsonData[i])
    }
    allInterestChoices.forEach(item => {
        const filter = array.filter(function (e) {
            return e.Hoofdkleuren.includes(item) ||
                e.categories.includes(item);
        });
        initSuggestions(filter);
    })

}

function initSuggestions(filter) {
    let artworksToRender = [];
    filter.forEach(element => {
        var input = element.Identificatienummer.toString();
        var result = [];

        while (input.length) {
            result.push(input.substr(0, 4));
            input = input.substr(4);
        }
        let artwork = {
            available: element['Zichtbaar op site'],
            title: element.Titel,
            artist: element.Kunstenaar,
            categories: element.categories,
            color: element.Hoofdkleuren,
            imageUrl: `https://kunstinhuis.be/assets/files/artworks/_grid/${result[0]}_${result[1]}.jpg`,
            identificationNumber: element.Identificatienummer.toString(),
        }
        artworksToRender.push(artwork)
    });

    renderSuggestions(artworksToRender);
}

function renderSuggestions(artworksToRender) {



    artworksToRender.forEach(item => {

        let htmlString = "";
        if (item.available == "Ja") {

            let availabilityString = "";
            let availableStripe = "";
            switch (item.available) {
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

            htmlString += `
            <div class="card" id="${item.identificationNumber}" onClick="reply_click(this.id)">
           
                <img src="${item.imageUrl}">
                <div class="card-text ${availableStripe}">
                    <h3>${item.title}</h3>
                    <h4>${item.artist}</h4>
                    <div class="availability">
                        <p>${availabilityString}</p>
                        <button class="button button-blue">Details <i
                                class="fa-solid fa-circle-info"></i></button>
                    </div>
                </div>
           
                
        </div>`;





        }

        let container = document.getElementById("artworks-cards");
        container.insertAdjacentHTML("afterbegin", htmlString);

    });



    let active = false;




    document.getElementById("toggle").addEventListener("click", toggle)

    function toggle() {
        let toggle = document.querySelector('.toggle')
        let text = document.querySelector('.text')
        active = !active
        if (!active) {
            toggle.classList.add('active')
            text.innerHTML = 'Alleen beschikbare'

            artworksToRender.forEach(item => {

                let htmlString = "";
                if (item.available == "Ja") {

                    let availabilityString = "";
                    let availableStripe = "";
                    switch (item.available) {
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

                    htmlString += `
                    <div class="card" id="${item.identificationNumber}" onClick="reply_click(this.id)">
                   
                        <img src="${item.imageUrl}">
                        <div class="card-text ${availableStripe}">
                            <h3>${item.title}</h3>
                            <h4>${item.artist}</h4>
                            <div class="availability">
                                <p>${availabilityString}</p>
                                <button class="button button-blue">Details <i
                                        class="fa-solid fa-circle-info"></i></button>
                            </div>
                        </div>
                   
                        
                </div>`;





                }

                let container = document.getElementById("artworks-cards");
                container.insertAdjacentHTML("afterbegin", htmlString);

            });


        } else {
            toggle.classList.remove('active')
            text.innerHTML = 'Alles';

            artworksToRender.forEach(item => {

                let htmlString = "";

                let availabilityString = "";
                let availableStripe = "";
                switch (item.available) {
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

                htmlString += `
                    <div class="card" id="${item.identificationNumber}" onClick="reply_click(this.id)">
                   
                        <img src="${item.imageUrl}">
                        <div class="card-text ${availableStripe}">
                            <h3>${item.title}</h3>
                            <h4>${item.artist}</h4>
                            <div class="availability">
                                <p>${availabilityString}</p>
                                <button class="button button-blue">Details <i
                                        class="fa-solid fa-circle-info"></i></button>
                            </div>
                        </div>
                   
                        
                </div>`;



                let container = document.getElementById("artworks-cards");
                container.insertAdjacentHTML("afterbegin", htmlString);

            });
        }
    }










}