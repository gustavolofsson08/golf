/** * GOLF STATS TRACKER - MOTOR
 * Hanterar: Lagring, Spelare och WHS-Handicap
 */

// 1. DATA-LAGRING (Hämtar från webbläsarens minne)
let players = JSON.parse(localStorage.getItem('golfPlayers')) || [];
let rounds = JSON.parse(localStorage.getItem('golfRounds')) || [];
let matches = JSON.parse(localStorage.getItem('golfMatches')) || [];

// 2. STARTA SIDAN
document.addEventListener('DOMContentLoaded', () => {
    // Koppla ihop knappar med funktioner
    const playerForm = document.getElementById('add-player-form');
    if (playerForm) {
        playerForm.addEventListener('submit', handleAddPlayer);
    }

    // Rita ut listan om vi är på spelarsidan
    updateDisplay();
});

// 3. SPARA DATA FUNKTION
function saveData() {
    localStorage.setItem('golfPlayers', JSON.stringify(players));
    localStorage.setItem('golfRounds', JSON.stringify(rounds));
    localStorage.setItem('golfMatches', JSON.stringify(matches));
}

// 4. LÄGG TILL SPELARE
function handleAddPlayer(e) {
    e.preventDefault(); // Stoppar sidan från att laddas om direkt

    const nameInput = document.getElementById('player-name');
    const hcpInput = document.getElementById('player-hcp');
    const idInput = document.getElementById('player-golfid');

    const newPlayer = {
        id: Date.now(), // Skapar ett unikt ID
        name: nameInput.value.trim(),
        handicap: parseFloat(hcpInput.value),
        golfId: idInput.value.trim() || "Saknas",
        initialHcp: parseFloat(hcpInput.value)
    };

    // Spara i listan
    players.push(newPlayer);
    saveData();
    
    // Rensa formuläret
    e.target.reset();
    
    // Uppdatera listan på skärmen
    updateDisplay();
    
    // Visa ett litet meddelande
    showNotification(`Spelaren ${newPlayer.name} har lagts till!`);
}

// 5. RITA UT SPELARE PÅ SIDAN
function updateDisplay() {
    const listContainer = document.getElementById('players-list');
    const countBadge = document.getElementById('player-count');

    if (!listContainer) return; // Vi är inte på spelarsidan

    if (countBadge) {
        countBadge.textContent = `${players.length} spelare`;
    }

    if (players.length === 0) {
        listContainer.innerHTML = '<p class="empty-message">Inga spelare registrerade. Lägg till din första ovan!</p>';
        return;
    }

    // Skapa HTML för varje spelare
    listContainer.innerHTML = players.map(p => `
        <div class="player-card" style="border: 1px solid #ddd; padding: 15px; border-radius: 8px; margin-bottom: 10px; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <h4 style="margin: 0; color: #2c3e50;">${p.name}</h4>
            <div style="display: flex; gap: 15px; margin: 10px 0; font-size: 0.9em; color: #666;">
                <span><strong>HCP:</strong> ${p.handicap.toFixed(1)}</span>
                <span><strong>ID:</strong> ${p.golfId}</span>
            </div>
            <button onclick="deletePlayer(${p.id})" class="btn btn-danger" style="padding: 5px 10px; font-size: 0.8em; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer;">Ta bort</button>
        </div>
    `).join('');
}

// 6. TA BORT SPELARE
function deletePlayer(id) {
    if (confirm("Vill du verkligen ta bort denna spelare?")) {
        players = players.filter(p => p.id !== id);
        saveData();
        updateDisplay();
    }
}

// 7. NOTIFIERING (DEN GRÖNA RUTAN)
function showNotification(msg) {
    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.cssText = `
        position: fixed; top: 20px; right: 20px;
        background: #2ecc71; color: white; padding: 15px 25px;
        border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000; transition: opacity 0.5s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}
