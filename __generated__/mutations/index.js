const fs = require('fs');
const path = require('path');

module.exports.createTemplate = fs.readFileSync(path.join(__dirname, 'createTemplate.gql'), 'utf8');
module.exports.removeTemplate = fs.readFileSync(path.join(__dirname, 'removeTemplate.gql'), 'utf8');
module.exports.updateTemplate = fs.readFileSync(path.join(__dirname, 'updateTemplate.gql'), 'utf8');
