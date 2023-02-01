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



    let htmlString = "";

    artworksToRender.forEach(item => {
        let waarde = false;
        let checkBox = document.getElementById("test");
        checkBox.addEventListener("click", myFunction(item))

        let availabilityString = "";
        let availableStripe = "";


        function myFunction(item) {
            if (checkBox.checked == false) {
                waarde = false;
            } else {
                waarde = true;
            }
            console.log(waarde)

        }




        // De knop

    });
    let container = document.getElementById("artworks-cards");
    container.insertAdjacentHTML("afterbegin", htmlString);
}