let canvas;
let world;
let character;
let keyboard;
let soundMuted = JSON.parse(localStorage.getItem("status"));

/** This function loads the status of the MuteButton from localStorage, if not available, it sets to Unmuted */
function setMuteBtn() {
    let muteIcon = document.getElementById("muteImg");
    if (soundMuted) {
        muteIcon.src = localStorage.getItem("src");
    }else{
        muteIcon.src = "img/11_icons/sound_unmuted.png";
    }
}

/**The Init function executes all important functions to start the game */
function init() {
    initLevel();
    canvas = document.getElementById("canvas");
    character = new Character();
    keyboard = new Keyboard();
    world = new World(canvas, keyboard, character, soundMuted);
    setMuteBtn();
    startGame();
}

/**Event listener for touch controls */
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

/**Event listener for keyboard controls */
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

/**Event listener for keyboard controls */
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

/**Hides the start menu and displays the canvas */
function startGame() {
    document.getElementById("canvas").style.display = "block";
    document.getElementById("mute").style.display = "block";
    document.getElementById("ui").style.display = "none";
    document.getElementById("headLine").style.display = "none";
    if (isTouchDevice()) {
        document.getElementById("controls").style.display = "flex";
    }
}

/**The world is reset */
function restartGame() {
    world.stopSounds(world.music);
    document.getElementById("restart").style.display = "none";
    init();
}

/**Return to the main menu after the game ends*/
function backToMenu() {
    window.location.reload();
}

/**Sound is turned on or off */
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

/**Function saves a key/value pair in localStorage. In this case, the path to the mute button image and whether the game is muted or not*/
function saveInLocalStorage(key, value) {
    if (value === false || value === true) {
        localStorage.setItem(key, JSON.stringify(value));
    } else {
        localStorage.setItem(key, value);
    }
}

/**Shows or hides the control explanation in the main menu*/
function toggleControls() {
    let controls = document.getElementById("controlsInfo");
    switchControlInfo();
    if (controls.style.display === "none") {
        controls.style.display = "flex";
    }else {
        controls.style.display = "none";
    }
}

/**Adjusts the control explanation between mobile and desktop */
function switchControlInfo(){
    let throwBtn = document.getElementById("throwImg");
    if(isTouchDevice()){
        throwBtn.src = "img/12_controlls/semicircle_right_arrow.png"
    }else{
        throwBtn.src = "img/12_controlls/spacebar.png";
    }
}

/**Back to the main menu from the imprint */
function backToMainPage(){
    window.location.href = "index.html";
}

/**Check if a device has a touchscreen */
function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}
