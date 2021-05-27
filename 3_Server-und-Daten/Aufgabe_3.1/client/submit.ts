namespace P3_1 {
    // Erstelle FormData und finde den Button im HTML
    let formData: FormData;
    let submit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("send");
    submit.addEventListener("click", clickSubmit);

    // Bei Button-Klick, führe Kommunikation mit Server aus
    function clickSubmit(_event: Event): void {
        communicate("https://qlu.herokuapp.com/");
    }

    async function communicate(_url: RequestInfo): Promise<void> {
        formData = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        _url = _url + "?" + query.toString();
        let response: Response = await fetch(_url, { method: "get" });
        let responseString: string = await response.text();
        console.log(responseString);

        // Output in ein Textfeld und die Konsole
        let footer: HTMLElement = document.getElementsByTagName("footer")[0];
        document.getElementsByTagName("h3")[0].innerHTML = "Ausgabe des Servers:";

        let textfield: HTMLTextAreaElement;
        if (document.getElementsByTagName("textarea")[1] == undefined) {
            textfield = document.createElement("textarea");
            footer.appendChild(textfield);
        } else {
            textfield = document.getElementsByTagName("textarea")[1];
        }
        textfield.setAttribute("cols", "80");
        textfield.setAttribute("rows", "20");
        textfield.innerHTML = "URL:\n" + _url + "\n\n";

        let output: string = "\n";
        for (let entry of query) {
            output += "Name: " + entry[0] + "\nValue: " + entry[1] + "\n\n";
            console.log(entry);
        }
        console.log(output);
        textfield.innerHTML += output;
    }
}