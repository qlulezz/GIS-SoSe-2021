"use strict";
var end_result;
(function (end_result) {
    let url;
    let time = localStorage.getItem("MemoryTime");
    let currentID = localStorage.getItem("currentID");
    let formData;
    let rd;
    let name;
    let id;
    let send = document.getElementById("send");
    let output = document.getElementById("output");
    send.addEventListener("click", sendClickEvent);
    document.getElementsByTagName("h2")[0].innerHTML = "Ergebnis: " + localStorage.getItem("OutputTime");
    output.style.color = "lime";
    name = document.getElementsByTagName("input")[0];
    id = document.getElementsByTagName("input")[1];
    let n = name.value;
    let d = id.value;
    if (currentID != null) {
        document.getElementsByTagName("input")[1].value = currentID;
    }
    function sendClickEvent() {
        name = document.getElementsByTagName("input")[0];
        id = document.getElementsByTagName("input")[1];
        n = name.value;
        d = id.value;
        output.style.color = "red";
        let isFirst = true;
        if (currentID != null) {
            isFirst = false;
        }
        if (n == null || n == "" || d == null || d == "") {
            output.innerHTML = "Fehler: Die Felder dürfen nicht leer sein.";
        }
        else if (d.length != 3) {
            output.innerHTML = "Fehler: Das Kürzel muss drei Zeichen lang sein.";
        }
        else if (n.length > 30) {
            output.innerHTML = "Fehler: Der Name darf nicht länger als 30 Zeichen lang sein.";
        }
        else if (checkUnicode(n) || checkUnicode(d)) {
            output.innerHTML = "Fehler: Unicode Zeichen dürfen nicht verwendet werden.";
        }
        else if (currentID != d && isFirst == false) {
            output.innerHTML = "Fehler: Verwende dein Kürzel '" + currentID + "'";
        }
        else {
            rd = { name: n, id: d, time: time };
            sendData(isFirst);
            localStorage.setItem("currentID", d);
            console.log("Dein eindeutiges Kürzel ist jetzt '" + d + "'");
        }
    }
    function setURL() {
        url = "https://qlu.herokuapp.com";
    }
    async function sendData(_isFirst) {
        setURL();
        formData = new FormData(document.forms[0]);
        formData.append("time", time);
        formData.append("date", getDate());
        formData.append("first", _isFirst + "");
        let query = new URLSearchParams(formData);
        url += "/sendscore" + "?" + query.toString();
        let response = await fetch(url);
        let responseString = await response.text();
        console.log("Data Sent", rd);
        console.log("URL:", url);
        if (responseString == "true") {
            output.innerHTML = "Erfolg: Deine Daten wurden gesendet.";
            output.style.color = "lime";
            send.style.display = "none";
        }
        else {
            output.innerHTML = "Fehler: Das Kürzel wurde schon verwendet.";
        }
        console.log("Server Antwort: " + responseString + "\n" + output.innerHTML);
        setURL();
    }
    function getDate() {
        let t = new Date;
        let day = t.getDate() + "";
        if (t.getDate() < 10)
            day = "0" + t.getDate();
        let month = t.getMonth() + "";
        if (t.getMonth() < 10)
            month = "0" + (t.getMonth() + 1);
        let year = t.getFullYear() + "";
        let hour = t.getHours() + "";
        if (t.getHours() < 10)
            hour = "0" + t.getHours();
        let minute = t.getMinutes() + "";
        if (t.getMinutes() < 10)
            minute = "0" + t.getMinutes();
        let second = t.getSeconds() + "";
        if (t.getSeconds() < 10)
            second = "0" + t.getSeconds();
        return day + "-" + month + "-" + year + "_" + hour + "-" + minute + "-" + second;
    }
    function checkUnicode(s) {
        return /[^\u0000-\u00ff]/.test(s);
    }
})(end_result || (end_result = {}));
//# sourceMappingURL=result.js.map