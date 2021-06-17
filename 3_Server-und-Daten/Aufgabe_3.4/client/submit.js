"use strict";
var P3_4;
(function (P3_4) {
    let formData;
    let url;
    let s;
    function setURL() {
        url = "https://qlu.herokuapp.com";
    }
    document.getElementById("send").addEventListener("click", sendData);
    document.getElementById("receive").addEventListener("click", receiveData);
    document.getElementById("del").addEventListener("click", deleteData);
    function sendData() {
        updateInputs();
        handleRequest(0);
        clearInputs();
    }
    function receiveData() {
        handleRequest(1);
    }
    function deleteData() {
        updateInputs();
        handleRequest(2);
        isChecked();
    }
    async function handleRequest(type) {
        setURL();
        currentTime();
        formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        if (type == 0) {
            url += "/send" + "?" + query.toString();
            let response = await fetch(url);
            let responseString = await response.text();
            console.log("Data Sent", s);
            console.log("URL:", url);
            document.getElementById("response").innerHTML += responseString + "\n\n";
        }
        else if (type == 1) {
            url += "/receive" + "?" + query.toString();
            let response = await fetch(url);
            let responseJSON = await response.json();
            document.getElementById("response").innerHTML += JSON.stringify(responseJSON) + "\n\n";
            console.log("Data Received.\nURL: " + url);
        }
        else {
            url += "/del" + "?" + query.toString();
            let response = await fetch(url);
            let responseString = await response.text();
            console.log("Entry " + s.matrikel + " deleted.\nURL: " + url);
            document.getElementById("response").innerHTML += responseString + "\n\n";
        }
        setURL();
    }
    function updateInputs() {
        let fname = document.getElementsByTagName("input")[0].value;
        let lname = document.getElementsByTagName("input")[1].value;
        let matrikel = parseInt(document.getElementsByTagName("input")[2].value);
        let studiengang = document.getElementsByTagName("input")[3].value;
        s = { fname, lname, matrikel, studiengang };
    }
    function clearInputs() {
        document.getElementsByTagName("input")[0].value = "";
        document.getElementsByTagName("input")[1].value = "";
        document.getElementsByTagName("input")[2].value = "";
        document.getElementsByTagName("input")[3].value = "";
    }
    let checked = false;
    function isChecked() {
        if (checked == false) {
            if (document.getElementsByTagName("input")[0].value != "" || document.getElementsByTagName("input")[1].value != "" || document.getElementsByTagName("input")[3].value != "") {
                checked = true;
                document.getElementById("response").innerHTML += "Einträge werden durch die Matrikelnummer gelöscht, daher können alle weiteren Felder leer bleiben.\n";
            }
        }
    }
    function currentTime() {
        let d = new Date;
        let td = "    -    [";
        let to = ".";
        let th = " ";
        let tm = ":";
        let ts = ":";
        if (d.getDate() < 10) {
            td = "[0";
        }
        if (d.getMonth() < 10) {
            to = ".0";
        }
        if (d.getHours() < 10) {
            th = " 0";
        }
        if (d.getMinutes() < 10) {
            tm = ":0";
        }
        if (d.getSeconds() < 10) {
            ts = ":0";
        }
        document.getElementById("response").innerHTML += td + d.getDate() + to + d.getMonth() + "." + d.getFullYear() + th + d.getHours() + tm + d.getMinutes() + ts + d.getSeconds() + "]\n";
    }
})(P3_4 || (P3_4 = {}));
//# sourceMappingURL=submit.js.map