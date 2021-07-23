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
const gaussTest = {
    name: "Gauss-Test (z-Test)",
    info: "",
    aka: "z-Test",
    minN: null,
    maxN: null,
    tags: [
        popVarianz.bekannt,
        popVarianz.unbekannt,
        amtSP.einsVSGG,
        "unterschiedHinsichtMittelwert",
        skalenniveau.intervall,
        fragestellung.unterschied
    ],
};
const tTest1SP = {
    name: "1-Stichproben t-Test",
    info: "",
    minN: null,
    maxN: 29,
    tags: [
        parametrisch.param,
        popVarianz.unbekannt,
        amtSP.einsVSGG,
        "unterschiedHinsichtMittelwert",
        skalenniveau.intervall,
        fragestellung.unterschied
    ],
};
const tTest2SP = {
    name: "2-Stichproben t-Test",
    info: "",
    minN: null,
    maxN: null,
    tags: [
        parametrisch.param,
        "varianzenHomogen",
        abhaengigkeit.unabhaengig,
        amtSP.zwei,
        "datenreihen2",
        "unterschiedHinsichtMittelwert",
        skalenniveau.intervall,
        fragestellung.unterschied
    ],
};
const welchTTest = {
    name: "Welch-t-Test",
    aka: "Welchtest",
    info: "",
    minN: null,
    maxN: null,
    tags: [
        parametrisch.param,
        "varianzenHeterogen",
        abhaengigkeit.unabhaengig,
        amtSP.zwei,
        "datenreihen2",
        "unterschiedHinsichtMittelwert",
        skalenniveau.intervall,
        fragestellung.unterschied
    ],
};
const tTestAbhaengigSP = {
    name: "t-Test für abhängige Stichproben",
    info: "",
    minN: null,
    maxN: null,
    tags: [
        parametrisch.param,
        abhaengigkeit.abaengig,
        amtSP.zwei,
        "datenreihen2",
        "unterschiedHinsichtMittelwert",
        skalenniveau.intervall,
        fragestellung.unterschied
    ],
};
const anova1Faktor = {
    name: "ANOVA einfaktoriell",
    info: "",
    minN: null,
    maxN: null,
    tags: [
        "amtFaktoren1",
        amtSP.grzwei,
        "unterschiedHinsichtMittelwert",
        skalenniveau.intervall,
        fragestellung.unterschied
    ],
};
const anova2Faktor = {
    name: "ANOVA mehrfaktoriell",
    info: "",
    minN: null,
    maxN: null,
    tags: [
        "amtFaktoren2",
        amtSP.grzwei,
        "unterschiedHinsichtMittelwert",
        skalenniveau.intervall,
        fragestellung.unterschied
    ],
};
const chiQuadrat = {
    name: "Chi^2 Test (X^2 Test)",
    info: "",
    minN: null,
    maxN: null,
    tags: [
        amtSP.einsVSGG,
        "unterschiedHinsichtVarianz",
        skalenniveau.intervall,
        fragestellung.unterschied
    ],
};
const fTEst = {
    name: "F-Test",
    info: "",
    minN: null,
    maxN: null,
    tags: [
        parametrisch.param,
        amtSP.zwei,
        "unterschiedHinsichtVarianz",
        skalenniveau.intervall,
        fragestellung.unterschied
    ],
};
const chiAnpassung = {
    name: "Chi^2 Anpassungstest (polytom) auf Normalverteilung",
    info: "",
    minN: null,
    maxN: null,
    tags: [
        "unterschiedHinsichtVerteilung",
        skalenniveau.intervall,
        fragestellung.unterschied
    ],
};
const wilcoxonNV = {
    name: "Wilcoxon-Test (NV-Approximation)",
    info: "2 Datenreihen",
    minN: 26,
    maxN: null,
    tags: [
        parametrisch.nonparam,
        "datenreihen2",
        amtSP.eins,
        abhaengigkeit.abaengig,
        skalenniveau.ordinal,
        fragestellung.unterschied
    ],
};
const wilcoxonRang = {
    name: "Wilcoxon-Test (Rangbindungs-Approximation)",
    info: "2 Datenreihen",
    minN: null,
    maxN: 25,
    tags: [
        parametrisch.nonparam,
        "rangbindungJA",
        "datenreihen2",
        amtSP.eins,
        abhaengigkeit.abaengig,
        skalenniveau.ordinal,
        fragestellung.unterschied
    ],
};
const wilcoxon = {
    name: "Wilcoxon-Test",
    info: "2 Datenreihen",
    minN: null,
    maxN: 25,
    tags: [
        "rangbindungNEIN",
        "datenreihen2",
        amtSP.eins,
        abhaengigkeit.abaengig,
        skalenniveau.ordinal,
        fragestellung.unterschied
    ],
};
const vorzeichen = {
    name: "Vorzeichentest",
    info: "2 Datenreihen",
    minN: null,
    maxN: null,
    tags: [
        "datenreihen2",
        amtSP.eins,
        abhaengigkeit.abaengig,
        skalenniveau.ordinal,
        fragestellung.unterschied
    ],
};
const vorzeichenNV = {
    name: "Vorzeichentest (NV-Approximation)",
    info: "2 Datenreihen",
    minN: 36,
    maxN: null,
    tags: [
        "datenreihen2",
        amtSP.eins,
        abhaengigkeit.abaengig,
        skalenniveau.ordinal,
        fragestellung.unterschied
    ],
};
const uTestNV = {
    name: "Mann-Whitney-U-Test (NV-Approximation)",
    info: "2 Datenreihen",
    minN: 21,
    maxN: null,
    tags: [
        parametrisch.nonparam,
        "datenreihen2",
        amtSP.zwei,
        abhaengigkeit.unabhaengig,
        skalenniveau.ordinal,
        fragestellung.unterschied
    ],
};
const uTestRang = {
    name: "Mann-Whitney-U-Test (Rangbindungs- Approximation)",
    info: "2 Datenreihen",
    minN: null,
    maxN: 20,
    tags: [
        parametrisch.nonparam,
        "rangbindungJA",
        "datenreihen2",
        amtSP.zwei,
        abhaengigkeit.unabhaengig,
        skalenniveau.ordinal,
        fragestellung.unterschied
    ],
};
const uTest = {
    name: "Mann-Whitney-U-Test",
    info: "2 Datenreihen",
    minN: null,
    maxN: 20,
    tags: [
        parametrisch.nonparam,
        "rangbindungNEIN",
        "datenreihen2",
        amtSP.zwei,
        abhaengigkeit.unabhaengig,
        skalenniveau.ordinal,
        fragestellung.unterschied
    ],
};
const binomialNV = {
    name: "Binomialtest mit NV-Approximation",
    info: "",
    minN: null,
    maxN: null,
    tags: [
        "erwartetehaufigkeite*p*q>9",
        "amtKategorienDichotom",
        amtSP.eins,
        abhaengigkeit.unabhaengig,
        skalenniveau.nominal,
        fragestellung.unterschied
    ],
};
const binomial = {
    name: "Binomialtest exakt",
    info: "",
    minN: null,
    maxN: 20,
    tags: [
        "erwartetehaufigkeite<=10",
        "amtKategorienDichotom",
        amtSP.eins,
        abhaengigkeit.unabhaengig,
        abhaengigkeit.abaengig,
        skalenniveau.nominal,
        fragestellung.unterschied
    ],
};
const chiAnpassungDicho = {
    name: "X²-Anpassungstest dichotom",
    info: "",
    minN: 10,
    maxN: null,
    tags: [
        "erwartetehaufigkeite>10",
        "amtKategorienDichotom",
        abhaengigkeit.unabhaengig,
        amtSP.eins,
        skalenniveau.nominal,
        fragestellung.unterschied
    ],
};
const chiAnpassungPoly = {
    name: "Χ² -Anpassungstest (polytom)",
    info: "",
    minN: null,
    maxN: null,
    tags: [
        "amtKategorienPolytom",
        abhaengigkeit.unabhaengig,
        amtSP.eins,
        skalenniveau.nominal,
        fragestellung.unterschied
    ],
};
const mcNemar = {
    name: "Nc-Nemar-Test",
    info: "2 Datenreihen",
    minN: 30,
    maxN: null,
    tags: [
        "datenreihen2",
        abhaengigkeit.abaengig,
        amtSP.eins,
        skalenniveau.nominal,
        fragestellung.unterschied
    ],
};
const mcNemarKontinuum = {
    name: "Nc-Nemar-Test (Kontinuitätskorrektur)",
    info: "2 Datenreihen",
    minN: 20,
    maxN: 30,
    tags: [
        "datenreihen2",
        abhaengigkeit.abaengig,
        amtSP.eins,
        skalenniveau.nominal,
        fragestellung.unterschied
    ],
};
const cochransQ = {
    name: "Cochran's Q Test",
    info: "2 Datenreihen",
    minN: null,
    maxN: null,
    tags: [
        "datenreihen2",
        abhaengigkeit.abaengig,
        amtSP.eins,
        skalenniveau.nominal,
        fragestellung.unterschied
    ],
};
const vierFelderChiAnpass = {
    name: "4-Felder-X²-Anpassungstest",
    info: "",
    minN: null,
    maxN: null,
    tags: [
        "datenreihen2",
        "randwarscheinlichkeitBekannt",
        amtSP.zwei,
        skalenniveau.nominal,
        fragestellung.unterschied
    ],
};
const vierFelderChiUnab = {
    name: "4-Felder-X²-Unabhängigkeitstest",
    info: "",
    minN: null,
    maxN: null,
    tags: [
        "datenreihen2",
        "randwarscheinlichkeitUnbekannt",
        amtSP.zwei,
        skalenniveau.nominal,
        fragestellung.unterschied
    ],
};
const rxc = {
    name: "rxc-X²-Test",
    info: "",
    minN: null,
    maxN: null,
    tags: [
        amtSP.grzwei,
        skalenniveau.nominal,
        fragestellung.unterschied
    ],
};
const korrelAbweich0 = {
    name: "Korrelations-Test Abweichung von 0",
    info: "",
    minN: null,
    maxN: null,
    tags: [
        "groesseKorrelP=0",
        amtSP.eins,
        skalenniveau.intervall,
        fragestellung.zusammenhang
    ],
};
const korrelAbweichWert = {
    name: "Korrelations-Test Abweichung von Wert ≠ 0",
    info: "",
    minN: null,
    maxN: null,
    tags: [
        "groesseKorrelP!=0",
        amtSP.eins,
        skalenniveau.intervall,
        fragestellung.zusammenhang
    ],
};
const korrel2SP = {
    name: "2-Stichproben-Korrelations-Test",
    info: "",
    minN: null,
    maxN: null,
    tags: [
        amtSP.zwei,
        skalenniveau.intervall,
        fragestellung.zusammenhang
    ],
};
const spearman = {
    name: "Spearman-Korrelations-Test",
    info: "",
    minN: null,
    maxN: null,
    tags: [
        skalenniveau.ordinal,
        fragestellung.zusammenhang
    ],
};
const vierFelderKorrel = {
    name: "Punkt-4-Felder-Korrelation (Phi-Koeffizient)",
    info: "",
    minN: null,
    maxN: null,
    tags: [
        "amtKategorienDichotom",
        skalenniveau.nominal,
        fragestellung.zusammenhang
    ],
};
const rxcKontingez = {
    name: "Kontingenz-Koeffizient C , über rxc-X²-Test",
    info: "",
    minN: null,
    maxN: null,
    tags: [
        "amtKategorienPolytom",
        skalenniveau.nominal,
        fragestellung.zusammenhang
    ],
};
const cramers = {
    name: "Cramer‘s Index CI, über rxc-X²-Test",
    info: "",
    minN: null,
    maxN: null,
    tags: [
        "amtKategorienPolytom",
        skalenniveau.nominal,
        fragestellung.zusammenhang
    ],
};
const korrelBiseral = {
    name: "Punkt-biserialer Korrelations-Test",
    info: "",
    minN: null,
    maxN: null,
    tags: [
        "SkalenniveauAV" + skalenniveau.intervall,
        "SkalenniveauUV" + skalenniveau.nominal,
        fragestellung.zusammenhang
    ],
};
const aquivalenzIndipend = {
    name: "Äquivalenztest für unabh. Stichproben",
    info: "",
    minN: null,
    maxN: null,
    tags: [
        abhaengigkeit.unabhaengig,
        "aequivalenzgegeben",
        skalenniveau.intervall,
        fragestellung.gleichheit
    ],
};
const aquivalenzDependend = {
    name: "Äquivalenztest für abhängige Stichproben",
    info: "",
    minN: null,
    maxN: null,
    tags: [
        abhaengigkeit.abaengig,
        "aequivalenzgegeben",
        skalenniveau.intervall,
        fragestellung.gleichheit
    ],
};
const krueckentest = {
    name: "Krückentest mit α = 0,2",
    info: "",
    minN: null,
    maxN: null,
    tags: [
        "aequivalenzNichtgegeben",
        skalenniveau.intervall,
        fragestellung.gleichheit,
        skalenniveau.nominal,
        skalenniveau.ordinal,
        skalenniveau.intervall
    ],
};
export const testArray = [
    gaussTest,
    tTest1SP,
    tTest2SP,
    welchTTest,
    tTestAbhaengigSP,
    anova1Faktor,
    anova2Faktor,
    chiQuadrat,
    fTEst,
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
    chiAnpassungDicho,
    binomial,
    chiAnpassungPoly,
    mcNemar,
    mcNemarKontinuum,
    cochransQ,
    vierFelderChiAnpass,
    vierFelderChiUnab,
    rxc,
    korrelAbweich0,
    korrelAbweichWert,
    korrel2SP,
    spearman,
    vierFelderKorrel,
    rxcKontingez,
    cramers,
    korrelBiseral,
    aquivalenzIndipend,
    aquivalenzDependend,
    krueckentest
];
//# sourceMappingURL=tests.js.map