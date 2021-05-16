namespace Kapitelaufgabe {

    // Zur Idee:
    // Der Plan ist, dass man auf der ersten Seite Gebäude aus einer der drei Kategorien (Housing, Commercial und Industrial) auswählen kann und diese auf ein Grid setzen kann.
    // Auf der zweiten Seite kann man dann die Position des gerade ausgewählten Gebäudes festlegen.
    // Die dritte Seite zeigt dann einfach nur das Ergebnis. Zudem bietet sie die Möglichkeit, ein weiteres Gebäude auszuwählen und auf eine andere Position der Stadt zu setzten.

    // Aktuell arbeite ich an den Vektorgrafiken, die am Ende auf die Seite sollen.
    // Die HTML Elemente werden nun zwar im TS generiert, da aber noch SVGs fehlen werden Fehler an den Stellen angezeit, bei denen nachher die Gebäude zu sehen sein werden.
    // Dementsprechend ist der Code hier noch nicht final, eventuell sind nicht genügend oder die falschen Attribute im Interface.
    // Ich werde dies in den nächsten Wochen noch anpassen.

    // Diese Aufgabe wird nach und nach vervollständigt. Sie ist nicht in 2.3, 2.4 und 2.5 aufzuteilen.
    // Punkt "Kapitelaufgabe" auf der Startseite (https://qlulezz.github.io/GIS-SoSe-2021/0_Main/start.html).

    // 1. Funktion: Aktive Auswahl mit Key -> LocalStorage
    // 2.  " Aktive Positionswahl
    // 3. Vor dem setzten des Keys ein Array erstellen, [part, index], Array auch im JSON, Selection in ein Objekt schreiben und Array daraus erstellen
    // 4. Array wieder aus dem LocalStorage ziehen, JSON.parse -> Array und wieder abspeichern

    // Lädst Array mit tupels aus JSON, Fügst Haus und Pos ein (Die lädst du aus JSON ), json stringify und in local storage
    // Endseite: Lädst Array mit tupels aus JSON, Generiere Stadt anhand Position


    // City Generator
    export interface Combined {
        residential: Part[];
        commercial: Part[];
        industrial: Part[];
    }

    // Gebäudekategorie
    export interface Part {
        name: string;
        source: string;
        color: string;
    }

    // Start HTML Build
    let body: HTMLElement = document.body;

    let header: HTMLHeadingElement = document.createElement("h2");
    header.innerHTML = "<u>Wähle ein Gebäude aus:</u>";
    body.appendChild(header);

    let nav: HTMLElement = document.createElement("nav");
    navSetup("");

    //Div für Divs anlegen
    let div: HTMLDivElement = document.createElement("div");
    body.appendChild(div);

    let b: HTMLDivElement = document.createElement("div");
    div.appendChild(b);
    b.setAttribute("id", "building");

    let wrapper: HTMLDivElement = document.createElement("div");

    // Setup JSON
    let jsn: string = com;
    let allParts: Combined = JSON.parse(jsn);
    console.log(localStorage);

    // Setup der Navigationsleiste / aktuelle Seitenanzeige
    function navSetup(element: string): void {
        nav.innerHTML = "";
        body.appendChild(nav);
        let ul: HTMLUListElement = document.createElement("ul");
        nav.appendChild(ul);

        let liGebaeudewahl: HTMLLIElement = document.createElement("li");
        liGebaeudewahl.innerText = "Gebäudewahl";
        let liPositionswahl: HTMLLIElement = document.createElement("li");
        liPositionswahl.innerText = "Positionswahl";
        let liErgebnis: HTMLLIElement = document.createElement("li");
        liErgebnis.innerText = "Ergebnis";

        if (element == "pw") {
            liPositionswahl.classList.add("current");
        } else if (element == "end") {
            liErgebnis.classList.add("current");
        } else {
            liGebaeudewahl.classList.add("current");
        }
        ul.appendChild(liGebaeudewahl);
        ul.appendChild(liPositionswahl);
        ul.appendChild(liErgebnis);
    }

    // Fülle Divs mit den Parts aus dem Array 
    function createPartDiv(_part: Part, _index: number): HTMLDivElement {
        let div: HTMLDivElement = document.createElement("div");

        // Kein Button wird erstellt um die Auswahl zu treffen, stattdessen kann direkt auf das Bild geklickt werden.
        let img: HTMLImageElement = document.createElement("img");
        img.src = _part.source;
        img.addEventListener("click", Selection1);
        img.addEventListener("click", Selection2);
        img.dataset.index = _index.toString();
        img.setAttribute("style", "filter: " + Styling(_part.color) + ";");
        div.appendChild(img);

        let h2: HTMLHeadingElement = document.createElement("h2");
        h2.innerText = _part.name;
        div.appendChild(h2);

        return div;

        function Selection1(_e: Event): void {
            console.log("Ausgewähltes Teil", _part);
        }

        function Selection2(_e: Event): void {
            let target: HTMLElement = <HTMLElement>_e.currentTarget;
            let index: string = Number(target.dataset.index) + "";

            console.log("Teil-Index:", index);
            // localStorage.setItem(index, JSON.stringify(_part));
            selectPosition(_part);
        }

        function Styling(color: string): string {
            let output: string = "";
            let resolution: number = 10;
            for (let i: number = 0; i < resolution; i++) {
                output += "drop-shadow(0 2px 0 " + color + ") ";
            }
            return output;
        }
    }

    function showPossibilities(_parts: Part[]): void {
        // Create Sub-Div
        let r: HTMLDivElement = document.createElement("div");

        // Set Label for Divs
        let label: HTMLHeadingElement = document.createElement("h2");
        switch (_parts) {
            case (allParts.residential): {
                label.innerText = "Residential";
                break;
            }
            case (allParts.commercial): {
                label.innerText = "Commercial";
                break;
            }
            case (allParts.industrial): {
                label.innerText = "Industrial";
                break;
            }
        }
        r.setAttribute("id", label.innerText);
        r.appendChild(label);

        // Fill Sub-Div
        for (let i: number = 0; i < _parts.length; i++) {
            let div: HTMLDivElement = createPartDiv(_parts[i], i);
            b.appendChild(r);
            r.appendChild(div);
        }
    }

    // Execute HTML Build
    showPossibilities(allParts.residential);
    showPossibilities(allParts.commercial);
    showPossibilities(allParts.industrial);

    let locArray: string[];
    if (localStorage.getItem("arr") != null) {
        locArray = JSON.parse(localStorage.getItem("arr"));
    } else {
        locArray = [];
    }

    // Build second Page
    let groeße: number = 3;
    function selectPosition(_part: Part): void {
        navSetup("pw");
        b.innerHTML = "";
        header.innerHTML = "<u>Wähle eine Position aus:</u>";
        body.appendChild(wrapper);
        wrapper.classList.add("position");

        for (let i: number = 0; i < groeße; i++) {
            let div: HTMLDivElement = document.createElement("div");
            wrapper.appendChild(div);
            for (let j: number = 0; j < groeße; j++) {
                let box: HTMLDivElement = document.createElement("div");
                box.setAttribute("id", i + "," + j);
                box.addEventListener("click", setItem);
                function setItem(): void {
                    select(i + "," + j);
                }
                div.appendChild(box);
            }
        }

        function select(_s: string): void {
            locArray.push(JSON.stringify(_part), _s);
            localStorage.setItem("arr", JSON.stringify(locArray));
            console.log("Aktuelles Array:", locArray);
            console.log("Aktueller Storage:", localStorage);
            showCity();
        }
    }

    // Build final page
    function showCity(): void {
        let currentArray: string[] = JSON.parse(localStorage.getItem("arr"));
        let _part: Part = JSON.parse(currentArray[0]);
        let _s: string = currentArray[1];
        console.log("Hinzugefügtes Gebäude:\n\nName: " + _part.name, "\nSource: " + _part.source, "\nFarbe: " + _part.color, "\nan Position: " + _s);

        navSetup("end");
        wrapper.innerHTML = "";
        header.innerHTML = "<u>Deine Stadt</u>";
        let btnAdd: HTMLButtonElement = document.createElement("button");
        btnAdd.innerText = "Mehr Gebäude hinzufügen";
        btnAdd.addEventListener("click", addBuilding);
        body.appendChild(btnAdd);

        let btnReset: HTMLButtonElement = document.createElement("button");
        btnReset.innerText = "Stadt abreißen";
        btnReset.addEventListener("click", restart);
        body.appendChild(btnReset);

        let btnPrint: HTMLButtonElement = document.createElement("button");
        btnPrint.innerText = "Stadt ausdrucken";
        btnPrint.addEventListener("click", print);
        body.appendChild(btnPrint);

        let city: HTMLDivElement = document.createElement("div");
        city.classList.add("city");
        body.appendChild(city);

        // An dieser Schleife saß ich bestimmt 2 Stunden, wenn ich irgendetwas nicht so umgesetzt habe, wie ich es eigentlich hätte machen sollen, lass es mich wissen.
        // Ich gehe stark davon aus, dass dies hier nicht die beste Lösung ist.
        // Ignorier jegliche CSS Probleme, die muss ich noch fixen. Auch die letzten Gebäude muss ich noch einsetzen.
        let temp: string[] = [];
        for (let x: number = 0; x < currentArray.length; x += 2) {
            _part = JSON.parse(currentArray[0 + x]);
            _s = currentArray[1 + x];
            for (let i: number = 0; i < groeße; i++) {
                let div: HTMLDivElement = document.createElement("div");
                city.appendChild(div);
                for (let j: number = 0; j < groeße; j++) {
                    let fall: string = i + "," + j;
                    if (fall == _s) {
                        let img: HTMLImageElement = document.createElement("img");
                        img.src = _part.source;
                        img.setAttribute("id", fall);
                        if (temp.includes(fall)) {
                            document.getElementById(_s).replaceWith(img);
                        } else {
                            div.appendChild(img);
                        }
                    } else {
                        if (!temp.includes(fall)) {
                            let box: HTMLDivElement = document.createElement("div");
                            box.setAttribute("id", fall);
                            div.appendChild(box);
                        }
                    }
                    temp.push(fall);
                }
            }
        }
    }

    function restart(): void {
        if (confirm("Willst du wirklich deine Stadt abreissen?\n ") == true) {
            localStorage.clear();
            window.location.reload();
        } else {
            alert("Restart abgebrochen.\n ");
        }
    }

    function addBuilding(): void {
        window.location.reload();
    }

    function print(): void {
        window.print();
    }
}