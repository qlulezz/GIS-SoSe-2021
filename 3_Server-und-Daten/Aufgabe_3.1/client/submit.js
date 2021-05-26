"use strict";
var P3_1;
(function (P3_1) {
    let formData;
    let submit = document.getElementById("send");
    submit.addEventListener("click", clickSubmit);
    function clickSubmit(_event) {
        communicate("https://gis-example.herokuapp.com");
    }
    async function communicate(_url) {
        formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        _url = _url + "?" + query.toString();
        let response = await fetch(_url, { method: "get" });
        let responseString = await response.text();
        console.log(responseString);
        let output = "\n";
        for (let entry of query) {
            output += "Entry: " + entry[0] + "\nWert: " + entry[1] + "\n\n";
            console.log(entry);
        }
        console.log(output);
    }
})(P3_1 || (P3_1 = {}));
//# sourceMappingURL=submit.js.map