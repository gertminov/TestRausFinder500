

const skalenniveau = {
    intervall: "intervalScale",
    ordinal: "ordinalScale",
    nominal: "nominalScale"
}

const fragestellung = {
    unterschied: "UnterschiedFrage",
    zusammenhang: "ZusammenhangFrage",
    gleichheit: "GleichheitFrage"
}


const popVarianz = {
    bekannt: "PopulationsVarianzBekannt",
    unbekannt: "PopulationsVarianzUnbekannt"
}

const abhaengigkeit = {
    abaengig: "AbhaengigkeitTrue",
    unabhaengig: "AbhaengigkeitFalse"
}

const amtSP = {
    eins: "amtStichProbe1SP",
    zwei: "amtStichProbe2SP",
    grzwei: "amtStichProbe>2SP",
    einsVSGG: "amtStichProbe1VSGG",
}

const parametrisch = {
    param: "parametrisch",
    nonparam: "nonparametrisch"

}


class Test {
    private _name: string
    private _info: string
    private _aka: string
    private _minN: number
    private _maxN: number
    private _tags: string[]

    constructor(name: string, info: string, tags: string[],  minN?: number, maxN?: number, aka?: string) {
        this._name = name;
        this._info = info;
        this._aka = aka;
        this._minN = minN;
        this._maxN = maxN;
        this._tags = tags;
    }

    get name(): string {
        return this._name;
    }

    get info(): string {
        return this._info;
    }

    get aka(): string {
        return this._aka;
    }

    get minN(): number {
        return this._minN;
    }

    get maxN(): number {
        return this._maxN;
    }

    get tags(): string[] {
        return this._tags;
    }

}

const gauss2Test = new Test(
    "Gauss-Test",
    "Das ist der Gauss Test",
    [
        popVarianz.bekannt,
        popVarianz.unbekannt,
        amtSP.einsVSGG,
        "unterschiedHinsichtMittelwert",
        skalenniveau.intervall,
        fragestellung.unterschied],
    undefined,
    undefined,
    "Z-Test",
)

const tTest1SP = new Test(
    "1-Stichproben t-Test",
    "",
    [
        parametrisch.param,
        popVarianz.unbekannt,
        amtSP.einsVSGG,
        "unterschiedHinsichtMittelwert",
        skalenniveau.intervall,
        fragestellung.unterschied
    ],
    undefined,
    29,

)

const tTest2SP = new Test(
    "2-Stichproben t-Test",
    "",
    [
        parametrisch.param,
        "varianzenHomogen",
        abhaengigkeit.unabhaengig,
        amtSP.zwei,
        "datenreihen2",
        "unterschiedHinsichtMittelwert",
        skalenniveau.intervall,
        fragestellung.unterschied
    ],
)

const welchTTest = new Test(
    "Welch-t-Test",
    "",
    [
        parametrisch.param,
        "varianzenHeterogen",
        abhaengigkeit.unabhaengig,
        amtSP.zwei,
        "datenreihen2",
        "unterschiedHinsichtMittelwert",
        skalenniveau.intervall,
        fragestellung.unterschied
    ],
    undefined,
    undefined,
    "Welchtest"

)

const tTestAbhaengigSP = new Test(
    "t-Test für abhängige Stichproben",
    "",
    [
        parametrisch.param,
        abhaengigkeit.abaengig,
        amtSP.zwei,
        "datenreihen2",
        "unterschiedHinsichtMittelwert",
        skalenniveau.intervall,
        fragestellung.unterschied
    ],

)

const anova1Faktor = new Test(
    "ANOVA einfaktoriell",
    "",
    [
        "amtFaktoren1",
        amtSP.grzwei,
        "unterschiedHinsichtMittelwert",
        skalenniveau.intervall,
        fragestellung.unterschied
    ],
);

const anova2Faktor = new Test(
    "ANOVA mehrfaktoriell",
    "",
    [
        "amtFaktoren2",
        amtSP.grzwei,
        "unterschiedHinsichtMittelwert",
        skalenniveau.intervall,
        fragestellung.unterschied
    ],
)

const chiQuadrat = new Test(
    "Chi^2 Test (X^2 Test)",
    "",
    [
        amtSP.einsVSGG,
        "unterschiedHinsichtVarianz",
        skalenniveau.intervall,
        fragestellung.unterschied
    ],
)

const fTest = new Test(
    "F-Test",
    "",
    [
        parametrisch.param,
        amtSP.zwei,
        "unterschiedHinsichtVarianz",
        skalenniveau.intervall,
        fragestellung.unterschied
    ],
)

const chiAnpassung = new Test(
    "Chi^2 Anpassungstest (polytom) auf Normalverteilung",
    "",
    [
        "unterschiedHinsichtVerteilung",
        skalenniveau.intervall,
        fragestellung.unterschied
    ],
)

const wilcoxonNV = new Test(
    "Wilcoxon-Test (NV-Approximation)",
    "",
    [
        parametrisch.nonparam,
        "datenreihen2",
        amtSP.eins,
        abhaengigkeit.abaengig,
        skalenniveau.ordinal,
        fragestellung.unterschied
    ],
    26
);

const wilcoxonRang = new Test(
   "Wilcoxon-Test (Rangbindungs-Approximation)",
    "2 Datenreihen",
    [
        parametrisch.nonparam,
        "rangbindungJA",
        "datenreihen2",
        amtSP.eins,
        abhaengigkeit.abaengig,
        skalenniveau.ordinal,
        fragestellung.unterschied
    ],
    undefined,
    25
);

const wilcoxon = new Test(
    "Wilcoxon-Test",
    "2 Datenreihen",
    [
        "rangbindungNEIN",
        "datenreihen2",
        amtSP.eins,
        abhaengigkeit.abaengig,
        skalenniveau.ordinal,
        fragestellung.unterschied
    ],
    undefined,
    25
);

const vorzeichen = new Test(
    "Vorzeichentest",
    "2 Datenreihen",
    [
        "datenreihen2",
        amtSP.eins,
        abhaengigkeit.abaengig,
        skalenniveau.ordinal,
        fragestellung.unterschied
    ],
);

const vorzeichenNV = new Test(
    "Vorzeichentest (NV-Approximation)",
    "2 Datenreihen",
    [
        "datenreihen2",
        amtSP.eins,
        abhaengigkeit.abaengig,
        skalenniveau.ordinal,
        fragestellung.unterschied
    ],
    36
);

const uTestNV = new Test(
    "Mann-Whitney-U-Test (NV-Approximation)",
    "2 Datenreihen",
    [
        parametrisch.nonparam,
        "datenreihen2",
        amtSP.zwei,
        abhaengigkeit.unabhaengig,
        skalenniveau.ordinal,
        fragestellung.unterschied
    ],
    21
);

const uTestRang = new Test(
    "Mann-Whitney-U-Test (Rangbindungs- Approximation)",
    "2 Datenreihen",
    [
        parametrisch.nonparam,
        "rangbindungJA",
        "datenreihen2",
        amtSP.zwei,
        abhaengigkeit.unabhaengig,
        skalenniveau.ordinal,
        fragestellung.unterschied
    ],
    undefined,
    20
);

const uTest = new Test(
    "Mann-Whitney-U-Test",
    "2 Datenreihen",
    [
        parametrisch.nonparam,
        "rangbindungNEIN",
        "datenreihen2",
        amtSP.zwei,
        abhaengigkeit.unabhaengig,
        skalenniveau.ordinal,
        fragestellung.unterschied
    ],
    undefined,
    20
);

const binomialNV = new Test(
    "Binomialtest mit NV-Approximation",
    "",
    [
        "erwartetehaufigkeite*p*q>9",
        "amtKategorienDichotom",
        amtSP.eins,
        abhaengigkeit.unabhaengig,
        skalenniveau.nominal,
        fragestellung.unterschied
    ],
);

const binomial = new Test(
    "Binomialtest exakt",
    "",
    [
        "erwartetehaufigkeite<=10",
        "amtKategorienDichotom",
        amtSP.eins,
        abhaengigkeit.unabhaengig,
        abhaengigkeit.abaengig,
        skalenniveau.nominal,
        fragestellung.unterschied
    ],
    undefined,
    20
);

const chiAnpassungDicho = new Test(
    "X²-Anpassungstest dichotom",
    "",
    [
        "erwartetehaufigkeite>10",
        "amtKategorienDichotom",
        abhaengigkeit.unabhaengig,
        amtSP.eins,
        skalenniveau.nominal,
        fragestellung.unterschied
    ],
    10
);

const chiAnpassungPoly = new Test(
    "Χ² -Anpassungstest (polytom)",
    "",
    [
        "amtKategorienPolytom",
        abhaengigkeit.unabhaengig,
        amtSP.eins,
        skalenniveau.nominal,
        fragestellung.unterschied
    ],
);

const mcNemar = new Test(
    "Nc-Nemar-Test",
    "2 Datenreihen",
    [
        "datenreihen2",
        abhaengigkeit.abaengig,
        amtSP.eins,
        skalenniveau.nominal,
        fragestellung.unterschied
    ],
    30
);

const mcNemarKontinuum = new Test(
    "Nc-Nemar-Test (Kontinuitätskorrektur)",
    "2 Datenreihen",
    [
        "datenreihen2",
        abhaengigkeit.abaengig,
        amtSP.eins,
        skalenniveau.nominal,
        fragestellung.unterschied
    ],
    20,
    30
);

const cochransQ = new Test(
    "Cochran's Q Test",
    "2 Datenreihen",
    [
        "datenreihen2",
        abhaengigkeit.abaengig,
        amtSP.eins,
        skalenniveau.nominal,
        fragestellung.unterschied
    ],
);

const vierFelderChiAnpass = new Test(
    "4-Felder-X²-Anpassungstest",
    "",
    [
        "datenreihen2",
        "randwarscheinlichkeitBekannt",
        amtSP.zwei,
        skalenniveau.nominal,
        fragestellung.unterschied
    ],
);

const vierFelderChiUnab = new Test(
    "4-Felder-X²-Unabhängigkeitstest",
    "",
    [
        "datenreihen2",
        "randwarscheinlichkeitUnbekannt",
        amtSP.zwei,
        skalenniveau.nominal,
        fragestellung.unterschied
    ],
);

const rxc = new Test(
    "rxc-X²-Test",
    "",
    [
        amtSP.grzwei,
        skalenniveau.nominal,
        fragestellung.unterschied
    ],
);

const korrellAbweich0 = new Test(
    "Korrelations-Test Abweichung von 0",
    "",
    [
        "groesseKorrelP=0",
        amtSP.eins,
        skalenniveau.intervall,
        fragestellung.zusammenhang
    ],
);

const korellAbweichWert = new Test(
    "Korrelations-Test Abweichung von Wert ≠ 0",
    "",
    [
        "groesseKorrelP!=0",
        amtSP.eins,
        skalenniveau.intervall,
        fragestellung.zusammenhang
    ],
);

const korrel2SP = new Test(
    "2-Stichproben-Korrelations-Test",
    "",
    [
        amtSP.zwei,
        skalenniveau.intervall,
        fragestellung.zusammenhang
    ],
);

const spearman = new Test(
    "Spearman-Korrelations-Test",
    "",
    [
        skalenniveau.ordinal,
        fragestellung.zusammenhang
    ],
);

const vierFelderKorrel = new Test(
    "Punkt-4-Felder-Korrelation (Phi-Koeffizient)",
    "",
    [
        "amtKategorienDichotom",
        skalenniveau.nominal,
        fragestellung.zusammenhang
    ],
);

const rxcKontingenz = new Test(
    "Kontingenz-Koeffizient C , über rxc-X²-Test",
    "",
    [
        "amtKategorienPolytom",
        skalenniveau.nominal,
        fragestellung.zusammenhang
    ],
);

const cramers = new Test(
    "Cramer‘s Index CI, über rxc-X²-Test",
    "",
    [
        "amtKategorienPolytom",
        skalenniveau.nominal,
        fragestellung.zusammenhang
    ],
);

const korrellBiseral = new Test(
    "Punkt-biserialer Korrelations-Test",
    "",
    [
        "SkalenniveauAV" + skalenniveau.intervall,
        "SkalenniveauUV" +skalenniveau.nominal,
        fragestellung.zusammenhang
    ],
);

const aquivalenzIndependent = new Test(
    "Äquivalenztest für unabh. Stichproben",
    "",
    [
        abhaengigkeit.unabhaengig,
        "aequivalenzgegeben",
        skalenniveau.intervall,
        fragestellung.gleichheit
    ],
);

const aquivalenzDependent = new Test(
    "Äquivalenztest für abhängige Stichproben",
    "",
    [
        abhaengigkeit.abaengig,
        "aequivalenzgegeben",
        skalenniveau.intervall,
        fragestellung.gleichheit
    ],
);

const krueckenTest = new Test(
    "Krückentest mit α = 0,2",
    "",
    [
        "aequivalenzNichtgegeben",
        skalenniveau.intervall,
        fragestellung.gleichheit,
        skalenniveau.nominal,
        skalenniveau.ordinal,
        skalenniveau.intervall
    ],
);


/**
 * Array mit allen Tests
 */
export const testClassArray: Test[] = [
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

]