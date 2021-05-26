namespace P3_1 {
    let formData: FormData;
    let submit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("send");
    submit.addEventListener("click", clickSubmit);

    function clickSubmit(_event: Event): void {
        communicate("https://gis-example.herokuapp.com");
    }

    async function communicate(_url: RequestInfo): Promise<void> {
        formData = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        _url = _url + "?" + query.toString();
        let response: Response = await fetch(_url, { method: "get" });
        let responseString: string = await response.text();
        console.log(responseString);

        let output: string = "\n";
        for (let entry of query) {
            output += "Entry: " + entry[0] + "\nWert: " + entry[1] + "\n\n"; 
            console.log(entry);
        }
        console.log(output);
    }
}