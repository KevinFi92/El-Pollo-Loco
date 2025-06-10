let canvas;
let world;
let character;
let keyboard;
let soundMuted = JSON.parse(localStorage.getItem("status"));

function setMuteBtn() {
    document.getElementById("muteImg").src = localStorage.getItem("src");

}

function init() {
    initLevel();
    canvas = document.getElementById("canvas");
    character = new Character();
    keyboard = new Keyboard();
    world = new World(canvas, keyboard, character, soundMuted);
    startGame();
}


document.addEventListener("keydown", function (event) {
    if (event.code === "ArrowRight") {
        keyboard.right = true;
    }
    if (event.code === "ArrowLeft") {
        keyboard.left = true;
    }
    if (event.code === "ArrowUp") {
        keyboard.up = true;
    }
    if (event.code === "Space") {
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

