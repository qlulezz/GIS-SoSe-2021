namespace Feedback {
    for (let i: number = 0; i < document.querySelectorAll(".rmb").length; i++) {
        let currentBtn: Element = document.querySelectorAll(".rmb")[i];
        let currentText: Element = document.querySelectorAll(".rmt")[i];

        currentBtn.addEventListener("click", clickEvent);
        let temp: string = currentBtn.innerHTML;
        currentBtn.innerHTML = "> " + temp;

        currentText.setAttribute("style", "display: none");

        function clickEvent(): void {
            textEvent();
        }

        let clicked: boolean = false;
        function textEvent(): void {
            if (!clicked) {
                currentText.setAttribute("style", "display: inline");
                currentBtn.innerHTML = "v " + temp;
                clicked = true;
            } else if (clicked) {
                currentText.setAttribute("style", "display: none");
                currentBtn.innerHTML = "> " + temp;
                clicked = false;
            }
        }
    }
}