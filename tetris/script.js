// Add event listener fire when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid");
    let squares = Array.from(document.querySelectorAll(".grid div"));
    const scoreDisplay = document.querySelector("#score");
    const startBtn = document.querySelector("#start-button");
    const width = 10;
    nextRandom = 0;
    let timerId;
    let score = 0;

    //Tetrominos
    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2],
    ];

    const zTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
    ];

    const tTetrimino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1],
    ];

    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
    ];

    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
    ];

    const theTetrominos = [
        lTetromino,
        zTetromino,
        tTetrimino,
        oTetromino,
        iTetromino,
    ];

    let random = Math.floor(Math.random() * theTetrominos.length);
    let currentRotation = 0;
    let currentPosition = 4;
    let current = theTetrominos[random][currentRotation];

    // draw Tetromino
    function draw() {
        current.forEach((index) => {
            squares[currentPosition + index].classList.add("tetromino");
        });
    }

    function undraw() {
        current.forEach((index) => {
            squares[currentPosition + index].classList.remove("tetromino");
        });
    }

    // timerId = setInterval(moveDown, 500);

    //assign functions to keyCode
    function control(e) {
        if (e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 38) {
            rotate();
        } else if (e.keyCode === 39) {
            moveRight();
        } else if (e.keyCode === 40) {
            moveDown();
        }
    }
    document.addEventListener("keyup", control);

    // Move down tetrominos
    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }
    // freeze tetrominos at bottom
    function freeze() {
        current.some((index) =>
            squares[currentPosition + index + width].classList.contains("taken")
        );
        if (
            current.some((index) =>
                squares[currentPosition + index + width].classList.contains(
                    "taken"
                )
            )
        ) {
            current.forEach((index) =>
                squares[currentPosition + index].classList.add("taken")
            );

            //start again
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetrominos.length);
            current = theTetrominos[random][currentRotation];
            currentPosition = 4;
            draw();
            displayShape();
            addScore();
            gameOver();
        }
    }

    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(
            (index) => (currentPosition + index) % width === 0
        );

        if (!isAtLeftEdge) currentPosition -= 1;

        if (
            current.some((index) =>
                squares[currentPosition + index].classList.contains("taken")
            )
        ) {
            currentPosition += 1;
        }
        draw();
    }

    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(
            (index) => (currentPosition + index) % width === width - 1
        );

        if (!isAtRightEdge) currentPosition += 1;
        if (
            current.some((index) =>
                squares[currentPosition + index].classList.contains("taken")
            )
        ) {
            currentPosition -= 1;
        }
        draw();
    }

    // rotate
    function rotate() {
        undraw();
        currentRotation++;
        if (currentRotation === current.length) currentRotation = 0;
        current = theTetrominos[random][currentRotation];
        draw();
    }

    //show next tetromino in display
    const displaySquares = document.querySelectorAll(".mini-grid div");
    const displayWidth = 4;
    let displayIndex = 0;

    //Tetrominoes without rotation
    const upNextTetrominoes = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], //lTetromino
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //zTetromino
        [1, displayWidth, displayWidth + 1, displayWidth + 2], //tTetromino
        [0, 1, displayWidth, displayWidth + 1], //oTetromino
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], //iTetromino
    ];

    function displayShape() {
        displaySquares.forEach((square) => {
            square.classList.remove("tetromino");
        });
        upNextTetrominoes[nextRandom].forEach((index) => {
            displaySquares[displayIndex + index].classList.add("tetromino");
        });
    }

    startBtn.addEventListener("click", () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        } else {
            draw();
            timerId = setInterval(moveDown, 250);
            nextRandom = Math.floor(Math.random() * theTetrominos.length);
            displayShape();
        }
    });

    function addScore() {
        for (let i = 0; i < 199; i += width) {
            const row = [
                i,
                i + 1,
                i + 2,
                i + 3,
                i + 4,
                i + 5,
                i + 6,
                i + 7,
                i + 8,
                i + 9,
            ];

            if (
                row.every((index) => squares[index].classList.contains("taken"))
            ) {
                score += 10;
                scoreDisplay.innerHTML = score;
                row.forEach((index) => {
                    squares[index].classList.remove("taken");
                    squares[index].classList.remove("tetromino");
                });
                const squaresRemoved = squares.splice(i, width);
                squares = squaresRemoved.concat(squares);
                squares.forEach((cell) => grid.appendChild(cell));
            }
        }
    }
    function gameOver() {
        if (
            current.some((index) =>
                squares[currentPosition + index].classList.contains("taken")
            )
        ) {
            scoreDisplay.innerHTML = "Game Over";
            clearInterval(timerId);
        }
    }
});
