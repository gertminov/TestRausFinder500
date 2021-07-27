import { testClassArray } from "./TestsAsClass.js";
const sendBtn = document.getElementById('send-btn');
let samplesize = 0;
let searchedTags = [];
sendBtn.addEventListener('click', testAnzeiger);
const selectors = document.getElementsByClassName('selector');
//adds onchangeEvent to every Selector
for (const selector of selectors) {
    //@ts-ignore
    selector.onchange = selectorChangeHandeler;
}
function selectorChangeHandeler(e) {
    testAnzeiger();
}
function testAnzeiger() {
    console.clear();
    getSearchTags();
    const output = document.getElementById('output-div'); // container in dem die Tests angezeigt werden
    output.innerHTML = ""; //leert output container
    for (const test of testClassArray) {
        //wenn Ober und Untergrenze passen und alle tags matchen wird das element erstellt
        if (checkSampleLimits(test) && checkAllTagsInTest(test)) {
            createTestElement(test, output);
        }
    }
    const allMatchingTests = document.getElementsByClassName('test-name-btn');
    listenerAssigner(allMatchingTests);
    emptySeearchedTags();
}
/**
 * befuellt searchedTags mit allen gewälten constraints
 */
function getSearchTags() {
    const artFragestellung = getHTMLElementByIDValue('art-fragestllung');
    const skalenniveau = getHTMLElementByIDValue('scale-niveau');
    const rangbindung = getHTMLElementByIDValue('rangbindung');
    const unterschiede = getHTMLElementByIDValue('interval-difference-mvv');
    const amtSample = getHTMLElementByIDValue('sample-amt');
    const amtFactor = getHTMLElementByIDValue('factors-amt');
    const dependency = getHTMLElementByIDValue('dependency');
    const datenreihen = getHTMLElementByIDValue('interval-difference-mw-sample');
    const parametrisch = getHTMLElementByIDValue('parametric');
    const popVarianz = getHTMLElementByIDValue('population-variance');
    const variance = getHTMLElementByIDValue('variance');
    const amtCategories = getHTMLElementByIDValue('categories-amt');
    const expFrequency = getHTMLElementByIDValue('expexted-frequency');
    const edgeProb = getHTMLElementByIDValue('edge-prob');
    const sizeCorrel = getHTMLElementByIDValue('size-correl');
    const equivalence = getHTMLElementByIDValue('equivalence-area');
    samplesize = parseInt(getHTMLElementByIDValue('sample-size'), 10);
    const allTags = [artFragestellung, rangbindung, skalenniveau, unterschiede, amtSample, dependency, datenreihen,
        parametrisch, popVarianz, variance, amtFactor, amtCategories, expFrequency, edgeProb, sizeCorrel, equivalence]; //alle Felder werden in Array eingelesen
    searchedTags = allTags.filter(tag => tag != "dunno"); //alle Leeren Felder werden rausgefiltert
    // console.log("searchedTags: "+ searchedTags)
}
function getHTMLElementByIDValue(id) {
    return document.getElementById(id).value;
}
function checkSampleLimits(test) {
    if (!isNaN(samplesize)) { //Checked ob stichprobengröße angegeben wurde
        if (test.minN) { //Checked ob test.minN nicht undifined ist
            if (test.minN > samplesize) {
                return false;
            }
        }
        if (test.maxN) { //Checked ob test.maxN nicht undefined ist
            if (test.maxN < samplesize) {
                return false;
            }
        }
    }
    return true;
}
function checkAllTagsInTest(test) {
    //@ts-ignore
    return searchedTags.every(searchtag => test.tags.includes(searchtag));
}
function createTestElement(test, output) {
    const testdiv = document.createElement('div');
    testdiv.setAttribute('class', "test-container");
    const testname = document.createElement('button');
    testname.setAttribute('class', 'test-name-btn');
    testname.setAttribute('value', test.name);
    testname.innerText = test.name;
    testdiv.appendChild(testname);
    output.appendChild(testdiv);
}
/**
 * Fuegt eventlistener zu allen Tests
 * @param array Array mit Tests
 */
function listenerAssigner(array) {
    for (const test of array) {
        test.addEventListener('click', event => {
            const testname = event.target.getAttribute('value');
            for (const oneTest of testClassArray) {
                if (testname === oneTest.name) {
                    document.getElementById('info-text').innerText = oneTest.info;
                }
            }
            console.log(event.target.getAttribute('value'));
        });
    }
}
function emptySeearchedTags() {
    searchedTags = [];
}
const fragestellung = document.getElementById('art-fragestllung');
fragestellung.onchange = artFragestellungHandeler;
function artFragestellungHandeler(e) {
    testAnzeiger();
    artFragestellungSelectorLimiter(e);
}
function artFragestellungSelectorLimiter(e) {
    const value = e.target.value;
    switch (value) {
        case "UnterschiedFrage":
            hider('selector-container');
            unhider("dif-quest");
            break;
        case "ZusammenhangFrage":
            hider('selector-container');
            unhider("connect-quest");
            break;
        case "GleichheitFrage":
            hider('selector-container');
            unhider("equal-quest");
            break;
        default:
            unhider('selector-container');
            break;
    }
}
document.getElementById('scale-niveau').onchange = scaleNiveauHandeler;
function scaleNiveauHandeler(e) {
    testAnzeiger();
    scaleSelectorLimiter(e);
}
const valueToHTMLCLass = {
    "UnterschiedFrage": " dif-quest",
    "ZusammenhangFrage": " connect-quest",
    "GleichheitFrage": " equal-quest",
    "dunno": ""
};
function scaleSelectorLimiter(e) {
    let frageValue = fragestellung.value;
    frageValue = valueToHTMLCLass[frageValue];
    const value = e.target.value;
    switch (value) {
        case "intervalScale":
            hider('selector-container');
            unhider('inverval' + frageValue);
            break;
        case "ordinalScale":
            hider('selector-container');
            unhider('ordinal' + frageValue);
            break;
        case "nominalScale":
            hider('selector-container');
            unhider('nominal' + frageValue);
            break;
        default:
            unhider('selector-container');
            break;
    }
}
/**
 * Hided alle allemente mit gegebenem Klassennamen
 * @param classname Name der Klasse die versteckt werden soll
 */
function hider(classname) {
    const differenceElems = document.getElementsByClassName(classname);
    for (const element of differenceElems) {
        if (element.id == "fragestllung" || element.classList.contains("scale-niveau-container")) {
            continue;
        }
        //@ts-ignore
        element.style.visibility = 'hidden';
        //@ts-ignore
        element.style.display = 'none';
    }
}
function unhider(classname) {
    console.log(classname);
    const allContainers = document.getElementsByClassName(classname);
    for (const element of allContainers) {
        // (element.querySelector('select')).value = "dunno"
        //@ts-ignore
        element.style.visibility = 'visible';
        //@ts-ignore
        element.style.display = 'flex';
    }
}
//# sourceMappingURL=testRausfinder.js.map