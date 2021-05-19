namespace Kapitelaufgabe {

    export let R: Part[] = [
        { name: "Kleines Haus", source: "./SVG/KleinesHaus.svg", color: "limegreen" },
        { name: "Großes Wohngebäude", source: "./SVG/Wohngebaeude.svg", color: "limegreen" },
        { name: "Parkplatz", source: "./SVG/Parkplatz.svg", color: "limegreen" },
        { name: "Hotel", source: "./SVG/Hotel.svg", color: "limegreen" }
    ];

    export let C: Part[] = [
        { name: "Einkaufscenter", source: "./SVG/Einkaufscenter.svg", color: "deepskyblue" },
        { name: "Krankenhaus", source: "./SVG/Krankenhaus.svg", color: "deepskyblue" },
        { name: "Park", source: "./SVG/Parkplatz.svg", color: "deepskyblue" },
        { name: "Schule", source: "./SVG/Hotel.svg", color: "deepskyblue" }
    ];

    export let I: Part[] = [
        { name: "Kohlekraftwerk", source: "./SVG/KleinesHaus.svg", color: "orange" },
        { name: "Großes Industriegebäude", source: "./SVG/Wohngebaeude.svg", color: "orange" },
        { name: "Verbrennungsanlage", source: "./SVG/Parkplatz.svg", color: "orange" },
        { name: "Krematorium", source: "./SVG/Hotel.svg", color: "orange" }
    ];

    export let combi: Combined = {
        residential: R,
        commercial: C,
        industrial: I
    };

    console.log(JSON.stringify(combi));
    

    export let com: string =
    `
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
    `
;
}

