"use strict";
var A2;
(function (A2) {
    console.log("1 a) - Minimum");
    function min(...arr) {
        return Math.min.apply(null, arr);
    }
    console.log(min(1, 2, 5, 200, 24, -3, 4));
    console.log("1 b) - Gerade Ungerade");
    function isEven(n) {
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
    console.log("1 c) - Interface");
    let student1 = { Name: "Henry", Matrikelnummer: 133742069, Studiengang: "OMB", Semester: 2, Geburtsdatum: 12081995 };
    let student2 = { Name: "Felix", Matrikelnummer: 7355608, Studiengang: "MIB", Semester: 2, Geburtsdatum: 20041889 };
    let student3 = { Name: "Yannis", Matrikelnummer: 123456, Studiengang: "MIB", Semester: 2, Geburtsdatum: 14061946 };
    let sArray = [student1, student2, student3, { Name: "Eddy", Matrikelnummer: 654321, Studiengang: "MKB", Semester: 2, Geburtsdatum: 13052001 }];
    console.log(sArray[3].Name, sArray[0].Matrikelnummer, sArray[1].Studiengang + "\n-");
    function showInfo(stud) {
        console.log("Name: " + stud.Name + "\n   " +
            "Matrikelnummer: " + stud.Matrikelnummer + "\n   " +
            "Studiengang: " + stud.Studiengang + ", Semester: " + stud.Semester + "\n   " +
            "Geburtsdatum: " + stud.Geburtsdatum + " (TTMMJJJJ)" + "\n" + "\n" +
            "INFO ÜBER HARDCODED LOG");
    }
    for (let stud of sArray) {
        showInfo(stud);
    }
    function showAllInfo() {
        for (let i = 0; i < sArray.length; i++) {
            let output = "";
            for (let s in sArray[i]) {
                output += s + ": " + sArray[i][s] + "\n   ";
            }
            console.log(output + "\n" + "INFO ÜBER SCHLEIFE");
        }
    }
    showAllInfo();
    class Studierend {
        constructor(_name, _matrikelnummer, _studiengang, _semester, _geburtsdatum) {
            this.name = _name;
            this.matrikelnummer = _matrikelnummer;
            this.studiengang = _studiengang;
            this.semester = _semester;
            this.geburtsdatum = _geburtsdatum;
        }
        showInfoClass() {
            console.log("Name: " + this.name + "\n"
                + "Matrikelnummer: " + this.matrikelnummer + "\n"
                + "Studiengang: " + this.studiengang + ", Semester: " + this.semester + "\n"
                + "Geburtsdatum (TTMMJJ): " + this.geburtsdatum + "\n" + "\n"
                + "INFO ÜBER KLASSE");
        }
    }
    let student4 = new Studierend("Max", 101010, "MKB", 2, 120301);
    student4.showInfoClass();
    console.log("2 a)");
    function backwards(arr) {
        let output = [];
        for (let i = 0; i < arr.length; i++) {
            output[i] = arr[arr.length - i - 1];
        }
        return output;
    }
    console.log(backwards([1, 2, 3, 4, 5]));
    console.log("2 b)");
    function join(arr1, arr2) {
        while (arr2.length > 0) {
            arr1.push(arr2.shift());
        }
        return arr1;
    }
    console.log(join([1, 2, 3], [4, 5, 6, 7, 9]));
    console.log("2 c)");
    function split(arr, min, max) {
        let output = [];
        if (min > 0 && max < arr.length && min < max) {
            for (let i = min - 1; i < max; i++) {
                output.push(arr[i]);
            }
            return output;
        }
        return output;
    }
    console.log(split([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3, 6));
    let testCanvas = document.getElementById("Canvas1");
    let testContext = testCanvas.getContext("2d");
    let canvas = document.getElementById("Canvas2");
    let context = canvas.getContext("2d");
    testContext.beginPath();
    testContext.fillStyle = "skyblue";
    testContext.fillRect(0, 0, 350, 250);
    testContext.beginPath();
    testContext.fillStyle = "white";
    testContext.ellipse(70, 60, 30, 30, 0, 0, 2 * Math.PI, false);
    testContext.ellipse(40, 64, 25, 25, 0, 0, 2 * Math.PI, false);
    testContext.ellipse(95, 67, 20, 20, 0, -360, 2 * Math.PI, false);
    testContext.fill();
    testContext.closePath();
    testContext.beginPath();
    testContext.fillStyle = "yellow";
    testContext.arc(300, 30, 20, 0, 2 * Math.PI, false);
    testContext.fill();
    testContext.closePath();
    testContext.fillStyle = "green";
    testContext.fillRect(0, 200, 350, 130);
    testContext.lineWidth = 10;
    testContext.fillStyle = "white";
    testContext.fillRect(75, 140, 150, 110);
    testContext.strokeRect(75, 140, 150, 110);
    testContext.beginPath();
    testContext.fillStyle = "gray";
    testContext.moveTo(170, 250);
    testContext.lineTo(130, 250);
    testContext.lineTo(100, 320);
    testContext.lineTo(200, 320);
    testContext.lineTo(170, 250);
    testContext.fill();
    testContext.closePath();
    testContext.fillStyle = "black";
    testContext.fillRect(180, 60, 40, 60);
    testContext.fillRect(130, 190, 40, 60);
    testContext.fillRect(0, 300, 350, 60);
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
    class Rechteck {
        constructor(_width, _height, _locX, _locY, _strokeWidth, _colorFill, _colorStroke) {
            this.r1 = (Math.random() + (Math.random() - 1)) / 10;
            this.r2 = (Math.random() + (Math.random() - 1)) / 10;
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
        drawRect() {
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
        moveRect() {
            this.locX += this.r1;
            this.locY += this.r2;
            this.width += this.r1;
            this.height += this.r2;
        }
    }
    let objArray = [];
    for (let r in objArray) {
        objArray[r].drawRect();
    }
    setInterval(function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (let rect of objArray) {
            rect.moveRect();
            rect.drawRect();
        }
    }, 1 / 60);
    let amount = 20;
    let interval = 1500;
    let width = undefined;
    let height = undefined;
    let strokeWidth = undefined;
    let colorFill = undefined;
    let colorStroke = undefined;
    setInterval(function () {
        objArray = [];
        for (let i = 0; i < amount; i++) {
            let r = new Rechteck(width, height, undefined, undefined, strokeWidth, colorFill, colorStroke);
            objArray.push(r);
        }
    }, interval);
    document.getElementById("btnUp").onclick = function () {
        amount++;
        document.getElementById("label").innerHTML = "Anzahl Rechtecke: " + amount;
    };
    document.getElementById("btnDown").onclick = function () {
        amount--;
        document.getElementById("label").innerHTML = "Anzahl Rechtecke: " + amount;
    };
    document.getElementById("btnUpdate").onclick = function () {
        amount = Math.abs(parseInt(document.getElementById("anzahl").value));
        strokeWidth = parseInt(document.getElementById("strst").value);
        if (strokeWidth.toString() == "NaN") {
            strokeWidth = undefined;
        }
        colorFill = document.getElementById("fillcol").value;
        if (colorFill.length <= 0) {
            colorFill = undefined;
        }
        colorStroke = document.getElementById("strcol").value;
        if (colorStroke.length <= 0) {
            colorStroke = undefined;
        }
        width = parseInt(document.getElementById("wid").value);
        if (width.toString() == "NaN") {
            width = undefined;
        }
        height = parseInt(document.getElementById("hgt").value);
        if (height.toString() == "NaN") {
            height = undefined;
        }
        document.getElementById("label").innerHTML = "Anzahl Rechtecke: " + Math.abs(amount);
    };
})(A2 || (A2 = {}));
//# sourceMappingURL=script.js.map