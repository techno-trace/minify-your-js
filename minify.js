const UglifyJS = require('uglify-js');
const fs = require('fs').promises;
const path = require('path');

async function minifyJavaScriptFile(inputFilePath, outputFilePath) {
    try {
        const data = await fs.readFile(inputFilePath, 'utf8');
        const result = UglifyJS.minify(data);
        if (result.error) {
            throw result.error;
        }

        await fs.writeFile(outputFilePath, result.code);
        console.log(`Minified ${path.basename(inputFilePath)} → ${outputFilePath}`);
    } catch (error) {
        console.error(`Error processing ${inputFilePath}:`, error);
    }
}

async function minifyFilesInDirectory(sourceDir, targetDir) {
    try {
        const files = await fs.readdir(sourceDir);
        const minifyPromises = files
            .filter(file => path.extname(file) === '.js')
            .map(file => {
                const inputFilePath = path.join(sourceDir, file);
                const outputFilePath = path.join(targetDir, file);
                return minifyJavaScriptFile(inputFilePath, outputFilePath);
            });

        await Promise.all(minifyPromises);
    } catch (error) {
        console.error(`Error reading directory ${sourceDir}:`, error);
    }
}

// Example if you wanna manually do it:
// const sourceFolder = './to-minify'; // Put your source folder
// const targetFolder = './minified'; // Put your target folder
// minifyFilesInDirectory(sourceFolder, targetFolder);

module.exports = minifyFilesInDirectory;
