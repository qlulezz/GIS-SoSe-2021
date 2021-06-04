"use strict";
var P3_2;
(function (P3_2) {
    let formData;
    let url;
    document.getElementById("sendhtml").addEventListener("click", handleClickHTML);
    document.getElementById("sendjson").addEventListener("click", handleClickJSON);
    async function handleClickHTML() { handleRequest(true); }
    async function handleClickJSON() { handleRequest(false); }
    function setURL() {
        url = "https://qlu.herokuapp.com";
    }
    async function handleRequest(isHTML) {
        setURL();
        formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        if (isHTML) {
            url += "/html" + "?" + query.toString();
            let response = await fetch(url);
            let responseString = await response.text();
            console.log("Response String:", responseString);
            document.getElementById("response").innerHTML = responseString;
        }
        else {
            url += "/json" + "?" + query.toString();
            let response = await fetch(url);
            let responseJSON = await response.json();
            console.log("Response JSON", responseJSON);
        }
        setURL();
    }
})(P3_2 || (P3_2 = {}));
//# sourceMappingURL=submit.js.map