const fs = require('fs');
const path = require('path');

module.exports.findAllQuotes = fs.readFileSync(path.join(__dirname, 'findAllQuotes.gql'), 'utf8');
module.exports.findAllSheets = fs.readFileSync(path.join(__dirname, 'findAllSheets.gql'), 'utf8');
module.exports.findAllTemplates = fs.readFileSync(path.join(__dirname, 'findAllTemplates.gql'), 'utf8');
module.exports.findOneQuote = fs.readFileSync(path.join(__dirname, 'findOneQuote.gql'), 'utf8');
module.exports.findOneSheet = fs.readFileSync(path.join(__dirname, 'findOneSheet.gql'), 'utf8');
module.exports.findOneTemplate = fs.readFileSync(path.join(__dirname, 'findOneTemplate.gql'), 'utf8');
module.exports.findOneTemplateByName = fs.readFileSync(path.join(__dirname, 'findOneTemplateByName.gql'), 'utf8');
module.exports.findSheetsByQuotationAndStage = fs.readFileSync(path.join(__dirname, 'findSheetsByQuotationAndStage.gql'), 'utf8');
