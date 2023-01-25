const textArr = ["De Nieuwe Garde <h1 class='greenBackground-title'> van Kunst</h1> <h1 class='greenBackground-title'>in Huis</h1>", "Lege muur?</h1> <h1 class='greenBackground-title'> Kunst</h1> <h1 class='greenBackground-title'>tehuur!", "Altijd het </h1> <h1 class='greenBackground-title'> perfecte kunstwerk</h1> <h1 class='greenBackground-title'> in huis"];
const imgArr = ["img/WallArt1.jpg", "img/WallArt2.jpg", "img/WallArt3.jpg"];


let number = Math.floor(Math.random() * 3);
let number2 = Math.floor(Math.random() * 3);
let img = imgArr[number];
let text = textArr[number2];



document.getElementById("welkom-text-var").innerHTML += `<h1 class="greenBackground-title">${text}</h1>`;
document.getElementById("welkom-image-var").innerHTML += `<img src="${img}" alt="Random image">`;



// function randomCombo() {
//     const random = Math.floor(Math.random() * textArr.length);
//     let text = textArr[random];
//     let img = imgArr[random];
//     console.log(random, text, img);


//     document.getElementById("container").onload = function () {
//         onloadfunc()
//         console.log("onload")
//     };

//     function onloadfunc() {
//         document.getElementById("welkom-image-var").innerHTML = `<img src=${img} alt="Random image">`
//         document.getElementById("welkom-text-var").innerHTML = `<h1 class="greenBackground-title">${text}</h1>`
//         console.log("test")
//     };





// }

// randomCombo();

/* <h1 class="greenBackground-title">adsasfdfdsfsdd</h1>
<h1 class="greenBackground-title">adsadsdfs</h1>
<h1 class="greenBackground-title">adsadsd</h1> */