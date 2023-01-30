const btnArtworks = document.getElementById("btn-artwork");
const btnCollection = document.getElementById("btn-collection");

const artworksBlock = document.getElementById("artworks");
const collectionsBlock = document.getElementById("collections");
btnArtworks.addEventListener("click", domArtworks);
btnCollection.addEventListener("click", domCollection);

function domCollection() {
    document.getElementById("artworks").style.display = "none";
    document.getElementById("collections").style.display = "block";
}

function domArtworks() {
    document.getElementById("artworks").style.display = "block";
    document.getElementById("collections").style.display = "none";
}