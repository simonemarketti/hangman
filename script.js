const letters = document.querySelectorAll('.letter');
const word = document.querySelector('.word');
const hangmanImg = document.querySelector('.hangman');
let secretWord = "";
let counter = 1;

// function generate random word
const generateRandomWord = function () {
    secretWord = listOfWords[Math.floor(Math.random() * listOfWords.length)].toLowerCase();
}

// function to render secret word
const renderSecretWord = function () {
    let length = secretWord.length
    let firstLetter = secretWord[0]
    let lastLetter = secretWord[length - 1]
    for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === firstLetter || secretWord[i] === lastLetter) {
            word.textContent += secretWord[i]
        } else {
            word.textContent += "_";
        }
    }
    letters.forEach(letter => {
        if (letter.textContent === firstLetter || letter.textContent === lastLetter) {
            pickedLetter(letter)
        }
    })
}

// function to handle click on letter
const handleClickOnLetter = function (e) {
    let letter = e.target.textContent;
    if (secretWord.includes(letter)) {
        for (let i = 0; i < secretWord.length; i++) {
            if (secretWord[i] === letter) {
                word.textContent = word.textContent.slice(0, i) + letter + word.textContent.slice(i + 1);
            }
        }
    } else {
        counter++;
        hangmanImg.src = `./sprites/${counter}.png`
    }
    pickedLetter(e.target)
    checkIfWinOrGameOver()
}

// function for picked letter
const pickedLetter = function (e) {
    e.removeEventListener("click", handleClickOnLetter)
    e.style.cursor = "default"
    e.classList.add("picked")
}

// function to check game status
const checkIfWinOrGameOver = function () {
    if (word.textContent === secretWord) {
        const winMessage = document.createElement("h2")
        winMessage.textContent = "You win!"
        document.body.appendChild(winMessage)

        letters.forEach(letter => {
            pickedLetter(letter)
        })
    }
    if (counter === 7) {
        const loseMessage = document.createElement("h2")
        loseMessage.textContent = "You lost!"
        document.body.appendChild(loseMessage)

        letters.forEach(letter => {
            pickedLetter(letter)
        })
    }
}

// Add event listener to each letter
letters.forEach(letter => {
    letter.addEventListener('click', handleClickOnLetter)
})


const startGame = function () {
    generateRandomWord()
    renderSecretWord()
}

startGame();
