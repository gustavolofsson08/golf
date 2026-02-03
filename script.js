const board = document.querySelector('#game-board');
const scoreElement = document.querySelector('#score');

// Inställningar
const step = 20;
let score = 0;

// Ormen startar som en lista med positioner (objekt)
// Varje objekt är en kroppsdel {x, y}
let snake = [
    { x: 160, y: 100 }, // Huvud
    { x: 140, y: 100 }, // Kropp 1
    { x: 120, y: 100 }  // Kropp 2
];

// Matens position
let food = { x: 240, y: 240 };

// Riktning (börjar med att stå stilla eller gå åt höger)
let dx = 0;
let dy = 0;

// 1. Funktion för att rita ut allt
function draw() {
    // Rensa brädet först (men behåll maten i logiken)
    board.innerHTML = '';

    // Rita maten
    const foodElement = document.createElement('div');
    foodElement.className = 'food';
    foodElement.style.left = food.x + 'px';
    foodElement.style.top = food.y + 'px';
    board.appendChild(foodElement);

    // Rita ormen
    snake.forEach((part, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.className = index === 0 ? 'snake-part head' : 'snake-part';
        snakeElement.style.left = part.x + 'px';
        snakeElement.style.top = part.y + 'px';
        board.appendChild(snakeElement);
    });
}

// 2. Funktion för att flytta ormen
function moveSnake() {
    if (dx === 0 && dy === 0) return; // Flytta inte om ingen knapp tryckts

    // Skapa ett nytt huvud baserat på nuvarande huvud + riktning
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Lägg till det nya huvudet först i listan
    snake.unshift(head);

    // Kolla om ormen äter maten
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.innerText = score;
        // Flytta maten till en ny slumpmässig plats
        food.x = Math.floor(Math.random() * 19) * 20;
        food.y = Math.floor(Math.random() * 19) * 20;
        // Vi tar INTE bort sista delen, så ormen växer
    } else {
        // Ta bort sista delen (ormen rör sig framåt utan att växa)
        snake.pop();
    }

    draw();
}

// 3. Lyssna på piltangenter
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -step; }
    else if (event.key === 'ArrowDown' && dy === 0) { dx = 0; dy = step; }
    else if (event.key === 'ArrowLeft' && dx === 0) { dx = -step; dy = 0; }
    else if (event.key === 'ArrowRight' && dx === 0) { dx = step; dy = 0; }
});

// 4. Starta en loop som körs var 150:e millisekund
setInterval(moveSnake, 150);

// Rita första gången
draw();



const board = document.querySelector('#game-board');
const scoreElement = document.querySelector('#score');

const step = 20;
let score = 0;

// Ormens kropp (lista med positioner)
let snake = [
    { x: 160, y: 100 },
    { x: 140, y: 100 },
    { x: 120, y: 100 }
];

let food = { x: 240, y: 240 };
let dx = 0; // Hastighet i X-led
let dy = 0; // Hastighet i Y-led

function draw() {
    board.innerHTML = ''; // Rensa spelplanen

    // Rita maten
    const foodElement = document.createElement('div');
    foodElement.className = 'food';
    foodElement.style.left = food.x + 'px';
    foodElement.style.top = food.y + 'px';
    board.appendChild(foodElement);

    // Rita varje del av ormen
    snake.forEach((part, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.className = index === 0 ? 'snake-part head' : 'snake-part';
        snakeElement.style.left = part.x + 'px';
        snakeElement.style.top = part.y + 'px';
        board.appendChild(snakeElement);
    });
}

function moveSnake() {
    if (dx === 0 && dy === 0) return;

    // Skapa nytt huvud
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Kolla om ormen äter maten
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.innerText = score;
        // Flytta maten till ny slumpmässig plats
        food.x = Math.floor(Math.random() * 19) * 20;
        food.y = Math.floor(Math.random() * 19) * 20;
    } else {
        // Ta bort svansen om vi inte åt mat
        snake.pop();
    }

    // Lägg till nya huvudet
    snake.unshift(head);

    // Enkel kontroll för att dö om man går utanför väggen
    if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400) {
        alert("Game Over! Poäng: " + score);
        resetGame();
    }

    draw();
}

function resetGame() {
    snake = [{ x: 160, y: 100 }, { x: 140, y: 100 }, { x: 120, y: 100 }];
    dx = 0; dy = 0; score = 0;
    scoreElement.innerText = score;
}

// Lyssna på både pilar och WASD
document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase(); // Gör om till små bokstäver för WASD

    if ((key === 'arrowup' || key === 'w') && dy === 0) {
        dx = 0; dy = -step;
    } else if ((key === 'arrowdown' || key === 's') && dy === 0) {
        dx = 0; dy = step;
    } else if ((key === 'arrowleft' || key === 'a') && dx === 0) {
        dx = -step; dy = 0;
    } else if ((key === 'arrowright' || key === 'd') && dx === 0) {
        dx = step; dy = 0;
    }
});

// Kör spelet var 150:e millisekund
setInterval(moveSnake, 150);
draw();
