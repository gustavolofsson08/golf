// Vi hämtar ormens huvud från HTML
const head = document.querySelector('.head');
const board = document.querySelector('#game-board');

// Startpositioner
let x = 160;
let y = 100;
const step = 20; // Storleken på ett steg (samma som ormens storlek)

// Lyssna efter knapptryck på hela dokumentet
document.addEventListener('keydown', (event) => {
    // Förhindra att sidan scrollar när man trycker på pilarna
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(event.key)) {
        event.preventDefault();
    }

    // Ändra koordinaterna baserat på vilken pil som trycks ner
    if (event.key === 'ArrowUp') {
        y -= step;
    } else if (event.key === 'ArrowDown') {
        y += step;
    } else if (event.key === 'ArrowLeft') {
        x -= step;
    } else if (event.key === 'ArrowRight') {
        x += step;
    }

    // Uppdatera ormens position på skärmen
    head.style.top = y + 'px';
    head.style.left = x + 'px';
});
