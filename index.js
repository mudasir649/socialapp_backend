import path from "path";
import express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { fileURLToPath } from "url";
import dbConnection from "./utils/dbConnection.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy:"cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit:"30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit:"30mb", extended: true }));
app.use(cors());
app.use("/assest", express.static(path.join(__dirname, 'public/assets')));

app.use((next) => {
    dbConnection();
    next();
})

app.listen(process.env.BACKEND_PORT, () => {
    console.log(`APP running at port ${process.env.BACKEND_PORT}`);
})