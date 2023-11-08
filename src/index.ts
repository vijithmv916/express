require('dotenv').config();

import express, { NextFunction } from "express";
import cookieParser from "cookie-parser";
import { users as v1UserRouter } from './routes/v1';
import { initDatabaseHelper } from "./helpers/db";
import { CatchAsyncError } from "./middleware/catchAsyncErrors";
import basicAuth from "express-basic-auth";

const app = express();
const port = process.env.PORT || 3000;


const main = async () => {

    app.set("trust proxy", 1);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use(basicAuth({
        users: { admin : process.env.PASSWORD || "supersecret" },
        challenge: true
    }));


    app.use("/api/v1/user", v1UserRouter);

    app.get('/', (req, res) => {
        res.send('home');
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        initDatabaseHelper({mongoURL: process.env.MONGO_URL as string})
    });
}

export default main();
