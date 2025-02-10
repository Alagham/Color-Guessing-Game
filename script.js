document.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.getElementById("loadingScreen");
    const loadingText = document.getElementById("loadingText");
    const gameContainer = document.getElementById("gameContainer");
    const colorBox = document.getElementById("colorBox");
    const colorButtons = document.querySelectorAll(".color-btn");
    const gameStatus = document.getElementById("gameStatus");
    const scoreDisplay = document.getElementById("score");
    const newGameButton = document.getElementById("newGameButton");

    let score = 0;
    let targetColor = "";

    function startLoading() {
        let progress = 0;
        const loadingInterval = setInterval(() => {
            progress += 5;
            loadingText.textContent = `${progress}%`;

            if (progress >= 100) {
                clearInterval(loadingInterval);
                loadingScreen.style.display = "none";
                gameContainer.style.display = "block";
                startNewGame();
            }
        }, 100);
    }

    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    function startNewGame() {
        targetColor = getRandomColor();
        colorBox.style.backgroundColor = targetColor;

        let randomColors = [targetColor]; // Ensure target color is included

        while (randomColors.length < 6) {
            let newColor = getRandomColor();
            if (!randomColors.includes(newColor)) {
                randomColors.push(newColor);
            }
        }

        // Shuffle colors randomly
        randomColors.sort(() => Math.random() - 0.5);

        // Assign colors to buttons
        colorButtons.forEach((button, index) => {
            button.style.backgroundColor = randomColors[index];
            button.onclick = () => checkGuess(randomColors[index]);
        });

        gameStatus.textContent = "Guess the correct color!";
    }

    function checkGuess(selectedColor) {
        if (selectedColor === targetColor) {
            gameStatus.textContent = "Correct! 🎉 Moving to the next round...";
            gameStatus.style.color = "green";
            score++;
            scoreDisplay.textContent = score;
            setTimeout(startNewGame, 1500);
        } else {
            gameStatus.textContent = "Wrong! Try again!";
            gameStatus.style.color = "red";
        }
    }

    newGameButton.addEventListener("click", startNewGame);
    startLoading();
});
