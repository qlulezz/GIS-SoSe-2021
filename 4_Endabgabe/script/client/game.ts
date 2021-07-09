namespace end_game {

    interface Link {
        link: string;
        name: string;
    }

    // GAME
    let cardCount: number = 24;
    let url: string;

    // Bilderlinks vom Server bekommen
    async function getImageData(): Promise<Link[]> {
        setURL();
        url += "/receivegamelink";
        let response: Response = await fetch(url);
        let responseJSON: Link[] = await response.json();
        console.log("Data Received");
        console.log("URL:", url);
        setURL();
        return responseJSON;
    }

    // Karten dynamisch aufbauen und Links einsetzen
    async function gameSetup(): Promise<void> {
        let linkData: Link[] = await getImageData();
        let currentDeck: Link[] = pickCards(linkData);
        for (let i: number = 0; i < cardCount; i++) {
            let item: Link = currentDeck[i];
            let card: HTMLDivElement = document.createElement("div");
            let inner: HTMLDivElement = document.createElement("div");
            let front: HTMLDivElement = document.createElement("div");
            let back: HTMLDivElement = document.createElement("div");
            let heading: HTMLHeadingElement = document.createElement("h1");
            let img: HTMLImageElement = document.createElement("img");
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

    function pickCards(_linkArray: Link[]): Link[] {
        let v: number = 0;
        let cardSelection: Link[] = [];
        while (v < cardCount / 2) {
            let rand: Link = _linkArray[Math.floor(Math.random() * _linkArray.length)];
            if (cardSelection.includes(rand) == false) {
                cardSelection.push(rand);
                v++;
            }
        }
        cardSelection = cardSelection.concat(cardSelection);
        return shuffleCards(cardSelection);
    }
    gameSetup();

    function shuffleCards(a: Link[]): Link[] {
        for (let i: number = a.length - 1; i > 0; i--) {
            let j: number = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    // Game Code
    let hueRotate: number = Math.floor(Math.random() * 360);
    let c: number = 0;
    let d: number = 0;
    let interval: NodeJS.Timeout;
    let last: HTMLImageElement;
    function setupCode(): void {
        for (let i: number = 0; i < document.querySelectorAll(".inner").length; i++) {
            let card: Element = document.querySelectorAll(".inner")[i];
            //card.addEventListener("mouseenter", flip);
            card.addEventListener("click", flip);
            function flip(): void {
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
                    } else {
                        card.classList.toggle("flip");
                        interval = setInterval(function (): void {
                            card.classList.toggle("flip");
                            flipBack();
                        },                     400);
                        c = 0;
                    }
                } else {
                    last = <HTMLImageElement>document.querySelectorAll(".inner")[i].children[1].children[0];
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
        for (let i: number = 0; i < document.querySelectorAll(".card-front").length; i++) {
            document.querySelectorAll(".card-front")[i].setAttribute("style", "filter: hue-rotate(" + hueRotate + "deg);");
        }
    }

    function flipBack(): void {
        for (let i: number = 0; i < document.querySelectorAll(".flip").length; i++) {
            document.querySelectorAll(".flip")[i].classList.remove("flip");
        }
    }

    let minutes: number = 0;
    let seconds: number = 0;
    let m: string = "";
    let s: string = "";
    let timerInterval: NodeJS.Timeout;
    let startDate: Date = new Date();
    function counter(): void {
        timerInterval = setInterval(timer, 1000);
    }

    function timer(): void {
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

    function showFinal(): void {
        console.log("GAME FINISHED");
        clearInterval(timerInterval);
        let endDate: Date = new Date();
        getTime(endDate);
        window.open("./result.html", "_self");
    }

    function getTime(_endDate: Date): void {
        let minuteDuration: number = _endDate.getMinutes() - startDate.getMinutes();
        let secondDuration: number = _endDate.getSeconds() - startDate.getSeconds();
        let millisecondDuration: number = _endDate.getMilliseconds() - startDate.getMilliseconds();
        if (millisecondDuration < 0) {
            millisecondDuration = 1000 - (millisecondDuration * -1);
            secondDuration -= 1;
        }
        if (secondDuration < 0) {
            secondDuration = 60 - (secondDuration * -1);
            minuteDuration -= 1;
        }
        console.log("Game took " + minuteDuration + " minutes, " + secondDuration + " seconds and " + millisecondDuration + " milliseconds");
        let time: string = minuteDuration + "m " + secondDuration + "s " + millisecondDuration + "ms";
        let output: string = minuteDuration + " Minuten, " + secondDuration + " Sekunden, " + millisecondDuration + " Millisekunden";
        localStorage.setItem("MemoryTime", time);
        localStorage.setItem("OutputTime", output);
    }

    function setURL(): void {
        //url = "http://localhost:8100";
        url = "https://qlu.herokuapp.com";
    }
}