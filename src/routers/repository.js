import express from 'express';
import {readFile} from 'fs/promises';
import {listFiles} from '../utils/fs.js';

const router = express.Router();

router.get('/', (req, res) => {
    const {repositories} = req.app.get('config');
    const ids = Object.keys(repositories);
    res.json(ids);
});

router.get('/:repository', async (req, res) => {
    const {repository} = req.params;
    const {repositories} = req.app.get('config');
    if (!repositories.hasOwnProperty(repository)) {
        res.status(404);
        res.json(`no such repository: ${repository}`);
        return;
    }

    const {name, path} = repositories[repository];
    const result = await listFiles(path, true);
    res.json(result);
});

router.get('/:repository/*', async (req, res) => {
    const {repositories} = req.app.get('config');
    const {repository} = req.params;
    const repositoryPath = repositories[repository].path;

    const routePath = req.path;
    const filePath = routePath.replace(`/${repository}`, repositoryPath);

    const content = await readFile(filePath);

    res.status(200);
    res.send(content);
});

export default router;
