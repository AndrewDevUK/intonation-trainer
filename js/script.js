var imageNames = [
    "A4.png",
    "A5.png",
    "A6.png",
    "B4.png",
    "B5.png",
    "B6.png",
    "C4.png",
    "C5.png",
    "D4.png",
    "D5.png",
    "E4.png",
    "E5.png",
    "F4.png",
    "F5.png",
    "G3.png",
    "G4.png",
    "G5.png"
];

var currentImage = "";

function toggleDisableOptions()
{
    let key = document.getElementById("keySelection");
    let button = document.getElementById("startStopButton");
    let easyButton = document.getElementById("btnradioEasy");
    let mediumButton = document.getElementById("btnradioMedium");
    let hardButton = document.getElementById("btnradioHard");

    key.disabled = !key.disabled;
    button.disabled = !button.disabled;
    easyButton.disabled = !easyButton.disabled;
    mediumButton.disabled = !mediumButton.disabled;
    hardButton.disabled = !hardButton.disabled;
}

function displayRandomNoteImage()
{
    let imageNumber = null;

    do {
        imageNumber = Math.floor(Math.random() * imageNames.length);
    } while(imageNames[imageNumber] === currentImage);

    let imageSource = "images/" + imageNames[imageNumber];
    currentImage = imageNames[imageNumber];

    document.getElementById("noteImage").setAttribute("src", imageSource);
    console.log(imageSource);
}

function getDifficulty()
{
    let difficulty = {
        delay: 0,
        duration: 0
    };

    if(document.getElementById("btnradioEasy").checked) {
        difficulty.delay = 2000;
        difficulty.duration = 10;
    } else if(document.getElementById("btnradioMedium").checked) {
        difficulty.delay = 1000;
        difficulty.duration = 20;
    } else if(document.getElementById("btnradioHard").checked) {
        difficulty.delay = 750;
        difficulty.duration = 50;
    }

    return difficulty;
}

function calculateProgress(current, max)
{
    return Math.floor((current / max) * 100);
}

const delay = ms => new Promise(res => setTimeout(res, ms));

async function runGame(difficulty)
{
    let progressBar = document.getElementById("progressBar");
    let progress = 0;
    progressBar.style.width = progress + "%";

    toggleDisableOptions();

    for(let i = 0; i < difficulty.duration; i++) {
        await delay(difficulty.delay);
        displayRandomNoteImage();

        progress = calculateProgress(i + 1, difficulty.duration);
        progressBar.style.width = progress + "%";
    }

    toggleDisableOptions();
}



document.getElementById("startStopButton").addEventListener("click", (event) => {
    event.preventDefault();

    runGame(getDifficulty());
});
