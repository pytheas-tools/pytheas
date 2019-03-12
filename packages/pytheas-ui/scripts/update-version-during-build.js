const replace = require('replace');
const dayjs = require('dayjs');
const pkg = require('../package.json');

replace({
    regex: '__VERSION__',
    replacement: `${pkg.version} - ${dayjs().format('DD-MM-YYYY HH:mm')}`,
    paths: ['./output/index.html']
});