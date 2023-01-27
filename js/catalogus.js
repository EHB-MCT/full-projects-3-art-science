window.onload = function () {
    async function getData() {
        const response = await fetch("../js/artworksData_two.json");
        if (response.status == 200) {
            return await response.json();
        } else {}
    }

    getData().then(data => {
        let artworksToRender = [];
        data.forEach(element => {
            const idNummer = element.Identificatienummer;
            const nameArtwork = element.Titel;

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
        htmlText(artworksToRender)
    })


    function htmlText(artworksToRender) {
        artworksToRender.forEach(data => {
            let artTitle = data.title;
            let artImage = data.imageUrl;
            let artArtist = data.artist;
            let artAvailable = data.available;
            let htmlString = "";
            htmlString += ` <div class="card">
            <a href="suggestions_info.html">
                <img src=${artImage}>
                <div class="card-text is-available">
                    <h3>${artTitle}</h3>
                    <h4>Door${artArtist} </h4>
                    <div class="availability">
                        <p>Beschikbaar ${artAvailable}</p>
                        <button class="button button-blue">Details <i
                                class="fa-solid fa-circle-info"></i></button>
                    </div>
                </div>
            </a>
        </div>`

            document.getElementById("artworks-cards").innerHTML += htmlString;
        })
    }


    getData();
}