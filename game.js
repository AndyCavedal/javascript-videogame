const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const upButton = document.getElementById('up');
const leftButton = document.getElementById('left');
const rightButton = document.getElementById('right');
const downButton = document.getElementById('down');

let canvasSize;
let elementsSize;
let level = 0;

const playerPosition = {
    x: undefined,
    y: undefined,
};

const giftPosition = {
    x: undefined,
    y: undefined,
}

let bombs = [];


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
    
    const map = maps[level];
    
    if (!map) {
        gameWin();
        return;
    }
    
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    
    bombs = [];
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
            } else if (col == 'I') {
                    giftPosition.x = posX;
                    giftPosition.y = posY;
                    console.log({ giftPosition })
                
            } else if (col == 'X') {
                bombs.push({
                    x: posX,
                    y: posY,
                });
            }

            game.fillText(emoji, posX, posY);
        });
    });

    movePlayer()
    //Another way to do it =>
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
    const giftCollisionX = playerPosition.x.toFixed(1) == giftPosition.x.toFixed(1);
    const giftCollisionY = playerPosition.y.toFixed(1) == giftPosition.y.toFixed(1);
    const giftCollision = giftCollisionX && giftCollisionY;

    if (giftCollision) {
        levelWin();
    }

    const bombCollision = bombs.find(enemy => {
        const bombCollisionX = enemy.x.toFixed(1) == playerPosition.x.toFixed(1);
        const bombCollisionY = enemy.y.toFixed(1) == playerPosition.y.toFixed(1);
        return bombCollisionX && bombCollisionY;
    });

    if (bombCollision) {
        console.log('BOOM!')
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
};

function levelWin() {
    console.log('LVLUP!');
    level++;
    startGame()
    //Another way to do it =>
    //     if (level < maps.length - 1) {
    //         level += 1;
    //         playerPosition.x = undefined;
    //         playerPosition.y = undefined;
    //         startGame()
    // }
}

function gameWin() {
    console.log('Terminaste el Juego!')
}

//movimientos
window.addEventListener('keydown', moveByKeys);
upButton.addEventListener('click', moveUp);
rightButton.addEventListener('click', moveRight);
leftButton.addEventListener('click', moveLeft);
downButton.addEventListener('click', moveDown);

function moveByKeys(event) {
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowDown') moveDown();
};

function moveUp() {
    console.log('UP');

    if ((playerPosition.y - elementsSize) < elementsSize - 1) {
        console.log('OUTSIDE');
    } else {
        playerPosition.y -= elementsSize;
        startGame()
    }

};
function moveLeft() {
    console.log('LEFT');
    if ((playerPosition.x - elementsSize) < elementsSize) {
        console.log('OUTSIDE');
    } else {
        playerPosition.x -= elementsSize;
        startGame()
    }
};
function moveRight() {
    console.log('RIGHT');
    if ((playerPosition.x + elementsSize) > canvasSize + 2) {
        console.log('OUTSIDE')
    } else {
        playerPosition.x += elementsSize;
        startGame()
    }
};
function moveDown() {
    console.log('DOWN');
    if ((playerPosition.y + elementsSize) > canvasSize) {
        console.log('OUTSIDE')
    } else {
        playerPosition.y += elementsSize;
        startGame()
    }
};