// let artworkID = JSON.parse(sessionStorage.getItem('artworkID'));

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


    let htmlString = "";




    htmlString += `
        <div class="paragraph">
                <h1 class="greenBackground-title">${artworkToRender.Titel}</h1>
                <p>Door ${artworkToRender.Kunstenaar}</p>
            </div>
            <div class="card">
                <img alt="art
                 one" src="https://kunstinhuis.be/assets/files/artworks/_grid/${result[0]}_${result[1]}.jpg">
                <div id="card-text" class="card-text dimensions">
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
            </div>
       `;
    let container = document.getElementById("artworkDetails");
    container.insertAdjacentHTML("afterbegin", htmlString);


    document.getElementById("popupBtn").addEventListener('click', openPopup);


    function openPopup() {

        let userId = JSON.parse(sessionStorage.getItem('user'));
        getData(`http://localhost:3000/getCollectionsByUserID?id=301b2c83-98e5-4395-b0d1-fc7c65771550`)
            .then(data => {
                data.data.forEach(collections => {
                    let htmlString = "";
                    htmlString = `<div id="${collections.collectionId}" onClick="reply_addToCollection(this.id)">
                                    <i class="fa-solid fa-square-plus"></i>
                                    <p>${collections.collectionName}<p/>
                                </div>`;
                    document.getElementById("collectionName").innerHTML += htmlString;
                });
            })



        document.getElementById("card-text").style.display = "none";
        document.getElementById("darker-popup").style.display = "block";
        let htmlStringTwo = "";

        htmlStringTwo += `<aside id="aside-popup">
        <div class="collection-group" id="collection-group">

            <p id="close-popupBtn"><i class="fa-solid fa-x"></i></p>
            <h1> Mijn collecties </h1>
            <div id="collectionName">
            </div>
            <div class="new-collection" id="new-collection"> 
                <i class="fa-solid fa-square-plus"></i>

                <p>Nieuwe collectie</p>


            </div>
        </div>
        </aside>`

        document.getElementById("collection-add").innerHTML = htmlStringTwo;
        document.getElementById("close-popupBtn").addEventListener('click', closePopup);

        function closePopup() {
            document.getElementById("darker-popup").style.display = "none";
            let htmlStringTwo = "";
            document.getElementById("collection-add").innerHTML = htmlStringTwo;
            document.getElementById("card-text").style.display = "block";
            document.getElementById("succesMessage-p").style.display = "none";

        }
        document.getElementById("new-collection").addEventListener('click', openInput)



        function openInput() {
            let htmlStringThree = "";
            htmlStringThree += `<aside id="aside-popup">
            <div class="collection-group" id="collection-group">
            <p id="close-popupBtn-collection"><i class="fa-solid fa-x"></i></p>
            <h1> Nieuwe collectie </h1>
            <input type="text" id="fname" name="fname" placeholder="Naam collectie">
            <button class="button button-red" id="addToCollectionButton"><a href="#">Toevoegen</a></button>
            </div></aside>`;
            document.getElementById("collection-add").innerHTML = htmlStringThree;
            document.getElementById("close-popupBtn-collection").addEventListener('click', closePopupCollection);



            function closePopupCollection() {
                document.getElementById("darker-popup").style.display = "none";
                let htmlStringThree = "";
                document.getElementById("collection-add").innerHTML = htmlStringThree;
                document.getElementById("card-text").style.display = "block";
                document.getElementById("succesMessage-p").style.display = "none";
            }
            //document.getElementById("collection-group").addEventListener('click', succesMsg);

            function succesMsg() {
                document.getElementById("succesMessage-p").style.display = "flex";


                let htmlStringFour = "";
                htmlStringFour += `<aside id="aside-popup">
                <div class="collection-group" id="collection-group">
                <p id="close-popupBtn-collection"><i class="fa-solid fa-x"></i></p>
                <div class="checkmark-popup">
                <i class="fa-solid fa-check fa-3x"></i>
                </div>
                </div>
                </aside>`;
                // document.getElementById("collection-add").innerHTML = htmlStringFour;
                document.getElementById("close-popupBtn-collection").addEventListener('click', closePopupCollection);
            }

            document.getElementById("addToCollectionButton").addEventListener('click', e => {

                let newCollectionName = document.getElementById("fname").value;
                console.log(newCollectionName)
            });


        }

    }


}


// This is the _id of the artwork, it will be used to fetch the details/information of the specific artwork that the user clicked on. 
function reply_addToCollection(clicked_id) {
    document.getElementById("succesMessage-p").style.display = "block";
    document.getElementById("collection-add").style.display = "none";
    setTimeout(function () {


        window.location.reload();
    }, 1500)
    console.log("werkt dit?", clicked_id);
    // sessionStorage.setItem("artworkID", clicked_id);
    // window.location.replace("suggestions_info.html", clicked_id);
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
    } catch (error) {
    }
}

