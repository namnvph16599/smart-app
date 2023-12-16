const fs = require('fs');
const path = require('path');

module.exports.findAllTemplates = fs.readFileSync(path.join(__dirname, 'findAllTemplates.gql'), 'utf8');
module.exports.findOneTemplate = fs.readFileSync(path.join(__dirname, 'findOneTemplate.gql'), 'utf8');
