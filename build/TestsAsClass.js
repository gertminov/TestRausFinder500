const skalenniveau = {
    intervall: "intervalScale",
    ordinal: "ordinalScale",
    nominal: "nominalScale"
};
const fragestellung = {
    unterschied: "UnterschiedFrage",
    zusammenhang: "ZusammenhangFrage",
    gleichheit: "GleichheitFrage"
};
const popVarianz = {
    bekannt: "PopulationsVarianzBekannt",
    unbekannt: "PopulationsVarianzUnbekannt"
};
const abhaengigkeit = {
    abaengig: "AbhaengigkeitTrue",
    unabhaengig: "AbhaengigkeitFalse"
};
const amtSP = {
    eins: "amtStichProbe1SP",
    zwei: "amtStichProbe2SP",
    grzwei: "amtStichProbe>2SP",
    einsVSGG: "amtStichProbe1VSGG",
};
const parametrisch = {
    param: "parametrisch",
    nonparam: "nonparametrisch"
};
export class Test {
    constructor(name, info, tags, minN, maxN, aka) {
        this._name = name;
        this._info = info;
        this._aka = aka;
        this._minN = minN;
        this._maxN = maxN;
        this._tags = tags;
    }
    get name() {
        return this._name;
    }
    get info() {
        return this._info;
    }
    get aka() {
        return this._aka;
    }
    get minN() {
        return this._minN;
    }
    get maxN() {
        return this._maxN;
    }
    get tags() {
        return this._tags;
    }
}
const gauss2Test = new Test("Gauss-Test", "Das ist der Gauss Test, er Gausst sehr viel und ist auch sonst echt toll\n\nz-Test\n\nparametrisch\n\nUnterschied\n\nDaten intervallskaliert\n\nMittelwertsvergleich\n\neine Stichprobe gegen die GG\n\n\nMittelwert der GG bekannt\n\nStandardabweichung der GG bekannt: SP-Größe egal\n\nStandardabweichung der GG unbekannt: n > 30 \n\n*z.B. bei Intelligenz\n*Stammt die Stichprobe aus der Grundgesamtheit mit gegebenem mü_0 und SD?", [
    popVarianz.bekannt,
    popVarianz.unbekannt,
    amtSP.eins,
    "unterschiedHinsichtMittelwert",
    skalenniveau.intervall,
    fragestellung.unterschied
], undefined, undefined, "Z-Test");
const tTest1SP = new Test("1-Stichproben t-Test", "parametrisch\n\nUnterschied\n\nDaten intervallskaliert\n\nMittelwertsvergleich\n\neine Stichprobe gegen die GG\n\n\nMittelwert der GG bekannt\n\n nStandardabweichung der GG unbekannt + n < 30\n-->SD-Schätzer Stichprobe berechnen\n\nStammt die Stichprobe aus der Grundgesamtheit mit gegebenem mü_0?", [
    parametrisch.param,
    popVarianz.unbekannt,
    amtSP.eins,
    "unterschiedHinsichtMittelwert",
    skalenniveau.intervall,
    fragestellung.unterschied
], undefined, 29);
const tTest2SP = new Test("2-Stichproben t-Test", "parametrisch\n\nUnterschied\n\nDaten intervallskaliert\n\nMittelwertsvergleich\n\nVergleich von 2 unabhängige Stichproben\n\nVarianzen homogen (gleich)\n\nMesswerte in ihren GGs normalverteilt (bei kleinen Stichproben)\n\nStammen beide Stichproben aus derselben Grundgesamtheit?\n\n\nSonderfall: Test auf Mittelwertunterschied\n*a != 0 (spezifische Hypothese)\n*H1: mü1-mü2 != alpha\n*H0: mü1-mü2 = alpha", [
    parametrisch.param,
    "varianzenHomogen",
    abhaengigkeit.unabhaengig,
    amtSP.zwei,
    "datenreihen2",
    "unterschiedHinsichtMittelwert",
    skalenniveau.intervall,
    fragestellung.unterschied
]);
const welchTTest = new Test("Welch-t-Test", "parametrisch\n\nUnterschied\n\nDaten intervallskaliert\n\nMittelwertsvergleich\n\nVergleich von 2 unabhängige Stichproben\n\nVarianzen heterogen\n\nMesswerte in ihren GGs normalverteilt (bei kleinen Stichproben)\n\nStammen beide Stichproben aus derselben Grundgesamtheit bzw. unterscheiden sie sich?", [
    parametrisch.param,
    "varianzenHeterogen",
    abhaengigkeit.unabhaengig,
    amtSP.zwei,
    "datenreihen2",
    "unterschiedHinsichtMittelwert",
    skalenniveau.intervall,
    fragestellung.unterschied
], undefined, undefined, "Welchtest");
const tTestAbhaengigSP = new Test("t-Test für abhängige Stichproben", "parametrisch\n\nUnterschied\n\nDaten intervallskaliert\n\nMittelwertsvergleich\n\nVergleich von 2 abhängige Stichproben (Vorher-Nacher-Vergleich)\n\nd_quer ist bei steigenden Werten negativ, bei sinkenden Werten positiv\n\nGibt es eine Veränderung von Messung 1 zu Messung 2?\n\n\nNormalfall: H0: mü_d = 0; Mü_d fällt weg", [
    parametrisch.param,
    abhaengigkeit.abaengig,
    amtSP.zwei,
    "datenreihen2",
    "unterschiedHinsichtMittelwert",
    skalenniveau.intervall,
    fragestellung.unterschied
]);
const anova1Faktor = new Test("ANOVA einfaktoriell", "*ANOVA = Analysis of Variance= Varianzanalyse\n\nparametrisch\n\nUnterschied\n\nDaten intervallskaliert\n\nMittelwertsvergleich\n\nVergleich von mehr als 2 unabhängigen Stichproben\n\nNormalverteilung\n\nVarianzhomogenität\n-->( ANOVA ist robust gegen Verletzung der letzten 2 Annahmen, wenn die Gesamtzahl der VP über 30 ist und die Stichproben gleich groß sind\n\nn-sollte klein werden, wenn es kaum Mittelwertsunterschiede gibt (𝐻0)\n-sollte groß werden, wenn es große\n\n*z.B. Marker für Heilung des Patienten\n*z.B. Medikament: Standard, Neu, Placebo\n\ngleich große Stichproben vs. ungleiche Stichproben\n--> Unterschiede in Berechnung auch von den Kontrasten!", [
    "amtFaktoren1",
    amtSP.grzwei,
    "unterschiedHinsichtMittelwert",
    skalenniveau.intervall,
    fragestellung.unterschied
]);
const anova2Faktor = new Test("ANOVA mehrfaktoriell", "parametrisch\n\nUnterschied\n\nDaten intervallskaliert\n\nMittelwertsvergleich\n\nVergleich von mehr als 2 unabhängigen Stichproben\n\nNormalverteilung\n\nVarianzhomogenität\n\n2 polytome UVs (Faktoren)\n*UV1 (z.B. Medikament: Standard, Neu, Placebo)\n*UV2 (z.B. Stadium Krankheit: beginnend, fortgeschritten)\n--> mindestens 4 gleich große Stichproben\n\nEinseitig rechts\n*𝐻1: Zwischen den Faktoren besteht eine Interaktion; mindestens ein Mittelwert weicht ab\n*𝐻0: Zwischen den Faktoren besteht keine Interaktion; Mittelwerte innerhalb der Faktoren weichen nicht ab", [
    "amtFaktoren2",
    amtSP.grzwei,
    "unterschiedHinsichtMittelwert",
    skalenniveau.intervall,
    fragestellung.unterschied
]);
const chiQuadrat = new Test("Chi^2 Test (X^2 Test)", "parametrisch\n\nUnterschied\n\nDaten intervallskaliert\n\nVarianzvergleich\n\n1 SP gegen die GG\n\nMesswerte in der GG normalverteilt\nStichprobe mit Anzahl n und Varianzschätzer\nVarianz der GG bekannt\n\nStammt die Stichprobe aus der Grundgesamtheit mit der gegeben Streuung?\n\n\nEinseitig links: am häufigsten soll Streuung geringer werden", [
    amtSP.eins,
    "unterschiedHinsichtVarianz",
    skalenniveau.intervall,
    fragestellung.unterschied
]);
const fTest = new Test("F-Test", "parametrisch\n\nUnterschied\n\nDaten intervallskaliert\n\nVarianzvergleich\n\n2 unabhängige Stichproben\n\nMesswerte in den GGs normalverteilt\n\nVarianzhomogenität\n\nVarianzschätzer der beiden Stichproben und beide Anzahlen 𝒏𝟏und 𝒏𝟐 bekannt\n\nÜberprüfung der Homogenität von Varianzen\n\nIst die Streuung in SP1 geringer/höher/anders als in SP2?", [
    parametrisch.param,
    amtSP.zwei,
    "unterschiedHinsichtVarianz",
    skalenniveau.intervall,
    fragestellung.unterschied
]);
const chiAnpassung = new Test("Chi^2 Anpassungstest (polytom) auf Normalverteilung", "parametrisch\n\nUnterschied\n\nDaten intervallskaliert\n\nBesteht Normalverteilung?", [
    "unterschiedHinsichtVerteilung",
    skalenniveau.intervall,
    fragestellung.unterschied
]);
const wilcoxonNV = new Test("Wilcoxon-Test (NV-Approximation)", "non-parametrisch\n\nUnterschied\n\nDaten ordinalskaliert\n\n2 abhängige Stichproben\n\nSP-Größe n > 25\n\nKeine Rangbindungen\n\n\nd_quer ist bei steigenden Werten negativ, bei sinkenden Werten positiv\n\nDifferenzen bilden, 0-Werte ignorieren, ggf. 𝒏 anpassen", [
    parametrisch.nonparam,
    "datenreihen2",
    amtSP.eins,
    abhaengigkeit.abaengig,
    skalenniveau.ordinal,
    fragestellung.unterschied
], 26);
const wilcoxonRang = new Test("Wilcoxon-Test (Rangbindungs-Approximation)", "non-parametrisch\n\nUnterschied\n\nDaten ordinalskaliert\n\n2 abhängige Stichproben\n\n Rangbindungen\n\n\nT=Summe der Ränge jener Differenzen, deren Vorzeichen das seltenere ist (+/−)\n\n*n = Anzahl der Differenzen, die nicht 0 sind\n*k = Anzahl der Rangbindungen\n*ti = Anzahl Personen auf Rang i", [
    parametrisch.nonparam,
    "rangbindungJA",
    "datenreihen2",
    amtSP.eins,
    abhaengigkeit.abaengig,
    skalenniveau.ordinal,
    fragestellung.unterschied
], undefined, 25);
const wilcoxon = new Test("Wilcoxon-Test", "non-parametrisch\n\nUnterschied\n\nDaten ordinalskaliert\n\n2 abhängige Stichproben\n\nSP-Größe n <= 25\n\nKeine Rangbindungen\n\n\nd_quer ist bei steigenden Werten negativ, bei sinkenden Werten positiv\n\nDifferenzen bilden, 0-Werte ignorieren, ggf. 𝒏 anpassen\n\n Kritischen Wert für T oder T‘ aus Tabelle ablesen", [
    "rangbindungNEIN",
    "datenreihen2",
    amtSP.eins,
    abhaengigkeit.abaengig,
    skalenniveau.ordinal,
    fragestellung.unterschied
], undefined, 25);
const vorzeichen = new Test("Vorzeichentest", "non-parametrisch\n\nUnterschied\n\nDaten ordinalskaliert\n\n2 abhängige Stichproben\n\nKeine Rangbindungen\n\n\nd_quer ist bei steigenden Werten negativ, bei sinkenden Werten positiv\n\n0-Werte ignorieren, ggf. 𝒏 anpassen\n\nDie Vorzeichen sind binominalverteilt, Basiswahrscheinlichkeit 0,5\n\nTestwahrscheinlichkeit 𝒑 berechnen", [
    "datenreihen2",
    amtSP.eins,
    abhaengigkeit.abaengig,
    skalenniveau.ordinal,
    fragestellung.unterschied
]);
const vorzeichenNV = new Test("Vorzeichentest (NV-Approximation)", "non-parametrisch\n\nUnterschied\n\nDaten ordinalskaliert\n\n2 abhängige Stichproben\n\nKeine Rangbindungen\n\nSP-Größe n > 36", [
    "datenreihen2",
    amtSP.eins,
    abhaengigkeit.abaengig,
    skalenniveau.ordinal,
    fragestellung.unterschied
], 36);
const uTestNV = new Test("Mann-Whitney-U-Test (NV-Approximation)", "non-parametrisch\n\nUnterschied\n\nDaten ordinalskaliert\n\n2 unabhängige Stichproben\n\n SP-Größe > 20\n\nKeine Rangbindungen\n\nGGs der Stichproben sollen:\n*symmetrisch sein\n*dieselbe Form haben (Test ist aber gegen Verletzung dieser Voraussetzung robust)", [
    parametrisch.nonparam,
    "datenreihen2",
    amtSP.zwei,
    abhaengigkeit.unabhaengig,
    skalenniveau.ordinal,
    fragestellung.unterschied
], 21);
const uTestRang = new Test("Mann-Whitney-U-Test (Rangbindungs-Approximation)", "non-parametrisch\n\nUnterschied\n\nDaten ordinalskaliert\n\n2 unabhängige Stichproben\n\n Rangbindungen\n\nGGs der Stichproben sollen:\n*symmetrisch sein\n*dieselbe Form haben (Test ist aber gegen Verletzung dieser Voraussetzung robust)\n\n\n*𝑛=𝑛1+𝑛2\n*𝑘=Anzahl Rangbindungen\n*𝑡𝑖=Anzahl Personen auf dem Rang 𝑖\n*Prüfgröße berechnen\n\n\nSP-Größe <= 20", [
    parametrisch.nonparam,
    "rangbindungJA",
    "datenreihen2",
    amtSP.zwei,
    abhaengigkeit.unabhaengig,
    skalenniveau.ordinal,
    fragestellung.unterschied
], undefined, 20);
const uTest = new Test("Mann-Whitney-U-Test", "non-parametrisch\n\nUnterschied\n\nDaten ordinalskaliert\n\n2 unabhängige Stichproben\n\n SP-Größe <= 20\n\nKeine Rangbindungen\n\nGGs der Stichproben sollen:\n*symmetrisch sein\n*dieselbe Form haben (Test ist aber gegen Verletzung dieser Voraussetzung robust)\n\n\nU‘=n1*n2-U\n\nU heißt: Wie oft werden Personen in SP1 von Personen in SP2 im Rang übertroffen?\n\nKritischen Wert in Bortz-Tabelle nachschlagen:  U oder U‘, je nachdem was kleiner ist!", [
    parametrisch.nonparam,
    "rangbindungNEIN",
    "datenreihen2",
    amtSP.zwei,
    abhaengigkeit.unabhaengig,
    skalenniveau.ordinal,
    fragestellung.unterschied
], undefined, 20);
const binomialNV = new Test("Binomialtest mit NV-Approximation", "Unterschied\n\nDaten nominalskaliert\n\n1 Stichprobe\n\ndichotomes Merkmal\n\nerwartete Hkt: n*p*q > 9\n\n*beobachtete Treffer =𝑏1\n*Mittelwert = Anzahl ∗erwartete Wsk = 𝑛∗𝜋\n*SD =𝑛∗𝜋∗(1−𝜋)\n\nevtl. Kontinuitätskorrektur", [
    "erwartetehaufigkeite*p*q>9",
    "amtKategorienDichotom",
    amtSP.eins,
    abhaengigkeit.unabhaengig,
    skalenniveau.nominal,
    fragestellung.unterschied
]);
const binomial = new Test("Binomialtest exakt", "Unterschied\n\nDaten nominalskaliert\n\n1 Stichprobe\n\ndichotomes Merkmal\n\nerwartete Hkt: e <= 10\n--> e = p*n = Wahrscheinlichkeit∗Anzahl\n\nBeobachtete Treffer: laut 𝐻1 kleinere Anzahl\n\nErwartete Wahrscheinlichkeit entsprechend zugehörig wählen\n\n\nUnterschied\n\nDaten nominalskaliert\n\n2 abhängige Datenreihen/Stichproben --> vorher/nachher-Vergleich\n\nSP-Größe n < 20", [
    "erwartetehaufigkeite<=10",
    "amtKategorienDichotom",
    amtSP.eins,
    abhaengigkeit.unabhaengig,
    abhaengigkeit.abaengig,
    skalenniveau.nominal,
    fragestellung.unterschied
], undefined, 20);
const chiAnpassungDicho = new Test("X²-Anpassungstest dichotom", "Unterschied\n\nDaten nominalskaliert\n\n1 Stichprobe\n\ndichotomes Merkmal\n\nerwartete Hkt: e > 10\n--> e = p*n = Wahrscheinlichkeit∗Anzahl\n\nBeobachtete Häufigkeiten: 𝑏1 und 𝑏2\n\nWahrscheinlichkeit bzw. relative Häufigkeit in der GG 𝜋\n\nErwartete Häufigkeiten 𝑒1 und 𝑒2 > 10, ansonsten Binomialtest rechnen", [
    "erwartetehaufigkeite>10",
    "amtKategorienDichotom",
    abhaengigkeit.unabhaengig,
    amtSP.eins,
    skalenniveau.nominal,
    fragestellung.unterschied
], 10);
const chiAnpassungPoly = new Test("Χ²-Anpassungstest (polytom)", "Unterschied\n\nDaten nominalskaliert\n\n1 Stichprobe\n\npolytomes Merkmal\n\nAlle erwarteten Häufigkeiten 𝑒>5\n\nBeobachtete Häufigkeiten 𝑏1,𝑏2,𝑏3,…𝑏\n\n𝑘mit 𝑘=Anzahl Kategorien (z.B. Blutgruppen)\n\nAnpassung z.B. an Gleichverteilung, Normalverteilung oder bekannter Verteilung\n\nHypothesen: Zweiseitig\n*𝐻0:beobachtete Häufigkeiten passen zu den erwarteten Häufigkeiten\n*𝐻1:beobachtete Häufigkeiten weichen von den erwarteten Häufigkeiten ab\n\n\nPrüfgröße bei Gleichverteilung und bekannter Verteilung:\n*Bei bekannter Verteilung gemäß Angabe in der Aufgabe\n*Bei Gleichverteilung 𝑒𝑘=𝑛𝑘 mit 𝑘=Anzahl Kategorien\n\nEntspricht die Verteilung einer GG-Verteilung, die ich unter 𝐻0 erwartet?\n\n!Abweichende Berechnung bei Prüfung auf Normalverteilung!", [
    "amtKategorienPolytom",
    abhaengigkeit.unabhaengig,
    amtSP.eins,
    skalenniveau.nominal,
    fragestellung.unterschied
]);
const mcNemar = new Test("Mc-Nemar-Test", "Unterschied\n\nDaten nominalskaliert\n\n2 abhängige Datenreihen/Stichproben --> vorher/nachher-Vergleich\n\nSP-Größe n > 30\n\nBeobachtete Häufigkeiten sollten alle > 5 sein\n\n 𝒃+𝒄 ≤ 𝟐𝟎: exakter Binominaltest:\n*=BINOM.VERT(x; b+c; 0,5; 1)\n*x=kleinere Zahl von b und c", [
    "datenreihen2",
    abhaengigkeit.abaengig,
    amtSP.eins,
    skalenniveau.nominal,
    fragestellung.unterschied
], 30);
const mcNemarKontinuum = new Test("Mc-Nemar-Test (Kontinuitätskorrektur)", "Unterschied\n\nDaten nominalskaliert\n\n2 abhängige Datenreihen/Stichproben --> vorher/nachher-Vergleich\n\nSP-Größe 20 < n < 30\n\nBeobachtete Häufigkeiten sollten alle > 5 sein\n\nHat sich zwischen den Messzeitpunkten die Verteilungen in den Kategorien signifikant verändert?", [
    "datenreihen2",
    abhaengigkeit.abaengig,
    amtSP.eins,
    skalenniveau.nominal,
    fragestellung.unterschied
], 20, 30);
const cochransQ = new Test("Cochran's Q Test", "Unterschied\n\nDaten nominalskaliert\n\nmehr als 2 abhängige Stichproben\n\nHypothesen: Zweiseitig\n*𝐻1: Anteilsverteilung ändert sich\n*𝐻0: Anteilsverteilung bleibt gleich", [
    "datenreihen2",
    abhaengigkeit.abaengig,
    amtSP.eins,
    skalenniveau.nominal,
    fragestellung.unterschied
]);
const vierFelderChiAnpass = new Test("4-Felder-X²-Anpassungstest", "Unterschied\n\nDaten nominalskaliert\n\n2 Stichproben; 2 dichotome Merkmale\n\nRandwahrscheinlichkeiten bekannt\n\nkeine Messwiederholung --> Unabhängigkeit der Daten\n\nalle erwarteten Häufigkeiten 𝑒>5\n\nHypothesen\n*𝐻1: Verteilungen nicht gleich bzw. Zeilen− und Spaltenvariable sind abhängig\n*𝐻0: Verteilungen gleich bzw. Zeilen− und Spaltenvariable sind unabhängig\n\nUnabhängigkeitstests= chi-square test for independence\n\n*Sind die Verteilungen auf dem einen Merkmal identisch, wenn man die Stichprobe nach dem zweiten Merkmal unterteilt?\n*Sind die beiden Merkmale unabhängig verteilt?\n*z.B.: Hängt das Bestehen der Statistikklausur vom Geschlecht ab?", [
    "datenreihen2",
    "randwarscheinlichkeitBekannt",
    amtSP.zwei,
    skalenniveau.nominal,
    fragestellung.unterschied
]);
const vierFelderChiUnab = new Test("4-Felder-X²-Unabhängigkeitstest", "Unterschied\n\nDaten nominalskaliert\n\n2 Stichproben; 2 dichotome Merkmale\n\nRandwahrscheinlichkeiten bekannt\n\nkeine Messwiederholung --> Unabhängigkeit der Daten\n\nalle erwarteten Häufigkeiten 𝑒>5\n\nHypothesen\n*𝐻1: Verteilung in Zeilen/ Spalten unterscheidet sich von GG\n*𝐻0: gleiche Verteilung in Zeilen/Spalten wie in GG\n\nAnpassungstests = chi-square test for goodness of fit\n\nEntspricht die Verteilung einer GG-Verteilung, die ich unter 𝐻0 erwarte?", [
    "datenreihen2",
    "randwarscheinlichkeitUnbekannt",
    amtSP.zwei,
    skalenniveau.nominal,
    fragestellung.unterschied
]);
const rxc = new Test("rxc-X²-Test", "Unterschied\n\nDaten nominalskaliert\n\n2 polytome Merkmale, also mit mehr als 2 Ausprägungen \n\nkeine Messwiederholung --> Unabhängigkeit der Daten\n\nalle erwarteten Häufigkeiten 𝑒>5\n\nHypothesen: Zweiseitig\n*𝐻1: Verteilungen nicht gleich bzw. Zeilen− und Spaltenvariable sind abhängig\n*𝐻0: Verteilungen gleich bzw. Zeilen− und Spaltenvariable sind unabhängig\n\nUnabhängigkeitstests= chi-square test for independence\n\nSind die Verteilungen auf dem einen Merkmal identisch, wenn man die Stichprobe nach dem zweiten Merkmal unterteilt?", [
    amtSP.grzwei,
    skalenniveau.nominal,
    fragestellung.unterschied
]);
const korrellAbweich0 = new Test("Korrelations-Test Abweichung von 0", "Zusammenhang\n\nAV und UV intervallskaliert\n\n2 mindestens intervallskalierte Datenreihen \n\np = 0\n*𝝆 ist die „wahre Korrelation in der Population\n\nKorrelation 𝒓und Anzahl 𝒏 gegeben oder berechenbar\n*𝐻1: „Die SP-Korrelation weicht signifikant von 0 ab“\n*Je größer die Stichprobe, desto kleinere Korrelationen werden signifikant\n\nSignifikanztest für den Steigungsparameter 𝑏 einer Regressionsgeraden ist äquivalent", [
    "groesseKorrelP=0",
    amtSP.eins,
    skalenniveau.intervall,
    fragestellung.zusammenhang
]);
const korellAbweichWert = new Test("Korrelations-Test Abweichung von Wert ≠ 0", "Zusammenhang\n\nAV und UV intervallskaliert\n\n2 mindestens intervallskalierte Datenreihen \n\n Feste Korrelation einer Population 𝒑_𝟎 != 𝟎 gegeben\n*𝝆 ist die „wahre Korrelation in der Population\n\nKorrelation 𝒓und Anzahl 𝒏 gegeben oder berechenbar\n\n𝐻1: „Die SP-Korrelation weicht signifikant von einer gegebenen GG-Korrelation ab, die nicht 0 ist“", [
    "groesseKorrelP!=0",
    amtSP.eins,
    skalenniveau.intervall,
    fragestellung.zusammenhang
]);
const korrel2SP = new Test("2-Stichproben-Korrelations-Test", "Zusammenhang\n\nAV und UV intervallskaliert\n\n2 unabhängige Stichproben mit je 2 mindestens intervallskalierte Datenreihen\n\nKorrelationen 𝒓𝟏und 𝒓𝟐; Anzahlen 𝒏𝟏 und 𝒏𝟐 gegeben oder berechenbar\n\n𝐻1: „Korrelation 1 weicht signifikant von Korrelation 2 ab“", [
    amtSP.zwei,
    skalenniveau.intervall,
    fragestellung.zusammenhang
]);
const spearman = new Test("Spearman-Korrelations-Test", "Zusammenhang\n\nAV und UV ordinalskaliert \n\n2 mindestens ordinalskalierte Datenreihen, also Ränge\n\nKorrelation 𝒓_𝒔𝒑 und Anzahl 𝒏 gegeben oder berechenbar\n\n𝐻1: „Korrelation weicht signifikant von 0 ab“\n\n*< 20% Rangbindungen: =KORREL(Matrix1; Matrix2)\n*Mit mehr als 20% Rangbindungen: Formel Bortz S. 179 verwenden", [
    skalenniveau.ordinal,
    fragestellung.zusammenhang
]);
const vierFelderKorrel = new Test("Punkt-4-Felder-Korrelation (Phi-Koeffizient)", "Zusammenhang\n\nAV und UV nominalskaliert \n\nAV und UV dichotom\n\nKorrelation von 2 dichotomen Merkmalen\n\nZunächst: Berechnung eines 4-Felder-𝑿𝟐-Unabhängigkeitstests\n--> Wird dieser signifikant, ist es der 𝛷-Koeffizient auch", [
    "amtKategorienDichotom",
    skalenniveau.nominal,
    fragestellung.zusammenhang
]);
const rxcKontingenz = new Test("Kontingenz-Koeffizient C , über rxc-X²-Test", "Zusammenhang\n\nAV und UV nominalskaliert \n\nAV und UV polychotom\n\nKorrelation von 2 polytomen Merkmalen\n\nZunächst: Berechnung eines rxc-Tests\n--> Wird dieser signifikant, ist es der Kontingenz-Koeffizient auch\n\nNicht von der Produkt-Moment-Korrelation abgeleitet\n*deshalb nicht gut mit PM-Korrelationskoeffizienten vergleichbar\n*𝐂² ist nicht der „Anteil aufgeklärter Varianz“\n*Deshalb besser: Cramer‘s Index", [
    "amtKategorienPolytom",
    skalenniveau.nominal,
    fragestellung.zusammenhang
]);
const cramers = new Test("Cramer‘s Index CI, über rxc-X²-Test", "Zusammenhang\n\nAV und UV nominalskaliert \n\nAV und UV polychotom\n\nKorrelation von 2 polytomen Merkmalen\n\nZunächst: Berechnung eines rxc-Tests\n--> Wird dieser signifikant, ist es der Cramer’s Index auch\n\n𝑹: das Minimum der Anzahl von Reihen (rows) und Spalten (columns)\n--> schauen was kleiner ist\n\n*Besser mit Produkt-Moment-Korrelationen vergleichbar als der Kontingenz-Koeffizient 𝐶\n*Bei 𝑟=2 oder 𝑐=2 identisch zum 𝛷-Koeffizienten", [
    "amtKategorienPolytom",
    skalenniveau.nominal,
    fragestellung.zusammenhang
]);
const korrellBiseral = new Test("Punkt-biserialer Korrelations-Test", "Zusammenhang\n\nAV intervallskaliert; UV nominalskaliert\n\n2 unabhängige Stichproben\n\n 2 intervallskalierten Datenreihen\n\nUnterteilt nach einem dichotomen Merkmal (z.B. m/w)\n\nKorrelation 𝒓_𝒑𝒃 und Anzahl 𝒏 gegeben oder berechenbar\n\nÄquivalent zum t-Test für unabhängige Stichproben\n\ndichotome Variable mit 0/1 kodieren und =KORREL", [
    "SkalenniveauAV" + skalenniveau.intervall,
    "SkalenniveauUV" + skalenniveau.nominal,
    fragestellung.zusammenhang
]);
const aquivalenzIndependent = new Test("Äquivalenztest für unabh. Stichproben", "Gleichheitshypothese\n\nintervallskaliert\n\nÄquvalenzbereich gegeben\n\n2 unabhängige Stichproben\n\nVom Experten festgelegter Äquivalenzbereich ±𝜟\n\n man möchte, dass die 𝐻0 nicht verworfen wird (aus unserem bisherigen Standpunkt)\n\n*z.B. Generikum wirkt genau wie das Markenmedikament\n*z.B. Therapien sind gleich gut\n\nIn der Klausur kann beides drankommen, nicht immer ist ein Äquivalenztest möglich:\n*nur wenn ein Äquivalenzbereich definiert ist\n*und wenn die Daten Intervallskalenniveau haben\n*Jeder (Nicht-Äquivalenz-) Test kann ein Krückentest sein\n\n*𝐻1 --> möglichst kleine Mittelwertsdifferenz\n*𝐻0 --> große Mittelwertsdifferenz", [
    abhaengigkeit.unabhaengig,
    "aequivalenzgegeben",
    skalenniveau.intervall,
    fragestellung.gleichheit
]);
const aquivalenzDependent = new Test("Äquivalenztest für abhängige Stichproben", "Gleichheitshypothese\n\nintervallskaliert\n\nÄquvalenzbereich gegeben\n\nabhängige Stichproben --> Messwiederholung, VPs werden zu 2 Zeitpunkten untersucht\n\nVom Experten festgelegter Äquivalenzbereich ±𝜟\n\nman möchte, dass die 𝐻0 nicht verworfen wird (aus unserem bisherigen Standpunkt)\n\n*z.B. Generikum wirkt genau wie das Markenmedikament\n*z.B. Therapien sind gleich gut\n\nIn der Klausur kann beides drankommen, nicht immer ist ein Äquivalenztest möglich:\n*nur wenn ein Äquivalenzbereich definiert ist\n*und wenn die Daten Intervallskalenniveau haben\n*Jeder (Nicht-Äquivalenz-) Test kann ein Krückentest sein", [
    abhaengigkeit.abaengig,
    "aequivalenzgegeben",
    skalenniveau.intervall,
    fragestellung.gleichheit
]);
const krueckenTest = new Test("Krückentest mit α = 0,2", "Gleichheitshypothese\n\nintervallskaliert\n\nÄquvalenzbereich nicht gegeben\n\neinfach 𝜶 beim Nullhypothesentest auf 20% vergrößern mit dem Ziel die Nullhypothese beizubehalten\n\nman möchte, dass die 𝐻0 nicht verworfen wird (aus unserem bisherigen Standpunkt)\n\n*z.B. Generikum wirkt genau wie das Markenmedikament\n*z.B. Therapien sind gleich gut\n\n\noder:\n\nordinal- oder nominalskaliert", [
    "aequivalenzNichtgegeben",
    skalenniveau.intervall,
    fragestellung.gleichheit,
    skalenniveau.nominal,
    skalenniveau.ordinal,
    skalenniveau.intervall
]);
/**
 * Array mit allen Tests
 */
export const testClassArray = [
    gauss2Test,
    tTest1SP,
    tTest2SP,
    welchTTest,
    tTestAbhaengigSP,
    anova1Faktor,
    anova2Faktor,
    chiQuadrat,
    fTest,
    chiAnpassung,
    wilcoxonNV,
    wilcoxonRang,
    wilcoxon,
    vorzeichen,
    vorzeichenNV,
    uTestNV,
    uTestRang,
    uTest,
    binomialNV,
    binomial,
    chiAnpassungDicho,
    chiAnpassungPoly,
    mcNemar,
    mcNemarKontinuum,
    cochransQ,
    vierFelderChiAnpass,
    vierFelderChiUnab,
    rxc,
    korrellAbweich0,
    korellAbweichWert,
    korrel2SP,
    spearman,
    vierFelderKorrel,
    rxcKontingenz,
    cramers,
    korrellBiseral,
    aquivalenzIndependent,
    aquivalenzDependent,
    krueckenTest
];
//# sourceMappingURL=TestsAsClass.js.map