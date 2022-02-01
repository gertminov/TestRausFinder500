
abstract class Selector{
    private _name: string
    private _info:string
    private _tags: string[]
    static instance
    private _options: Object = {"dunno":"Keine Ahnung"}
    private _label:string
    private _children: Map<string, Selector> = new Map<string, Selector>()
    private _visible: boolean

    constructor(name: string, label:string, info: string, tags: string[], options: Object, children?: Map<string, Selector>) {
        this._name = name
        this._info = info
        this._tags = tags
        this._label = label
        for (const optionsKey in options) {
            this._options[optionsKey] = options[optionsKey]
        }
        if (children){
            for (const [key, child] of children) {
                this._children.set(key, child)
            }
        }
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get info(): string {
        return this._info;
    }

    set info(value: string) {
        this._info = value;
    }

    get tags(): string[] {
        return this._tags;
    }

    set tags(value: string[]) {
        this._tags = value;
    }

    get options(): Object {
        return this._options;
    }

    get label(): string{
        return this._label
    }

    get visibility():boolean{
        return this._visible
    }

    set visibility(val:boolean){
        this._visible = val
    }

    static getInstance():Selector {
        return null
    }

    get children(): Map<string, Selector>{
        return this._children
    }

    setAllChildrenVisible() {
        selectorMap.get(this.name).visibility= true
        for (const [key, child] of this._children) {
            child.setAllChildrenVisible()
        }
    }

    setChildrenVisibility():void{
        selectorMap.get(this.name).visibility= true
        const value = this.getSelectValue(this.name)
        if (value == "dunno") {
            this.setAllChildrenVisible()
        } else {
            try {
                this.children.get(value).setChildrenVisibility();
            }
            catch {
                console.log("gibts nicht")
            }
        }
    }

    getSelectValue(name:string): string{
        return (<HTMLInputElement> document.getElementById(name)).value
    }
}


class Variance extends Selector {


    constructor() {
        super("variance",
            "Varianzen",
            "",
            [],
            {
                "varianzenHomogen":"homogen",
                "varianzenHeterogen":"heterogen"
            });
    }
    static getInstance(): Selector{
        if (this.instance == null){
            this.instance = new Variance( )
        }
        return this.instance
    }
}

class ExpectedFreq extends Selector {
    constructor() {
        super("expexted-frequency",
            "Erwartete Häufigkeit",
            "",
            [],
            {
                "erwartetehaufigkeite*p*q>9":"n*p*q &gt 9",
                "erwartetehaufigkeite>10":"e &gt 10",
                "erwartetehaufigkeite<=10":"e ≤ 10"
            });
    }

    static getInstance(): Selector{
        if (this.instance == null){
            this.instance = new ExpectedFreq()
        }
        return this.instance
    }
}

class SizeKorrel extends Selector {

    constructor() {
        super("size-korrel",
            "Größe Korrelation",
            "",
            [],
            {
                "groesseKorrelP=0":"p=0",
                "groesseKorrelP!=0":"p ≠ 0"
            });
    }

    static getInstance(): Selector{
        if (this.instance == null){
            this.instance = new SizeKorrel()
        }
        return this.instance
    }
}

class EdgeProp extends Selector{
    constructor() {
        super("edge-prop",
            "Randwahrscheinlichkeiten",
            "",
            [],
            {
                "randwarscheinlichkeitBekannt":"bekannt",
                "randwarscheinlichkeitUnbekannt":"unbekannt"
            });
    }

    static getInstance(): Selector{
        if (this.instance == null){
            this.instance = new EdgeProp()
        }
        return this.instance
    }
}

class Ties extends Selector {
    constructor() {
        super("ties",
            "besteht Rangbindung",
            "",
            [],
            {
                "rangbindungNEIN":"Nein",
                "rangbindungJA":"Ja"
            },
        );
    }
    static getInstance(): Selector{
        if (this.instance == null){
            this.instance = new Ties(
            )
        }
        return this.instance
    }
}

class FactorsAmt extends Selector{
    constructor() {
        super("factors-amt",
            "Anzahl Faktoren",
            "",
            [],
            {
                "amtFaktoren1":"1 Faktor",
                "amtFaktoren2":"2 Faktor"
            });
    }

    static getInstance(): Selector{
        if (this.instance == null){
            this.instance = new FactorsAmt()
        }
        return this.instance
    }
}

class PopVariance extends Selector{
    constructor() {
        super("pop-variance",
            "PopulationsVarianz",
            "",
            [],
            {
                "PopulationsVarianzBekannt":"bekannt",
                "PopulationsVarianzUnbekannt":"unbekannt"
            });
    }

    static getInstance(): Selector{
        if (this.instance == null){
            this.instance = new PopVariance()
        }
        return this.instance
    }
}

class Dependency extends Selector{
    constructor(children?: Map<string, Selector>) {
        super(
            "dependency",
            "Abhängigkeit",
            "",
            [],
            {
                "AbhaengigkeitTrue":"abhängig",
                "AbhaengigkeitFalse":"unanhängig"
            },
             children
        );
    }

    static getInstance(): Selector {
        if (this.instance == null){
            this.instance = new this()
        }
        return this.instance
    }
}

class AquivalenceArea extends Selector{
    constructor() {
        super("equivalence-area",
            "Äquivalenzbereich",
            "",
            [],
            {
                "aequivalenzgegeben":"gegeben",
                "aequivalenzNichtgegeben":"nicht gegeben"
            },
            new Map([
                ["dependency", Dependency.getInstance()]
            ])

            );
    }

    static getInstance(): Selector{
        if (this.instance == null){
            this.instance = new AquivalenceArea()
        }
        return this.instance
    }
}

class CategoriesAmt extends Selector{
    constructor(children?: Map<string, Selector>) {
        super(
            "categories-amt",
            "Anzahl Kategorien",
            "",
            [],
            {
                "amtKategorienDichotom":"Dichotom",
                "amtKategorienPolytom":"Polytom"
            },
            children
        );
    }

    static getInstance(): Selector {
        if (this.instance == null){
            this.instance = new this()
        }
        return this.instance
    }

}

class SampleAmt extends Selector{
    constructor(children?: Map<string, Selector>) {
        super("sample-amt",
            "Anzahl SP",
            "",
            [],
            {
                "amtStichProbe1SP":"1 Stichprobe",
                "amtStichProbe2SP":"2 Stichproben",
                "amtStichProbe>2SP":"> 2 Stichproben",
                "amtStichProbe1VSGG": "1 SP vs GG"
            },
            children
            );
    }

    static getInstance(): Selector{
        if (this.instance == null){
            this.instance = new SampleAmt()
        }
        return this.instance
    }
}

class Difference extends Selector{
    constructor() {

        const dependency = new Dependency(new Map([["AbhaengigkeitFalse", Variance.getInstance()]]));

        const sampleAmtMean = new SampleAmt(new Map([
            ["amtStichProbe1SP", PopVariance.getInstance()],
            ["amtStichProbe2SP", dependency],
            ["amtStichProbe>2SP", FactorsAmt.getInstance()]
        ]));
        let children = new Map<string, Selector>(
            [
                ["unterschiedHinsichtVarianz", SampleAmt.getInstance()],
                ["unterschiedHinsichtMittelwert", sampleAmtMean]

            ]
        );
        super("difference",
            "Unterschiede",
            "",
            [],
            {
                "unterschiedHinsichtMittelwert":"Mittelwert",
                "unterschiedHinsichtVarianz":"Varianz",
                "unterschiedHinsichtVerteilung":"Verteilung"
            },
            children
        );
    }

    static getInstance(): Selector{
        if (this.instance == null){
            this.instance = new Difference()
        }
        return this.instance
    }
}

class Skalenniveau extends Selector{
    constructor( children?:Map<string, Selector>) {
        super("niveau",
            "Skalenniveau",
            "",
            [],
            {
                "dunno":"Keine Ahnung",
                "nominalScale":"Nominal",
                "ordinalScale":"Ordinal",
                "intervalScale":"Interval",
                "SkalenniveauAVintervalScale":"UV: nominal AV: intervall"
            },
            children
            );
    }

    static getInstance(): Selector {
        if (this.instance == null){
            this.instance = new this()
        }
        return this.instance
    }
}

class Question extends Selector{
    constructor() {
        const sampleAmtOrdinal = new SampleAmt(new Map([
            ["amtStichProbe1SP",Ties.getInstance()],
            ["amtStichProbe2SP",Ties.getInstance()]
        ]));

        const categoriesAmt = new CategoriesAmt(new Map([["amtKategorienDichotom", ExpectedFreq.getInstance()]]));
        const dependency = new Dependency(new Map([["AbhaengigkeitFalse",categoriesAmt]]));
        const sampleAmtNominal = new SampleAmt(new Map([
            ["amtStichProbe1SP",dependency],
            ["amtStichProbe2SP",EdgeProp.getInstance()]
        ]));
        const skalenniveauDifference = new Skalenniveau(new Map([
            ["intervalScale",Difference.getInstance()],
            ["ordinalScale",sampleAmtOrdinal],
            ["nominalScale",sampleAmtNominal]]
        ))

        const sampleAmtSizeKorrel = new SampleAmt(new Map([["amtStichProbe1SP",SizeKorrel.getInstance()]]));
        const skalenniveauConnection = new Skalenniveau(new Map([
            ["nominalScale",CategoriesAmt.getInstance()],
            ["intervalScale",sampleAmtSizeKorrel]]));


        const skalenniveauEqual = new Skalenniveau(new Map([["intervalScale",AquivalenceArea.getInstance()]]));

        let children = new Map<string, Selector>();
        children.set("UnterschiedFrage", skalenniveauDifference)
        children.set("ZusammenhangFrage", skalenniveauConnection)
        children.set("GleichheitFrage", skalenniveauEqual)

        super("fragestellung",
            "Art der Fragestellung",
            "",
            [],
            {
                "UnterschiedFrage": "Unterschied",
                "ZusammenhangFrage": "Zusammenhang",
                "GleichheitFrage": "Gleichheit"
            },
            children
        );
    }
    static getInstance() {
        if (this.instance == null){
            this.instance = new Question()
        }
        return this.instance
    }
}

export const selectorMap = new Map([
    [Question.getInstance().name,Question.getInstance()],
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
])







