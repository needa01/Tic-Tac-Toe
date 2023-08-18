const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
let currentPlayer;
let gameGrid;
const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    //empty the boxes on UI
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        boxes[index].classList.remove("win");
    })
    newGameBtn.classList.remove("active");
    gameinfo.innerText = "Current Player - " + currentPlayer;

}
initGame();



function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
    gameinfo.innerText = "Current Player - " + currentPlayer;
}

function checkGAMEOver() {
    // newGameBtn.classList.add("active");
    let winner = "";
    winningPositions.forEach((position) => {
        //all boxes should be non empty and equal to each other
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") &&
            (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[2]] === gameGrid[position[1]])) {
            //above condition means someone has win means some player is winner
            //lets see who is the player
            if (gameGrid[position[0]] === "X") {
                winner = "X";
            } else {
                winner = "Y";
            }
            //when win, we can disable all the pointers 
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    //it means we have a winner
    if (winner !== "") {
        gameinfo.innerText = `Winner Player - ${winner}`;
        newGameBtn.classList.add("active");
        return;
    }
    //when you have (tie)no winner you come to this line
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "")
            fillCount++;
    })

    //if board is filled , there is tie
    if (fillCount === 9) {
        gameinfo.innerText = "There's a Tie!";
        newGameBtn.classList.add("active");
    }

}

function handleClick(index) {
    if (gameGrid[index] === "") {
        (boxes[index]).innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap turn
        swapTurn();
        //Check if any player wins;
        checkGAMEOver();
    }
}
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
})
newGameBtn.addEventListener("click", initGame);