namespace P3_2 {
    let formData: FormData;
    let url: string;
    document.getElementById("sendhtml").addEventListener("click", handleClickHTML);
    document.getElementById("sendjson").addEventListener("click", handleClickJSON);
    async function handleClickHTML(): Promise<void> { handleRequest(true); }
    async function handleClickJSON(): Promise<void> { handleRequest(false); }

    function setURL(): void {
        // url = "https://qlu.herokuapp.com";
        url = "http://localhost:8100";
    }

    async function handleRequest(isHTML: boolean): Promise<void> {
        setURL();
        formData = new FormData(document.forms[0]);
        //tslint:disable-next-line
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        if (isHTML) {
            url += "/html" + "?" + query.toString();
            let response: Response = await fetch(url);
            let responseString: string = await response.text();
            console.log("Response String:", responseString);
            document.getElementById("response").innerHTML = responseString;
        } else {
            url += "/json" + "?" + query.toString();
            let response: Response = await fetch(url);
            let responseJSON: string = await response.json();
            console.log("Response JSON", responseJSON);
        }
        setURL();
    }
}