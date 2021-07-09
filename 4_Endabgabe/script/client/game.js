"use strict";
var end_game;
(function (end_game) {
    let cardCount = 24;
    let url;
    async function getImageData() {
        setURL();
        url += "/receivegamelink";
        let response = await fetch(url);
        let responseJSON = await response.json();
        console.log("Data Received");
        console.log("URL:", url);
        setURL();
        return responseJSON;
    }
    async function gameSetup() {
        let linkData = await getImageData();
        let currentDeck = pickCards(linkData);
        for (let i = 0; i < cardCount; i++) {
            let item = currentDeck[i];
            let card = document.createElement("div");
            let inner = document.createElement("div");
            let front = document.createElement("div");
            let back = document.createElement("div");
            let heading = document.createElement("h1");
            let img = document.createElement("img");
            card.classList.add("card");
            inner.classList.add("inner");
            front.classList.add("card-face");
            front.classList.add("card-front");
            back.classList.add("card-face");
            back.classList.add("card-back");
            heading.innerHTML = "?";
            img.setAttribute("src", item.link);
            img.setAttribute("alt", item.name);
            img.setAttribute("id", "cd" + i);
            back.appendChild(img);
            front.appendChild(heading);
            inner.appendChild(front);
            inner.appendChild(back);
            card.appendChild(inner);
            document.getElementsByClassName("game-main")[0].appendChild(card);
        }
        setupCode();
    }
    function pickCards(_linkArray) {
        let v = 0;
        let cardSelection = [];
        while (v < cardCount / 2) {
            let rand = _linkArray[Math.floor(Math.random() * _linkArray.length)];
            if (cardSelection.includes(rand) == false) {
                cardSelection.push(rand);
                v++;
            }
        }
        cardSelection = cardSelection.concat(cardSelection);
        return shuffleCards(cardSelection);
    }
    gameSetup();
    function shuffleCards(a) {
        for (let i = a.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    let hueRotate = Math.floor(Math.random() * 360);
    let c = 0;
    let d = 0;
    let interval;
    let last;
    function setupCode() {
        for (let i = 0; i < document.querySelectorAll(".inner").length; i++) {
            let card = document.querySelectorAll(".inner")[i];
            card.addEventListener("click", flip);
            function flip() {
                c++;
                if (c >= 2) {
                    if (last.getAttribute("src") == document.querySelectorAll(".inner")[i].children[1].children[0].getAttribute("src") && last.getAttribute("id") != card.children[1].children[0].getAttribute("id")) {
                        console.log("Paar gefunden: " + last.alt);
                        flipBack();
                        card.removeEventListener("click", flip);
                        last.parentElement.parentElement.setAttribute("style", "filter: opacity(0%); cursor: default;");
                        card.parentElement.firstElementChild.setAttribute("style", "filter: opacity(0%); cursor: default;");
                        c = 0;
                        d++;
                    }
                    else {
                        card.classList.toggle("flip");
                        interval = setInterval(function () {
                            card.classList.toggle("flip");
                            flipBack();
                        }, 400);
                        c = 0;
                    }
                }
                else {
                    last = document.querySelectorAll(".inner")[i].children[1].children[0];
                    card.classList.toggle("flip");
                    clearInterval(interval);
                }
                if (document.querySelectorAll(".flip").length > 2) {
                    clearInterval(interval);
                    flipBack();
                    flipBack();
                    card.classList.toggle("flip");
                }
                if (d == cardCount / 2) {
                    showFinal();
                }
            }
        }
        for (let i = 0; i < document.querySelectorAll(".card-front").length; i++) {
            document.querySelectorAll(".card-front")[i].setAttribute("style", "filter: hue-rotate(" + hueRotate + "deg);");
        }
    }
    function flipBack() {
        for (let i = 0; i < document.querySelectorAll(".flip").length; i++) {
            document.querySelectorAll(".flip")[i].classList.remove("flip");
        }
    }
    let minutes = 0;
    let seconds = 0;
    let m = "";
    let s = "";
    let timerInterval;
    let startDate = new Date();
    function counter() {
        timerInterval = setInterval(timer, 1000);
    }
    function timer() {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes < 10)
            m = "0" + minutes;
        else
            m = "" + minutes;
        if (seconds < 10)
            s = "0" + seconds;
        else
            s = "" + seconds;
        document.getElementById("time").innerHTML = "Zeit: " + m + ":" + s;
    }
    counter();
    function showFinal() {
        console.log("GAME FINISHED");
        clearInterval(timerInterval);
        let endDate = new Date();
        getTime(endDate);
        window.open("./result.html", "_self");
    }
    function getTime(_endDate) {
        let minuteDuration = _endDate.getMinutes() - startDate.getMinutes();
        let secondDuration = _endDate.getSeconds() - startDate.getSeconds();
        let millisecondDuration = _endDate.getMilliseconds() - startDate.getMilliseconds();
        if (millisecondDuration < 0) {
            millisecondDuration = 1000 - (millisecondDuration * -1);
            secondDuration -= 1;
        }
        if (secondDuration < 0) {
            secondDuration = 60 - (secondDuration * -1);
            minuteDuration -= 1;
        }
        console.log("Game took " + minuteDuration + " minutes, " + secondDuration + " seconds and " + millisecondDuration + " milliseconds");
        let time = minuteDuration + "m " + secondDuration + "s " + millisecondDuration + "ms";
        let output = minuteDuration + " Minuten, " + secondDuration + " Sekunden, " + millisecondDuration + " Millisekunden";
        localStorage.setItem("MemoryTime", time);
        localStorage.setItem("OutputTime", output);
    }
    function setURL() {
        url = "https://qlu.herokuapp.com";
    }
})(end_game || (end_game = {}));
//# sourceMappingURL=game.js.map