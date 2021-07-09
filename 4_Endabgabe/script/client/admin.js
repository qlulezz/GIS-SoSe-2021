"use strict";
var end_admin;
(function (end_admin) {
    let formData;
    let url;
    let input = prompt("Admin-Passwort:", "");
    if (input == null || input == "") {
        alert("Bitte ein Passwort eingeben");
    }
    else if (input == "admin") {
        console.log("Passwort korrekt.");
        document.querySelector(".admin").setAttribute("style", "display: inline");
        getData();
    }
    else {
        alert("Das eingegebene Passwort ist falsch.");
    }
    let rd;
    let link;
    let name;
    let send = document.getElementById("send");
    let refresh = document.getElementById("refresh");
    let output = document.getElementById("output");
    send.addEventListener("click", sendClickEvent);
    refresh.addEventListener("click", refreshEvent);
    function sendClickEvent() {
        link = document.getElementsByTagName("input")[0];
        name = document.getElementsByTagName("input")[1];
        let u = link.value;
        let n = name.value;
        if (u == null || u == "" || n == null || n == "") {
            output.innerHTML = "Fehler: Die Felder dürfen nicht leer sein.";
            output.style.color = "red";
        }
        else if (!checkURL(u)) {
            output.innerHTML = "Fehler: Der Link enthält kein unterstütztes Format.";
            output.style.color = "red";
        }
        else {
            rd = { link: u, name: n, date: getDate() };
            sendData();
            link.value = "";
            name.value = "";
        }
    }
    function setURL() {
        url = "https://qlu.herokuapp.com";
    }
    async function sendData() {
        setURL();
        formData = new FormData(document.forms[0]);
        formData.append("date", getDate());
        let query = new URLSearchParams(formData);
        url += "/sendlink" + "?" + query.toString();
        let response = await fetch(url);
        let responseString = await response.text();
        console.log("Data Sent", rd);
        console.log("URL:", url);
        if (responseString == "true") {
            output.innerHTML = "Erfolg: Deine Daten wurden gesendet.";
            output.style.color = "lime";
        }
        else {
            output.innerHTML = "Fehler: Diese URL ist bereits in der Datenbank.";
            output.style.color = "red";
        }
        console.log("Server Antwort: " + responseString + "\n" + output.innerHTML);
        setURL();
    }
    async function getData() {
        setURL();
        url += "/receiveadminlink";
        let response = await fetch(url);
        let responseJSON = await response.json();
        console.log("Data Received");
        console.log("URL:", url);
        for (let i = 0; i < responseJSON.length; i++) {
            let box = document.querySelector(".box");
            let div = document.createElement("div");
            let dlink = document.createElement("a");
            let imgsrc = document.createElement("img");
            let p = document.createElement("p");
            let d = document.createElement("p");
            dlink.setAttribute("target", "_blank");
            dlink.setAttribute("href", responseJSON[i].link);
            imgsrc.setAttribute("src", responseJSON[i].link);
            imgsrc.setAttribute("alt", responseJSON[i].name);
            d.setAttribute("style", "font-size: small");
            p.setAttribute("id", "remove");
            p.innerHTML = "Entfernen";
            d.innerHTML = responseJSON[i].date;
            div.appendChild(dlink);
            dlink.appendChild(imgsrc);
            div.appendChild(p);
            div.appendChild(d);
            box.appendChild(div);
            p.addEventListener("click", remove);
            function remove() {
                deleteData(responseJSON[i].link, responseJSON[i].name);
                div.setAttribute("style", "display: none;");
            }
        }
        setURL();
    }
    async function deleteData(link, name) {
        setURL();
        formData = new FormData();
        formData.append("link", link);
        formData.append("name", name);
        let query = new URLSearchParams(formData);
        url += "/deletelink" + "?" + query.toString();
        let response = await fetch(url);
        let responseString = await response.text();
        console.log(responseString);
        console.log("URL:", url);
        setURL();
    }
    function getDate() {
        let t = new Date();
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
    function refreshEvent() {
        window.location.reload();
    }
    function checkURL(s) {
        return (s.match(/\.(jpg|jpeg|png|gif|svg|bmp|ico)$/) != null);
    }
})(end_admin || (end_admin = {}));
//# sourceMappingURL=admin.js.map