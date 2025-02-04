
const colorBox = document.getElementById("colorBox");
const colorButtons = document.querySelectorAll(".color-btn");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");

let score = 0;
let targetColor = "";

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function startNewGame() {
    targetColor = getRandomColor();
    colorBox.style.backgroundColor = targetColor;

    let randomColors = [targetColor];
    while (randomColors.length < 6) {
        let newColor = getRandomColor();
        if (!randomColors.includes(newColor)) {
            randomColors.push(newColor);
        }
    }

    randomColors.sort(() => Math.random() - 0.5);

    colorButtons.forEach((button, index) => {
        button.style.backgroundColor = randomColors[index];
        button.onclick = () => checkGuess(randomColors[index]);
    });

    gameStatus.textContent = "Guess the correct color";
    gameStatus.style.color = "#333";
}

function checkGuess(selectedColor) {
    if (selectedColor === targetColor) {
        gameStatus.textContent = "Correct✌🏾, Moving to the next round";
        gameStatus.style.color = "green";
        score++;
        scoreDisplay.textContent = score;

        setTimeout(startNewGame, 1000);
    } else {
        gameStatus.textContent = "Wrong😔, Try again";
        gameStatus.style.color = "red";
    }
}

newGameButton.addEventListener("click", startNewGame);

startNewGame();
