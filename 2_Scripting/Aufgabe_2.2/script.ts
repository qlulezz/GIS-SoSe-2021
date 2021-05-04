namespace A2 {

    // 1 a)
    console.log("1 a) - Minimum");

    function min(...arr: number[]): number {
        return Math.min.apply(null, arr);
    }
    console.log(min(1, 2, 5, 200, 24, -3, 4));

    // Ja, so war das von euch nicht gedacht, aber erst in Aufgabe 2 steht, dass ich das nicht darf haha >:)

    console.log("1 b) - Gerade Ungerade");
    function isEven(n: number): boolean {
        if (n == 0) {
            return true;
        }
        if (n == 1) {
            return false;
        }
        return isEven(n - 2);
    }
    console.log(isEven(50));
    console.log(isEven(75));
    //Da bei console.log(isEven(-1)) die Rekursion nie 0 oder 1 erreichen wird, treffen wir hier auf einen Fehler: die Rekursion wird ohne Ende ausgeführt.

    console.log("1 c) - Interface");
    // 1 c) 1.
    interface Studierender {
        [key: string]: string | number;
        // Diese Zeile ist nur für den Linter, dann beschwert er sich nicht
        Name: string;
        Matrikelnummer: number;
        Studiengang: string;
        Semester: number;
        Geburtsdatum: number;
    }

    // 1 c) 2.
    let student1: Studierender = { Name: "Henry", Matrikelnummer: 133742069, Studiengang: "OMB", Semester: 2, Geburtsdatum: 12081995 };
    let student2: Studierender = { Name: "Felix", Matrikelnummer: 7355608, Studiengang: "MIB", Semester: 2, Geburtsdatum: 20041889 };
    let student3: Studierender = { Name: "Yannis", Matrikelnummer: 123456, Studiengang: "MIB", Semester: 2, Geburtsdatum: 14061946 };

    // 1 c) 3.
    let sArray: Studierender[] = [student1, student2, student3, { Name: "Eddy", Matrikelnummer: 654321, Studiengang: "MKB", Semester: 2, Geburtsdatum: 13052001 }];
    console.log(sArray[3].Name, sArray[0].Matrikelnummer, sArray[1].Studiengang + "\n-");

    // 1 c) 4.
    function showInfo(stud: Studierender): void {
        console.log("Name: " + stud.Name + "\n   " +
            "Matrikelnummer: " + stud.Matrikelnummer + "\n   " +
            "Studiengang: " + stud.Studiengang + ", Semester: " + stud.Semester + "\n   " +
            "Geburtsdatum: " + stud.Geburtsdatum + " (TTMMJJJJ)" + "\n" + "\n" +
            "INFO ÜBER HARDCODED LOG");
    }

    for (let stud of sArray) {
        showInfo(stud);
    }

    //Warum showInfo mehrmals aufrufen und den Konsolen Output hardcoden, wenn alles mit einer Funktion ausgegeben werden kann?

    function showAllInfo(): void {
        for (let i: number = 0; i < sArray.length; i++) {
            let output: String = "";
            for (let s in sArray[i]) {
                output += s + ": " + sArray[i][s] + "\n   ";
            }
            console.log(output + "\n" + "INFO ÜBER SCHLEIFE");
        }
    }
    showAllInfo();

    // 1 c) 5.
    class Studierend {
        name: string;
        matrikelnummer: number;
        studiengang: string;
        semester: number;
        geburtsdatum: number;

        constructor(_name: string, _matrikelnummer: number, _studiengang: string, _semester: number, _geburtsdatum: number) {
            this.name = _name;
            this.matrikelnummer = _matrikelnummer;
            this.studiengang = _studiengang;
            this.semester = _semester;
            this.geburtsdatum = _geburtsdatum;
        }

        showInfoClass(): void {
            console.log("Name: " + this.name + "\n"
                + "Matrikelnummer: " + this.matrikelnummer + "\n"
                + "Studiengang: " + this.studiengang + ", Semester: " + this.semester + "\n"
                + "Geburtsdatum (TTMMJJ): " + this.geburtsdatum + "\n" + "\n"
                + "INFO ÜBER KLASSE");
        }
    }

    let student4: Studierend = new Studierend("Max", 101010, "MKB", 2, 120301);
    student4.showInfoClass();


    // 2 a)
    console.log("2 a)");
    function backwards(arr: number[]): number[] {
        let output: number[] = [];
        for (let i: number = 0; i < arr.length; i++) {
            output[i] = arr[arr.length - i - 1];
        }
        return output;
    }
    console.log(backwards([1, 2, 3, 4, 5]));

    // 2 b)
    console.log("2 b)");
    function join(arr1: number[], arr2: number[]): number[] {
        while (arr2.length > 0) { arr1.push(arr2.shift()); }
        return arr1;
    }
    // Das ist mal ein Einzeiler, auf den ich stolz bin ;)
    console.log(join([1, 2, 3], [4, 5, 6, 7, 9]));

    // 2 c)
    console.log("2 c)");
    /* Erster Versuch: Funktioniert, aber umständlich
    function split(arr: number[], min: number, max: number): number[] {
        if (min > 0 && max < arr.length && min < max) {
            let temp: number = arr.length;
            for (let i: number = 0; i < min; i++) {
                arr.shift();
            }
            for (let i: number = 0; i < temp - max; i++) {
                arr.pop();
            }
            return arr;
        }
        return arr;
    }
    */

    function split(arr: number[], min: number, max: number): number[] {
        let output: number[] = [];
        if (min > 0 && max < arr.length && min < max) {
            for (let i: number = min - 1; i < max; i++) {
                output.push(arr[i]);
            }
            return output;
        }
        return output;
    }
    console.log(split([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3, 6));

    /*
    console.log("2 c) Tests");
    let arr: number[] = [5, 42, 17, 2018, -10, 60, -10010];                         // Funktioniert
    let arrBack: number[] = backwards(arr);                                         // Funktioniert
    console.log(arr);                                                               // Funktioniert
    console.log(arrBack);                                                           // Funktioniert
    console.log(join(arr, [15, 9001, -440] ));                                      // Funktioniert
    console.log(join([123, 666, -911], arr, [15, 9001, -440, 1024] ));              // Funktioniert nicht, weil join nur 2 Argumente annimmt
    arr = split(arr, 0, 4);                                                         // Funktioniert
    console.log(arr);                                                               // Funktioniert
    console.log(split(arr, 1, 2));                                                  // Funktioniert
    console.log(split(arr, 2, 0));     // Bonus c)                                  // Funktioniert nicht, weil der erste Wert kleiner als der Zweite ist.
    console.log(split(arr, -1, 2));    // Bonus c)                                  // Funktioniert nicht, weil Argumente nicht negativ sein dürfen
    console.log(split(arr, 0, 7));     // Bonus c)                                  // Funktioniert nicht, weil arr weniger als 7 Indizes hat.
    */

    // 3 a)
    let testCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("Canvas1");
    let testContext: CanvasRenderingContext2D = testCanvas.getContext("2d");

    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("Canvas2");
    let context: CanvasRenderingContext2D = canvas.getContext("2d");

    testContext.beginPath();

    // Himmel
    testContext.fillStyle = "skyblue";
    testContext.fillRect(0, 0, 350, 250);

    // Wolken
    testContext.beginPath();
    testContext.fillStyle = "white";
    testContext.ellipse(70, 60, 30, 30, 0, 0, 2 * Math.PI, false);
    testContext.ellipse(40, 64, 25, 25, 0, 0, 2 * Math.PI, false);
    testContext.ellipse(95, 67, 20, 20, 0, -360, 2 * Math.PI, false);
    testContext.fill();
    testContext.closePath();

    // Sonne
    testContext.beginPath();
    testContext.fillStyle = "yellow";
    testContext.arc(300, 30, 20, 0, 2 * Math.PI, false);
    testContext.fill();
    testContext.closePath();

    // Wiese
    testContext.fillStyle = "green";
    testContext.fillRect(0, 200, 350, 130);

    // Haus
    testContext.lineWidth = 10;
    testContext.fillStyle = "white";
    testContext.fillRect(75, 140, 150, 110);
    testContext.strokeRect(75, 140, 150, 110);

    // Pfad
    testContext.beginPath();
    testContext.fillStyle = "gray";
    testContext.moveTo(170, 250);
    testContext.lineTo(130, 250);
    testContext.lineTo(100, 320);
    testContext.lineTo(200, 320);
    testContext.lineTo(170, 250);
    testContext.fill();
    testContext.closePath();

    // Schornstein
    testContext.fillStyle = "black";
    testContext.fillRect(180, 60, 40, 60);
    // Tür
    testContext.fillRect(130, 190, 40, 60);
    // Straße
    testContext.fillRect(0, 300, 350, 60);

    // Dach
    testContext.beginPath();
    testContext.strokeStyle = "black";
    testContext.moveTo(50, 140);
    testContext.lineTo(150, 60);
    testContext.lineTo(250, 140);
    testContext.fillStyle = "red";
    testContext.fill();
    testContext.closePath();

    testContext.stroke();
    testContext.closePath();

    // 3 b) - g)
    class Rechteck {
        width: number;
        height: number;
        locX: number;
        locY: number;
        strokeWidth: number;
        colorFill: string;
        colorStroke: string;
        r1: number = (Math.random() + (Math.random() - 1)) / 10;
        r2: number = (Math.random() + (Math.random() - 1)) / 10;

        constructor(_width: number, _height: number, _locX: number, _locY: number, _strokeWidth: number, _colorFill: string, _colorStroke: string) {
            this.width = _width;
            this.height = _height;
            this.locX = _locX;
            this.locY = _locY;
            this.strokeWidth = _strokeWidth;
            this.colorFill = _colorFill;
            this.colorStroke = _colorStroke;
            if (_width == undefined) {
                this.width = Math.floor(Math.random() * (canvas.width / 2));
            }
            if (_height == undefined) {
                this.height = Math.floor(Math.random() * (canvas.height) / 2);
            }
            if (_locX == undefined) {
                this.locX = Math.floor(Math.random() * (canvas.width) / 2);
            }
            if (_locY == undefined) {
                this.locY = Math.floor(Math.random() * (canvas.height) / 2);
            }
            if (_strokeWidth == undefined) {
                this.strokeWidth = Math.floor(Math.random() * 20);
            }
            if (_colorFill == undefined) {
                this.colorFill = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
            }
            if (_colorStroke == undefined) {
                this.colorStroke = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
            }
        }

        drawRect(): void {
            context.beginPath();
            context.fillStyle = this.colorFill;
            context.rect(this.locX, this.locY, this.width, this.height);
            context.fill();

            context.lineWidth = this.strokeWidth;
            context.strokeRect(this.locX, this.locY, this.width, this.height);
            context.strokeStyle = this.colorStroke;
            context.stroke();
            context.closePath();
        }

        moveRect(): void {
            this.locX += this.r1;
            this.locY += this.r2;
            this.width += this.r1;
            this.height += this.r2;
        }
    }

    let objArray: Rechteck[] = [];

    for (let r in objArray) {
        objArray[r].drawRect();
    }

    setInterval(function (): void {
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (let rect of objArray) {
            rect.moveRect();
            rect.drawRect();
        }
    },          1 / 60);

    let amount: number = 20;
    let interval: number = 1500;
    let width: number = undefined;
    let height: number = undefined;
    let strokeWidth: number = undefined;
    let colorFill: string = undefined;
    let colorStroke: string = undefined;

    setInterval(function (): void {
        objArray = [];
        for (let i: number = 0; i < amount; i++) {
            let r: Rechteck = new Rechteck(width, height, undefined, undefined, strokeWidth, colorFill, colorStroke);
            // Standartmäßig wird alles zufällig generiert. Hier kann jeder Zufallswert manuell überschrieben werden.
            // Zum Beispiel kann die Dicke des Strokes oder die Farbe festgelegt werden.
            objArray.push(r);
        }
    },          interval);

    // Alles ab diesem Punkt ist freiwillig (Bonus) und wurde nach der Abgabe am Sonntag zusätzlich hinzugefügt
    document.getElementById("btnUp").onclick = function (): void {
        amount++;
        document.getElementById("label").innerHTML = "Anzahl Rechtecke: " + amount;
    };

    document.getElementById("btnDown").onclick = function (): void {
        amount--;
        document.getElementById("label").innerHTML = "Anzahl Rechtecke: " + amount;
    };

    document.getElementById("btnUpdate").onclick = function (): void {
        amount = Math.abs(parseInt((document.getElementById("anzahl") as HTMLInputElement).value));

        strokeWidth = parseInt((document.getElementById("strst") as HTMLInputElement).value);
        if (strokeWidth.toString() == "NaN") {
            strokeWidth = undefined;
        }
        colorFill = (document.getElementById("fillcol") as HTMLInputElement).value;
        if (colorFill.length <= 0) {
            colorFill = undefined;
        }
        colorStroke = (document.getElementById("strcol") as HTMLInputElement).value;
        if (colorStroke.length <= 0) {
            colorStroke = undefined;
        }
        width = parseInt((document.getElementById("wid") as HTMLInputElement).value);
        if (width.toString() == "NaN") {
            width = undefined;
        }
        height = parseInt((document.getElementById("hgt") as HTMLInputElement).value);
        if (height.toString() == "NaN") {
            height = undefined;
        }
        document.getElementById("label").innerHTML = "Anzahl Rechtecke: " + Math.abs(amount); 
    };

}