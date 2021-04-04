import minimist from 'minimist';

import {readFile} from 'fs/promises';
import {startServer} from './server.js';

const {
    config = "resources/config.json",
    host = "localhost",
    port = 3000
} = minimist(process.argv.slice(2));

readFile(config)
    .then(JSON.parse)
    .catch(error => console.error(`failed to read configuration at: ${config}. ${error.message}`))
    .then(configObject => startServer({host, port, config: configObject}))
    .catch(error => console.error(`failed to boot server: ${error.message}`));
