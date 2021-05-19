"use strict";
var Kapitelaufgabe;
(function (Kapitelaufgabe) {
    let body = document.body;
    let header = document.createElement("h2");
    header.innerHTML = "<u>Wähle ein Gebäude aus:</u>";
    body.appendChild(header);
    let reset = document.createElement("a");
    reset.innerText = "LocalStorage leeren";
    reset.addEventListener("click", restart);
    reset.setAttribute("style", "margin: 30px; position: absolute; top: 0; left: 0; color: blue; text-decoration: underline; cursor: pointer;");
    body.appendChild(reset);
    let nav = document.createElement("nav");
    navSetup("");
    let div = document.createElement("div");
    body.appendChild(div);
    let b = document.createElement("div");
    div.appendChild(b);
    b.setAttribute("id", "building");
    let wrapper = document.createElement("div");
    let allParts;
    async function getJSON(_url) {
        let response = await fetch(_url);
        console.log("Response JSON", response);
        return await response.json();
    }
    async function temp() {
        allParts = await getJSON("http://127.0.0.1:5500/2_Scripting/Kapitelaufgabe/data.json");
        console.log("in der Funktion", allParts);
        await showPossibilities(allParts.residential);
        await showPossibilities(allParts.commercial);
        await showPossibilities(allParts.industrial);
    }
    temp();
    console.log("außerhalb der Funktion", allParts);
    console.log(localStorage);
    function navSetup(element) {
        nav.innerHTML = "";
        body.appendChild(nav);
        let ul = document.createElement("ul");
        nav.appendChild(ul);
        let liGebaeudewahl = document.createElement("li");
        liGebaeudewahl.innerText = "Gebäudewahl";
        let liPositionswahl = document.createElement("li");
        liPositionswahl.innerText = "Positionswahl";
        let liErgebnis = document.createElement("li");
        liErgebnis.innerText = "Ergebnis";
        if (element == "pw") {
            liPositionswahl.classList.add("current");
        }
        else if (element == "end") {
            liErgebnis.classList.add("current");
        }
        else {
            liGebaeudewahl.classList.add("current");
        }
        ul.appendChild(liGebaeudewahl);
        ul.appendChild(liPositionswahl);
        ul.appendChild(liErgebnis);
    }
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
            console.log("Ausgewähltes Teil", _part);
        }
        function Selection2(_e) {
            let target = _e.currentTarget;
            let index = Number(target.dataset.index) + "";
            console.log("Teil-Index:", index);
            selectPosition(_part);
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
    async function showPossibilities(_parts) {
        let r = document.createElement("div");
        let label = document.createElement("h2");
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
        for (let i = 0; i < _parts.length; i++) {
            let div = createPartDiv(_parts[i], i);
            b.appendChild(r);
            r.appendChild(div);
        }
    }
    let locArray;
    if (localStorage.getItem("arr") != null) {
        locArray = JSON.parse(localStorage.getItem("arr"));
    }
    else {
        locArray = [];
    }
    let groeße = 3;
    function selectPosition(_part) {
        navSetup("pw");
        b.innerHTML = "";
        header.innerHTML = "<u>Wähle eine Position aus:</u>";
        body.appendChild(wrapper);
        wrapper.classList.add("position");
        for (let i = 0; i < groeße; i++) {
            let div = document.createElement("div");
            wrapper.appendChild(div);
            for (let j = 0; j < groeße; j++) {
                let box = document.createElement("div");
                box.setAttribute("id", i + "," + j);
                box.addEventListener("click", setItem);
                function setItem() {
                    select(i + "," + j);
                }
                div.appendChild(box);
            }
        }
        function select(_s) {
            locArray.push(JSON.stringify(_part), _s);
            localStorage.setItem("arr", JSON.stringify(locArray));
            console.log("Aktuelles Array:", locArray);
            console.log("Aktueller Storage:", localStorage);
            showCity();
        }
    }
    function showCity() {
        let currentArray = JSON.parse(localStorage.getItem("arr"));
        let _part = JSON.parse(currentArray[0]);
        let _s = currentArray[1];
        console.log("Hinzugefügtes Gebäude:\n\nName: " + _part.name, "\nSource: " + _part.source, "\nFarbe: " + _part.color, "\nan Position: " + _s);
        navSetup("end");
        wrapper.innerHTML = "";
        header.innerHTML = "<u>Deine Stadt</u>";
        let btnAdd = document.createElement("button");
        btnAdd.innerText = "Mehr Gebäude hinzufügen";
        btnAdd.addEventListener("click", addBuilding);
        body.appendChild(btnAdd);
        let btnReset = document.createElement("button");
        btnReset.innerText = "Stadt abreißen";
        btnReset.addEventListener("click", restart);
        body.appendChild(btnReset);
        let btnPrint = document.createElement("button");
        btnPrint.innerText = "Stadt ausdrucken";
        btnPrint.addEventListener("click", print);
        body.appendChild(btnPrint);
        let city = document.createElement("div");
        city.classList.add("city");
        body.appendChild(city);
        let temp = [];
        for (let x = 0; x < currentArray.length; x += 2) {
            _part = JSON.parse(currentArray[0 + x]);
            _s = currentArray[1 + x];
            for (let i = 0; i < groeße; i++) {
                let div = document.createElement("div");
                city.appendChild(div);
                for (let j = 0; j < groeße; j++) {
                    let fall = i + "," + j;
                    if (fall == _s) {
                        let img = document.createElement("img");
                        img.src = _part.source;
                        img.setAttribute("id", fall);
                        if (temp.includes(fall)) {
                            document.getElementById(_s).replaceWith(img);
                        }
                        else {
                            div.appendChild(img);
                        }
                    }
                    else {
                        if (!temp.includes(fall)) {
                            let box = document.createElement("div");
                            box.setAttribute("id", fall);
                            div.appendChild(box);
                        }
                    }
                    temp.push(fall);
                }
            }
        }
    }
    function restart() {
        if (confirm("Willst du wirklich deine Stadt abreißen?\n ") == true) {
            localStorage.clear();
            window.location.reload();
        }
        else {
            alert("Restart abgebrochen.\n ");
        }
    }
    function addBuilding() {
        window.location.reload();
    }
    function print() {
        window.print();
    }
})(Kapitelaufgabe || (Kapitelaufgabe = {}));
//# sourceMappingURL=script.js.map