// this code is being used during webpack bundling process
// it will be executed by node
// eslint-disable-next-line import/no-extraneous-dependencies
const hb = require('handlebars');
const path = require('path');
const fs = require('fs');

const rootTemplateContent = fs.readFileSync(path.resolve(__dirname, 'root.hbs'), 'utf-8');
const rootTemplate = hb.compile(rootTemplateContent);

module.exports = {
    getRootTemplate: () => rootTemplate,
    getCompiledTemplate: (pathToTemplate) => {
        const content = fs.readFileSync(path.resolve(__dirname, pathToTemplate), 'utf-8');
        return hb.compile(content);
    },
};
