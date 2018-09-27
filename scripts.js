const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return ;

    this.classList.toggle('flip');

    if (!hasFlippedCard) {
        //First click
        hasFlippedCard = true ;
        firstCard = this;

    } else {
        //Second click
        secondCard = this;

    //     do cards match?
        checkForMatch();
        // console.log('Outside');
    }
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework ===  secondCard.dataset.framework;
    // check for match and run function
    isMatch ? disableMatch() : unflipCards();
}

function disableMatch() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards(){
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
}, 1000);
}

function resetBoard () {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(cards => cards.addEventListener('click', flipCard));