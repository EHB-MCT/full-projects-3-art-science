"user strict";


/* LikeCarousel (c) 2019 Simone P.M. github.com/simonepm - Licensed MIT */
let bewaarKunst = document.getElementById("bewaar");
let test = false;
bewaarKunst.addEventListener("click", e => {
    e.preventDefault();
    test = true;
    if (test) {
        bewaarKunst.style.backgroundColor = "#C08898";
        document.getElementById("star").style.color = "yellow";
    }
    // bewaarKunst.style.backgroundColor = "#C08898";
    // document.getElementById("star").style.color = "yellow";
    console.log("werkt dit?");
})

let goodButton = document.getElementById("good");
goodButton.addEventListener("click", e => {

    console.log("test")
})
let badButton = document.getElementById("bad");
badButton.addEventListener("click", e => {

    console.log("test")
})
class Carousel {

    constructor(element) {

        this.board = element

        // add first two cards programmatically
        this.push()
        this.push()

        // handle gestures
        this.handle()

    }

    handle() {

        // list all cards
        this.cards = this.board.querySelectorAll('.card')

        // get top card
        this.topCard = this.cards[this.cards.length - 1]

        // get next card
        this.nextCard = this.cards[this.cards.length - 2]

        // if at least one card is present
        if (this.cards.length > 0) {

            // set default top card position and scale
            this.topCard.style.transform =
                'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)'

            // destroy previous Hammer instance, if present
            if (this.hammer) this.hammer.destroy()

            // listen for tap and pan gestures on top card
            this.hammer = new Hammer(this.topCard)
            this.hammer.add(new Hammer.Tap())
            this.hammer.add(new Hammer.Pan({
                position: Hammer.position_ALL,
                threshold: 0
            }))

            // pass events data to custom callbacks
            this.hammer.on('tap', (e) => {
                this.onTap(e)
            })
            this.hammer.on('pan', (e) => {
                this.onPan(e)
            })

        }

    }

    onTap(e) {

        // get finger position on top card
        let propX = (e.center.x - e.target.getBoundingClientRect().left) / e.target.clientWidth

        // get rotation degrees around Y axis (+/- 15) based on finger position
        let rotateY = 15 * (propX < 0.05 ? -1 : 1)

        // enable transform transition
        this.topCard.style.transition = 'transform 100ms ease-out'

        // apply rotation around Y axis
        this.topCard.style.transform =
            'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(' + rotateY + 'deg) scale(1)'

        // wait for transition end
        setTimeout(() => {
            // reset transform properties
            this.topCard.style.transform =
                'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)'
        }, 100)

    }

    onPan(e) {

        if (!this.isPanning) {

            this.isPanning = true

            // remove transition properties
            this.topCard.style.transition = null
            if (this.nextCard) this.nextCard.style.transition = null

            // get top card coordinates in pixels
            let style = window.getComputedStyle(this.topCard)
            let mx = style.transform.match(/^matrix\((.+)\)$/)
            this.startPosX = mx ? parseFloat(mx[1].split(', ')[4]) : 0
            this.startPosY = mx ? parseFloat(mx[1].split(', ')[5]) : 0

            // get top card bounds
            let bounds = this.topCard.getBoundingClientRect()

            // get finger position on top card, top (1) or bottom (-1)
            this.isDraggingFrom =
                (e.center.y - bounds.top) > this.topCard.clientHeight / 2 ? -1 : 1

        }

        // get new coordinates
        let posX = e.deltaX + this.startPosX
        let posY = e.deltaY + this.startPosY

        // get ratio between swiped pixels and the axes
        let propX = e.deltaX / this.board.clientWidth
        let propY = e.deltaY / this.board.clientHeight

        // get swipe direction, left (-1) or right (1)
        let dirX = e.deltaX < 0 ? -1 : 1

        // get degrees of rotation, between 0 and +/- 45
        let deg = this.isDraggingFrom * dirX * Math.abs(propX) * 45

        // get scale ratio, between .95 and 1
        let scale = (95 + (5 * Math.abs(propX))) / 100

        // move and rotate top card
        this.topCard.style.transform =
            'translateX(' + posX + 'px) translateY(' + posY + 'px) rotate(' + deg +
            'deg) rotateY(0deg) scale(1)'

        // scale up next card
        if (this.nextCard) this.nextCard.style.transform =
            'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(' + scale + ')'

        if (e.isFinal) {

            this.isPanning = false

            let successful = false

            // set back transition properties
            this.topCard.style.transition = 'transform 200ms ease-out'
            if (this.nextCard) this.nextCard.style.transition = 'transform 100ms linear'

            // check threshold and movement direction
            if (propX > 0.25 && e.direction == Hammer.DIRECTION_RIGHT) {

                successful = true
                // get right border position
                posX = this.board.clientWidth

            } else if (propX < -0.25 && e.direction == Hammer.DIRECTION_LEFT) {

                successful = true
                // get left border position
                posX = -(this.board.clientWidth + this.topCard.clientWidth)

            } else if (propY < -0.25 && e.direction == Hammer.DIRECTION_UP) {

                successful = true
                // get top border position
                posY = -(this.board.clientHeight + this.topCard.clientHeight)

            }

            if (successful) {
                test = false;
                if (!test) {
                    bewaarKunst.style.backgroundColor = "#6D6D6F";
                    document.getElementById("star").style.color = "white";
                }
                // throw card in the chosen direction
                this.topCard.style.transform =
                    'translateX(' + posX + 'px) translateY(' + posY + 'px) rotate(' + deg + 'deg)'

                // wait transition end
                setTimeout(() => {
                    // remove swiped card
                    this.board.removeChild(this.topCard)
                    // add new card
                    this.push()
                    // handle gestures on new top card
                    this.handle()
                }, 200)

            } else {

                // reset cards position and size
                this.topCard.style.transform =
                    'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)'
                if (this.nextCard) this.nextCard.style.transform =
                    'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(0.95)'

            }

        }

    }

    push() {

        let imageUrlArray = ["https://kunstinhuis.be/assets/files/made/assets/files/artworks/1007_0105_440_520_s.jpg", "https://kunstinhuis.be/assets/files/made/assets/files/artworks/1290_0036_694_463_s.jpg", "https://kunstinhuis.be/assets/files/made/assets/files/artworks/1466_0010_462_520_s.jpg", "https://kunstinhuis.be/assets/files/made/assets/files/artworks/1417_0018_2_397_520_s.jpg", "https://kunstinhuis.be/assets/files/made/assets/files/artworks/1328_0013_347_520_s.jpg", "https://kunstinhuis.be/assets/files/made/assets/files/artworks/1416_0042_694_500_s.jpg", "https://kunstinhuis.be/assets/files/made/assets/files/artworks/1417_0030_1_694_462_s.jpg", "https://kunstinhuis.be/assets/files/made/assets/files/artworks/1419_0002_1_370_551_s.jpg", "https://kunstinhuis.be/assets/files/artworks/1311_0012.jpg", "https://kunstinhuis.be/assets/files/made/assets/files/artworks/1204_0010_365_520_s.jpg", "https://kunstinhuis.be/assets/files/made/assets/files/artworks/0582_0056_694_460_s.jpg", "https://kunstinhuis.be/assets/files/made/assets/files/artworks/1137_0030-min_421_520_s.jpg", "https://kunstinhuis.be/assets/files/made/assets/files/artworks/1267_0020_440_520_s.jpg", "https://kunstinhuis.be/assets/files/made/assets/files/artworks/0577_0092_325_520_s.jpg", "https://kunstinhuis.be/assets/files/made/assets/files/artworks/1479_0010_412_520_s.jpg", "https://kunstinhuis.be/assets/files/made/assets/files/artworks/1113_0003_583_520_s.jpg", "https://kunstinhuis.be/assets/files/made/assets/files/artworks/1229_0026_597_520_s.jpg", "https://kunstinhuis.be/assets/files/made/assets/files/artworks/1262_0028_436_520_s.jpg", "https://kunstinhuis.be/assets/files/made/assets/files/artworks/1394_0014_678_520_s.jpg", "https://kunstinhuis.be/assets/files/made/assets/files/artworks/0998_0105_367_520_s.jpg", "https://kunstinhuis.be/assets/files/made/assets/files/artworks/1286_0155_349_520_s.jpg", "https://kunstinhuis.be/assets/files/made/assets/files/artworks/1492_0002_1_233_520_s.jpg", "https://kunstinhuis.be/assets/files/artworks/0577_0089_1.jpg", "https://kunstinhuis.be/assets/files/made/assets/files/artworks/0975_0030_401_520_s.jpg"];

        let item = imageUrlArray[Math.floor(Math.random() * imageUrlArray.length)];

        // console.log(item);
        let card = document.createElement('div')

        card.classList.add('card')

        card.style.backgroundImage =
            `url('${item}')`

        this.board.insertBefore(card, this.board.firstChild)

    }

}

let board = document.querySelector('#board')

let carousel = new Carousel(board)
















// push() {
//     fetch("./csvjson.json")
//         .then(res => res.json())
//         .then(data => getRandomIndex(data))

//     function getRandomIndex(data) {
//         console.log(data)
//         const randomIndex = Math.floor(Math.random() * data.length);
//         console.log(randomIndex);
//         let identificatienummer = data[randomIndex].Identificatienummer;
//         console.log(identificatienummer);
//         var result = [];
//         while (identificatienummer.length) {
//             result.push(identificatienummer.substr(0, 4));
//             identificatienummer = identificatienummer.substr(4);
//         }
//         console.log(result);
//         let card = document.createElement('div')

//         card.classList.add('card')
//         card.style.backgroundImage =
//             `url('https://cdn.pixabay.com/photo/2016/12/15/20/21/texture-1909992__340.jpg')`;
//         // card.style.backgroundImage =
//         //     `url('https://kunstinhuis.be/assets/files/artworks/_thumb/${result[0]}_${result[1]}.jpg')`

//         this.board.insertBefore(card, this.board.firstChild)
//     }



// }