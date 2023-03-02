const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const upButton = document.getElementById('up');
const leftButton = document.getElementById('left');
const rightButton = document.getElementById('right');
const downButton = document.getElementById('down');

let canvasSize;
let elementsSize;

const playerPosition = {
    x: undefined,
    y: undefined,
};


window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    };

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = canvasSize / 10;

    startGame()
}

function startGame() {
    // console.log({ canvasSize, elementsSize });

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));

    game.clearRect(0, 0, canvasSize, canvasSize);
    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col]
            const posX = elementsSize * (colI + 1);
            const posY = elementsSize * (rowI + 1);

            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    console.log({ playerPosition })
                }
            };

            game.fillText(emoji, posX, posY);
        });
    });

    movePlayer()
    // if (playerPosition.x <= 5 || playerPosition.x - 1 > canvasSize) {
    //     console.log('Te FUISTE');
    // } if (playerPosition.y >=402 || playerPosition.y < 40) {
    //     console.log('Te FUISTE')
    // }

    // for (let row = 1; row <= 10; row++) {
    //     for (let col = 1; col <= 10; col++) {
    //         game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementsSize * col, elementsSize * row);
    //     }
    // }
};

function movePlayer() {
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
};

//movimientos
window.addEventListener('keydown', moveByKeys);
upButton.addEventListener('click', moveUp);
rightButton.addEventListener('click', moveRight);
leftButton.addEventListener('click', moveLeft);
downButton.addEventListener('click', moveDown);


// function erasePlayerPath() {
//     game.clearRect(playerPosition.x, playerPosition.y, 35, 50);
//     game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);

// };

function moveByKeys(event) {
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowDown') moveDown();
};

function moveUp() {
    console.log('UP');

    if ((playerPosition.y - elementsSize) < elementsSize){
        console.log('OUTSIDE');
    } else {playerPosition.y -= elementsSize;
    startGame()
    }
    
};
function moveLeft() {
    playerPosition.x -= elementsSize;
    console.log('LEFT');
    startGame()
};
function moveRight() {
    playerPosition.x += elementsSize;
    console.log('RIGHT');
    startGame()
};
function moveDown() {
    playerPosition.y += elementsSize;
    console.log('DOWN');
    startGame()
};