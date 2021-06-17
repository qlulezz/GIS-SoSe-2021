namespace P3_4 {
    let formData: FormData;
    let url: string;
    let s: Student;

    interface Student {
        fname: string;
        lname: string;
        matrikel: number;
        studiengang: string;
    }

    function setURL(): void {
        //url = "http://localhost:8100";
        url = "https://qlu.herokuapp.com";
    }

    document.getElementById("send").addEventListener("click", sendData);
    document.getElementById("receive").addEventListener("click", receiveData);
    document.getElementById("del").addEventListener("click", deleteData);

    function sendData(): void {
        updateInputs();
        handleRequest(0);
        clearInputs();
    }

    function receiveData(): void {
        handleRequest(1);
    }

    function deleteData(): void {
        updateInputs();
        handleRequest(2);
        isChecked();
    }

    async function handleRequest(type: number): Promise<void> {
        setURL();
        currentTime();
        formData = new FormData(document.forms[0]);
        //tslint:disable-next-line
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        if (type == 0) {
            url += "/send" + "?" + query.toString();
            let response: Response = await fetch(url);
            let responseString: string = await response.text();
            console.log("Data Sent", s);
            console.log("URL:", url);
            document.getElementById("response").innerHTML += responseString + "\n\n";
        } else if (type == 1) {
            url += "/receive" + "?" + query.toString();
            let response: Response = await fetch(url);
            let responseJSON: Student = await response.json();
            document.getElementById("response").innerHTML += JSON.stringify(responseJSON) + "\n\n";
            console.log("Data Received.\nURL: " + url);
        } else {
            url += "/del" + "?" + query.toString();
            let response: Response = await fetch(url);
            let responseString: string = await response.text();
            console.log("Entry " + s.matrikel + " deleted.\nURL: " + url);
            document.getElementById("response").innerHTML += responseString + "\n\n";
        }
        setURL();
    }

    function updateInputs(): void {
        let fname: string = document.getElementsByTagName("input")[0].value;
        let lname: string = document.getElementsByTagName("input")[1].value;
        let matrikel: number = parseInt(document.getElementsByTagName("input")[2].value);
        let studiengang: string = document.getElementsByTagName("input")[3].value;
        s = { fname, lname, matrikel, studiengang };
    }

    function clearInputs(): void {
        document.getElementsByTagName("input")[0].value = "";
        document.getElementsByTagName("input")[1].value = "";
        document.getElementsByTagName("input")[2].value = "";
        document.getElementsByTagName("input")[3].value = "";
    }

    let checked: boolean = false;
    function isChecked(): void {
        if (checked == false) {
            if (document.getElementsByTagName("input")[0].value != "" || document.getElementsByTagName("input")[1].value != "" || document.getElementsByTagName("input")[3].value != "") {
                checked = true;
                document.getElementById("response").innerHTML += "Einträge werden durch die Matrikelnummer gelöscht, daher können alle weiteren Felder leer bleiben.\n";
            }
        }
    }

    function currentTime(): void {
        let d: Date = new Date;
        let td: string = "    -    [";
        let to: string = ".";
        let th: string = " ";
        let tm: string = ":";
        let ts: string = ":";
        if (d.getDate() < 10) { td = "[0"; }
        if (d.getMonth() < 10) { to = ".0"; }
        if (d.getHours() < 10) { th = " 0"; }
        if (d.getMinutes() < 10) { tm = ":0"; }
        if (d.getSeconds() < 10) { ts = ":0"; }
        document.getElementById("response").innerHTML += td + d.getDate() + to + d.getMonth() + "." + d.getFullYear() + th + d.getHours() + tm + d.getMinutes() + ts + d.getSeconds() + "]\n";
    }
}