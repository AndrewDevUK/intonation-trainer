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

document.getElementById("keySelection").addEventListener("change", (event) => {
    let keyImage = document.getElementById("keyImage");
    
    switch(event.target.value) {
        case "cMaj":
        case "aMin":
            keyImage.setAttribute("src", "images/key-signatures/none.png");
            break;
        case "gMaj":
        case "eMin":
            keyImage.setAttribute("src", "images/key-signatures/1S.png");
            break;
        case "dMaj":
        case "bMin":
            keyImage.setAttribute("src", "images/key-signatures/2S.png");
            break;
        case "aMaj":
        case "fSharpMin":
            keyImage.setAttribute("src", "images/key-signatures/3S.png");
            break;
        case "eMaj":
        case "cSharpMin":
            keyImage.setAttribute("src", "images/key-signatures/4S.png");
            break;
        case "bMaj":
        case "gSharpMin":
            keyImage.setAttribute("src", "images/key-signatures/5S.png");
            break;
        case "fSharpMaj":
        case "dSharpMin":
            keyImage.setAttribute("src", "images/key-signatures/6S.png");
            break;
        case "cSharpMaj":
            keyImage.setAttribute("src", "images/key-signatures/7S.png");
            break;
        case "cFlatMaj":
            keyImage.setAttribute("src", "images/key-signatures/7F.png");
            break;
        case "gFlatMaj":
        case "eFlatMin":
            keyImage.setAttribute("src", "images/key-signatures/6F.png");
            break;
        case "dFlatMaj":
        case "bFlatMin":
            keyImage.setAttribute("src", "images/key-signatures/5F.png");
            break;
        case "aFlatMaj":
        case "fMin":
            keyImage.setAttribute("src", "images/key-signatures/4F.png");
            break;
        case "eFlatMaj":
        case "cMin":
            keyImage.setAttribute("src", "images/key-signatures/3F.png");
            break;
        case "bFlatMaj":
        case "gMin":
            keyImage.setAttribute("src", "images/key-signatures/2F.png");
            break;
        case "fMaj":
        case "dMin":
            keyImage.setAttribute("src", "images/key-signatures/1F.png");
            break;
    }
});
