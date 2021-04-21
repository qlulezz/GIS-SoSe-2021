console.log("Hallo Welt");

// Aufgabe 1 - Basics
function a1(): void {
    let x: string = "Alles";
    console.log(x);
    func();
    console.log("Logo!");
}

a1();

function func(): void {
    console.log("Klar?");
}
// Hinweis: Code wurde nicht 1:1 kopiert: 'func1' wurde mit 'func' ersetzt, da 'func1' in Aufgabe 3 verwendet wird.
// 1 a)
// Ausgabe: "Alles" "Klar?" "Logo!" 
//   -> Die Funktion a1() ruft zuerst console.log(x) auf, da x = "Alles" wird dies ausgegeben.
//      Darauf folgt ein Aufruf von func(). func() schreibt "Klar?" in die Konsole
//      Zuletzt folgt noch eine Ausgabe von "Logo!";
// Zulässige Variablen für x sind: Eigentlich alles, da alles, was aus Zeichen besteht über die Konsole ausgegeben werden kann (sofern Variable und Wert passen, also nicht: let x: boolean = "69"). 

// 1 b)
// Die Reihenfolge habe ich in 1 a) beschrieben, der Debugger bestätigt dies.

// 1 c)
function a(): void {
    func0();
    console.log("Gute!");
    func0();
    console.log("klar?");
    func0();
    console.log("Logo!");
}

a();

function func0(): void {
    console.log("Alles");
}

// Aufgabe 2 - Kontinuierliche Variablenmanipulation
function a2(): void {
    let i: number = 9;

    do {
        console.log(i);
        i = i - 1;
    } while (i > 0);
}

a2();

// Ausgabe: Zahlen herunterzählend von 9 bis 1
//   -> 'i' ist anfänglich 9. 'do' und 'while' starten eine Schleife.
//      'do' sagt was getan werden soll (in dem Fall i ausgeben und dann i um 1 reduzieren) und 'while' bestimmt wie lange der Code in 'do' ausgeführt werden soll (nämlich solange i größer als 0 ist)

// Aufgabe 3 - Fehler erkennen und vermeiden lernen
// Aufgabe 3 ist schwierig nur mit Kommentaren zu lösen, daher ist hier ein nicht ganz fehlerfreier Code-Block:
/*
function a1(): string {
    let x: int[] = true;
    console.log(y)
    func[];
    Console.log("Logo!");
}
*/

// Aufgabe 4 - Gobal vs Lokal
let x: string = "Hallo";
console.log(x);
func1(x);
console.log(x);
func2();
func3();
console.log(x);

function func1(y: string): void {
    y = "Bla";
    console.log(y);
}

function func2(): void {
    let x: string = "Blubb";
    console.log(x);
}

function func3(): void {
    x = "Test";
}

// 4 a)
// Ausgabe: "Hallo" "Bla" "Hallo" "Blubb" "Test"
//   -> 'x' wird als "Hallo" deklariert, mit console.log(x) wird dies als Erstes ausgegeben.
//      Bei dem Aufruf von func1 wird 'x' als Wert an die Funktion übergeben, allerdings wird in der Funktion das "Hallo" mit "Bla" überschrieben, welches sofort ausgegeben wird.
//      Dann wird console.log(x) noch einmal ausgeführt, "Hallo" erscheint wieder in der Konsole.
//      Mit Aufruf von func2 wird eine neue lokale Variable 'x' erstellt, diese hat nichts mit der vorherigen globalen Variable 'x' zu tun, somit überschreibt die Funktion nicht das globale 'x'
//      Dem lokalen 'x' wird der String "Blubb" zugewiesen und in die Konsole ausgegeben.
//      func3 ersetzt nun die globale Variable 'x' mit "Test", dies wird schlussendlich mit console.log(x) ausgegeben.
// 4 b)
// Eine Funktion beschreibt einen Codeabschnitt (ein "Unterprogramm") der Code bei Aufruf entweder direkt ausführt oder mit übergebenen Variablen einen oder mehrere Werte berechnet, ändert und/oder zurückgibt.
// Variablen sind Punkte im Code, in denen Werte, wie Zahlen oder Zeichen gespeichert werden können, damit sie später wiederverwendet werden können.
// Der Unterschied liegt im Aufbau, eine Funktion an sich kann keine Werte speichern, so wie es eine Variable kann.
// Die einzige Gemeinsamkeit ist der syntaktische Aufbau bei der Deklaration (let,const,.../function name: type).


// Aufgabe 5 - Schleifen, Funktionen und andere Kontrollstrukturen
// 5 a)
console.log("5 a) - Multiply:");
function multiply(x1: number, x2: number): number {
    return x1 * x2;
}

let x1: number = 6;
let x2: number = 10;
console.log(multiply(x1, x2));

// 5 b)
console.log("5 b) - Maximale Zahl:");
function max(x1: number, x2: number): number {
    if (x1 > x2) {
        return x1;
    }
    return x2;
}
console.log(max(x1, x2));

// 5 c)
console.log("5 c) - Zahlen von 0 bis 100 addiert:");
function count(): number {
    let i: number = 100;
    let o: number = 0;
    do {
        o += i;
        i--;
    } while (i > 0);
    return o;
}
console.log(count());

// 5 d)
console.log("5 d) - 10 Random Numbers:");
for (let i: number = 0; i < 10; i++) {
    console.log(Math.floor(Math.random() * 100));
}

// 5 e)
console.log("5 e) - Fakultät:");
function factorial(n: number): number {
    if (n < 1) {
        return 1;
    } else {
        let r: number = 1;
        for (let i: number = 2; i <= n; i++) {
            r *= i;
        }
        return r;
    }
}
console.log(factorial(9));

// 5 f)
console.log("5 f) - Schaltjahre:");
function leapyear(): void {
    for (let i: number = 1900; i < 2021; i++) {
        if (i % 4 == 0 && i % 100 != 0 || i % 400 == 0) {
            console.log(i);
        }
    }
}
leapyear();

// Aufgabe 6 - Mehr Schleifen und Funktionen
// 6 a)
console.log("6 a) - #:");
function hash(): void {
    let x: string = "#";
    for (let i: number = 0; i < 7; i++) {
        console.log(x);
        x += "#";
    }
}
hash();

// 6 b)
console.log("6 b) und c)- FizzBuzz:");
function FizzBuzz(): void {
    for (let i: number = 1; i < 100; i++) {
        if (i % 15 == 0) {
            console.log("FizzBuzz");
        } else if (i % 3 != 0 && i % 5 == 0) {
            console.log("Buzz");
        } else if (i % 3 == 0) {
            console.log("Fizz");
        } else {
            console.log(i);
        }
    }
}
FizzBuzz();

// 6 d)
console.log("6 d) - Checkerboard:");
function checkerboard(): void {
    let output: string = "";
    for (let i: number = 0; i < 4; i++) {
        let x: string = "";
        let y: string = "";
        for (let j: number = 0; j < 8; j++) {
            x += " ";
            y += "#";
            [x, y] = [y, x];
        }
        output += x + "\n" + y + "\n";
    }
    console.log(output);
}
checkerboard();

// 6 e)
console.log("6 e) - Custom Checkerboard:");
function checkerboardcustom(height: number, width: number): void {
    let output: string = "";
    for (let i: number = 0; i < height / 2; i++) {
        let x: string = "";
        let y: string = "";
        for (let j: number = 0; j < width; j++) {
            x += " ";
            y += "#";
            [x, y] = [y, x];
        }
        output += x + "\n" + y + "\n";
    }
    console.log(output);
}
checkerboardcustom(4, 20);