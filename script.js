const mainPageContainer = document.querySelector('.main-page-container');

const moveCounterElement = document.querySelector('.move-counter'); // Select the move counter element
const restartButton = document.getElementById('restart'); 

let counter = 0; // Initialize the counter


// //TODO:add background music?
// const backgroundMusic = new Audio("sounds/birds-in-zoo.wav");
// backgroundMusic.loop = true;
// backgroundMusic.volume = 0.5;
// backgroundMusic.play();

// const stopMusicButton = document.getElementById('stop-music');
// stopMusicButton.addEventListener('click', () => {
//     backgroundMusic.pause();
//     backgroundMusic.currentTime = 0;
// });

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




// TODO: Create cards 
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

// Shuffle the cards
function shuffleCards () {
cardsCollection.sort (()=> Math.random()-0.5);

}


// // TODO: Create animal img collection
// const animalImagesCollection = {
//     tiger: "img/tigre.png",
//     elephant: "img/elefante.png",
//     crocodile: "img/cocodrilo.png",
//     gorilla: "img/gorila.png",
//     monkey: "img/mono.png",
//     snake: "img/serpiente.png",
//     zebra: "img/zebra.png",
//     penguin: "img/pinguino.png"
// };



// Create and add cards to the container
function createCards() {
const cardsContainer = document.querySelector('.cards-container');
    cardsContainer.innerHTML = '';

cardsCollection.forEach((card) => {
    const cardsContainer = document.querySelector('.cards-container');
    const cardUnit = document.createElement("div");
    cardUnit.classList.add("card-block");
    cardsContainer.appendChild(cardUnit);
    
    // Create the closed (front) card
    const closedCard = document.createElement("div");
    closedCard.classList.add("card-face", "closed-card");
    const coverImage = document.createElement("img");
    coverImage.classList.add("cover-img");
    coverImage.setAttribute("src", "img/zoo.jpeg");
    closedCard.appendChild(coverImage);
    cardUnit.appendChild(closedCard);
    
    // Create the flipped (back) card
    const flippedCard = document.createElement("div");
    flippedCard.classList.add("card-face", "flipped-card");
    const animalImage = document.createElement("img");
    animalImage.classList.add("animal-img");
    animalImage.setAttribute("src", card.flippedimg);
    flippedCard.appendChild(animalImage);
    cardUnit.appendChild(flippedCard);

    // Event listener to flip cards
    cardUnit.addEventListener('click', flipCard);
});
}

function startGame() {
    counter = 0;
    moveCounterElement.textContent = `Moves: ${counter}`;
    shuffleCards();
    createCards();
    resetBoard(); // Reset the board state
}
// TODO: Let player turn  cards and compare them

// Track the flipped cards
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false; // Prevents flipping more than two cards


//Sound effect
const matchSound = new Audio("sounds/dats-right.wav");
const noMatchSound = new Audio("sounds/dats-wrong.wav");
// Event listener for card flip
function flipCard() {
    if (lockBoard) return; // Exit if the board is locked
    if (this === firstCard) return; // Prevent double-click on the same card

    this.classList.add('is-flipped');

    if (!hasFlippedCard) {
        // First card clicked
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Second card clicked
    secondCard = this;
    hasFlippedCard = false;

    checkForMatch();
    incrementCounter();
}

//TODO: Increase move counter
function incrementCounter() {
    counter++;
    moveCounterElement.textContent = `Moves: ${counter}`;
}

// Check if the two flipped cards match
function checkForMatch() {
    const isMatch = firstCard.querySelector('.flipped-card img').src === 
                    secondCard.querySelector('.flipped-card img').src;

    if (isMatch) {
        matchSound.play(); 
        disableCards(); // Disable cards if they match
    } else {
        noMatchSound.play(); 
        unflipCards(); // Flip them back if they don't match
    }
}


// Disable matched cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard(); // Reset the board for the next move
}

// Flip back the cards if they don't match
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('is-flipped');
        secondCard.classList.remove('is-flipped');
        resetBoard(); // Reset the board for the next move
    }, 1000);
}

// Reset the board after each move
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Add event listeners to the cards
document.querySelectorAll('.card-block').forEach(card => card.addEventListener('click', flipCard));

//TODO: Add event listener to restart game
// Start game function


restartButton.addEventListener("click", () => {
    // mainPageContainer.style.visibility = "hidden";
    // WelcomePageContainer.style.display = "flex"; // Show the welcome page again
    startGame(); // Reinitialize the game
});