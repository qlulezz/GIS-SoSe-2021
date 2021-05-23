"use strict";
var Kapitelaufgabe;
(function (Kapitelaufgabe) {
    Kapitelaufgabe.R = [
        { name: "Kleines Haus", source: "./SVG/KleinesHaus.svg", color: "limegreen" },
        { name: "Großes Wohngebäude", source: "./SVG/Wohngebaeude.svg", color: "limegreen" },
        { name: "Parkplatz", source: "./SVG/Parkplatz.svg", color: "limegreen" },
        { name: "Hotel", source: "./SVG/Hotel.svg", color: "limegreen" }
    ];
    Kapitelaufgabe.C = [
        { name: "Einkaufscenter", source: "./SVG/Einkaufscenter.svg", color: "deepskyblue" },
        { name: "Krankenhaus", source: "./SVG/Krankenhaus.svg", color: "deepskyblue" },
        { name: "Park", source: "./SVG/Park.svg", color: "deepskyblue" },
        { name: "Schule", source: "./SVG/Schule.svg", color: "deepskyblue" }
    ];
    Kapitelaufgabe.I = [
        { name: "Kraftwerk", source: "./SVG/Kraftwerk.svg", color: "orange" },
        { name: "Großes Industriegebäude", source: "./SVG/Industriegebaeude.svg", color: "orange" },
        { name: "Windanlage", source: "./SVG/Windanlage.svg", color: "orange" },
        { name: "Friedhof", source: "./SVG/Friedhof.svg", color: "orange" }
    ];
    Kapitelaufgabe.combi = {
        residential: Kapitelaufgabe.R,
        commercial: Kapitelaufgabe.C,
        industrial: Kapitelaufgabe.I
    };
    console.log(JSON.stringify(Kapitelaufgabe.combi));
})(Kapitelaufgabe || (Kapitelaufgabe = {}));
//# sourceMappingURL=data.js.map