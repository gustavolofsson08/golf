// 1. INITIALISERING - Hämta data och rensa gamla felaktiga format
let players = JSON.parse(localStorage.getItem('golfPlayers')) || [];
let rounds = JSON.parse(localStorage.getItem('golfRounds')) || [];

// 2. KÖRS NÄR SIDAN LADDAS
document.addEventListener('DOMContentLoaded', () => {
    // Koppla formulär om de finns
    const playerForm = document.getElementById('add-player-form');
    if (playerForm) playerForm.addEventListener('submit', handleAddPlayer);

    const roundForm = document.getElementById('add-round-form');
    if (roundForm) roundForm.addEventListener('submit', handleAddRound);

    // Uppdatera skärmen direkt
    updatePlayerDisplay();
    updateRoundDisplay();
    populatePlayerDropdown();
});

// 3. LÄGG TILL SPELARE
function handleAddPlayer(e) {
    e.preventDefault();

    // Hämta elementen
    const nameEl = document.getElementById('player-name');
    const hcpEl = document.getElementById('player-hcp');
    const idEl = document.getElementById('player-golfid');

    // Skapa objektet
    const newPlayer = {
        id: Date.now(),
        name: nameEl.value.trim(),
        handicap: parseFloat(hcpEl.value) || 0,
        golfId: idEl.value.trim() || "Inget ID"
    };

    // Spara
    players.push(newPlayer);
    localStorage.setItem('golfPlayers', JSON.stringify(players));
    
    // Nollställ formulär och rita ut
    e.target.reset();
    updatePlayerDisplay();
    
    // Om vi är på rundor-sidan samtidigt, uppdatera dropdown
    populatePlayerDropdown();
}

// 4. RITA UT SPELARE (Fixar felet på din bild)
function updatePlayerDisplay() {
    const list = document.getElementById('players-list');
    if (!list) return;

    const countBadge = document.getElementById('player-count');
    if (countBadge) countBadge.textContent = `${players.length} spelare`;

    if (players.length === 0) {
        list.innerHTML = '<p style="padding: 20px; color: #666;">Inga spelare sparade än.</p>';
        return;
    }

    // Vi bygger korten med tydlig svart text för att säkerställa att det syns
    list.innerHTML = players.map(p => `
        <div class="player-card" style="
            background: #ffffff;
            border: 2px solid #e0e0e0;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        ">
            <div style="color: #000000; text-align: left;">
                <div style="font-size: 1.2rem; font-weight: 800; margin-bottom: 5px;">${p.name || 'Namn saknas'}</div>
                <div style="font-size: 0.9rem; color: #444;">HCP: <strong>${p.handicap}</strong> | ID: ${p.golfId}</div>
            </div>
            <button onclick="deletePlayer(${p.id})" style="
                background: #ff4757;
                color: white;
                border: none;
                padding: 10px 15px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
            ">Ta bort</button>
        </div>
    `).join('');
}

// 5. TA BORT SPELARE
function deletePlayer(id) {
    if (confirm("Vill du ta bort spelaren?")) {
        players = players.filter(p => p.id !== id);
        localStorage.setItem('golfPlayers', JSON.stringify(players));
        updatePlayerDisplay();
        populatePlayerDropdown();
    }
}

// 6. RUNDOR & DROPDOWN (Säkerställer kopplingen)
function populatePlayerDropdown() {
    const dropdown = document.getElementById('round-player');
    if (!dropdown) return;

    let html = '<option value="">-- Välj spelare --</option>';
    players.forEach(p => {
        html += `<option value="${p.id}">${p.name} (${p.handicap})</option>`;
    });
    dropdown.innerHTML = html;
}

function handleAddRound(e) {
    e.preventDefault();
    const playerId = parseInt(document.getElementById('round-player').value);
    const score = parseInt(document.getElementById('round-score').value);
    const cr = parseFloat(document.getElementById('round-cr').value);
    const slope = parseInt(document.getElementById('round-slope').value);

    if (!playerId) return alert("Välj en spelare först!");

    const diff = (score - cr) * (113 / slope);
    
    const newRound = {
        id: Date.now(),
        playerId: playerId,
        playerName: players.find(p => p.id === playerId).name,
        score: score,
        differential: diff,
        date: document.getElementById('round-date').value,
        course: document.getElementById('round-course').value
    };

    rounds.push(newRound);
    localStorage.setItem('golfRounds', JSON.stringify(rounds));
    
    // Enkel HCP-uppdatering (Bästa rundan)
    const pIdx = players.findIndex(p => p.id === playerId);
    if (pIdx !== -1) {
        players[pIdx].handicap = Math.round(diff * 10) / 10;
        localStorage.setItem('golfPlayers', JSON.stringify(players));
    }

    e.target.reset();
    updateRoundDisplay();
    updatePlayerDisplay();
    alert("Runda sparad!");
}

function updateRoundDisplay() {
    const list = document.getElementById('rounds-list');
    if (!list) return;
    list.innerHTML = rounds.map(r => `
        <div style="background:#f1f2f6; padding:10px; margin-bottom:10px; border-radius:8px; border-left: 5px solid #2ecc71;">
            <strong>${r.playerName}</strong>: ${r.score} slag på ${r.course}
        </div>
    `).join('');
}
