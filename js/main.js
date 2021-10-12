import { RadioPlayerInit } from "./radioPlayer.js";
import { VideoPlayerInit } from "./videoPlayer.js";
import { MusicPlayerInit } from "./musicPlayer.js";

let PlayerBtn = document.querySelectorAll(".player-btn");
let PlayerBlock = document.querySelectorAll(".player-block");

let deactiveButton = () => {
    PlayerBtn.forEach((item) => {
        item.classList.remove("active");
    });
    PlayerBlock.forEach((item) => {
        item.classList.remove("active");
    });
};


PlayerBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        deactiveButton();
        btn.classList.add("active");
        PlayerBlock[index].classList.add("active");
    })
});

RadioPlayerInit();
VideoPlayerInit();
MusicPlayerInit();