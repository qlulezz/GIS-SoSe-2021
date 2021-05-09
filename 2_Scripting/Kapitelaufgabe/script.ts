namespace Kapitelaufgabe {

    // Zur Idee:
    // Der Plan ist, dass man auf der ersten Seite Gebäude aus einer der drei Kategorien (Housing, Commercial und Industrial) auswählen kann und diese auf ein Grid setzen kann.
    // Auf der zweiten Seite kann man dann die Position des gerade ausgewählten Gebäudes festlegen.
    // Die dritte Seite zeigt dann einfach nur das Ergebnis. Zudem bietet sie die Möglichkeit, ein weiteres Gebäude auszuwählen und auf eine andere Position der Stadt zu setzten.

    // Ich konnte nicht alle Teilaufgaben in Aufgabe 2 und Aufgabe 3 diese Woche fertigstellen
    // Aktuell arbeite ich an den Vektorgrafiken, die am Ende auf die Seite sollen, daher habe ich in der HTML Platzhalter (divs) eingesetzt und diese mit CSS gestyled.
    // Auch die HTML habe ich noch nicht mit TS generieren lassen, da die Grundstruktur noch fehlt und es noch kaum Inhalt gibt, den man einfügen könnte.
    // Dementsprechend ist der Code hier noch nicht final, eventuell sind nicht genügent oder die falschen Attribute im Interface gewählt oder eine Klasse wäre besser.
    // Ich werde dies in den nächsten Wochen noch anpassen.

    // Eine Art Prototyp der Webseite (erstellt mit HTML und CSS ohne Script) kann bereits angeschaut werden.
    // Siehe Punkt "Kapitelaufgabe" auf der Startseite (https://qlulezz.github.io/GIS-SoSe-2021/0_Main/start.html).

    // City Generator
    export interface Combined {
        a1: Housing;
        a2: Commercial;
        a3: Industrial;
    }

    // Gebäudekategorie 1: Housing
    export interface Housing {
        name: string;
        source: string;
        color: string;
    }

    // Gebäudekategorie 2: Commercial
    export interface Commercial {
        name: string;
        source: string;
        color: string;
    }

    // Gebäudekategorie 3: Industrial
    export interface Industrial {
        name: string;
        source: string;
        color: string;
    }
}