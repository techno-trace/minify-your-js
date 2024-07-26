const minifier = require('./minify');
const appPath = require('app-root-path');

minifier(`${appPath}/to-minify`, `${appPath}/minified`)