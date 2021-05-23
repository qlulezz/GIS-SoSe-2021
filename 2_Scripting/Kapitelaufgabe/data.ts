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
        { name: "Park", source: "./SVG/Park.svg", color: "deepskyblue" },
        { name: "Schule", source: "./SVG/Schule.svg", color: "deepskyblue" }
    ];

    export let I: Part[] = [
        { name: "Kraftwerk", source: "./SVG/Kraftwerk.svg", color: "orange" },
        { name: "Großes Industriegebäude", source: "./SVG/Industriegebaeude.svg", color: "orange" },
        { name: "Windanlage", source: "./SVG/Windanlage.svg", color: "orange" },
        { name: "Friedhof", source: "./SVG/Friedhof.svg", color: "orange" }
    ];

    export let combi: Combined = {
        residential: R,
        commercial: C,
        industrial: I
    };

    console.log(JSON.stringify(combi));
}

