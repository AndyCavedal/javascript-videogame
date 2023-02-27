const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', startGame);
window.addEventListener('load', startGame);

function startGame() {
    let canvasSize;


    if (window.innerHeight > window.innerWidth) {
        canvasSize = innerWidth * 0.8;
    } else (window.innerWidth > window.innerHeight) 
        canvasSize = innerHeight * 0.8;
    

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    const elementsSize = canvasSize / 10;

    console.log({ canvasSize, elementsSize });

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'right';

    for (let i = 1; i <= 10; i++) {
        game.fillText(emojis['X'], elementsSize, elementsSize * i);
    }


    window.innerHeight;
    window.innerWidth;

    // game.font = '30px courier';
    // game.fillStyle = 'Brown';
    // game.textAlign = 'center';
    // game.fillText('Platzi', 150,85,100);
};