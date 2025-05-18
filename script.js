const cards = document.querySelectorAll(".card");

let matchCard = 0;
let cardOne = null, cardTwo = null;
let disableDeck = false;

function flipCard(e) {
    const clickedCard = e.currentTarget;

    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("flip");

        if (!cardOne) {
            cardOne = clickedCard;
            return;
        }

        cardTwo = clickedCard;
        disableDeck = true;

        const cardOneImg = cardOne.querySelector("img").src;
        const cardTwoImg = cardTwo.querySelector("img").src;

        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matchCard++;
        if (matchCard == 8) {
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
        }
        // Match found — keep them flipped
        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
        cardOne = cardTwo = null;
        return disableDeck = false;
    } else {
        // Not a match — shake and flip back
        setTimeout(() => {
            cardOne.classList.add("shake");
            cardTwo.classList.add("shake");
        }, 400);

        setTimeout(() => {
            cardOne.classList.remove("shake", "flip");
            cardTwo.classList.remove("shake", "flip");
            cardOne = cardTwo = null;
            disableDeck = false;
        }, 1200);
    }
}

// ✅ Improved shuffle function using Fisher-Yates algorithm
function shuffleCard() {
    matchCard = 0;
    cardOne = cardTwo = null;
    disableDeck = false;
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

    // Fisher-Yates shuffle
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        const imgTag = card.querySelector("img");
        imgTag.src = `images/img-${arr[index]}.png`; 
        card.addEventListener("click", flipCard);
// Adjust path if needed
    });
}



cards.forEach(card => {
    card.classList.add("flip");
    card.addEventListener("click", flipCard);
});

shuffleCard()