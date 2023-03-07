const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const upButton = document.getElementById('up');
const leftButton = document.getElementById('left');
const rightButton = document.getElementById('right');
const downButton = document.getElementById('down');
const spanLives = document.getElementById('lives');
const spanTime = document.getElementById('time');
const spanRecord = document.getElementById('record');

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;


const playerPosition = {
    x: undefined,
    y: undefined,
};

const giftPosition = {
    x: undefined,
    y: undefined,
}

const doorPosition = {
    x: undefined,
    y: undefined,
}

let bombs = [];


window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.7;
    } else {
        canvasSize = window.innerHeight * 0.7;
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

    let record = localStorage.getItem('record_time');

    const map = maps[level];

    if (!map) {
        gameWin();
        return;
    }

    if (!record) {
        spanRecord.innerHTML = 'Win a game to get a score!';
    } else {
        spanRecord.innerHTML = formatTime(record);
    }

    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 10);
    }

    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));

    showLives();


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
                    // console.log({ playerPosition })
                    // console.log({doorPosition})
                }
            } else if (col == 'I') {
                giftPosition.x = posX;
                giftPosition.y = posY;
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
        youDied();
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
    console.log('Terminaste el Juego!');
    clearInterval(timeInterval);


    if (!localStorage.getItem('record_time')) {
        //if first victory:
        localStorage.setItem('record_time', timer);
    }
    
    var recordTime = localStorage.getItem('record_time');
    
    localStorage.getItem('record_time');
    if (timer < recordTime) {
        localStorage.setItem('record_time', timer);
        console.log('New Record!');
    } else if (timer > recordTime) {
        console.log('Too Slow! try again');
    }
    
    spanTime.innerHTML = (formatTime(timer))

}


function youDied() {
    console.log('BOOM!');
    lives--;
    console.log({ lives })

    if (lives <= 0) {
        console.log('GAME OVER');
        level = 0;
        lives = 3;
        timeStart = undefined;
    }

    //works because it sets playerPosition to undefined, so it gets the position of the Door.
    playerPosition.x = doorPosition.x;
    playerPosition.y = doorPosition.y;
    startGame()
}

function showLives() {
    const heartsArray = Array(lives).fill(emojis['HEART']); // [1,2,3]

    spanLives.innerHTML = ""
    heartsArray.forEach(heart => spanLives.append(heart));
}

function showTime() {

    timer = Date.now() - timeStart;
    // console.log(timeStart)
    spanTime.innerHTML = (formatTime(timer))
}

function formatTime(ms) {
    const cs = parseInt(ms / 10) % 100
    const seg = parseInt(ms / 1000) % 60
    const min = parseInt(ms / 60000) % 60
    const csStr = `${cs}`.padStart(2, "0")
    const segStr = `${seg}`.padStart(2, "0")
    const minStr = `${min}`.padStart(2, "0")
    return `${minStr}:${segStr}:${csStr}`
}

//movements
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
    // console.log('UP');

    if ((playerPosition.y - elementsSize) < elementsSize - 1) {
        // console.log('OUTSIDE');
    } else {
        playerPosition.y -= elementsSize;
        startGame()
    }

};
function moveLeft() {
    // console.log('LEFT');
    if ((playerPosition.x - elementsSize) < elementsSize) {
        // console.log('OUTSIDE');
    } else {
        playerPosition.x -= elementsSize;
        startGame()
    }
};
function moveRight() {
    // console.log('RIGHT');
    if ((playerPosition.x + elementsSize) > canvasSize + 2) {
        // console.log('OUTSIDE')
    } else {
        playerPosition.x += elementsSize;
        startGame()
    }
};
function moveDown() {
    // console.log('DOWN');
    if ((playerPosition.y + elementsSize) > canvasSize) {
        // console.log('OUTSIDE')
    } else {
        playerPosition.y += elementsSize;
        startGame()
    }
};