console.log('welcome to spotify')
let songIndex = 0;
let masterPlay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let songItemContainer = document.querySelector(".songitemcontainer");
let prevBtn = document.querySelector(".fa-step-backward");
let nextBtn = document.querySelector(".fa-step-forward");
let currSongNameDisplay = document.querySelector(".curr-songname");


let songs = [
    { songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Rabba - Salam-e-Ishq", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
]

let songElements = songs.map((song, idx) => (
    `<div class="songItem">
    <img src="${song.coverPath}" alt="1">
    <span class="songName">${song.songName}</span>
    <span class="songlistplay">
        <span class="timestamp">05:34<i id="${idx}" class="far fa-play-circle play"></i></span>
    </span>
</div>`
)).join('');

songItemContainer.innerHTML = songElements;


let audioElement = new Audio('songs/1.mp3');

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;

    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

let currentPlaying = 0;
currSongNameDisplay.innerHTML = songs[currentPlaying].songName;

const playNext = () => {
    if (currentPlaying < songs.length - 1) {
        ++currentPlaying;
    } else {
        currentPlaying = 0;
    }
    audioElement.pause();
    audioElement = new Audio(songs[currentPlaying].filePath);
    audioElement.currentTime = 0;
    audioElement.play();
    audioElement.addEventListener('timeupdate', () => {
        progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;
    })
    currSongNameDisplay.innerHTML = songs[currentPlaying].songName;
}

const playPrev = () => {
    if (currentPlaying === 0) {
        currentPlaying = songs.length - 1;
    } else {
        --currentPlaying;
    }
    audioElement.pause();
    audioElement = new Audio(songs[currentPlaying].filePath);
    audioElement.currentTime = 0;
    audioElement.play();
    audioElement.addEventListener('timeupdate', () => {
        progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;
    })
    currSongNameDisplay.innerHTML = songs[currentPlaying].songName;
}

function PlayCurrent(idx) {
    currentPlaying = idx
    audioElement.pause();
    audioElement = new Audio(songs[currentPlaying].filePath);
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    audioElement.addEventListener('timeupdate', () => {
        progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;
    })
    currSongNameDisplay.innerHTML = songs[currentPlaying].songName;
}

const playButtons = document.querySelectorAll('.play');

// Add click event listeners to play buttons
playButtons.forEach((button, idx) => {
    button.addEventListener('click', () => {
        PlayCurrent(idx);
        button.classList.remove('fa-play-circle');
        button.classList.add('fa-pause-circle');
    });
});

