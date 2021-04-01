// this code is being used during webpack bundling process
// it will be executed by node
// eslint-disable-next-line import/no-extraneous-dependencies
const hb = require('handlebars');
const { readFileSync } = require('fs');

const getCompiledTemplate = (pathToTemplate) => {
    const content = readFileSync(pathToTemplate, 'utf-8');
    return hb.compile(content);
};

module.exports = { getCompiledTemplate };
