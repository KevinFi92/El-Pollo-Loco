let canvas;
let world;
let character;
let keyboard;
let soundMuted = JSON.parse(localStorage.getItem("status"));


function setMuteBtn() {
    let muteIcon = document.getElementById("muteImg");
    if (soundMuted) {
        muteIcon.src = localStorage.getItem("src");
    }else{
        muteIcon.src = "img/11_icons/sound_unmuted.png";
    }
}

function init() {
    initLevel();
    canvas = document.getElementById("canvas");
    character = new Character();
    keyboard = new Keyboard();
    world = new World(canvas, keyboard, character, soundMuted);
    startGame();
}


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


function startGame() {
    document.getElementById("canvas").style.display = "block";
    document.getElementById("ui").style.display = "none";

}


function restartGame() {
    world.stopSounds(world.music);
    document.getElementById("restart").style.display = "none";
    init();
}


function backToMenu() {
    window.location.reload();
}


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


function saveInLocalStorage(key, value) {
    if (value === false || value === true) {
        localStorage.setItem(key, JSON.stringify(value));
    } else {
        localStorage.setItem(key, value);
    }
}

function toggleControls() {
    let controls = document.getElementById("controlsInfo");
    if (controls.style.display === "none") {
        controls.style.display = "flex";
    }else {
        controls.style.display = "none";
    }
}

