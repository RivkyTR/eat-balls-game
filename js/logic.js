const matrix = [[false, false, false, false, false, false, false, false, false, false, false, false],
[false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false]];
var numBalls = 0;
var indexX = 2;
var indexY = 9;
const gamer = document.createElement("img");
var refreshIntervalId;
const hollX = 5;
const hollY = 6;


window.onload = () => {

    const element = document.getElementById("grid-container");
    for (c = 0; c < (12 * 10); c++) {
        let cell = document.createElement("div");
        var x = Math.floor(c / 12);
        var y = c % 12;
        cell.id = `${x}-${y}`;
        element.appendChild(cell).className = "grid-item";
        if ((x===0 || x===9 || y===0 || y===11)  && (hollX !== x && hollY !== y))
            cell.style.backgroundColor = "blue";
    };

    init();

    document.addEventListener("keydown", function (e) {
        switch (e.code) {
            case "ArrowDown":
                moveButtom();
                break;
            case 'ArrowUp':
                moveTop();
                break;
            case 'ArrowLeft':
                moveLeft();
                break;
            case 'ArrowRight':
                moveRight();
                break;
            default:
                console.log('Another key pressed');
        }
    });
}

function init() {
    const element = document.getElementById("grid-container");
    element.style.display = "grid";

    gamer.src = "../pictures/gamer.png";
    gamer.style.width = "100%";
    const initPlaceGamer = document.getElementById("2-9");
    initPlaceGamer.appendChild(gamer);
    indexX = 2;
    indexY = 9;
    const initPLaceBall1 = document.getElementById("7-4");
    const initPLaceBall2 = document.getElementById("3-8");
    const ball1 = document.createElement("img");
    const ball2 = document.createElement("img");
    ball1.src = "../pictures/ball.png";
    ball2.src = "../pictures/ball.png";
    ball1.style.width = "100%";
    ball2.style.width = "100%";
    matrix[7][4] = true;
    matrix[3][8] = true;
    numBalls = 2;
    initPLaceBall1.appendChild(ball1);
    initPLaceBall2.appendChild(ball2);


    refreshIntervalId = setInterval(() => {
        var x = 0;
        var y = 0;
        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 12);
        } while (matrix[x][y])
        matrix[x][y] = true;
        const element = document.getElementById(`${x}-${y}`);
        var ball = document.createElement("img");
        ball.src = "../pictures/ball.png";
        ball.style.width = "100%";
        element.appendChild(ball);
        numBalls++;
    }, 3000);
}

function moveRight() {
    if (indexY === 11 && indexX !== hollX)
        alert("You are in the end.");
    else {
        indexY = indexY===11? 0: ++indexY;
        treatment();
    }
}
function moveLeft() {
    if (indexY === 0 && indexX !== hollX)
        alert("You are in the end.");
    else {
        indexY = indexY===0? 11: --indexY;
        treatment();
    }
}
function moveTop() {
    if (indexX === 0 && indexY !== hollY)
        alert("You are in the end.");
    else {
        indexX = indexX===0? 9: --indexX;
        treatment();
    }
}
function moveButtom() {
    if (indexX === 9 && indexY !== hollY)
        alert("You are in the end.");
    else {
        console.log(indexX);
        
        indexX = ((indexX===9)? 0: ++indexX);
        console.log(indexX);
        treatment();
    }
}
function treatment() {
    const element = document.getElementById(`${indexX}-${indexY}`);
    element.appendChild(gamer);
    if (matrix[indexX][indexY]) {
        matrix[indexX][indexY] = false;
        element.removeChild(element.firstChild);
        numBalls--;
        if (numBalls === 0) {
            clearInterval(refreshIntervalId);
            setTimeout(function () {
                const answer = confirm("You won, want play again?");
                if (answer) {
                    const element = document.getElementById("grid-container");
                    element.style.display = "none";
                    init();
                }
            }, 0);
        }
    }
}