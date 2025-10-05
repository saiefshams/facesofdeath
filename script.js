// ---------------------------------------------
// Faces of Death - Animated Canvas Battle
// ---------------------------------------------

const MOVE_MIN_X = 0, MOVE_MAX_X = 1150;
const MOVE_MIN_Y = 405, MOVE_MAX_Y = 1750;
const BRAWLER_HP_MIN = 100, BRAWLER_HP_MAX = 140;
const MIN_SELECT = 2, MAX_SELECT = 6;
const BATTLE_INTERVAL = 5000;
const CANVAS_W = 1024, CANVAS_H = 700;

// [Insert BRAWLER_DATA here with all 12 brawlers and attacks as before]
const BRAWLER_DATA = [ /* same as previously provided, 12 fighters, each with key, name, emoji, img, attacks */ 
    {
        key: "freddy", name: "Freddy Krueger",
        emoji: "🔪",
        img: "images/freddy.png",
        attacks: [
            {name: "Dream Slash", desc: "slashes with razor glove", minDmg: 18, maxDmg: 28},
            {name: "Fear Nightmare", desc: "haunts with terror", minDmg: 22, maxDmg: 36},
            {name: "Boiler Burn", desc: "engulfs in fire", minDmg: 14, maxDmg: 25},
        ],
    },
    {
        key: "jason", name: "Jason Voorhees",
        emoji: "🪓",
        img: "images/jason.png",
        attacks: [
            {name: "Machete Chop", desc: "swings lethal blade", minDmg: 20, maxDmg: 32},
            {name: "Lake Strike", desc: "drags to Crystal Lake", minDmg: 15, maxDmg: 30},
            {name: "Mask Smash", desc: "smashes with mask", minDmg: 18, maxDmg: 26}
        ]
    },
    {
        key: "michael", name: "Michael Myers",
        emoji: "🎃",
        img: "images/michael.png",
        attacks: [
            {name: "Knife Stab", desc: "lunges forward", minDmg: 22, maxDmg: 32},
            {name: "Silent Lurk", desc: "frightens victims", minDmg: 17, maxDmg: 25},
            {name: "Ruthless Stab", desc: "ends all hope", minDmg: 19, maxDmg: 27}
        ]
    },
    {
        key: "chucky", name: "Chucky",
        emoji: "🧸",
        img: "images/chucky.png",
        attacks: [
            {name: "Knife Frenzy", desc: "attacks repeatedly", minDmg: 20, maxDmg: 34},
            {name: "Voodoo Curse", desc: "hexes enemy", minDmg: 16, maxDmg: 25},
            {name: "Doll Jump", desc: "jumps at throat", minDmg: 21, maxDmg: 33}
        ]
    },
    {
        key: "pinhead", name: "Pinhead",
        emoji: "⛓️",
        img: "images/pinhead.png",
        attacks: [
            {name: "Chain Torture", desc: "rips flesh", minDmg: 19, maxDmg: 30},
            {name: "Box Agony", desc: "opens pain gateway", minDmg: 17, maxDmg: 24},
            {name: "Cenobite Sting", desc: "inflicts exquisite pain", minDmg: 20, maxDmg: 29}
        ]
    },
    {
        key: "dracula", name: "Count Dracula",
        emoji: "🦇",
        img: "images/dracula.png",
        attacks: [
            {name: "Fang Bite", desc: "drains blood", minDmg: 19, maxDmg: 28},
            {name: "Bat Swarm", desc: "summons bats", minDmg: 24, maxDmg: 36},
            {name: "Hypnotic Gaze", desc: "freezes enemy", minDmg: 16, maxDmg: 26}
        ]
    },
    {
        key: "lestat", name: "Lestat de Lioncourt",
        emoji: "🧛",
        img: "images/lestat.png",
        attacks: [
            {name: "Vampire Strike", desc: "moves with speed", minDmg: 21, maxDmg: 35},
            {name: "Blood Drain", desc: "siphons life", minDmg: 18, maxDmg: 29},
            {name: "Dark Gift", desc: "unleashes power", minDmg: 15, maxDmg: 28}
        ]
    },
    {
        key: "ghostface", name: "Ghostface",
        emoji: "👻",
        img: "images/ghostface.png",
        attacks: [
            {name: "Knife Lunge", desc: "slashes fast", minDmg: 20, maxDmg: 30},
            {name: "Phone Threat", desc: "terrifies with call", minDmg: 16, maxDmg: 26},
            {name: "Silent Pounce", desc: "leaps from darkness", minDmg: 14, maxDmg: 25}
        ]
    },
    {
        key: "leatherface", name: "Leatherface",
        emoji: "⚙️",
        img: "images/leatherface.png",
        attacks: [
            {name: "Chainsaw Massacre", desc: "dismembers victims", minDmg: 27, maxDmg: 42},
            {name: "Raw Strength", desc: "brutalizes enemy", minDmg: 18, maxDmg: 29},
            {name: "Shriek", desc: "terrifies to death", minDmg: 14, maxDmg: 24}
        ]
    },
    {
        key: "mummy", name: "The Mummy",
        emoji: "🏺",
        img: "images/mummy.png",
        attacks: [
            {name: "Bandage Wrap", desc: "smothers foe", minDmg: 15, maxDmg: 26},
            {name: "Sandstorm", desc: "buries alive", minDmg: 25, maxDmg: 38},
            {name: "Ancient Curse", desc: "saps vitality", minDmg: 18, maxDmg: 28}
        ]
    },
    {
        key: "pennywise", name: "Pennywise",
        emoji: "🎈",
        img: "images/pennywise.png",
        attacks: [
            {name: "Balloons of Doom", desc: "explodes balloons", minDmg: 22, maxDmg: 34},
            {name: "Clown Bite", desc: "bites with fangs", minDmg: 18, maxDmg: 27},
            {name: "Fear Gaze", desc: "instills terror", minDmg: 14, maxDmg: 24}
        ]
    },
    {
        key: "samara", name: "Samara Morgan",
        emoji: "💀",
        img: "images/samara.png",
        attacks: [
            {name: "Haunting Touch", desc: "chills with dread", minDmg: 20, maxDmg: 30},
            {name: "Video Death", desc: "curses with tape", minDmg: 24, maxDmg: 36},
            {name: "Well Crawl", desc: "emerges menacingly", minDmg: 15, maxDmg: 22}
        ]
    }
];

let selectedBrawlerKeys = [];
let fightersState = [];
let roundNumber = 1;
let logBuffer = [];
let score = 0;
let canvas, ctx;
let bgImgLoaded = false;
let gameState = "menu"; // menu | battle | victory
let idleRoamInterval = null;

function resizeCanvas() {
    // Mobile: Make sure space for banner/log/buttons stays
    let availableWidth = window.innerWidth - 16;
    let availableHeight = window.innerHeight - 250; // banner + battle log + button area
    let size = Math.min(availableWidth, availableHeight);
    // Clamp for desktop/tablet
    size = Math.max(240, Math.min(size, 800));
    canvas.width = size;
    canvas.height = size;
    canvas.style.width = size + "px";
    canvas.style.height = size + "px";
    renderFightersOnCanvas();
}
window.onresize = resizeCanvas;




// Utility for preloading fighter image
function preloadImage(src, cb) {
    const img = new window.Image();
    img.onload = () => cb(img);
    img.onerror = () => cb(null);
    img.src = src;
}

// Show correct game screen
function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    gameState = (id === "battle-arena") ? "battle" : (id === "main-menu" ? "menu" : "victory");
}

// Render brawler selection grid
function renderBrawlerGrid() {
    const grid = document.getElementById("brawler-grid");
    grid.innerHTML = "";
    selectedBrawlerKeys = [];
    BRAWLER_DATA.forEach(b => {
        const card = document.createElement("div");
        card.classList.add("brawler-card");
        card.setAttribute("data-key", b.key);

        let avatarEl = document.createElement("span");
        avatarEl.className = "brawler-avatar";
        preloadImage(b.img, img => {
            if(img) avatarEl.innerHTML = `<img src="${b.img}" style="width:54px;height:54px;border-radius:6px;">`;
            else avatarEl.textContent = b.emoji;
        });
        avatarEl.textContent = b.emoji;

        let nameEl = document.createElement("div");
        nameEl.className = "brawler-name";
        nameEl.textContent = b.name;

        let statsEl = document.createElement("div");
        statsEl.className = "brawler-stats";
        statsEl.innerHTML = `Abilities:<br>
            • ${b.attacks.map(a=>a.name).join("<br>• ")}`;

        card.appendChild(avatarEl);
        card.appendChild(nameEl);
        card.appendChild(statsEl);

        card.addEventListener("click", () => toggleBrawlerSelection(b.key, card));
        grid.appendChild(card);
    });
    document.getElementById("start-game").disabled = true;
}

function toggleBrawlerSelection(key, card) {
    const idx = selectedBrawlerKeys.indexOf(key);
    if (idx === -1) {
        if (selectedBrawlerKeys.length >= MAX_SELECT) return;
        selectedBrawlerKeys.push(key);
        card.classList.add("selected");
    } else {
        selectedBrawlerKeys.splice(idx, 1);
        card.classList.remove("selected");
    }
    const btn = document.getElementById("start-game");
    btn.disabled = !(selectedBrawlerKeys.length >= MIN_SELECT && selectedBrawlerKeys.length <= MAX_SELECT);
}

// Initialize fighter positions and image objs
function assignFighterPositions() {
    fightersState.forEach(f => {
        f.x = Math.floor(Math.random() * (MOVE_MAX_X - MOVE_MIN_X)) + MOVE_MIN_X;
        f.y = Math.floor(Math.random() * (MOVE_MAX_Y - MOVE_MIN_Y)) + MOVE_MIN_Y;
        f.isFlashing = false;
        f.lastDamageTaken = 0;
        f.flashHpLoss = 0;
        f.imgObj = null;
        f.isMoving = false;
        preloadImage(f.img, img => { f.imgObj = img; });
    });
}

// Roam idle fighters for animation
function roamIdleFighters() {
    fightersState.forEach(f => {
        if (!f.alive) return;
        if (!f.isMoving) {
            f.x += Math.floor(Math.random() * 7) - 3;
            f.y += Math.floor(Math.random() * 7) - 3;
            f.x = Math.max(MOVE_MIN_X, Math.min(f.x, MOVE_MAX_X));
            f.y = Math.max(MOVE_MIN_Y, Math.min(f.y, MOVE_MAX_Y));
        }
    });
}

// Start/stop idle roam loop
function startIdleRoam() {
    if (idleRoamInterval) clearInterval(idleRoamInterval);
    idleRoamInterval = setInterval(() => {
        if (gameState === "battle") {
            roamIdleFighters();
            renderFightersOnCanvas();
        }
    }, 120);
}
function stopIdleRoam() {
    if (idleRoamInterval) clearInterval(idleRoamInterval);
}

// Render all fighters on canvas over bg and ensure no stretching regardless of canvas size
function renderFightersOnCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background - always fill canvas
    if (bgImgLoaded) {
        ctx.drawImage(document.getElementById('bg-image'), 0, 0, canvas.width, canvas.height);
    }

    // Dynamically scale avatar and fonts by canvas size
    let avatarSize = Math.max(28, canvas.width * 0.07); // scales from ~30px on phones to ~56px on large screens
    let hpBarW = Math.max(avatarSize * 1.12, 34);
    let hpBarH = Math.max(avatarSize * 0.17, 6);

    fightersState.forEach(f => {
        if (!f.alive) return;

        // Map world coordinates to canvas, always using actual canvas dimensions:
        let drawX = Math.floor(f.x / 2048 * canvas.width);
        let drawY = Math.floor(f.y / 2048 * canvas.height);

        // Avatar or emoji
        if (f.imgObj) {
            ctx.drawImage(f.imgObj, drawX - avatarSize / 2, drawY - avatarSize / 2, avatarSize, avatarSize);
        } else {
            ctx.font = avatarSize + "px Bangers";
            ctx.fillStyle = f.isFlashing ? "#ff0000" : "#fff";
            ctx.textAlign = "center";
            ctx.fillText(f.emoji, drawX, drawY + avatarSize * 0.36);
        }

        // Name, just below avatar
        ctx.font = Math.max(avatarSize * 0.36, 14) + "px Bangers";
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.fillText(f.name, drawX, drawY + avatarSize * 0.75);

        // HP bar just above avatar center
        let hpWidth = hpBarW * (f.hp / f.maxHp);
        ctx.fillStyle = "#000";
        ctx.fillRect(drawX - hpBarW / 2, drawY - avatarSize * 0.62, hpBarW, hpBarH);
        ctx.fillStyle = f.hp / f.maxHp > 0.5 ? "#0f0" : f.hp / f.maxHp > 0.2 ? "#ff0" : "#f00";
        ctx.fillRect(drawX - hpBarW / 2 + 1, drawY - avatarSize * 0.62 + 1, Math.max(2, hpWidth - 2), hpBarH - 2);

        // HP loss flash
        if (f.flashHpLoss > 0) {
            ctx.font = Math.max(avatarSize * 0.30, 13) + "px Bangers";
            ctx.fillStyle = "#ff3333";
            ctx.globalAlpha = f.flashHpLoss;
            ctx.fillText("-" + f.lastDamageTaken, drawX, drawY - avatarSize * 0.82);
            ctx.globalAlpha = 1;
            f.flashHpLoss -= 0.04;
        }
    });

    ctx.textAlign = "left"; // reset text alignment
}


// Animate attacker to target
function animateAttackMove(attackerIdx, defenderIdx, callback) {
    let attacker = fightersState[attackerIdx];
    let defender = fightersState[defenderIdx];
    attacker.isMoving = true;
    let origX = attacker.x, origY = attacker.y;
    let dx = defender.x - attacker.x, dy = defender.y - attacker.y;
    let steps = 14, step = 0;
    function stepMove() {
        step++;
        attacker.x = origX + Math.floor(dx * step / steps);
        attacker.y = origY + Math.floor(dy * step / steps);
        renderFightersOnCanvas();
        if (step < steps) {
            setTimeout(stepMove, 16);
        } else {
            setTimeout(()=> {
                attacker.x = origX;
                attacker.y = origY;
                attacker.isMoving = false;
                renderFightersOnCanvas();
                callback();
            }, 180);
        }
    }
    stepMove();
}

// Damage flash
function indicateDamage(defenderIdx, damage) {
    let f = fightersState[defenderIdx];
    f.flashHpLoss = 1;
    f.lastDamageTaken = damage;
    f.isFlashing = true;
    document.getElementById('oof-sound').play();
    setTimeout(() => { f.isFlashing = false; }, 400);
}

// Game start: setup fighters, positions, music
function startGame() {
    fightersState = selectedBrawlerKeys.map(key => {
        const base = BRAWLER_DATA.find(b => b.key === key);
        const hp = Math.floor(Math.random()*(BRAWLER_HP_MAX-BRAWLER_HP_MIN+1))+BRAWLER_HP_MIN;
        return {...base, hp, maxHp: hp, alive: true };
    });
    roundNumber = 1; score = 0; logBuffer = [];
    assignFighterPositions();
    showScreen("battle-arena");
    document.getElementById("log-entries").innerHTML = "";
    playMusic("fight");
    updateCanvasBanner();
    renderFightersOnCanvas();
    startIdleRoam();
    setTimeout(() => {
        console.log("Running first battle turn");
        runBattleTurn();
    }, 900);
}

function runBattleTurn() {
    console.log("Battle Turn triggered; round", roundNumber);
    let alive = fightersState.filter(f => f.alive);
    if (alive.length <= 1) { declareWinner(); return; }
    log(`--- <b>Round ${roundNumber}</b> ---`, "round");
    let active = fightersState.filter(f => f.alive);
    let attacker = active[Math.floor(Math.random()*active.length)];
    let attackerIdx = fightersState.indexOf(attacker);
    let defenders = active.filter(f => f !== attacker);
    let defender = defenders[Math.floor(Math.random()*defenders.length)];
    let defenderIdx = fightersState.indexOf(defender);

    let atk = attacker.attacks[Math.floor(Math.random()*attacker.attacks.length)];
    let dmg = Math.floor(Math.random()*(atk.maxDmg-atk.minDmg+1))+atk.minDmg;

    animateAttackMove(attackerIdx, defenderIdx, () => {
        defender.hp -= dmg;
        indicateDamage(defenderIdx, dmg);
        if (defender.hp <= 0) {
            defender.hp = 0; defender.alive = false;
            log(`<span style="color:#ff3333;">${attacker.name}</span> uses <b>${atk.name}</b> (${atk.desc}) on <span style="color:#ffff00;">${defender.name}</span> for <b>${dmg}</b> damage!`, "attack");
            log(`<b>${defender.name} is eliminated!</b> 💀`, "death");
            score++;
        } else {
            log(`<span style="color:#ff3333;">${attacker.name}</span> uses <b>${atk.name}</b> (${atk.desc}) on <span style="color:#ffff00;">${defender.name}</span> for <b>${dmg}</b> damage.`, "attack");
        }
        updateCanvasBanner();
        renderFightersOnCanvas();
        roundNumber++;
        setTimeout(runBattleTurn, BATTLE_INTERVAL);
    });
}

function updateCanvasBanner() {
    let alive = fightersState.filter(f => f.alive);
    let topBrawler = alive.reduce((a,b)=>(b.hp>a.hp?b:a), alive[0]);
    document.getElementById("score").innerHTML = `Top HP: <span style="color: #ffff00; font-weight:bold;">${topBrawler.name}</span> (${topBrawler.hp} HP)`;
    document.getElementById("round").textContent = `Round: ${roundNumber}`;
}

function log(msg, type="attack") {
    logBuffer.push({msg, type});
    let logBox = document.getElementById("log-entries");
    if(logBox) {
        let entry = document.createElement("div");
        entry.className = `log-entry ${type}`;
        entry.innerHTML = msg;
        logBox.appendChild(entry);
        // Ensures always scrolled to bottom after new message
        setTimeout(() => {
          logBox.scrollTop = logBox.scrollHeight;
        }, 0);
    }
}



function declareWinner() {
    playMusic("menu");
    stopIdleRoam();
    showScreen("victory");
    let champ = fightersState.find(f => f.alive);
    let winBox = document.getElementById("winner");
    if (!champ) {
        winBox.innerHTML = "<b>No survivor. All defeated!</b>";
        return;
    }
    let avatar = document.createElement("div");
    avatar.className = "winner-avatar";
    if(champ.imgObj) avatar.innerHTML = `<img src="${champ.img}" alt="${champ.name}" style="width:100px;height:100px;border-radius:24px;">`;
    else avatar.textContent = champ.emoji;

    let nameBox = document.createElement("div");
    nameBox.className = "winner-name";
    nameBox.textContent = champ.name;

    let statsBox = document.createElement("div");
    statsBox.className = "winner-stats";
    statsBox.innerHTML = `Survived with <b>${champ.hp} / ${champ.maxHp} HP</b><br>Total Rounds: <b>${roundNumber-1}</b><br>Total KOs: <b>${score}</b>`;
    winBox.innerHTML = '';
    winBox.appendChild(avatar);
    winBox.appendChild(nameBox);
    winBox.appendChild(statsBox);
}

// Music
function playMusic(type) {
    const menuEl = document.getElementById("menu-music");
    const fightEl = document.getElementById("fight-music");
    if (type === "menu") {
        menuEl.currentTime = 0;
        menuEl.play();
        fightEl.pause();
        fightEl.currentTime = 0;
    } else {
        fightEl.currentTime = 0;
        fightEl.play();
        menuEl.pause();
        menuEl.currentTime = 0;
    }
}

// UI button handlers
document.getElementById("start-game").onclick = startGame;
document.getElementById("new-game").onclick = restartGame;
document.getElementById("restart").onclick = restartGame;

function restartGame() {
    showScreen("main-menu");
    stopIdleRoam();
    renderBrawlerGrid();
    document.getElementById("start-game").disabled = true;
    document.getElementById("log-entries").innerHTML = "";
    playMusic("menu");
}

// Canvas initialization
window.onload = function() {
    renderBrawlerGrid();
    canvas = document.getElementById('fight-canvas');
    ctx = canvas.getContext('2d');
    let bgImg = document.getElementById('bg-image');
    bgImg.onload = () => { bgImgLoaded = true; renderFightersOnCanvas(); };
    if (bgImg.complete) { bgImgLoaded = true; renderFightersOnCanvas(); }
    resizeCanvas();

    // Audio user gesture bootstrap
    let triggered = false;
    function startMenuAudio() {
        if(!triggered) {
            triggered = true;
            playMusic("menu");
            window.removeEventListener('click', startMenuAudio);
            window.removeEventListener('touchstart', startMenuAudio);
        }
    }
    window.addEventListener('click', startMenuAudio);
    window.addEventListener('touchstart', startMenuAudio);
let startedSound = false;
function tryStartMenuMusic() {
    if (!startedSound) {
        startedSound = true;
        playMusic("menu");
        window.removeEventListener('click', tryStartMenuMusic);
        window.removeEventListener('touchstart', tryStartMenuMusic);
    }
}
// Attach to ANY user interaction from the start!
window.addEventListener('click', tryStartMenuMusic);
window.addEventListener('touchstart', tryStartMenuMusic);

};

