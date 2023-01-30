

const btnArtworks = document.getElementById("btn-artwork");
const btnCollection = document.getElementById("btn-collection");

const artworksBlock = document.getElementById("artworks");
const collectionsBlock = document.getElementById("collections");
btnArtworks.addEventListener("click", domArtworks);
btnCollection.addEventListener("click", domCollection);

function domCollection() {
    document.getElementById("artworks").style.display = "none";
    document.getElementById("collections").style.display = "block";

    getData("http://localhost:3000/getAllCollections")
        .then(data => {
            renderCollections(data);
        })

}

function domArtworks() {
    document.getElementById("artworks").style.display = "block";
    document.getElementById("collections").style.display = "none";

}

async function renderCollections(data) {
    let htmlString = "";
    data.forEach(collection => {
        getData(`http://localhost:3000/getUserName?id=${collection.userId}`).then(user => {
            console.log(collection.collectionName)
            htmlString += `           
        <div class="card" id="${collection.collectionId}">
            <a href="othercollection.html">
                <div class="card-collecions-img">
                    <img src="../img/collection_2.png">
                    <img src="../img/collection_3.png">
                    <img src="../img/collection_4.png">
                    <img src="../img/collection_5.png">
                </div>
                <div class="card-text is-available">
                    <h3>${collection.collectionName}</h3>
                    <h4>Door ${user.data.firstname} ${user.data.lastname}</h4>
                    <div class="availability">
                        <p>${collection.listOfArtworks.length} Kunstwerken </p>
                        <button class="button button-blue">Details <i
                                class="fa-solid fa-circle-info"></i></button>
                    </div>
                </div>
            </a>
        </div>`;
            let container = document.getElementById("collections-cards");
            // container.insertAdjacentHTML("afterbegin", htmlString);
            container.innerHTML = htmlString
        });
    })
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