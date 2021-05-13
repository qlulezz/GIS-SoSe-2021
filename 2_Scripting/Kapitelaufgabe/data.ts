namespace Kapitelaufgabe {

    export let R: Part[] = [
        { name: "Kleines Haus", source: "./SVG/KleinesHaus.svg", color: "limegreen" },
        { name: "Großes Wohngebäude", source: "./SVG/Wohngebaeude.svg", color: "limegreen" },
        { name: "Parkplatz", source: "./SVG/Parkplatz.svg", color: "limegreen" },
        { name: "Hotel", source: "./SVG/Hotel.svg", color: "limegreen" }
    ];

    export let C: Part[] = [
        { name: "Einkaufscenter", source: "image.svg", color: "deepskyblue" },
        { name: "Krankenhaus", source: "image.svg", color: "deepskyblue" },
        { name: "Park", source: "image.svg", color: "deepskyblue" },
        { name: "Schule", source: "image.svg", color: "deepskyblue" }
    ];

    export let I: Part[] = [
        { name: "Kohlekraftwerk", source: "image.svg", color: "orange" },
        { name: "Großes Industriegebäude", source: "image.svg", color: "orange" },
        { name: "Verbrennungsanlage", source: "image.svg", color: "orange" },
        { name: "Krematorium", source: "image.svg", color: "orange" }
    ];

    export let combi: Combined = {
        Residential: R,
        Commercial: C,
        Industrial: I
    };

    export let com: string =
    `
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
    `
;
}

