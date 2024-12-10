const mainPageContainer = document.querySelector('.main-page-container');

const moveCounterElement = document.querySelector('.move-counter'); 
const restartButton = document.getElementById('restart'); 

let counter = 0; 

const welcomePageContainer = document.querySelector('.welcome-page-container');
const welcomeBlock = document.createElement("div");
welcomeBlock.classList.add("welcome-block");
welcomePageContainer.appendChild(welcomeBlock);

const welcomeTitle = document.createElement("h1")
welcomeTitle.classList.add("welcome-title"),
welcomePageContainer.appendChild(welcomeTitle);
welcomeTitle.innerHTML = "Welcome to the Zoo Memory Game";

const startInstruction = document.createElement("p");
startInstruction.classList.add("start-instruction");
welcomePageContainer.appendChild(startInstruction);
startInstruction.innerHTML = "Click on the gate to enter the Zoo and start the game";

const zooGateImgContainer = document.createElement("div");
zooGateImgContainer.classList.add("zoo-gate-img-container");
welcomePageContainer.appendChild(zooGateImgContainer);


const enterGateImg = document.createElement("img");
enterGateImg.classList.add("enter-gate-img");
zooGateImgContainer.appendChild(enterGateImg);
enterGateImg.setAttribute("src", "img/zoogate no background.png");

enterGateImg.addEventListener("click", () => {
    welcomePageContainer.style.display = "none";
    mainPageContainer.style.display = "flex";
    mainPageContainer.style.visibility = "visible";
    const backgroundMusic = new Audio("sounds/game-start.ogg");
    backgroundMusic.play();
    startGame();

});

const cardsCollection = [
    {
        name: "tiger",
        flippedimg: "img/tigre.png",
        type: "tiger"
    },
    {
        name: "tiger",
        flippedimg: "img/tigre.png",
        type: "tiger"
    },
    {
        name: "elephant",
        flippedimg: "img/elefante.png",
        type: "elephant"
    },
    {
        name: "elephant",
        flippedimg: "img/elefante.png",
        type: "elephant"
    },
    {
        name: "crocodile",
        flippedimg: "img/cocodrilo.png",
        type: "crocodile"
    },
    {
        name: "crocodile",
        flippedimg: "img/cocodrilo.png",
        type: "crocodile"
    },
    {
        name: "gorilla",
        flippedimg: "img/gorila.png",
        type: "gorilla"
    },
    {
        name: "gorilla",
        flippedimg: "img/gorila.png",
        type: "gorilla"
    },
    {
        name: "monkey",
        flippedimg: "img/mono.png",
        type: "monkey"
    },
    {
        name: "monkey",
        flippedimg: "img/mono.png",
        type: "monkey"
    },
    {
        name: "snake",
        flippedimg: "img/serpiente.png",
        type: "snake"
    },
    {
        name: "snake",
        flippedimg: "img/serpiente.png",
        type: "snake"
    },
    {
        name: "zebra",
        flippedimg: "img/zebra.png",
        type: "zebra"
    },
    {
        name: "zebra",
        flippedimg: "img/zebra.png",
        type: "zebra"
    },
    {
        name: "penguin",
        flippedimg: "img/pinguino.png",
        type: "penguin"
    },
    {
        name: "penguin",
        flippedimg: "img/pinguino.png",
        type: "penguin",
    }
];

function shuffleCards () {
cardsCollection.sort (()=> Math.random()-0.5);
}

function createCards() {
const cardsContainer = document.querySelector('.cards-container');
    cardsContainer.innerHTML = '';

cardsCollection.forEach((card) => {
    const cardsContainer = document.querySelector('.cards-container');
    const cardUnit = document.createElement("div");
    cardUnit.classList.add("card-block");
    cardsContainer.appendChild(cardUnit);
    
    const closedCard = document.createElement("div");
    closedCard.classList.add("card-face", "closed-card");
    const coverImage = document.createElement("img");
    coverImage.classList.add("cover-img");
    coverImage.setAttribute("src", "img/zoo.jpeg");
    closedCard.appendChild(coverImage);
    cardUnit.appendChild(closedCard);
    
    const flippedCard = document.createElement("div");
    flippedCard.classList.add("card-face", "flipped-card");
    const animalImage = document.createElement("img");
    animalImage.classList.add("animal-img");
    animalImage.setAttribute("src", card.flippedimg);
    flippedCard.appendChild(animalImage);
    cardUnit.appendChild(flippedCard);

    cardUnit.addEventListener('click', flipCard);
});
}

function startGame() {
    counter = 0;
    moveCounterElement.textContent = `Moves: ${counter}`;
    shuffleCards();
    createCards();
    resetBoard(); 
}

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false; 

const matchSound = new Audio("sounds/dats-right.wav");
const noMatchSound = new Audio("sounds/dats-wrong.wav");

function flipCard() {
    if (lockBoard) return; 
    if (this === firstCard) return; 

    this.classList.add('is-flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;

    checkForMatch();
    incrementCounter();
}

function incrementCounter() {
    counter++;
    moveCounterElement.textContent = `Moves: ${counter}`;
}

function checkForMatch() {
    const isMatch = firstCard.querySelector('.flipped-card img').src === 
                    secondCard.querySelector('.flipped-card img').src;

    if (isMatch) {
        matchSound.play(); 
        disableCards(); 
    } else {
        noMatchSound.play(); 
        unflipCards(); 
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard(); 
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('is-flipped');
        secondCard.classList.remove('is-flipped');
        resetBoard(); 
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}


document.querySelectorAll('.card-block').forEach(card => card.addEventListener('click', flipCard));

restartButton.addEventListener("click", () => {
    startGame(); 
});