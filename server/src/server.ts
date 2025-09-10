import { expressMiddleware } from '@as-integrations/express5';
import express from "express";
import { PORT } from './config/env.config.js';
import startGQLServer from './graphql/index.js';

async function startServer() {
    const app = express()
    app.use(express.json());


    app.use('/graphql', expressMiddleware(await startGQLServer()));


    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}


startServer();