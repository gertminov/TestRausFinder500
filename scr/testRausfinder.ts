// import {testArray} from "./tests.js";
import {testClassArray, Test} from "./TestsAsClass.js";

let samplesize: number = 0

let searchedTags = []
let allMatchingTests

const differenceQuestion: string = "dif-quest"
const equalityQuestion: string = "equal-quest"
const connectQuestion = "connect-quest";


/**
 * befuellt searchedTags mit allen gewälten constraints
 */
function getSearchTags():void {
    let allTags = []
    const artFragestellung = getHTMLElementByIDValue('art-fragestllung')
    const skalenniveau = getHTMLElementByIDValue('scale-niveau')
    const rangbindung = getHTMLElementByIDValue('rangbindung')
    const unterschiede = getHTMLElementByIDValue('interval-difference-mvv')
    const amtSample = getHTMLElementByIDValue('sample-amt')
    const amtFactor = getHTMLElementByIDValue('factors-amt')
    const dependency = getHTMLElementByIDValue('dependency')
    const datenreihen = getHTMLElementByIDValue('interval-difference-mw-sample')
    const parametrisch = getHTMLElementByIDValue('parametric')
    const popVarianz = getHTMLElementByIDValue('population-variance')
    const variance = getHTMLElementByIDValue('variance')
    const amtCategories = getHTMLElementByIDValue('categories-amt')
    const expFrequency = getHTMLElementByIDValue('expexted-frequency')
    const edgeProb = getHTMLElementByIDValue('edge-prob')
    const sizeCorrel = getHTMLElementByIDValue('size-correl')
    const equivalence = getHTMLElementByIDValue('equivalence-area')
    samplesize = parseInt(getHTMLElementByIDValue('sample-size'), 10);

    allTags.push(artFragestellung, rangbindung, skalenniveau, unterschiede, amtSample, dependency, datenreihen,
        parametrisch, popVarianz, variance, amtFactor, amtCategories,expFrequency, edgeProb, sizeCorrel, equivalence) //alle Felder werden in Array eingelesen

    searchedTags = allTags.filter(tag => tag != "dunno") //alle Leeren Felder werden rausgefiltert
    console.log("searchedTags: "+ searchedTags)
}

function getHTMLElementByIDValue(id:string):string {
    return (<HTMLInputElement> document.getElementById(id)).value;
}



document.getElementById('send-btn').addEventListener('click', testAnzeiger )

const selectors = document.getElementsByClassName('selector');
for (const selector of selectors) {
    //@ts-ignore
    selector.onchange = testAnzeiger
}

function testAnzeiger ():void {
    console.clear()

    getSearchTags()
    const output = document.getElementById('output-div') // container in dem die Tests angezeigt werden
    output.innerHTML = "" //leert output container
    for (const test of testClassArray) {
        let obergr: boolean = true
        let untergr: boolean = true
        if (!isNaN(samplesize)) { //Checked ob stichprobengröße angegeben wurde
            if (test.minN)  { //Checked ob test.minN nicht undifined ist
                if (test.minN > samplesize){
                    untergr = false;
                }
            }
            if (test.maxN) { //Checked ob test.maxN nicht undefined ist
                if (test.maxN < samplesize){
                    obergr = false
                }
            }
        }

        //wenn Ober und Untergrenze passen und alle tags matchen wird das element erstellt
        if (untergr && obergr && checkAllTagsInTest(test)){
            const testdiv = document.createElement('div');
            testdiv.setAttribute('class', "test-container")
            const testname = document.createElement('button')
            testname.setAttribute('class', 'test-name-btn')
            testname.setAttribute('value', test.name)
            testname.innerText = test.name;
            testdiv.appendChild(testname)
            output.appendChild(testdiv);
        }

    }
    allMatchingTests = document.getElementsByClassName('test-name-btn')
    listenerAssigner(allMatchingTests)
    emptySeearchedTags()
}


function checkAllTagsInTest(test: Test):boolean {
    //@ts-ignore
    return searchedTags.every(searchtag => test.tags.includes(searchtag))
}

function emptySeearchedTags() {
    searchedTags = []
}

/**
 * Fuegt eventlistener zu allen Tests
 * @param array Array mit Tests
 */
function listenerAssigner(array):void{
    for (const test of array) {
        test.addEventListener('click', event =>{
            const testname = event.target.getAttribute('value');
            for (const oneTest of testClassArray) {
                if (testname === oneTest.name) {
                    document.getElementById('info-text').innerText = oneTest.info
                }
            }
            console.log(event.target.getAttribute('value'));
        })
    }
}


const fragestellung = document.getElementById('art-fragestllung')
fragestellung.onchange = artFragestellungHandeler

function artFragestellungHandeler(e) {
    testAnzeiger()
    questionSelectorLimiter(e)
}

function questionSelectorLimiter(e) {
    const value = e.target.value;
    switch (value) {
        case "UnterschiedFrage":
            hider('selector-container')
            unhider(differenceQuestion)
            break

        case "ZusammenhangFrage":
            hider('selector-container')
            unhider(connectQuestion)

            break
        case "GleichheitFrage":
            hider('selector-container')
            unhider(equalityQuestion)
            break
        default:
            unhider('selector-container')
            break

    }
}

function valueToHTMLCLassName(valueName: string): string {
    switch (valueName) {
        case "UnterschiedFrage":
            return "dif-quest"
        case "ZusammenhangFrage":
            return "connect-quest"

        case "GleichheitFrage":
            return "equal-quest"
        default:
            return "dunno"

    }

}

document.getElementById('scale-niveau').onchange = scaleNiveauHandeler

function scaleNiveauHandeler(e) {
    testAnzeiger()
    scaleSelectorLimiter(e)

}

function scaleSelectorLimiter(e) {
    let frageValue = (<HTMLInputElement> fragestellung).value
    frageValue = valueToHTMLCLassName(frageValue)
    if (frageValue == "dunno") {
        frageValue = "";
    } else {
        frageValue = " "+ frageValue
    }
    const value = e.target.value;
    switch (value) {
        case "intervalScale":
            hider('selector-container')
            unhider('inverval'+ frageValue)
            break
        case "ordinalScale":
            hider('selector-container')
            unhider('ordinal'+ frageValue)
            break
        case "nominalScale":
            hider('selector-container')
            unhider('nominal'+ frageValue)
            break
        default:
            unhider('selector-container')
            break



    }
}

/**
 * Hided alle allemente mit gegebenem Klassennamen
 * @param classname Name der Klasse die versteckt werden soll
 */
function hider(classname: string) {
    const differenceElems = document.getElementsByClassName(classname);
    for (const element of differenceElems) {
        //@ts-ignore
        element.style.visibility = 'hidden'
        //@ts-ignore
        element.style.display = 'none'
    }
}

function unhider(classname: string) {
    console.log(classname);
    const allContainers = document.getElementsByClassName(classname);
    for (const element of allContainers) {
        //@ts-ignore
        element.style.visibility = 'visible'
        //@ts-ignore
        element.style.display = 'flex'
    }
}
