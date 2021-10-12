/*
gif.style.opacity = 1;
myProgressBar.value = progress;
let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
change
timeupdate
let songItems = Array.from(document.getElementsByClassName('songItem'));

 */

// #################################################### DECLARATION ###########################################################


let songs = [
    { songName: "ShiversEd Sheeran.", filePath: "1.mp3", coverPath: "1.jpg" },
    { songName: "STAY The Kid LAROI, Justin Bieber.", filePath: "2.mp3", coverPath: "2.jpg" },
    { songName: "My UniverseColdplay, BTS.", filePath: "3.mp3", coverPath: "3.jpg" },
    { songName: "WomanDoja Cat.", filePath: "4.mp3", coverPath: "4.jpg" },
    { songName: "INDUSTRY BABY Lil Nas X.", filePath: "5.mp3", coverPath: "5.jpg" },
    { songName: "Heat WavesGlass Animals.", filePath: "6.mp3", coverPath: "6.jpg" },
    { songName: "Salam-e-ishq.", filePath: "7.mp3", coverPath: "7.jpg" },
    { songName: "Bad HabitsEd Sheeran.", filePath: "8.mp3", coverPath: "8.jpg" },
    { songName: "Beggin'Måneskin.", filePath: "9.mp3", coverPath: "9.jpg" },
    { songName: "Like A Rolling Stone.", filePath: "10.mp3", coverPath: "10.jpg" }
];

let songIndex = 1;
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));

let gif = document.getElementById('gif');

let audioElement = new Audio('1.mp3');

// ###########################################################################################################################



// #################################################### FUNCTIONS ###########################################################

const makeAllPlay = () => {
    songItemPlay.forEach((element) => {
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');
    });
};

const makeButtonPlay = () => {
    songItemPlay.forEach((element) => {
        let id = parseInt(element.id);
        if (id == songIndex) {
            element.classList.remove('fa-play-circle');
            element.classList.add('fa-pause-circle');
        }
    });
};

// ###########################################################################################################################




// ######################################## MASTER-PLAY BUTTON PRESSED #########################################################

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        makeButtonPlay();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        makeAllPlay();
        masterPlay.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
        gif.style.opacity = 0;
    }
});

// ###########################################################################################################################




// ######################################## AUDIO-EVENT AND PROGESSBAR UPDATING #################################################

audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    console.log(`timeupdate = ${progress}`);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// ###########################################################################################################################



// ######################################## ADDING NAMES AND IMAGES TO TOP 10 LIST SONGS ######################################

songItems.forEach((element, i) => {
    console.log(element, i, songs[i].songName);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});

// ###########################################################################################################################


// ######################################## UPDATING THE ICONS ##################################################



songItemPlay.forEach((element) => {
    element.addEventListener('click', (e) => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            console.log(e.target);
            makeAllPlay();
            let index = parseInt(e.target.id);
            songIndex = index;
            masterSongName.innerText = songs[songIndex - 1].songName;
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.currentTime = 0;
            audioElement.src = `${index}.mp3`;
            audioElement.play();
            masterPlay.classList.add('fa-pause-circle');
            masterPlay.classList.remove('fa-play-circle');
            gif.style.opacity = 1;
        } else {
            makeAllPlay();
            audioElement.pause();
            e.target.classList.add('fa-play-circle');
            e.target.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            gif.style.opacity = 0;
        }
    });
});

// ###########################################################################################################################



// ######################################## WHEN PREVIOUS AND NEXT BUTTON PRESSED #################################################


document.getElementById('next').addEventListener('click', () => {
    makeAllPlay();
    if (songIndex >= 10) {
        songIndex = 1;
    } else {
        songIndex += 1;
    }
    makeButtonPlay();
    masterSongName.innerText = songs[songIndex - 1].songName;
    audioElement.currentTime = 0;
    audioElement.src = `${songIndex}.mp3`;
    audioElement.play();
    masterPlay.classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
    gif.style.opacity = 1;
});

document.getElementById('previous').addEventListener('click', () => {
    makeAllPlay();
    if (songIndex <= 1) {
        songIndex = 10;
    } else {
        songIndex -= 1;
    }
    makeButtonPlay();
    masterSongName.innerText = songs[songIndex - 1].songName;
    audioElement.currentTime = 0;
    audioElement.src = `${songIndex}.mp3`;
    audioElement.play();
    masterPlay.classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
    gif.style.opacity = 1;

});


// ###########################################################################################################################




