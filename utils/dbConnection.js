import mongoose from "mongoose";
import config from "../config/config.js";

export default async function dbConnection() {
    try {
        mongoose.connect(config.mongo_uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => console.log("mongodb connected successfully."));
        mongoose.set('strictQuery', false);
    } catch (error) {
        console.log(error);
    }
}