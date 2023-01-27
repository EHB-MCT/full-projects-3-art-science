'use strict';
let user = JSON.parse(sessionStorage.getItem('user'));

document.getElementById("log-out").addEventListener("click", e => {
    sessionStorage.clear();
    location.replace('login.html')
})



fetch("../js/artworksData.json")
    .then(res => res.json())
    .then(data => getRandomArtworks(data))

var tinderContainer = document.querySelector('.tinder');
var allCards = document.querySelectorAll('.tinder--card');
var nope = document.getElementById('nope');
var love = document.getElementById('love');

let artworksToSwipe = [];
let artInterestBoolean = false;


let likedCategoriesArray = [];
let dislikedCategoriesArray = [];

let likedColorsArray = [];
let dislikedColorsArray = [];

let ColorsInterest = {};
let CategoriesInterest = {};

let buttonClickCounter = 30;

nope.addEventListener('click', event => {

    artInterestBoolean = false;
    buttonClickCounter--;

    if (buttonClickCounter > 0) {
        popTopArtwork(artInterestBoolean)
    } else if (buttonClickCounter <= 0) {
        countDoublesInCategoriesArray(dislikedCategoriesArray, likedCategoriesArray)
        countDoublesInColorsArray(dislikedColorsArray, likedColorsArray)
        nope.disabled = true;
        prepareInterestsDataToSend(ColorsInterest, CategoriesInterest);
    }
})

love.addEventListener('click', event => {
    artInterestBoolean = true;
    buttonClickCounter--;
    if (buttonClickCounter > 0) {
        popTopArtwork(artInterestBoolean)
    } else if (buttonClickCounter <= 0) {
        countDoublesInCategoriesArray(dislikedCategoriesArray, likedCategoriesArray)
        countDoublesInColorsArray(dislikedColorsArray, likedColorsArray)
        love.disabled = true;
        prepareInterestsDataToSend(ColorsInterest, CategoriesInterest);
    }
})

function prepareInterestsDataToSend(ColorsInterest, CategoriesInterest) {
    let interestData = {};
    interestData.colorsInterest = ColorsInterest;
    interestData.categoriesInterest = CategoriesInterest;
    getData(`http://localhost:3000/saveUserInterest?id=${user.userId}`, "POST", interestData);
    async function getData(url, method, data) {
        let resp = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)
        });
        return await resp.json();
    }
    setTimeout(function () {
        location.replace("discover_suggestions.html");
    }, 500)
    


}

function popTopArtwork(artInterestBoolean) {
    if (artInterestBoolean == false) {
        let categories = artworksToSwipe[buttonClickCounter].categories;
        let color = artworksToSwipe[buttonClickCounter].color;
        const resultCategories = categories.split(/\r?\n/);
        const resultColor = color.split(/\r?\n/);
        dislikedCategoriesArray.push(...resultCategories);
        dislikedColorsArray.push(...resultColor);

    } else if (artInterestBoolean == true) {

        let categories = artworksToSwipe[buttonClickCounter].categories;
        let color = artworksToSwipe[buttonClickCounter].color;

        const resultCategories = categories.split(/\r?\n/);
        const resultColor = color.split(/\r?\n/);
        likedCategoriesArray.push(...resultCategories);
        likedColorsArray.push(...resultColor);
    }

}



function countDoublesInCategoriesArray(dislikedCategories, likedCategories) {
    var dislikeCategoriesCounter = dislikedCategories.reduce((count, item) => (count[item] = count[item] + 1 || -1, count), {});
    var likedCategoriesCounter = likedCategories.reduce((count, item) => (count[item] = count[item] + 1 || 1, count), {});
    function sumObjectsByKey(...objs) {
        return objs.reduce((a, b) => {
            for (let k in b) {
                if (b.hasOwnProperty(k))
                    a[k] = (a[k] || 0) + b[k];
            }
            return a;
        }, {});
    }

    let finalCategoriesCounter = sumObjectsByKey(dislikeCategoriesCounter, likedCategoriesCounter);

    Object.keys(finalCategoriesCounter).forEach(function (key) {
        return Math.abs(finalCategoriesCounter[key])

    });
    CategoriesInterest = finalCategoriesCounter;
}

function countDoublesInColorsArray(dislikedColorsArray, likedColorsArray) {
    var dislikeColorCounter = dislikedColorsArray.reduce((count, item) => (count[item] = count[item] + 1 || -1, count), {});

    var likedColorCounter = likedColorsArray.reduce((count, item) => (count[item] = count[item] + 1 || 1, count), {});

    function sumObjectsByKey(...objs) {
        return objs.reduce((a, b) => {
            for (let k in b) {
                if (b.hasOwnProperty(k))
                    a[k] = (a[k] || 0) + b[k];
            }
            return a;
        }, {});
    }


    let finalColorCounter = sumObjectsByKey(dislikeColorCounter, likedColorCounter);

    Object.keys(finalColorCounter).forEach(function (key) {
        return Math.abs(finalColorCounter[key])

    });
    ColorsInterest = finalColorCounter;
    var variables = Object.keys(finalColorCounter);
}
async function getRandomArtworks(data) {
    let existingArtworksCounter = 0;
    while (existingArtworksCounter < 30) {
        let item = data[Math.floor(Math.random() * data.length)];
        var input = item.Identificatienummer.toString();
        var result = [];

        while (input.length) {
            result.push(input.substr(0, 4));
            input = input.substr(4);
        }

        let artwork = {
            categories: item.categories,
            color: item.Hoofdkleuren,
            imageUrl: `https://kunstinhuis.be/assets/files/artworks/_grid/${result[0]}_${result[1]}.jpg`,
            identificationNumber: item.Identificatienummer.toString(),
        }

        try {
            const exists = await checkIfImageExists(`${artwork.imageUrl}`);

            if (exists) {
                artworksToSwipe.push(artwork)
                existingArtworksCounter++;
            }
        } catch {
            console.log(artwork.identificationNumber, 'Error does not exist');
        }
    }
    renderArtworkCards(artworksToSwipe);
}
function checkIfImageExists(url) {
    return new Promise((resolve, reject) => {
        let img = new Image()
        img.onload = () => resolve(true)
        img.onerror = reject
        img.src = url
    })
}

function renderArtworkCards(artworksToSwipe) {

    let htmlString = "";
    artworksToSwipe.forEach(artwork => {
        let newHtml = `
    <div class="tinder--card">
    <img src=${artwork.imageUrl}>
    </div>
    `;
        htmlString = htmlString + newHtml;
    });
    let container = document.getElementById("cardsWrapper");
    container.insertAdjacentHTML("beforeend", htmlString);
}
function initCards(card, index) {
    var newCards = document.querySelectorAll('.tinder--card:not(.removed)');
    newCards.forEach(function (card, index) {
        card.style.zIndex = allCards.length - index;
        card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
        card.style.opacity = (10 - index) / 10;
    });

    tinderContainer.classList.add('loaded');
}
initCards();
allCards.forEach(function (el) {
    var hammertime = new Hammer(el);

    hammertime.on('pan', function (event) {
        el.classList.add('moving');
    });
    hammertime.on('pan', function (event) {
        if (event.deltaX === 0) return;
        if (event.center.x === 0 && event.center.y === 0) return;
        tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
        tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);
        var xMulti = event.deltaX * 0.03;
        var yMulti = event.deltaY / 80;
        var rotate = xMulti * yMulti;
        event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
    });
    hammertime.on('panend', function (event) {
        el.classList.remove('moving');
        tinderContainer.classList.remove('tinder_love');
        tinderContainer.classList.remove('tinder_nope');
        var moveOutWidth = document.body.clientWidth;
        var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
        event.target.classList.toggle('removed', !keep);
        if (keep) {
            event.target.style.transform = '';
        } else {
            var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
            var toX = event.deltaX > 0 ? endX : -endX;
            var endY = Math.abs(event.velocityY) * moveOutWidth;
            var toY = event.deltaY > 0 ? endY : -endY;
            var xMulti = event.deltaX * 0.03;
            var yMulti = event.deltaY / 80;
            var rotate = xMulti * yMulti;
            event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
            initCards();
        }
    });
});
function createButtonListener(love) {
    return function (event) {
        var cards = document.querySelectorAll('.tinder--card:not(.removed)');
        var moveOutWidth = document.body.clientWidth * 1.5;
        if (!cards.length) return false;
        var card = cards[0];
        card.classList.add('removed');
        if (love) {
            card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
        } else {
            card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
        }
        initCards();
        event.preventDefault();
    };
}
var nopeListener = createButtonListener(false);
var loveListener = createButtonListener(true);
nope.addEventListener('click', nopeListener);
love.addEventListener('click', loveListener);