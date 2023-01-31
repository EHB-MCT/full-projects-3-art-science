let userId = JSON.parse(sessionStorage.getItem('user'));

getData(`http://localhost:3000/getCollectionsByUserID?id=${userId.userId}`)
    .then(data => {
        renderCollections(data.data);

    })


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

function renderCollections(data) {
    let htmlString = "";
    console.log(data)
    data.forEach(item => {
        var input = item.listOfArtworks[0].toString();
        var result = [];
        console.log(result)

        while (input.length) {
            result.push(input.substr(0, 4));
            input = input.substr(4);
        }

        htmlString += `
       <div class="card">
        <a href="mycollection.html"><img
                src="https://kunstinhuis.be/assets/files/artworks/_grid/${result[0]}_${result[1]}.jpg"
                alt=""></a>
        <h3>${item.collectionName}</h3>
        <p>Van Mijzelf</p>
    </div>
       `;
    });
    let container = document.getElementById("profile-collections");
    container.insertAdjacentHTML("afterbegin", htmlString);
}