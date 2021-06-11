"use strict";
var Feedback;
(function (Feedback) {
    for (let i = 0; i < document.querySelectorAll(".rmb").length; i++) {
        let currentBtn = document.querySelectorAll(".rmb")[i];
        let currentText = document.querySelectorAll(".rmt")[i];
        currentBtn.addEventListener("click", clickEvent);
        let temp = currentBtn.innerHTML;
        currentBtn.innerHTML = "> " + temp;
        currentText.setAttribute("style", "display: none");
        function clickEvent() {
            textEvent();
        }
        let clicked = false;
        function textEvent() {
            if (!clicked) {
                currentText.setAttribute("style", "display: inline");
                currentBtn.innerHTML = "v " + temp;
                clicked = true;
            }
            else if (clicked) {
                currentText.setAttribute("style", "display: none");
                currentBtn.innerHTML = "> " + temp;
                clicked = false;
            }
        }
    }
})(Feedback || (Feedback = {}));
//# sourceMappingURL=script.js.map