namespace end_stats {

    interface Score {
        name: string;
        id: string;
        time: string;
        date: string;
        ip: string;
        address: string;
    }

    interface Link {
        link: string;
        name: string;
        date: string;
        ip: string;
        address: string;
    }

    let url: string;
    function setURL(): void {
        //url = "http://localhost:8100";
        url = "https://qlu.herokuapp.com";
    }

    let scores: number = 0;
    let playerid: string = "0";
    let playerip: string = "0";
    let links: number = 0;

    async function getScoreData(): Promise<void> {
        setURL();
        url += "/receivescores";
        let response: Response = await fetch(url);
        let responseJSON: Score[] = await response.json();
        let player: string[] = [];
        let ips: string[] = [];
        for (let i: number = 0; i < responseJSON.length; i++) {
            if (!player.includes(responseJSON[i].id.toUpperCase())) {
                player.push(responseJSON[i].id.toUpperCase());
            }
            if (!ips.includes(responseJSON[i].ip)) {
                ips.push(responseJSON[i].ip);
            }
        }
        playerid = player.length + "";
        playerip = ips.length + "";
        scores = responseJSON.length;
        print();
        setURL();
    }
    
    async function getLinkData(): Promise<void> {
        setURL();
        url += "/receivegamelink";
        let response: Response = await fetch(url);
        let responseJSON: Link[] = await response.json();
        links = responseJSON.length;
        print();
        setURL();
    }

    let para: HTMLElement = document.getElementById("stats");
    para.addEventListener("click", refresh);
    function print(): void {
        para.innerHTML = "<b>Statistiken:</b>&emsp;Insgesamt hochgeladene Scores: <b>" + scores + 
        "</b> - Eindeutige Spieler: <b>" + playerid + " </b>(<b>" + playerip + "</b>) - Verfügbare Bilder: <b>" + links + "</b>";
    }

    function refresh(): void {
        getScoreData();
        getLinkData();
        console.log("Stats refreshed");
    }
}