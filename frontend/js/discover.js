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
    console.log(data);
    data.forEach(collection => {

        let artworksWithUnderscore =[];
            collection.listOfArtworks.forEach(artworkID => {
                var input = artworkID;
                var result =[];
                while (input.length){
                    result.push(input.substr(0,4));
                    input = input.substr(4);
                }
                artworksWithUnderscore.push(`https://kunstinhuis.be/assets/files/artworks/_grid/${result[0]}_${result[1]}.jpg`);
            })
            console.log(artworksWithUnderscore);
       
       
           htmlString += `           
        <div class="card" id="${collection.collectionId}" onClick="reply_click_collection(this.id)">
          
                <div class="card-collecions-img">
                    <img src=${artworksWithUnderscore[0]} loading="lazy">
                    <img src=${artworksWithUnderscore[1]} loading="lazy">
                    <img src=${artworksWithUnderscore[2]} loading="lazy">
                    <img src=${artworksWithUnderscore[3]} loading="lazy">
                </div>
                <div class="card-text is-available">
                    <h3>${collection.collectionName}</h3>
                    <h4>Door ${collection.userName}</h4>
                    <div class="availability">
                        <p>${collection.listOfArtworks.length} Kunstwerken </p>
                        <button class="button button-blue">Details <i
                                class="fa-solid fa-circle-info"></i></button>
                    </div>
                </div>
         
        </div>`;
        // htmlString = htmlString + newHtml;
            let container = document.getElementById("collections-cards");
            // container.insertAdjacentHTML("afterbegin", htmlString);
            container.innerHTML = htmlString;
       
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
    } catch (error) {}
}