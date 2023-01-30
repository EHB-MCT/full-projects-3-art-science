document.getElementById("multi").addEventListener("click", multiText)
document.getElementById("mono").addEventListener("click", monoText)
document.getElementById("others").addEventListener("click", othersText)

function multiText() {
    if (document.getElementById("multi")) {
        document.getElementById("multi").style.borderBottom = "3px solid #FC6256"
        document.getElementById("mono").style.borderBottom = "0";
        document.getElementById("others").style.borderBottom = "0";

        document.getElementById("selection-text").innerHTML =
            "<p>Je wil graag 5 of meer kunstwerken in je kantoor en een volledige service? Kies dan voor <strong><mark style='background: #E7C6BB!important'>MULTI</mark></strong>: voor een vast bedrag per jaar ontleen je als organisatie kunstwerken uit onze volledige kunstcollectie.</p>"
    }
}

function monoText() {
    if (document.getElementById("mono")) {
        document.getElementById("multi").style.borderBottom = "0";
        document.getElementById("mono").style.borderBottom = "3px solid #FC6256";
        document.getElementById("others").style.borderBottom = "0";
        document.getElementById("selection-text").innerHTML =
            "<p>Je wil graag 1 tot 4 kunstwerken in je kantoor die je zelf kiest en ophaalt? Kies dan voor <strong> <mark style='background: #FBF7A2!important'>MONO</mark></strong>: voor een vast bedrag per jaar ontleen je als organisatie kunstwerken uit onze volledige kunstcollectie.</p>"
    }
}

function othersText() {
    if (document.getElementById("mono")) {
        document.getElementById("multi").style.borderBottom = "0";
        document.getElementById("mono").style.borderBottom = "0";
        document.getElementById("others").style.borderBottom = "3px solid #FC6256";
        document.getElementById("selection-text").innerHTML =
            "<p>Voor <strong><mark style='background: #CDD4FF!important' >vzw’s, non-profits en partnerships</mark> </strong>hanteren wij aangepaste tarieven. Behoor je tot één van deze drie? Neem dan snel contact op met kunstadviseur Mira voor een voorstel op maat.</p>"
    }
}


const textArr = ["De Nieuwe Garde <h1 class='greenBackground-title'> van Kunst</h1> <h1 class='greenBackground-title'>in Huis</h1>", "Lege muur?</h1> <h1 class='greenBackground-title'> Kunst</h1> <h1 class='greenBackground-title'>tehuur!", "Altijd het </h1> <h1 class='greenBackground-title'> perfecte kunstwerk</h1> <h1 class='greenBackground-title'> in huis"];
const imgArr = ["img/WallArt1.jpg", "img/WallArt2.jpg", "img/WallArt3.jpg"];


let number = Math.floor(Math.random() * 3);
let number2 = Math.floor(Math.random() * 3);
let img = imgArr[number];
let text = textArr[number2];



document.getElementById("welkom-text-var").innerHTML += `<h1 class="greenBackground-title">${text}</h1>`;
document.getElementById("welkom-image-var").innerHTML += `<img src="${img}" alt="Random image">`;