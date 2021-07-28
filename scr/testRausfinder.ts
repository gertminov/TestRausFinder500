import {testClassArray, Test} from "./TestsAsClass.js";
import {selectorMap} from "./Selector2.js";


const sendBtn = document.getElementById('send-btn')

let samplesize: number = 0

let searchedTags = []

sendBtn.addEventListener('click', testAnzeiger )

const selectors = document.getElementsByClassName('selector');
//adds onchangeEvent to every Selector
for (const selector of selectors) {
    //@ts-ignore
    selector.onchange = selectorChangeHandeler
}

function selectorChangeHandeler() {
    testAnzeiger()
    selectorHider()
}

function selectorHider() {
    console.log("selectorHiderGeht")
    selectorMap.forEach(elem => elem.visibility = false)
    selectorMap.get("fragestellung").setChildrenVisibility()
    selectorMap.forEach(elem =>{
        if (!elem.visibility) {
            hider(elem.name);
        } else {
            unhider(elem.name)
        }
    })
}

function hider(id: string): void {
    const element = document.getElementById(id+"-container");
    const dunnoElem = element.querySelector(".dunno");
    (<HTMLOptionElement> dunnoElem).selected = true
    //@ts-ignore
    element.style.visibility = 'hidden';
    //@ts-ignore
    element.style.display = 'none'
}

function unhider(id: string) {
    const element = document.getElementById(id+"-container");
    element.style.visibility = 'visible'
    element.style.display = 'flex'
}


function testAnzeiger ():void {
    console.clear()
    getSearchTags()
    const output = document.getElementById('output-div') // container in dem die Tests angezeigt werden
    output.innerHTML = "" //leert output container
    for (const test of testClassArray) {
        //wenn Ober und Untergrenze passen und alle tags matchen wird das element erstellt
        if (checkSampleLimits(test) && checkAllTagsInTest(test)){
            createTestElement(test, output)
        }
    }
    const allMatchingTests = document.getElementsByClassName('test-name-btn')
    listenerAssigner(allMatchingTests)
    emptySeearchedTags()

}

/**
 * befuellt searchedTags mit allen gewälten constraints
 */
function getSearchTags():void {
    let allTags = []
    for (const [key, Element] of selectorMap) {
        console.log(key)
        allTags.push(getHTMLElementByIDValue(key))

    }

    samplesize = parseInt(getHTMLElementByIDValue('sample-size'), 10);

     //alle Felder werden in Array eingelesen

    searchedTags = allTags.filter(tag => tag != "dunno") //alle Leeren Felder werden rausgefiltert
    // console.log("searchedTags: "+ searchedTags)
}

function getHTMLElementByIDValue(id:string):string {
    return (<HTMLInputElement> document.getElementById(id)).value;
}

function checkSampleLimits(test: Test):boolean {
    if (!isNaN(samplesize)) { //Checked ob stichprobengröße angegeben wurde
        if (test.minN)  { //Checked ob test.minN nicht undifined ist
            if (test.minN > samplesize){
                return false
            }
        }
        if (test.maxN) { //Checked ob test.maxN nicht undefined ist
            if (test.maxN < samplesize){
                return false
            }
        }
    }
    return true
}

function checkAllTagsInTest(test: Test):boolean {
    //@ts-ignore
    return searchedTags.every(searchtag => test.tags.includes(searchtag))
}

function createTestElement(test: Test, output): void {
    const testdiv = document.createElement('div');
    testdiv.setAttribute('class', "test-container")
    const testname = document.createElement('button')
    testname.setAttribute('class', 'test-name-btn')
    testname.setAttribute('value', test.name)
    testname.innerText = test.name;
    testdiv.appendChild(testname)
    output.appendChild(testdiv);
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

function emptySeearchedTags() {
    searchedTags = []
}



