import {ListItem} from './ListItem'

abstract class Selector extends ListItem{

    private _options: Object = {"dunno":"Keine Ahnung"}
    private _label:string
    private _children: Selector[] = []
    private _parent: Selector
    private _visible: boolean
    private _parentDesicion: string
    private _elemContainer = document.getElementById(this.name +"-container")
    private _htmlElement = (<HTMLInputElement> document.getElementById(this.name))

    constructor(name: string, label:string, info: string, tags: string[], options: Object) {
        super(name, info, tags)
        this._label = label
        for (const optionsKey in options) {
            this._options[optionsKey] = options[optionsKey]
        }
    }

    get options(): Object {
        return this._options;
    }

    get label(): string{
        return this._label
    }

    get parent(){
        return this._parent
    }

    set parent(value: Selector) {
        this._parent = value;
    }

    get visibility():boolean{
        return this._visible
    }

    set visibility(val:boolean){
        this._visible = val
    }

    get htmlElement(){
        return this._htmlElement
    }

    get parentDesicion(): string {
        return this._parentDesicion;
    }

    set parentDesicion(value: string) {
        this._parentDesicion = value;
    }

    static getInstance(){}

    addChild(child: Selector):void{
        this._children.push(child)
    }

    get children(): Selector[]{
        return this._children
    }

    setChildrenVisibility(){
        console.log("setChildrenVisibility: " + this.name)
        for (const child of this._children) {
            child.visibility = true
            child.setChildrenVisibility()
        }
    }


}

function createElement(elem: Selector) {
    console.log("auch hallo")
    const container = document.createElement('div');
    container.setAttribute('id', elem.name + "-container selector-container")
    const label = document.createElement('label');
    label.setAttribute('for', elem.name)
    label.innerText = elem.label
    const select = document.createElement('select');
    select.setAttribute("id", elem.name)
    select.setAttribute('class', 'selector')
    container.appendChild(label)
    container.appendChild(select)
    for (const optionsKey in elem.options) {
        const option = document.createElement('option');
        option.setAttribute('value', optionsKey)
        option.innerText = elem.options[optionsKey]
        select.appendChild(option)
    }
    document.getElementById('body').appendChild(container)
}

class Variance extends Selector {
    private static instance


    constructor(name: string, label: string, info: string, tags: string[], options: Object) {
        super(name, label, info, tags, options);
    }

    static getInstance(): Selector{
        if (this.instance == null){
            this.instance = new Variance(
                "variance",
                "Varianzen",
                "",
                [],
                {
                "varianzenHomogen":"homogen",
                "varianzenHeterogen":"heterogen"
                }
            )
        }
        return this.instance
    }
}

class ExpectedFreq extends Selector {
    private static instance

    constructor(name: string, label: string, info: string, tags: string[], options: Object) {
        super(name, label, info, tags, options);
    }

    static getInstance(): Selector{
        if (this.instance == null){
            this.instance = new ExpectedFreq(
                "expexted-frequency",
                "Erwartete Häufigkeit",
                "",
                [],
                {
                "erwartetehaufigkeite*p*q>9":"n*p*q &gt 9",
                "erwartetehaufigkeite>10":"e &gt 10",
                "erwartetehaufigkeite<=10":"e ≤ 10"
                }
            )
        }
        return this.instance
    }
}

class SizeKorrel extends Selector {
    private static instance

    constructor(name: string, label: string, info: string, tags: string[], options: Object) {
        super(name, label, info, tags, options);
    }

    static getInstance(): Selector{
        if (this.instance == null){
            this.instance = new SizeKorrel(
                "size-korrel",
                "Größe Korrelation",
                "",
                [],
                {
                "groesseKorrelP=0":"p=0",
                "groesseKorrelP!=0":"p ≠ 0"
                }
            )
        }
        return this.instance
    }
}

class EdgeProp extends Selector{
    private static instance

    constructor(name: string, label: string, info: string, tags: string[], options: Object) {
        super(name, label, info, tags, options);
    }

    static getInstance(): Selector{
        if (this.instance == null){
            this.instance = new EdgeProp(
                "edge-prop",
                "Randwahrscheinlichkeiten",
                "",
                [],
                {
                "randwarscheinlichkeitBekannt":"bekannt",
                "randwarscheinlichkeitUnbekannt":"unbekannt"
                }
            )
        }
        return this.instance
    }
}

class Ties extends Selector {
    private static instance

    constructor(name: string, label: string, info: string, tags: string[], options: Object) {
        super(name, label, info, tags, options);
    }
    static getInstance(): Selector{
        if (this.instance == null){
            this.instance = new Ties(
                "ties",
                "besteht Rangbindung",
                "",
                [],
                {
                "rangbindungNEIN":"Nein",
                "rangbindungJA":"Ja"
                }
            )
        }
        return this.instance
    }
}

class FactorsAmt extends Selector{
    private static instance


    constructor(name: string, label: string, info: string, tags: string[], options: Object) {
        super(name, label, info, tags, options);
    }

    static getInstance(): Selector{
        if (this.instance == null){
            this.instance = new FactorsAmt(
                "factors-amt",
                "Anzahl Faktoren",
                "",
                [],
                {
                    "amtFaktoren1":"1 Faktor",
                    "amtFaktoren2":"2 Faktor"
                }
            )
        }
        return this.instance
    }
}

class PopVariance extends Selector{
    private static instance

    constructor(name: string, label: string, info: string, tags: string[], options: Object) {
        super(name, label, info, tags, options);
    }

    static getInstance(): Selector{
        if (this.instance == null){
            this.instance = new PopVariance(
                "pop-variance",
                "PopulationsVarianz",
                "",
                [],
                {
                "PopulationsVarianzBekannt":"bekannt",
                "PopulationsVarianzUnbekannt":"unbekannt"
                }
            )
        }
        return this.instance
    }
}

class Dependency extends Selector{
    private static instance

    constructor(name: string, label: string, info: string, tags: string[], options: Object) {
        super(name, label, info, tags, options);
        this.addChild(CategoriesAmt.getInstance())
        this.addChild(Variance.getInstance())
    }

    static getInstance(): Selector{
        if (this.instance == null){
            this.instance = new Dependency(
                "dependency",
                "Abhängigkeit",
                "",
                [],
                {
                "AbhaengigkeitTrue":"abhängig",
                "AbhaengigkeitFalse":"unanhängig"
                }
            )
        }
        return this.instance
    }
}

class AquivalenceArea extends Selector{
    private static instance

    constructor(name: string, label: string, info: string, tags: string[], options: Object) {
        super(name, label, info, tags, options);
        this.addChild(Dependency.getInstance())
    }

    static getInstance(): Selector{
        if (this.instance == null){
            this.instance = new AquivalenceArea(
                "equivalence-area",
                "Äquivalenzbereich",
                "",
                [],
                {
                    "aequivalenzgegeben":"gegeben",
                    "aequivalenzNichtgegeben":"nicht gegeben"
                }
            )
        }
        return this.instance
    }
}

class CategoriesAmt extends Selector{

    private static instance

    constructor(name: string, label: string, info: string, tags: string[], options: Object) {
        super(name, label, info, tags, options);
        this.addChild(ExpectedFreq.getInstance())
    }

    static getInstance(): Selector{
        if (this.instance == null){
            this.instance = new CategoriesAmt(
                "categories-amt",
                "Anzahl Kategorien",
                "",
                [],
                {
                    "amtKategorienDichotom":"Dichotom",
                    "amtKategorienPolytom":"Polytom"
                }
            )
        }
        return this.instance
    }
}

class SampleAmt extends Selector{
    private static instance


    constructor(name: string, label: string, info: string, tags: string[], options: Object) {
        super(name, label, info, tags, options);
        this.addChild(PopVariance.getInstance())
        this.addChild(Dependency.getInstance())
        this.addChild(FactorsAmt.getInstance())
        this.addChild(EdgeProp.getInstance())
        this.addChild(SizeKorrel.getInstance())
        this.addChild(Ties.getInstance())
    }

    static getInstance(): Selector{
        if (this.instance == null){
            this.instance = new SampleAmt(
                "sample-amt",
                "Anzahl SP",
                "",
                [],
                {
                    "amtStichProbe1SP":"1 Stichprobe",
                    "amtStichProbe2SP":"2 Stichproben",
                    "amtStichProbe>2SP":"&gt 2 Stichproben"
                }
            )
        }
        return this.instance
    }
}

class Difference extends Selector{
    private static instance


    constructor(name: string, label: string, info: string, tags: string[], options: Object) {
        super(name, label, info, tags, options);
        this.addChild(SampleAmt.getInstance())
    }

    static getInstance(): Selector{
        if (this.instance == null){
            this.instance = new Difference(
                "difference",
                "Unterschiede",
                "",
                [],
                {
                    "unterschiedHinsichtMittelwert":"Mittelwert",
                    "unterschiedHinsichtVarianz":"Varianz",
                    "unterschiedHinsichtVerteilung":"Verteilung"
                },
            )
        }
        return this.instance
    }
}

class Skalenniveau extends Selector{
    private static instance

    constructor(name: string, label: string, info: string, tags: string[], options: Object, children?:Selector[]) {
        super(name, label, info, tags, options);
        children.every(child => this.addChild(child))
        // this.addChild(Difference.getInstance());
        // this.addChild(SampleAmt.getInstance());
        // this.addChild(CategoriesAmt.getInstance());
        // this.addChild(AquivalenceArea.getInstance());
    }

    static getInstance(): Selector{
        if (this.instance == null){
            this.instance = new Skalenniveau(
                "niveau",
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
            )
        }
        return this.instance
    }

    differenceQuestion() {
        this.children[0].setChildrenVisibility()
        this.children[1].setChildrenVisibility()
    }

}


class Question extends Selector{
    private static instance

    constructor(name: string, label: string, info: string, tags: string[], options: Object) {
        super(name, label, info, tags, options);
        this.addChild(Skalenniveau.getInstance())
    }
    static getInstance() {
        if (this.instance == null){
            this.instance = new Question(
                "fragestellung",
                "Art der Fragestellung",
                "",
                [],
                {
                    "UnterschiedFrage": "Unterschied",
                    "ZusammenhangFrage": "Zusammenhang",
                    "GleichheitFrage": "Gleichheit"
                },
            )
        }
        return this.instance
    }

    setChildrenVisibility() {
        switch (this.htmlElement.value){
            case "UnterschiedFrage":
                this.children[0].parentDesicion = "UnterschiedFrage"
                this.children[0].setChildrenVisibility()
                break
            case "ZusammenhangFrage":
                this.children[0].parentDesicion = "ZusammenhangFrage"
                this.children[0].setChildrenVisibility()
                break
            case "GleichheitFrage":
                this.children[0].parentDesicion = "GleichheitFrage"
                this.children[0].setChildrenVisibility()
                break
            default:
                super.setChildrenVisibility()
        }
    }
}


const selectorMap = new Map
selectorMap.set(Question.getInstance().name,Question.getInstance())
selectorMap.set(Skalenniveau.getInstance().name, Skalenniveau.getInstance())
selectorMap.set(Difference.getInstance().name, Difference.getInstance())
selectorMap.set(SampleAmt.getInstance().name, SampleAmt.getInstance())
selectorMap.set(CategoriesAmt.getInstance().name, CategoriesAmt.getInstance())
selectorMap.set(AquivalenceArea.getInstance().name, AquivalenceArea.getInstance())
selectorMap.set(Dependency.getInstance().name, Dependency.getInstance())
selectorMap.set(PopVariance.getInstance().name, PopVariance.getInstance())
selectorMap.set(FactorsAmt.getInstance().name, FactorsAmt.getInstance())
selectorMap.set(Ties.getInstance().name, Ties.getInstance())
selectorMap.set(EdgeProp.getInstance().name, EdgeProp.getInstance())
selectorMap.set(SizeKorrel.getInstance().name, SizeKorrel.getInstance())
selectorMap.set(ExpectedFreq.getInstance().name, ExpectedFreq.getInstance())
selectorMap.set(Variance.getInstance().name, Variance.getInstance())

const selectors = [
    Question.getInstance(),
    Skalenniveau.getInstance(),
    Difference.getInstance(),
    SampleAmt.getInstance(),
    CategoriesAmt.getInstance(),
    AquivalenceArea.getInstance(),
    Dependency.getInstance(),
    PopVariance.getInstance(),
    FactorsAmt.getInstance(),
    Ties.getInstance(),
    EdgeProp.getInstance(),
    SizeKorrel.getInstance(),
    ExpectedFreq.getInstance(),
    Variance.getInstance()

]




for (const [key, selector] of selectorMap) {
    createElement(selector)
}

const selectorElements = document.getElementsByClassName('selector');
for (const selectorElement of selectorElements) {
    (<HTMLInputElement> selectorElement).onchange = changehandeler
}

function changehandeler(e) {
    console.log("Changehandeler Workung")
    const id = e.target.id;
    selectorMap.get(id).setChildrenVisibility()


}



