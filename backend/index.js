import express from "express";
import {PORT, mongoDBURL} from "./config.js"
import mongoose from "mongoose";
import  textRoute  from "./routes/textRoute.js"
import userRoute from "./routes/userRoute.js"
import cors from "cors";

const app = express();
app.use(express.json());

//all origin
app.use(cors());

//for routes
app.use("/text", textRoute);
app.use("/user", userRoute)

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