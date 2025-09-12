import { expressMiddleware } from '@as-integrations/express5';
import express from "express";
import { PORT } from './config/env.config.js';
import startGQLServer, { schema } from './graphql/index.js';
import { verifyPasetoToken } from './utils/token.util.js';
import * as ws from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';


async function startServer() {
    const app = express()
    app.use(express.json());

    const httpServer = app.listen(PORT, () => console.log(`Server running on ${PORT}`));


    const apolloServer = await startGQLServer();
    app.use(
        "/graphql",
        expressMiddleware(apolloServer, {
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
    const wsServer = new ws.WebSocketServer({
        server: httpServer,
        path: "/graphql",
    });

    useServer({ schema: schema }, wsServer as any);

}


startServer();