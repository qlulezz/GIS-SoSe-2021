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
        { name: "Einkaufscenter", source: "image.svg", color: "deepskyblue" },
        { name: "Krankenhaus", source: "image.svg", color: "deepskyblue" },
        { name: "Park", source: "image.svg", color: "deepskyblue" },
        { name: "Schule", source: "image.svg", color: "deepskyblue" }
    ];
    Kapitelaufgabe.I = [
        { name: "Kohlekraftwerk", source: "image.svg", color: "orange" },
        { name: "Großes Industriegebäude", source: "image.svg", color: "orange" },
        { name: "Verbrennungsanlage", source: "image.svg", color: "orange" },
        { name: "Krematorium", source: "image.svg", color: "orange" }
    ];
    Kapitelaufgabe.combi = {
        Residential: Kapitelaufgabe.R,
        Commercial: Kapitelaufgabe.C,
        Industrial: Kapitelaufgabe.I
    };
    Kapitelaufgabe.com = `
    {
        "Residential":[
           {
              "name":"Kleines Haus",
              "source":"./SVG/KleinesHaus.svg",
              "color":"limegreen"
           },
           {
              "name":"Großes Wohngebäude",
              "source":"./SVG/Wohngebaeude.svg",
              "color":"limegreen"
           },
           {
              "name":"Parkplatz",
              "source":"./SVG/Parkplatz.svg",
              "color":"limegreen"
           },
           {
              "name":"Hotel",
              "source":"./SVG/Hotel.svg",
              "color":"limegreen"
           }
        ],
        "Commercial":[
           {
              "name":"Einkaufscenter",
              "source":"image.svg",
              "color":"deepskyblue"
           },
           {
              "name":"Krankenhaus",
              "source":"image.svg",
              "color":"deepskyblue"
           },
           {
              "name":"Park",
              "source":"image.svg",
              "color":"deepskyblue"
           },
           {
              "name":"Schule",
              "source":"image.svg",
              "color":"deepskyblue"
           }
        ],
        "Industrial":[
           {
              "name":"Kohlekraftwerk",
              "source":"image.svg",
              "color":"orange"
           },
           {
              "name":"Großes Industriegebäude",
              "source":"image.svg",
              "color":"orange"
           },
           {
              "name":"Verbrennungsanlage",
              "source":"image.svg",
              "color":"orange"
           },
           {
              "name":"Krematorium",
              "source":"image.svg",
              "color":"orange"
           }
        ]
     }
    `;
})(Kapitelaufgabe || (Kapitelaufgabe = {}));
//# sourceMappingURL=data.js.map