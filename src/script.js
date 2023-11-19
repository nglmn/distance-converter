'use strict';

import units from './db/unit.json' assert { type: 'json' };

const inputDistance = document.querySelector('#input_value');
const resultDistance = document.querySelector('#result_value');
const convertButton = document.querySelector('.converter');
const resetButton = document.querySelector('.reset');

const selectItem = document.querySelectorAll('select');

let optionSelected = [];
for (let key in units) {
    optionSelected.push(key)
}

function selectorField(selector) {
    for (let i = optionSelected.length - 1; i >= 0; i--) {
        let option = `<option value=${optionSelected[i]}>${optionSelected[i]}</option>`
        selector.firstElementChild.insertAdjacentHTML('afterend', option);
    }
}
selectorField(selectItem[0]);
selectorField(selectItem[1]);


const convertToMeter = { ...units }

function convert(data) {
    const { convertTo, distance: { unit, value } } = data;

    const coefficientToMeter = convertToMeter[unit];

    if (!coefficientToMeter) {
        throw new Error(`Doesn't exist this - ${unit} - in base`)
    }

    const valueInMeter = coefficientToMeter * value;

    if (convertTo === 'm') {
        return { unit: convertTo, value: valueInMeter }
    }
    if (!convertToMeter[convertTo]) {
        throw new Error(`Doesn't exist this ${convertTo}`)
    }
    const coefficientFromMeter = 1 / convertToMeter[convertTo];

    let resultValue = valueInMeter * coefficientFromMeter;

    return { unit: convertTo, value: (Number.isInteger(resultValue) ? resultValue : Number(resultValue.toFixed(2))) }
}



convertButton.addEventListener('click', () => {
    const data = convert({ distance: { unit: selectItem[0].value, value: inputDistance.value }, convertTo: selectItem[1].value })
    console.log(data);

    resultDistance.value = data.value
});

resetButton.addEventListener('click', () => {
    resultDistance.value = 0;
    inputDistance.value = 0;
});
