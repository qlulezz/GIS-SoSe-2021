"use strict";
console.log("Hallo Welt");
var A1;
(function (A1) {
    function a1() {
        let x = "Alles";
        console.log(x);
        func();
        console.log("Logo!");
    }
    a1();
    function func() {
        console.log("Klar?");
    }
    function a() {
        func0();
        console.log("Gute!");
        func0();
        console.log("klar?");
        func0();
        console.log("Logo!");
    }
    a();
    function func0() {
        console.log("Alles");
    }
    function a2() {
        let i = 9;
        do {
            console.log(i);
            i = i - 1;
        } while (i > 0);
    }
    a2();
    let x = "Hallo";
    console.log(x);
    func1(x);
    console.log(x);
    func2();
    func3();
    console.log(x);
    function func1(y) {
        y = "Bla";
        console.log(y);
    }
    function func2() {
        let x = "Blubb";
        console.log(x);
    }
    function func3() {
        x = "Test";
    }
    console.log("5 a) - Multiply:");
    function multiply(x1, x2) {
        return x1 * x2;
    }
    let x1 = 6;
    let x2 = 10;
    console.log(multiply(x1, x2));
    console.log("5 b) - Maximale Zahl:");
    function max(x1, x2) {
        if (x1 > x2) {
            return x1;
        }
        return x2;
    }
    console.log(max(x1, x2));
    console.log("5 c) - Zahlen von 0 bis 100 addiert:");
    function count() {
        let i = 100;
        let o = 0;
        do {
            o += i;
            i--;
        } while (i > 0);
        return o;
    }
    console.log(count());
    console.log("5 d) - 10 Random Numbers:");
    for (let i = 0; i < 10; i++) {
        console.log(Math.floor(Math.random() * 100));
    }
    console.log("5 e) - Fakultät:");
    function factorial(n) {
        if (n < 1) {
            return 1;
        }
        else {
            let r = 1;
            for (let i = 2; i <= n; i++) {
                r *= i;
            }
            return r;
        }
    }
    console.log(factorial(9));
    console.log("5 f) - Schaltjahre:");
    function leapyear() {
        for (let i = 1900; i < 2021; i++) {
            if (i % 4 == 0 && i % 100 != 0 || i % 400 == 0) {
                console.log(i);
            }
        }
    }
    leapyear();
    console.log("6 a) - #:");
    function hash() {
        let x = "#";
        for (let i = 0; i < 7; i++) {
            console.log(x);
            x += "#";
        }
    }
    hash();
    console.log("6 b) und c)- FizzBuzz:");
    function FizzBuzz() {
        for (let i = 1; i < 100; i++) {
            if (i % 15 == 0) {
                console.log("FizzBuzz");
            }
            else if (i % 3 != 0 && i % 5 == 0) {
                console.log("Buzz");
            }
            else if (i % 3 == 0) {
                console.log("Fizz");
            }
            else {
                console.log(i);
            }
        }
    }
    FizzBuzz();
    console.log("6 d) - Checkerboard:");
    function checkerboard() {
        let output = "";
        for (let i = 0; i < 4; i++) {
            let x = "";
            let y = "";
            for (let j = 0; j < 8; j++) {
                x += " ";
                y += "#";
                [x, y] = [y, x];
            }
            output += x + "\n" + y + "\n";
        }
        console.log(output);
    }
    checkerboard();
    console.log("6 e) - Custom Checkerboard:");
    function checkerboardcustom(height, width) {
        let output = "";
        for (let i = 0; i < height / 2; i++) {
            let x = "";
            let y = "";
            for (let j = 0; j < width; j++) {
                x += " ";
                y += "#";
                [x, y] = [y, x];
            }
            output += x + "\n" + y + "\n";
        }
        console.log(output);
    }
    checkerboardcustom(4, 20);
})(A1 || (A1 = {}));
//# sourceMappingURL=script.js.map