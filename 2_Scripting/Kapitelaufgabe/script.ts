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

    // City Generator
    export interface Combined {
        Residential: Part[];
        Commercial: Part[];
        Industrial: Part[];
    }

    // Gebäudekategorie
    export interface Part {
        name: string;
        source: string;
        color: string;
    }

    export interface Selection {
        Residential: Part;
        Commercial: Part;
        Industrial: Part;
    }

    // Start HTML Build
    let body: HTMLElement = document.body;

    //Div für Divs anlegen
    let div: HTMLDivElement = document.createElement("div");
    body.appendChild(div);

    let b: HTMLDivElement = document.createElement("div");
    div.appendChild(b);
    b.setAttribute("id", "building");

    // Setup JSON
    let jsn: string = com;
    let allParts: Combined = JSON.parse(jsn);

    // Fülle Divs mit den Parts aus dem Array 
    function createPartDiv(_part: Part, _index: number): HTMLDivElement {
        let div: HTMLDivElement = document.createElement("div");

        // Kein Button wird erstell um die Auswahl zu treffen, stattdessen kann direkt auf das Bild geklickt werden.
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
            console.log("innere Funktion", _part);
        }

        function Selection2(_e: Event): void {
            let target: HTMLElement = <HTMLElement>_e.currentTarget;
            let index: number = Number(target.dataset.index);

            console.log("äußere Funktion", allParts.Residential[index]);
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
            case (allParts.Residential): {
                label.innerText = "Residential";
                break;
            }
            case (allParts.Commercial): {
                label.innerText = "Commercial";
                break;
            }
            case (allParts.Industrial): {
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
    showPossibilities(allParts.Residential);
    showPossibilities(allParts.Commercial);
    showPossibilities(allParts.Industrial);

}