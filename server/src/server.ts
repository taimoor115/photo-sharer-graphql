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
                let user = null;
                if (token) {
                    try {
                        user = await verifyPasetoToken(token);
                    } catch (e) {
                        user = null;
                    }
                }
                return { user };
            },
        })
    );
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}


startServer();