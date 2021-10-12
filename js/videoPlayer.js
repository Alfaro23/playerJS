export let VideoPlayerInit = () => {

    let videoPlayer = document.querySelector(".video-player");
    let videoButtonPlay = document.querySelector(".video-button__play");
    let videoButtonStop = document.querySelector(".video-button__stop");
    let videoTimePassed = document.querySelector(".video-time__passed");
    let videoProgress = document.querySelector(".video-progress");
    let videoTimeTotal = document.querySelector(".video-time__total");
    let videoVolume = document.querySelector(".video-volume");

    let touggleButton = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.add("fa-play");
            videoButtonPlay.classList.remove("fa-pause");
        } else {
            videoButtonPlay.classList.remove("fa-play");
            videoButtonPlay.classList.add("fa-pause");
        }
    }

    function tougglePlay() {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    }

    function stopPlay() {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }

    let addZero = n => n < 10 ? "0" + n : n;

    videoPlayer.addEventListener("click", tougglePlay);
    videoButtonPlay.addEventListener("click", tougglePlay);

    videoPlayer.addEventListener("play", touggleButton);
    videoPlayer.addEventListener("pause", touggleButton);

    videoButtonStop.addEventListener("click", stopPlay);

    let duration = videoPlayer.duration;

    videoPlayer.addEventListener("timeupdate", () => {
        let currentTime = videoPlayer.currentTime;

        videoProgress.value = (currentTime / duration) * 100;

        let minutePassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);

        let minuteTotal = Math.floor(duration / 60);
        let secondsTotal = Math.floor(duration % 60);

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
    });

    videoProgress.addEventListener("change", () => {
        let value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    })

    videoVolume.addEventListener("input", () => {
        videoPlayer.volume = videoVolume.value / 100;
    })
}