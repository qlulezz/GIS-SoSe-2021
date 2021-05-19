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
        { name: "Park", source: "./SVG/Parkplatz.svg", color: "deepskyblue" },
        { name: "Schule", source: "./SVG/Hotel.svg", color: "deepskyblue" }
    ];
    Kapitelaufgabe.I = [
        { name: "Kohlekraftwerk", source: "./SVG/KleinesHaus.svg", color: "orange" },
        { name: "Großes Industriegebäude", source: "./SVG/Wohngebaeude.svg", color: "orange" },
        { name: "Verbrennungsanlage", source: "./SVG/Parkplatz.svg", color: "orange" },
        { name: "Krematorium", source: "./SVG/Hotel.svg", color: "orange" }
    ];
    Kapitelaufgabe.combi = {
        residential: Kapitelaufgabe.R,
        commercial: Kapitelaufgabe.C,
        industrial: Kapitelaufgabe.I
    };
    console.log(JSON.stringify(Kapitelaufgabe.combi));
    Kapitelaufgabe.com = `
    {
      "residential":[
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
      "commercial":[
         {
            "name":"Einkaufscenter",
            "source":"./SVG/Einkaufscenter.svg",
            "color":"deepskyblue"
         },
         {
            "name":"Krankenhaus",
            "source":"./SVG/Krankenhaus.svg",
            "color":"deepskyblue"
         },
         {
            "name":"Park",
            "source":"./SVG/Parkplatz.svg",
            "color":"deepskyblue"
         },
         {
            "name":"Schule",
            "source":"./SVG/Hotel.svg",
            "color":"deepskyblue"
         }
      ],
      "industrial":[
         {
            "name":"Kohlekraftwerk",
            "source":"./SVG/KleinesHaus.svg",
            "color":"orange"
         },
         {
            "name":"Großes Industriegebäude",
            "source":"./SVG/Wohngebaeude.svg",
            "color":"orange"
         },
         {
            "name":"Verbrennungsanlage",
            "source":"./SVG/Parkplatz.svg",
            "color":"orange"
         },
         {
            "name":"Krematorium",
            "source":"./SVG/Hotel.svg",
            "color":"orange"
         }
      ]
   }
    `;
})(Kapitelaufgabe || (Kapitelaufgabe = {}));
//# sourceMappingURL=data.js.map