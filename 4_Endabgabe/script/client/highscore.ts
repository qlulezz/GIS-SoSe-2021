namespace end_highscores {

    let url: string;
    let hueRotate: number = Math.floor(Math.random() * 360);
    async function getData(): Promise<void> {
        setURL();
        url += "/receivescores";
        let response: Response = await fetch(url);
        let responseJSON: ResultData[] = await response.json();
        responseJSON = responseJSON.sort((a: ResultData, b: ResultData) => {
            return a.time.localeCompare(b.time);
        });
        
        console.log("Data Received");
        console.log("URL:", url);

        for (let i: number = 0; i < responseJSON.length; i++) {
            let tbody: Element = document.querySelector("tbody");
            let tr: HTMLTableRowElement = document.createElement("tr");
            let td1: HTMLTableDataCellElement = document.createElement("td");
            let td2: HTMLTableDataCellElement = document.createElement("td");
            let td3: HTMLTableDataCellElement = document.createElement("td");
            let td4: HTMLTableDataCellElement = document.createElement("td");
            let td5: HTMLTableDataCellElement = document.createElement("td");
            td1.innerHTML = i + 1 + "";
            td2.innerHTML = responseJSON[i].name;
            td3.innerHTML = responseJSON[i].id;
            td4.innerHTML = responseJSON[i].time;
            td5.innerHTML = formatDate(responseJSON[i].date);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tbody.appendChild(tr);

            if (i == 0) 
                tr.style.color = "gold";
            if (i == 1) 
                tr.style.color = "#ffe768";
            if (i == 2) 
                tr.style.color = "#fff5c0";
            if (i < 3)
                tr.style.filter = "hue-rotate(" + hueRotate + "deg)";
        }
        setURL();
    }
    getData();

    function setURL(): void {
        //url = "http://localhost:8100";
        url = "https://qlu.herokuapp.com";
    }

    interface ResultData {
        name: string;
        id: string;
        time: string;
        date: string;
    }

    function formatDate(date: string): string {
        let f: string[] = date.split("_");
        let d: string[] = f[0].split("-");
        let t: string[] = f[1].split("-");
        return d[0] + "." + d[1] + "." + d[2] + ", " + t[0] + ":" + t[1] + ":" + t[2];
    }
}