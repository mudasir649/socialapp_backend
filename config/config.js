import dotenv from "dotenv";
dotenv.config();

const config  = {
    mongo_uri: process.env.BACKEND_MONGO_URI,
    port: process.env.BACKEND_PORT
}

export default config