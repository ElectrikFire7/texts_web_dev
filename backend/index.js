import express from "express";
import {PORT, mongoDBURL} from "./config.js"
import mongoose from "mongoose";
import  textRoute  from "./routes/textRoute.js"

const app = express();
app.use(express.json());

//for all texts routes

app.use("/text", textRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("app connected to DB");
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });