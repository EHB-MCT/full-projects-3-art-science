function openPopup() {

    getData(`https://kunstinhuis-6ha5.onrender.com/getCollectionsByUserID?id=${userId.userId}`)
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
    <div class="collection-group">
        <p id="close-popupBtn"><i class="fa-solid fa-x"></i></p>
        <h1> Mijn collecties </h1>
        <div id="collectionName">
        </div>
        <div class="new-collection" id="new-collection"> 
            <i class="fa-solid fa-square-plus"></i>
            <p>Nieuwe collectie</p>
        </div>
    </div>
    </aside>`;

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
        <div class="collection-group">
        <p id="close-popupBtn-collection"><i class="fa-solid fa-x"></i></p>
        <h1> Nieuwe collectie </h1>
        <input type="text" id="fname" name="fname" placeholder="Naam collectie" maxlength="15">

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
    }
}