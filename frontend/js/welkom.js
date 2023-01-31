const textArr = ["De Nieuwe Garde <h1 class='greenBackground-title'> van Kunst</h1> <h1 class='greenBackground-title'>in Huis</h1>", "Lege muur?</h1> <h1 class='greenBackground-title'> Kunst</h1> <h1 class='greenBackground-title'>te huur!", "Altijd het </h1> <h1 class='greenBackground-title'> perfecte kunstwerk</h1> <h1 class='greenBackground-title'> in huis"];
const imgArr = ["../img/WallArt1.jpg", "../img/WallArt2.jpg", "../img/WallArt3.jpg"];


let number = Math.floor(Math.random() * 3);
let number2 = Math.floor(Math.random() * 3);
let img = imgArr[number];
let text = textArr[number2];



document.getElementById("welkom-text-var").innerHTML += `<h1 class="greenBackground-title">${text}</h1>`;
document.getElementById("welkom-image-var").innerHTML += `<img src="${img}" alt="Random image">`;