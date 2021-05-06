"use strict";
var A3;
(function (A3) {
    let body = document.body;
    body.setAttribute("style", "background-color: black; color: white; text-align: center; font-family: sans-serif;");
    let h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode("Aufgabe 2.3"));
    body.appendChild(h1);
    let anc = document.createElement("a");
    body.appendChild(anc);
    anc.innerHTML = "Zurück zur Übersichtsseite";
    anc.setAttribute("href", "../../0_Main/start.html");
    anc.setAttribute("style", "margin: 30px; position: absolute; top: 0; right: 0; color: #26ED90;");
    let btnAdd = document.createElement("button");
    body.appendChild(btnAdd);
    btnAdd.innerHTML = "+1 Rechteck";
    btnAdd.addEventListener("click", bruh);
    function bruh() { addRechteck(undefined, undefined, undefined, undefined, undefined); }
    let btnReset = document.createElement("button");
    body.appendChild(btnReset);
    btnReset.innerHTML = "Reset";
    btnReset.addEventListener("click", resetRechteck);
    body.appendChild(document.createElement("br"));
    let anzahl = document.createElement("input");
    body.appendChild(anzahl);
    anzahl.setAttribute("type", "number");
    anzahl.setAttribute("placeholder", "Anzahl Rechtecke");
    let strst = document.createElement("input");
    body.appendChild(strst);
    strst.setAttribute("type", "number");
    strst.setAttribute("placeholder", "Strich-Stärke");
    body.appendChild(document.createElement("br"));
    let fillcol = document.createElement("input");
    body.appendChild(fillcol);
    fillcol.setAttribute("type", "text");
    fillcol.setAttribute("placeholder", "Füll-Farbe");
    let strcol = document.createElement("input");
    body.appendChild(strcol);
    strcol.setAttribute("type", "text");
    strcol.setAttribute("placeholder", "Strich-Farbe");
    body.appendChild(document.createElement("br"));
    let width = document.createElement("input");
    body.appendChild(width);
    width.setAttribute("type", "number");
    width.setAttribute("placeholder", "Breite (Fix)");
    let height = document.createElement("input");
    body.appendChild(height);
    height.setAttribute("type", "number");
    height.setAttribute("placeholder", "Höhe (Fix)");
    body.appendChild(document.createElement("br"));
    let btnUpdate = document.createElement("button");
    body.appendChild(btnUpdate);
    btnUpdate.innerHTML = "Update";
    btnUpdate.addEventListener("click", updateRechteck);
    let checkbox = document.createElement("input");
    body.appendChild(checkbox);
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", "animation");
    checkbox.addEventListener("click", refresh);
    let label = document.createElement("label");
    body.appendChild(label);
    label.setAttribute("for", "animation");
    label.innerHTML = "Auto-Update (on/off)";
    let anzeige = document.createElement("p");
    anzeige.appendChild(document.createTextNode("Anzahl Rechtecke: 0"));
    body.appendChild(anzeige);
    anzeige.setAttribute("style", "margin: 0 0 20px 0; padding: 0;");
    for (let i = 0; i < document.getElementsByTagName("input").length; i++) {
        document.getElementsByTagName("input")[i].setAttribute("style", "padding: 5px; color: white; background: black; font-size: 1.2em; border: 5px solid black; box-shadow: 0 0 1px white");
    }
    for (let i = 0; i < document.getElementsByTagName("button").length; i++) {
        document.getElementsByTagName("button")[i].setAttribute("style", "margin: 20px; color: white; background: black; border: 5px solid black; box-shadow: 0 0 0 1px white; cursor: pointer");
    }
    let div = document.createElement("div");
    body.appendChild(div);
    function addRechteck(_strokeWidth, _colorFill, _colorStroke, _width, _height) {
        let divElement = document.createElement("div");
        div.appendChild(divElement);
        divElement.innerHTML = "";
        divElement.setAttribute("style", createRechteck(_strokeWidth, _colorFill, _colorStroke, _width, _height));
    }
    let amount = 0;
    function createRechteck(_strokeWidth, _colorFill, _colorStroke, _width, _height) {
        let output = "";
        let rgb1 = _colorFill;
        let rgb2 = _colorStroke;
        let percentage = 50;
        let margin1 = Math.floor(Math.random() * percentage) + "% ";
        let margin2 = Math.floor(Math.random() * percentage) + "% ";
        let margin3 = Math.floor(Math.random() * percentage) + "% ";
        let margin4 = Math.floor(Math.random() * percentage) + "%;";
        let border = "; border: " + _strokeWidth + "px solid ";
        let width = Math.floor(Math.random() * (_width / 2)) + "px; ";
        let height = "height: " + Math.floor(Math.random() * (_height / 2));
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
        return output;
    }
    function resetRechteck() {
        div.innerHTML = "";
        amount = 0;
        anzeige.textContent = "Anzahl Rechtecke: 0";
    }
    function updateRechteck() {
        if (parseInt(anzahl.value).toString() != "NaN") {
            resetRechteck();
            let ss = parseInt(strst.value);
            let fc = fillcol.value;
            let sc = strcol.value;
            let wid = parseInt(width.value);
            let hgt = parseInt(height.value);
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
            for (let i = 0; i < parseInt(anzahl.value); i++) {
                addRechteck(ss, fc, sc, wid, hgt);
            }
        }
    }
    function refresh() {
        let interval = 1500;
        setInterval(function () {
            if (checkbox.checked == true) {
                updateRechteck();
            }
        }, interval);
    }
})(A3 || (A3 = {}));
//# sourceMappingURL=script.js.map