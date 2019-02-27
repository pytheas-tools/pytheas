const fs = require('fs-extra');
const recursive = require('recursive-readdir');

const demosFile = './output/demos/demos.json';
const demosData = {};

async function example(f) {
    try {
        await fs.outputJson(f, demosData)
    } catch (err) {
        console.error(err)
    }
}

recursive('./output/demos/javascript', function (err, files) {
    demosData.javascript = files.map((file) => file.replace('output/demos/javascript/', ''));
    recursive('./output/demos/typescript', function (err, files) {
        demosData.typescript = files.map((file) => file.replace('output/demos/typescript/', ''));
        example(demosFile);
    });
});