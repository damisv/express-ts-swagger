import * as express from "express";
import * as bodyParser from "body-parser";

import { database } from "./database/";

import { RegisterRoutes } from './routes/routes';

// App handlers
const app: express.Application = express();


// Use body parser to read sent json payloads
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

RegisterRoutes(app);

const PORT: number = 3000;
const HOST = "0.0.0.0";

const start = async () => {
    try {
        await database.sync(
            { force: true } // Reset db every time
        );
  
        app.listen(PORT, HOST, () => {
            console.log(`Running on http://${HOST}:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();