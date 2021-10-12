export let RadioPlayerInit = () => {
    let radio = document.querySelector(".radio");
    let radioCoverImg = document.querySelector(".radio-cover__img");
    let radioNavigation = document.querySelector(".radio-navigation");
    let radioHeader = document.querySelector(".radio-header__big");
    let radioItem = document.querySelectorAll(".radio-item");
    let radioStop = document.querySelector(".radio-stop");
    let radioVolume = document.querySelector(".radio-volume");

    let audio = new Audio();
    audio.type = "audio/aac";

    radioStop.disabled = true;

    function changeIconPlay() {
        if (audio.paused) {
            radio.classList.remove("play");
            radioStop.classList.add("fa-play");
            radioStop.classList.remove("fa-stop");
        } else {
            radio.classList.add("play");
            radioStop.classList.remove("fa-play");
            radioStop.classList.add("fa-stop");
        }
    }

    function selectItem(elem) {
        radioItem.forEach(item => item.classList.remove("select"));
        elem.classList.add("select");
    }

    radioNavigation.addEventListener("change", (event) => {
        let target = event.target;
        let parrent = target.closest(".radio-item");
        selectItem(parrent);

        let title = parrent.querySelector(".radio-name").textContent;
        radioHeader.textContent = title;

        let urlImg = parrent.querySelector(".radio-img").src;
        radioCoverImg.src = urlImg;

        radioStop.disabled = false;

        audio.src = target.dataset.radioStantion;
        audio.play();
        changeIconPlay();
    });

    radioStop.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    });

    radioVolume.addEventListener("input", () => {
        audio.volume = radioVolume.value / 100;
    })
}