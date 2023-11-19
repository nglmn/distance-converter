const { convert } = require('./convert');
const data = require('../db/data.json');

const result = convert(data);

console.log(result);