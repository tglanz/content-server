import express from 'express';

import repositoryRouter from './routers/repository.js';

export async function startServer({host, port, config}) {
    const app = express();

    app.set('config', config);
    app.use('/api/v1/repository', repositoryRouter);

    app.listen(port, host, () => {
        console.info(`listening at ${host}@${port}`);
    });
}
