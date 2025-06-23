let canvas;
let world;
let character;
let keyboard;
let soundMuted = JSON.parse(localStorage.getItem("status"));

/** Diese Funktion lädt den Status des MuteButtons aus dem Localstorage, wenn nicht vorhanden wird der Unmuted gesetzt */
function setMuteBtn() {
    let muteIcon = document.getElementById("muteImg");
    if (soundMuted) {
        muteIcon.src = localStorage.getItem("src");
    }else{
        muteIcon.src = "img/11_icons/sound_unmuted.png";
    }
}

/**Die Init Funktion führt alle wichtigen Funktionen zum Start des Spiels aus */
function init() {
    initLevel();
    canvas = document.getElementById("canvas");
    character = new Character();
    keyboard = new Keyboard();
    world = new World(canvas, keyboard, character, soundMuted);
    startGame();
}

/**Eventlistener für die Touch-Steuerung */
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.controls .button');
    buttons.forEach(btn => {
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const dir = btn.dataset.dir;
            if (dir && world.gameStarted) {
                keyboard[dir] = true;
            }
        });
        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            const dir = btn.dataset.dir;
            if (dir) {
                keyboard[dir] = false;
            }
        });
        btn.addEventListener('mousedown', (e) => {
            const dir = btn.dataset.dir;
            if (dir && world.gameStarted) {
                keyboard[dir] = true;
            }
        });
        btn.addEventListener('mouseup', (e) => {
            const dir = btn.dataset.dir;
            if (dir) {
                keyboard[dir] = false;
            }
        });
    });
});

/**Eventlistener für die Tastatur-Steuerung */
document.addEventListener("keydown", function (event) {
    if (event.code === "ArrowRight" && world.gameStarted) {
        keyboard.right = true;
    }
    if (event.code === "ArrowLeft" && world.gameStarted) {
        keyboard.left = true;
    }
    if (event.code === "ArrowUp" && world.gameStarted) {
        keyboard.up = true;
    }
    if (event.code === "Space" && world.gameStarted) {
        keyboard.space = true;
    }
});

/**Eventlistener für die Tastatur-Steuerung */
document.addEventListener("keyup", function (event) {
    if (event.code === "ArrowRight") {
        keyboard.right = false;
    }
    if (event.code === "ArrowLeft") {
        keyboard.left = false;
    }
    if (event.code === "ArrowUp") {
        keyboard.up = false;
    }
    if (event.code === "Space") {
        keyboard.space = false;
    }
});

/**Blendet das Startmenü aus und das Canvas ein */
function startGame() {
    document.getElementById("canvas").style.display = "block";
    document.getElementById("mute").style.display = "block";
    document.getElementById("ui").style.display = "none";
    document.getElementById("headLine").style.display = "none";
}

/**Die Welt wird zurückgesetzt */
function restartGame() {
    world.stopSounds(world.music);
    document.getElementById("restart").style.display = "none";
    init();
}

/**Nach Spielende wieder zurück ins Hauptmenü*/
function backToMenu() {
    window.location.reload();
}

/**Sound wird ein bzw. aus geschaltet */
function muteSound() {
    let muteBtn = document.getElementById("mute").querySelector("img");
    let muteStatus = localStorage.getItem("src");
    if (muteStatus === "img/11_icons/sound_unmuted.png") {
        muteBtn.src = "img/11_icons/sound_muted.png";
        world.soundMuted = true;
        saveInLocalStorage("status", true);
        saveInLocalStorage("src", "img/11_icons/sound_muted.png");
    } else {
        muteBtn.src = "img/11_icons/sound_unmuted.png";
        world.soundMuted = false;
        saveInLocalStorage("status", false);
        saveInLocalStorage("src", "img/11_icons/sound_unmuted.png");
    }
}

/**Funktion speichert ein key/value paar in den Localstorage. In diesem Fall den Pfad zum Mutebtn Bild und ob das Spiel gemuted ist oder nicht*/
function saveInLocalStorage(key, value) {
    if (value === false || value === true) {
        localStorage.setItem(key, JSON.stringify(value));
    } else {
        localStorage.setItem(key, value);
    }
}

/**Blendet im Hauptmenü die Erkärung der Steuerung ein bzw. aus*/
function toggleControls() {
    let controls = document.getElementById("controlsInfo");
    if (controls.style.display === "none") {
        controls.style.display = "flex";
    }else {
        controls.style.display = "none";
    }
}

/**Zurück zum Hauptmenü aus dem Impressum */
function backToMainPage(){
    window.location.href = "index.html";
}

