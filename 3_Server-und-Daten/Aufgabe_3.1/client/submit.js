"use strict";
var P3_1;
(function (P3_1) {
    let formData;
    let submit = document.getElementById("send");
    submit.addEventListener("click", clickSubmit);
    function clickSubmit(_event) {
        communicate("https://qlu.herokuapp.com/");
    }
    async function communicate(_url) {
        formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        _url = _url + "?" + query.toString();
        let response = await fetch(_url, { method: "get" });
        let responseString = await response.text();
        console.log(responseString);
        let footer = document.getElementsByTagName("footer")[0];
        document.getElementsByTagName("h3")[0].innerHTML = "Ausgabe des Servers:";
        let textfield;
        if (document.getElementsByTagName("textarea")[1] == undefined) {
            textfield = document.createElement("textarea");
            footer.appendChild(textfield);
        }
        else {
            textfield = document.getElementsByTagName("textarea")[1];
        }
        textfield.setAttribute("cols", "80");
        textfield.setAttribute("rows", "20");
        textfield.innerHTML = "URL:\n" + _url + "\n\n";
        let output = "\n";
        for (let entry of query) {
            output += "Name: " + entry[0] + "\nValue: " + entry[1] + "\n\n";
            console.log(entry);
        }
        console.log(output);
        textfield.innerHTML += output;
    }
})(P3_1 || (P3_1 = {}));
//# sourceMappingURL=submit.js.map