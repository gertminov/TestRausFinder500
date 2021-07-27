class Selector {
    constructor(name, label, info, tags, options, children) {
        this._options = { "dunno": "Keine Ahnung" };
        this._children = new Map();
        this._htmlElement = document.getElementById(this.name);
        this._name = name;
        this._info = info;
        this._tags = tags;
        this._label = label;
        for (const optionsKey in options) {
            this._options[optionsKey] = options[optionsKey];
        }
        if (children) {
            for (const [key, child] of children) {
                this._children.set(key, child);
            }
        }
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get info() {
        return this._info;
    }
    set info(value) {
        this._info = value;
    }
    get tags() {
        return this._tags;
    }
    set tags(value) {
        this._tags = value;
    }
    get options() {
        return this._options;
    }
    get label() {
        return this._label;
    }
    get visibility() {
        return this._visible;
    }
    set visibility(val) {
        this._visible = val;
    }
    get parentDesicion() {
        return this._parentDesicion;
    }
    set parentDesicion(value) {
        this._parentDesicion = value;
    }
    static getInstance() {
        return null;
    }
    get children() {
        return this._children;
    }
    setAllChildrenVisible() {
        selectorMap.get(this.name).visibility = true;
        for (const [key, child] of this._children) {
            child.setAllChildrenVisible();
        }
    }
    setChildrenVisibility() {
        selectorMap.get(this.name).visibility = true;
        const value = this.getSelectValue(this.name);
        if (value == "dunno") {
            this.setAllChildrenVisible();
        }
        else {
            try {
                this.children.get(value).setChildrenVisibility();
            }
            catch (_a) {
                console.log("gibts nicht");
            }
        }
    }
    getSelectValue(name) {
        return document.getElementById(name).value;
    }
}
class Variance extends Selector {
    constructor() {
        super("variance", "Varianzen", "", [], {
            "varianzenHomogen": "homogen",
            "varianzenHeterogen": "heterogen"
        });
    }
    static getInstance() {
        if (this.instance == null) {
            this.instance = new Variance();
        }
        return this.instance;
    }
}
class ExpectedFreq extends Selector {
    constructor() {
        super("expexted-frequency", "Erwartete Häufigkeit", "", [], {
            "erwartetehaufigkeite*p*q>9": "n*p*q &gt 9",
            "erwartetehaufigkeite>10": "e &gt 10",
            "erwartetehaufigkeite<=10": "e ≤ 10"
        });
    }
    static getInstance() {
        if (this.instance == null) {
            this.instance = new ExpectedFreq();
        }
        return this.instance;
    }
}
class SizeKorrel extends Selector {
    constructor() {
        super("size-korrel", "Größe Korrelation", "", [], {
            "groesseKorrelP=0": "p=0",
            "groesseKorrelP!=0": "p ≠ 0"
        });
    }
    static getInstance() {
        if (this.instance == null) {
            this.instance = new SizeKorrel();
        }
        return this.instance;
    }
}
class EdgeProp extends Selector {
    constructor() {
        super("edge-prop", "Randwahrscheinlichkeiten", "", [], {
            "randwarscheinlichkeitBekannt": "bekannt",
            "randwarscheinlichkeitUnbekannt": "unbekannt"
        });
    }
    static getInstance() {
        if (this.instance == null) {
            this.instance = new EdgeProp();
        }
        return this.instance;
    }
}
class Ties extends Selector {
    constructor() {
        super("ties", "besteht Rangbindung", "", [], {
            "rangbindungNEIN": "Nein",
            "rangbindungJA": "Ja"
        });
    }
    static getInstance() {
        if (this.instance == null) {
            this.instance = new Ties();
        }
        return this.instance;
    }
}
class FactorsAmt extends Selector {
    constructor() {
        super("factors-amt", "Anzahl Faktoren", "", [], {
            "amtFaktoren1": "1 Faktor",
            "amtFaktoren2": "2 Faktor"
        });
    }
    static getInstance() {
        if (this.instance == null) {
            this.instance = new FactorsAmt();
        }
        return this.instance;
    }
}
class PopVariance extends Selector {
    constructor() {
        super("pop-variance", "PopulationsVarianz", "", [], {
            "PopulationsVarianzBekannt": "bekannt",
            "PopulationsVarianzUnbekannt": "unbekannt"
        });
    }
    static getInstance() {
        if (this.instance == null) {
            this.instance = new PopVariance();
        }
        return this.instance;
    }
}
class Dependency extends Selector {
    constructor(children) {
        super("dependency", "Abhängigkeit", "", [], {
            "AbhaengigkeitTrue": "abhängig",
            "AbhaengigkeitFalse": "unanhängig"
        }, children);
    }
    static getInstance() {
        if (this.instance == null) {
            this.instance = new this();
        }
        return this.instance;
    }
}
class AquivalenceArea extends Selector {
    constructor() {
        super("equivalence-area", "Äquivalenzbereich", "", [], {
            "aequivalenzgegeben": "gegeben",
            "aequivalenzNichtgegeben": "nicht gegeben"
        }, new Map([
            ["dependency", Dependency.getInstance()]
        ]));
    }
    static getInstance() {
        if (this.instance == null) {
            this.instance = new AquivalenceArea();
        }
        return this.instance;
    }
}
class CategoriesAmt extends Selector {
    constructor(children) {
        super("categories-amt", "Anzahl Kategorien", "", [], {
            "amtKategorienDichotom": "Dichotom",
            "amtKategorienPolytom": "Polytom"
        }, children);
    }
    static getInstance() {
        if (this.instance == null) {
            this.instance = new this();
        }
        return this.instance;
    }
}
class SampleAmt extends Selector {
    constructor(children) {
        super("sample-amt", "Anzahl SP", "", [], {
            "amtStichProbe1SP": "1 Stichprobe",
            "amtStichProbe2SP": "2 Stichproben",
            "amtStichProbe>2SP": "> 2 Stichproben"
        }, children);
    }
    static getInstance() {
        if (this.instance == null) {
            this.instance = new SampleAmt();
        }
        return this.instance;
    }
}
class Difference extends Selector {
    constructor() {
        const dependency = new Dependency(new Map([["AbhaengigkeitFalse", Variance.getInstance()]]));
        const sampleAmtMean = new SampleAmt(new Map([
            ["amtStichProbe1SP", PopVariance.getInstance()],
            ["amtStichProbe2SP", dependency],
            ["amtStichProbe>2SP", FactorsAmt.getInstance()]
        ]));
        let children = new Map([
            ["unterschiedHinsichtVarianz", SampleAmt.getInstance()],
            ["unterschiedHinsichtMittelwert", sampleAmtMean]
        ]);
        super("difference", "Unterschiede", "", [], {
            "unterschiedHinsichtMittelwert": "Mittelwert",
            "unterschiedHinsichtVarianz": "Varianz",
            "unterschiedHinsichtVerteilung": "Verteilung"
        }, children);
    }
    static getInstance() {
        if (this.instance == null) {
            this.instance = new Difference();
        }
        return this.instance;
    }
}
class Skalenniveau extends Selector {
    constructor(children) {
        super("niveau", "Skalenniveau", "", [], {
            "dunno": "Keine Ahnung",
            "nominalScale": "Nominal",
            "ordinalScale": "Ordinal",
            "intervalScale": "Interval",
            "SkalenniveauAVintervalScale": "UV: nominal AV: intervall"
        }, children);
    }
    static getInstance() {
        if (this.instance == null) {
            this.instance = new this();
        }
        return this.instance;
    }
}
class Question extends Selector {
    constructor() {
        const sampleAmtOrdinal = new SampleAmt(new Map([
            ["amtStichProbe1SP", Ties.getInstance()],
            ["amtStichProbe2SP", Ties.getInstance()]
        ]));
        const categoriesAmt = new CategoriesAmt(new Map([["amtKategorienDichotom", ExpectedFreq.getInstance()]]));
        const dependency = new Dependency(new Map([["AbhaengigkeitFalse", categoriesAmt]]));
        const sampleAmtNominal = new SampleAmt(new Map([
            ["amtStichProbe1SP", dependency],
            ["amtStichProbe2SP", EdgeProp.getInstance()]
        ]));
        const skalenniveauDifference = new Skalenniveau(new Map([
            ["intervalScale", Difference.getInstance()],
            ["ordinalScale", sampleAmtOrdinal],
            ["nominalScale", sampleAmtNominal]
        ]));
        const sampleAmtSizeKorrel = new SampleAmt(new Map([["amtStichProbe1SP", SizeKorrel.getInstance()]]));
        const skalenniveauConnection = new Skalenniveau(new Map([
            ["nominalScale", CategoriesAmt.getInstance()],
            ["intervalScale", sampleAmtSizeKorrel]
        ]));
        const skalenniveauEqual = new Skalenniveau(new Map([["intervalScale", AquivalenceArea.getInstance()]]));
        let children = new Map();
        children.set("UnterschiedFrage", skalenniveauDifference);
        children.set("ZusammenhangFrage", skalenniveauConnection);
        children.set("GleichheitFrage", skalenniveauEqual);
        super("fragestellung", "Art der Fragestellung", "", [], {
            "UnterschiedFrage": "Unterschied",
            "ZusammenhangFrage": "Zusammenhang",
            "GleichheitFrage": "Gleichheit"
        }, children);
    }
    static getInstance() {
        if (this.instance == null) {
            this.instance = new Question();
        }
        return this.instance;
    }
}
export const selectorMap = new Map([
    [Question.getInstance().name, Question.getInstance()],
    [Skalenniveau.getInstance().name, Skalenniveau.getInstance()],
    [Difference.getInstance().name, Difference.getInstance()],
    [SampleAmt.getInstance().name, SampleAmt.getInstance()],
    [CategoriesAmt.getInstance().name, CategoriesAmt.getInstance()],
    [AquivalenceArea.getInstance().name, AquivalenceArea.getInstance()],
    [Dependency.getInstance().name, Dependency.getInstance()],
    [PopVariance.getInstance().name, PopVariance.getInstance()],
    [FactorsAmt.getInstance().name, FactorsAmt.getInstance()],
    [Ties.getInstance().name, Ties.getInstance()],
    [EdgeProp.getInstance().name, EdgeProp.getInstance()],
    [SizeKorrel.getInstance().name, SizeKorrel.getInstance()],
    [ExpectedFreq.getInstance().name, ExpectedFreq.getInstance()],
    [Variance.getInstance().name, Variance.getInstance()],
]);
// for (const [key, selector] of selectorMap) {
//     createElement(selector)
// }
//# sourceMappingURL=Selector2.js.map