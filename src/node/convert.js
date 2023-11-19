const units = require('../db/unit.json');

const convertToMeter = { ...units }

function convert(data) {
    const { convertTo, distance: { unit, value } } = data

    const coefficientToMeter = convertToMeter[unit];

    if (!coefficientToMeter) {
        throw new Error(`Doesn't exist this - ${unit} - in base`)
    }

    console.log({ coefficientToMeter })

    const valueInMeter = coefficientToMeter * value;

    if (convertTo === 'm') {
        return { unit: convertTo, value: valueInMeter }
    }
    if (!convertToMeter[convertTo]) {
        throw new Error(`Doesn't exist this ${convertTo}`)
    }
    const coefficientFromMeter = 1 / convertToMeter[convertTo];

    console.log({ [convertTo]: valueInMeter * coefficientFromMeter })

    return { unit: convertTo, value: (valueInMeter * coefficientFromMeter).toFixed(2) }
}

module.exports = {
    convert
}
