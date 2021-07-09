"use strict";
var end_highscores;
(function (end_highscores) {
    let url;
    let hueRotate = Math.floor(Math.random() * 360);
    async function getData() {
        setURL();
        url += "/receivescores";
        let response = await fetch(url);
        let responseJSON = await response.json();
        responseJSON = responseJSON.sort((a, b) => {
            return a.time.localeCompare(b.time);
        });
        console.log("Data Received");
        console.log("URL:", url);
        for (let i = 0; i < responseJSON.length; i++) {
            let tbody = document.querySelector("tbody");
            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");
            let td5 = document.createElement("td");
            td1.innerHTML = i + 1 + "";
            td2.innerHTML = responseJSON[i].name;
            td3.innerHTML = responseJSON[i].id;
            td4.innerHTML = responseJSON[i].time;
            td5.innerHTML = formatDate(responseJSON[i].date);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tbody.appendChild(tr);
            if (i == 0)
                tr.style.color = "gold";
            if (i == 1)
                tr.style.color = "#ffe768";
            if (i == 2)
                tr.style.color = "#fff5c0";
            if (i < 3)
                tr.style.filter = "hue-rotate(" + hueRotate + "deg)";
        }
        setURL();
    }
    getData();
    function setURL() {
        url = "https://qlu.herokuapp.com";
    }
    function formatDate(date) {
        let f = date.split("_");
        let d = f[0].split("-");
        let t = f[1].split("-");
        return d[0] + "." + d[1] + "." + d[2] + ", " + t[0] + ":" + t[1] + ":" + t[2];
    }
})(end_highscores || (end_highscores = {}));
//# sourceMappingURL=highscore.js.map