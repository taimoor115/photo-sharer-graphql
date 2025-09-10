import { expressMiddleware } from '@as-integrations/express5';
import express from "express";
import { PORT } from './config/env.config.js';
import startGQLServer from './graphql/index.js';
import { verifyPasetoToken } from './utils/token.util.js';

async function startServer() {
    const app = express()
    app.use(express.json());


    app.use(
        "/graphql",
        expressMiddleware(await startGQLServer(), {
            context: async ({ req }) => {
                const token = req.header('Authorization')?.replace('Bearer ', '');
                if (!token) { return {}; }
                return {
                    user: await verifyPasetoToken(token)
                }
            },
        })
    );
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}


startServer();