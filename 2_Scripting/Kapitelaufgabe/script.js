"use strict";
var Kapitelaufgabe;
(function (Kapitelaufgabe) {
    let body = document.body;
    let div = document.createElement("div");
    body.appendChild(div);
    let b = document.createElement("div");
    div.appendChild(b);
    b.setAttribute("id", "building");
    let jsn = Kapitelaufgabe.com;
    let allParts = JSON.parse(jsn);
    function createPartDiv(_part, _index) {
        let div = document.createElement("div");
        let img = document.createElement("img");
        img.src = _part.source;
        img.addEventListener("click", Selection1);
        img.addEventListener("click", Selection2);
        img.dataset.index = _index.toString();
        img.setAttribute("style", "filter: " + Styling(_part.color) + ";");
        div.appendChild(img);
        let h2 = document.createElement("h2");
        h2.innerText = _part.name;
        div.appendChild(h2);
        return div;
        function Selection1(_e) {
            console.log("innere Funktion", _part);
        }
        function Selection2(_e) {
            let target = _e.currentTarget;
            let index = Number(target.dataset.index);
            console.log("äußere Funktion", allParts.Residential[index]);
        }
        function Styling(color) {
            let output = "";
            let resolution = 10;
            for (let i = 0; i < resolution; i++) {
                output += "drop-shadow(0 2px 0 " + color + ") ";
            }
            return output;
        }
    }
    function showPossibilities(_parts) {
        let r = document.createElement("div");
        let label = document.createElement("h2");
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
        for (let i = 0; i < _parts.length; i++) {
            let div = createPartDiv(_parts[i], i);
            b.appendChild(r);
            r.appendChild(div);
        }
    }
    showPossibilities(allParts.Residential);
    showPossibilities(allParts.Commercial);
    showPossibilities(allParts.Industrial);
})(Kapitelaufgabe || (Kapitelaufgabe = {}));
//# sourceMappingURL=script.js.map