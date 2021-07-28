import {selectorMap} from "./Selector2.js";

for (const [key, selector] of selectorMap) {
    createElement(selector)
}

function createElement(elem) {
    const container = document.createElement('div');
    container.setAttribute('id', elem.name + "-container")
    container.setAttribute('class', "selector-container")
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
        if (optionsKey == "dunno") {
            option.setAttribute('class', 'dunno')
        }
        option.innerText = elem.options[optionsKey];
        select.appendChild(option)
    }
    const samplesize = document.getElementById('sample-size-container');
    document.getElementById('input').insertBefore(container, samplesize)
}