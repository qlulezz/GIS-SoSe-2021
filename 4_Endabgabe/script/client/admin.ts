namespace end_admin {
    let formData: FormData;
    let url: string;

    let input: string = prompt("Admin-Passwort:", "");
    if (input == null || input == "") {
        alert("Bitte ein Passwort eingeben");
    } else if (input == "admin") {
        console.log("Passwort korrekt.");
        document.querySelector(".admin").setAttribute("style", "display: inline");
        getData();
    } else {
        alert("Das eingegebene Passwort ist falsch.");
    }

    let rd: ResultData;
    let link: HTMLInputElement;
    let name: HTMLInputElement;
    let send: HTMLElement = document.getElementById("send");
    let refresh: HTMLElement = document.getElementById("refresh");
    let output: HTMLElement = document.getElementById("output");
    send.addEventListener("click", sendClickEvent);
    refresh.addEventListener("click", refreshEvent);

    function sendClickEvent(): void {
        link = document.getElementsByTagName("input")[0];
        name = document.getElementsByTagName("input")[1];
        let u: string = link.value;
        let n: string = name.value;
        if (u == null || u == "" || n == null || n == "") {
            output.innerHTML = "Fehler: Die Felder dürfen nicht leer sein.";
            output.style.color = "red";
        } else if (!checkURL(u)) {
            output.innerHTML = "Fehler: Der Link enthält kein unterstütztes Format.";
            output.style.color = "red";
        } else {
            rd = { link: u, name: n, date: getDate() };
            sendData();
            link.value = "";
            name.value = "";
        }
    }

    function setURL(): void {
        //url = "http://localhost:8100";
        url = "https://qlu.herokuapp.com";
    }

    async function sendData(): Promise<void> {
        setURL();
        formData = new FormData(document.forms[0]);
        formData.append("date", getDate());
        //tslint:disable-next-line
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url += "/sendlink" + "?" + query.toString();
        let response: Response = await fetch(url);
        let responseString: string = await response.text();
        console.log("Data Sent", rd);
        console.log("URL:", url);
        if (responseString == "true") {
            output.innerHTML = "Erfolg: Deine Daten wurden gesendet.";
            output.style.color = "lime";
        } else {
            output.innerHTML = "Fehler: Diese URL ist bereits in der Datenbank.";
            output.style.color = "red";
        }
        console.log("Server Antwort: " + responseString + "\n" + output.innerHTML);
        setURL();
    }

    async function getData(): Promise<void> {
        setURL();
        url += "/receiveadminlink";
        let response: Response = await fetch(url);
        let responseJSON: ResultData[] = await response.json();
        console.log("Data Received");
        console.log("URL:", url);

        for (let i: number = 0; i < responseJSON.length; i++) {
            let box: Element = document.querySelector(".box");
            let div: HTMLDivElement = document.createElement("div");
            let dlink: HTMLAnchorElement = document.createElement("a");
            let imgsrc: HTMLImageElement = document.createElement("img");
            let p: HTMLParagraphElement = document.createElement("p");
            let d: HTMLParagraphElement = document.createElement("p");
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
            function remove(): void {
                deleteData(responseJSON[i].link, responseJSON[i].name);
                div.setAttribute("style", "display: none;");
            }
        }
        setURL();
    }

    async function deleteData(link: string, name: string): Promise<void> {
        setURL();
        formData = new FormData();
        formData.append("link", link);
        formData.append("name", name);
        //tslint:disable-next-line
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url += "/deletelink" + "?" + query.toString();
        let response: Response = await fetch(url);
        let responseString: string = await response.text();
        console.log(responseString);
        console.log("URL:", url);
        setURL();
    }

    interface ResultData {
        link: string;
        name: string;
        date: string;
    }

    function getDate(): string {
        let t: Date = new Date();

        let day: string = t.getDate() + "";
        if (t.getDate() < 10)
            day = "0" + t.getDate();
        
        let month: string = t.getMonth() + "";
        if (t.getMonth() < 10)
            month = "0" + (t.getMonth() + 1);
        
        let year: string = t.getFullYear() + "";
        
        let hour: string = t.getHours() + "";
        if (t.getHours() < 10)
            hour = "0" + t.getHours();
        
        let minute: string = t.getMinutes() + "";
        if (t.getMinutes() < 10)
            minute = "0" + t.getMinutes();
        
        let second: string = t.getSeconds() + "";
        if (t.getSeconds() < 10)
            second = "0" + t.getSeconds();

        return day + "-" + month + "-" + year + "_" + hour + "-" + minute + "-" + second;
    }

    function refreshEvent(): void {
        window.location.reload();
    }
    
    function checkURL(s: string): boolean {
        // Extra regex gelernt
        return(s.match(/\.(jpg|jpeg|png|gif|svg|bmp|ico)$/) != null);
    }
}