"use strict";
var end_stats;
(function (end_stats) {
    let url;
    function setURL() {
        url = "http://localhost:8100";
    }
    let scores = 0;
    let playerid = "0";
    let playerip = "0";
    let links = 0;
    async function getScoreData() {
        setURL();
        url += "/receivescores";
        let response = await fetch(url);
        let responseJSON = await response.json();
        let player = [];
        let ips = [];
        for (let i = 0; i < responseJSON.length; i++) {
            if (!player.includes(responseJSON[i].id.toUpperCase())) {
                player.push(responseJSON[i].id.toUpperCase());
            }
            if (!ips.includes(responseJSON[i].ip)) {
                ips.push(responseJSON[i].ip);
            }
        }
        playerid = player.length + "";
        playerip = ips.length + "";
        scores = responseJSON.length;
        print();
        setURL();
    }
    async function getLinkData() {
        setURL();
        url += "/receivegamelink";
        let response = await fetch(url);
        let responseJSON = await response.json();
        links = responseJSON.length;
        print();
        setURL();
    }
    let para = document.getElementById("stats");
    para.addEventListener("click", refresh);
    function print() {
        para.innerHTML = "<b>Statistiken:</b>&emsp;Insgesamt hochgeladene Scores: <b>" + scores +
            "</b> - Eindeutige Spieler: <b>" + playerid + " </b>(<b>" + playerip + "</b>) - Verfügbare Bilder: <b>" + links + "</b>";
    }
    function refresh() {
        getScoreData();
        getLinkData();
        console.log("Stats refreshed");
    }
})(end_stats || (end_stats = {}));
//# sourceMappingURL=stats.js.map