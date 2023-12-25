const fs = require('fs');
const path = require('path');

module.exports.createQuotation = fs.readFileSync(path.join(__dirname, 'createQuotation.gql'), 'utf8');
module.exports.createSheet = fs.readFileSync(path.join(__dirname, 'createSheet.gql'), 'utf8');
module.exports.createTemplate = fs.readFileSync(path.join(__dirname, 'createTemplate.gql'), 'utf8');
module.exports.removeQuotation = fs.readFileSync(path.join(__dirname, 'removeQuotation.gql'), 'utf8');
module.exports.removeTemplate = fs.readFileSync(path.join(__dirname, 'removeTemplate.gql'), 'utf8');
module.exports.removesheet = fs.readFileSync(path.join(__dirname, 'removesheet.gql'), 'utf8');
module.exports.updateQuotation = fs.readFileSync(path.join(__dirname, 'updateQuotation.gql'), 'utf8');
module.exports.updateTemplate = fs.readFileSync(path.join(__dirname, 'updateTemplate.gql'), 'utf8');
module.exports.updatesheet = fs.readFileSync(path.join(__dirname, 'updatesheet.gql'), 'utf8');
