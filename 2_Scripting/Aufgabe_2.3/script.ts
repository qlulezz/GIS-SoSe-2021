namespace A3 {
    let body: HTMLElement = document.body;
    body.setAttribute("style", "background-color: black; color: white; text-align: center; font-family: sans-serif;");

    // HTML Elemente werden angelegt

    // Überschrift hinzufügen
    let h1: HTMLParagraphElement = document.createElement("h1");
    h1.appendChild(document.createTextNode("Aufgabe 2.3"));
    body.appendChild(h1);

    // Link zur Übersichtsseite hinzufügen
    let anc: HTMLAnchorElement = document.createElement("a");
    body.appendChild(anc);
    anc.innerHTML = "Zurück zur Übersichtsseite";
    anc.setAttribute("href", "../../0_Main/start.html");
    anc.setAttribute("style", "margin: 30px; position: absolute; top: 0; right: 0; color: #26ED90;");

    // Rechteck hinzufügen Button erstellen
    let btnAdd: HTMLButtonElement = document.createElement("button");
    body.appendChild(btnAdd);
    btnAdd.innerHTML = "+1 Rechteck";
    // EventListener starten
    btnAdd.addEventListener("click", bruh);
    // Warum kann man in einem EventListener keine Attribute übergeben?
    function bruh(): void { addRechteck(undefined, undefined, undefined, undefined, undefined); }

    // Reset Button erstellen
    let btnReset: HTMLButtonElement = document.createElement("button");
    body.appendChild(btnReset);
    btnReset.innerHTML = "Reset";
    // EventListener starten
    btnReset.addEventListener("click", resetRechteck);

    body.appendChild(document.createElement("br"));

    // Inputs erstellen
    let anzahl: HTMLInputElement = document.createElement("input");
    body.appendChild(anzahl);
    anzahl.setAttribute("type", "number");
    anzahl.setAttribute("placeholder", "Anzahl Rechtecke");

    let strst: HTMLInputElement = document.createElement("input");
    body.appendChild(strst);
    strst.setAttribute("type", "number");
    strst.setAttribute("placeholder", "Strich-Stärke");

    body.appendChild(document.createElement("br"));

    let fillcol: HTMLInputElement = document.createElement("input");
    body.appendChild(fillcol);
    fillcol.setAttribute("type", "text");
    fillcol.setAttribute("placeholder", "Füll-Farbe");

    let strcol: HTMLInputElement = document.createElement("input");
    body.appendChild(strcol);
    strcol.setAttribute("type", "text");
    strcol.setAttribute("placeholder", "Strich-Farbe");

    body.appendChild(document.createElement("br"));

    let width: HTMLInputElement = document.createElement("input");
    body.appendChild(width);
    width.setAttribute("type", "number");
    width.setAttribute("placeholder", "Breite (Fix)");

    let height: HTMLInputElement = document.createElement("input");
    body.appendChild(height);
    height.setAttribute("type", "number");
    height.setAttribute("placeholder", "Höhe (Fix)");

    body.appendChild(document.createElement("br"));

    // Update Button erstellen
    let btnUpdate: HTMLButtonElement = document.createElement("button");
    body.appendChild(btnUpdate);
    btnUpdate.innerHTML = "Update";
    // EventListener starten
    btnUpdate.addEventListener("click", updateRechteck);

    // Checkbox für Animation (on-off)
    let checkbox: HTMLInputElement = document.createElement("input");
    body.appendChild(checkbox);
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", "animation");
    checkbox.addEventListener("click", refresh);
    let label: HTMLLabelElement = document.createElement("label");
    body.appendChild(label);
    label.setAttribute("for", "animation");
    label.innerHTML = "Auto-Update (on/off)";

    // Informationsanzeige hinzufügen
    let anzeige: HTMLParagraphElement = document.createElement("p");
    anzeige.appendChild(document.createTextNode("Anzahl Rechtecke: 0"));
    body.appendChild(anzeige);
    anzeige.setAttribute("style", "margin: 0 0 20px 0; padding: 0;");

    // CSS (Styling)
    for (let i: number = 0; i < document.getElementsByTagName("input").length; i++) {
        document.getElementsByTagName("input")[i].setAttribute("style", "padding: 5px; color: white; background: black; font-size: 1.2em; border: 5px solid black; box-shadow: 0 0 1px white");
    }
    for (let i: number = 0; i < document.getElementsByTagName("button").length; i++) {
        document.getElementsByTagName("button")[i].setAttribute("style", "margin: 20px; color: white; background: black; border: 5px solid black; box-shadow: 0 0 0 1px white; cursor: pointer");
    }

    //Div für Divs anlegen
    let div: HTMLDivElement = document.createElement("div");
    body.appendChild(div);

    function addRechteck(_strokeWidth: number, _colorFill: string, _colorStroke: string, _width: number, _height: number): void {
        let divElement: HTMLDivElement = document.createElement("div");
        div.appendChild(divElement);
        divElement.innerHTML = "";
        divElement.setAttribute("style", createRechteck(_strokeWidth, _colorFill, _colorStroke, _width, _height));
    }

    let amount: number = 0;

    // Haupt-Funktion: Erstelle ein Rechteck mit übergebenen Werten, wenn Werte undefined sind, erzeuge für alle Werte zufällige Werte.
    function createRechteck(_strokeWidth: number, _colorFill: string, _colorStroke: string, _width: number, _height: number): string {
        let output: string = "";
        let rgb1: string = _colorFill;
        let rgb2: string = _colorStroke;
        let percentage: number = 50;
        let margin1: string = Math.floor(Math.random() * percentage) + "% ";
        let margin2: string = Math.floor(Math.random() * percentage) + "% ";
        let margin3: string = Math.floor(Math.random() * percentage) + "% ";
        let margin4: string = Math.floor(Math.random() * percentage) + "%;";
        let border: string = "; border: " + _strokeWidth + "px solid ";
        let width: string = Math.floor(Math.random() * (_width / 2)) + "px; ";
        let height: string = "height: " + Math.floor(Math.random() * (_height / 2));

        if (_strokeWidth == undefined) {
            border = "; border: " + Math.floor(Math.random() * 20) + "px solid ";
        }
        if (_colorFill == undefined) {
            rgb1 = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
        }
        if (_colorStroke == undefined) {
            rgb2 = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
        }
        if (_width == undefined) {
            width = Math.floor(Math.random() * (1600 / 2)) + "px; ";
        }
        if (_height == undefined) {
            height = "height: " + Math.floor(Math.random() * (800 / 2));
        }

        output = "position: absolute; overflow: hidden; width: "
            + width + height + "px; background-color: " + rgb1
            + border + rgb2 + "; margin: " + margin1 + margin2 + margin3 + margin4;
        amount++;
        anzeige.textContent = "Anzahl Rechtecke: " + amount;

        /*
        let r1: number = (Math.random() + (Math.random() - 1)) / 10;
        let r2: number = (Math.random() + (Math.random() - 1)) / 10;
        setInterval(function (): void {
            width += r1;
            height += r2;
        },          1 / 60);
        */

        return output;
    }

    // Für den Reset Button. Der Inhalt des Divs wird geleert
    function resetRechteck(): void {
        div.innerHTML = "";
        amount = 0;
        anzeige.textContent = "Anzahl Rechtecke: 0";
    }

    // Für den Update Button. Überprüft die Inputs und erstellt alle Rechtecke mit möglichen Inputs neu.
    function updateRechteck(): void {
        if (parseInt((anzahl as HTMLInputElement).value).toString() != "NaN") {
            resetRechteck();
            let ss: number = parseInt((strst as HTMLInputElement).value);
            let fc: string = (fillcol as HTMLInputElement).value;
            let sc: string = (strcol as HTMLInputElement).value;
            let wid: number = parseInt((width as HTMLInputElement).value);
            let hgt: number = parseInt((height as HTMLInputElement).value);
            if (ss.toString() == "NaN") {
                ss = undefined;
            }
            if (fc.length <= 0) {
                fc = undefined;
            }
            if (sc.length <= 0) {
                sc = undefined;
            }
            if (wid.toString() == "NaN") {
                wid = undefined;
            }
            if (hgt.toString() == "NaN") {
                hgt = undefined;
            }
            for (let i: number = 0; i < parseInt((anzahl as HTMLInputElement).value); i++) {
                addRechteck(ss, fc, sc, wid, hgt);
            }
        }
    }

    // Refresht die Rechtecke (alle 1,5 Sekunden)
    function refresh(): void {
        let interval: number = 1500;
        setInterval(function (): void {
            if (checkbox.checked == true) {
                updateRechteck();
            }
        },          interval);
    }

    // HINWEISE ZUR AUFGABE

    // Leider konnte ich die Animation nicht so einfach umsetzten, da diese Aufgabe nicht objektorientiert implementiert wurde
    // Ich habe daher auf der Seite der vorherigen Aufgabe weitere Features hinzugefügt, die meine Idee für diese Aufgabe repräsentieren sollen
    // - Dort ist es mit dem Canvas und Rechtecken, die durch Klassen / Methoden erstellt wurden, umgesetzt.
    // Link: https://qlulezz.github.io/GIS-SoSe-2021/2_Scripting/Aufgabe_2.2/PA_2-2.html
}