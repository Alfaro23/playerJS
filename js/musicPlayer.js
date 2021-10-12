export let MusicPlayerInit = () => {
    let audio = document.querySelector(".audio");
    let audioImg = document.querySelector(".audio-img");
    let audioHeader = document.querySelector(".audio-header");
    let audioPlayer = document.querySelector(".audio-player");
    let audioNavigation = document.querySelector(".audio-navigation");
    let audioButtonPlay = document.querySelector(".audio-button__play");
    let audioProgress = document.querySelector(".audio-progress");
    let audioProgressTiming = document.querySelector(".audio-progress__timing");
    let audioTimePassed = document.querySelector(".audio-time__passed");
    let audioTimeTotal = document.querySelector(".audio-time__total");

    let playlist = ["hello", "flow", "speed"];

    let trackIndex = 0;

    function loadTrack() {
        let isPlayed = audioPlayer.paused;
        let track = playlist[trackIndex];

        audioImg.src = `./audio/${track}.jpg`;
        audioHeader.textContent = track.toUpperCase();
        audioPlayer.src = `./audio/${track}.mp3`;

        if (isPlayed) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
    }

    function prevTrack() {
        if (trackIndex !== 0) {
            trackIndex--;
        } else {
            trackIndex = playlist.length - 1;
        }
        loadTrack();
    }

    function nextTrack() {
        if (trackIndex === playlist.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        loadTrack();
    }

    let addZero = n => n < 10 ? "0" + n : n; 

    audioNavigation.addEventListener("click", (event) => {
        let target = event.target;


        if (target.classList.contains("audio-button__play")) {
            audio.classList.toggle("play");
            audioButtonPlay.classList.toggle("fa-play");
            audioButtonPlay.classList.toggle("fa-pause");

            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
            let track = playlist[trackIndex];
            audioHeader.textContent = track.toUpperCase();
        }

        if (target.classList.contains("audio-button__prev")) {
            prevTrack();
        }

        if (target.classList.contains("audio-button__next")) {
            nextTrack();
        }
    });

    audioPlayer.addEventListener("ended", () => {
        nextTrack();
        audioPlayer.play();
    });

    audioPlayer.addEventListener("timeupdate", () => {
        let duration = audioPlayer.duration;
        let currentTime = audioPlayer.currentTime;
        let progress = (currentTime / duration) * 100;

        audioProgressTiming.style.width = progress + "%";

        let minutesPassed = Math.floor(currentTime / 60) || "0";
        let secondPassed = Math.floor(currentTime % 60) || "0";

        let minutesTotal = Math.floor(duration / 60) || "0";
        let secondsTotal = Math.floor(duration % 60) || "0";

        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondPassed)}`;
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;

    });

    audioProgress.addEventListener("click", (event)=>{
        let x = event.offsetX;
        let allWidth = audioProgress.clientWidth;
        let progress = (x / allWidth) * audioPlayer.duration; 
        audioPlayer.currentTime = progress;
    });
}