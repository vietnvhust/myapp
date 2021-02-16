import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import logger from "morgan";
import mongoose from "mongoose";

class App {

    public app: express.Application;
    private uri: string = "mongodb://localhost/myapp"

    constructor() {
        this.app = express();
        this.config();
        this.mongoSetup();    
    }

    private config(): void {
        dotenv.config();
        this.app.use(logger('dev'))
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoSetup(): void {
        mongoose.connect(this.uri, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .then(() => console.log('✅ Connected database from mongodb.'))
        .catch((error) => console.error(`❌ Connect database is failed with error which is ${error}`))  
    }
}

export default new App().app;