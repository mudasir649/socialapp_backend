import dotenv from "dotenv";
dotenv.config();

const config  = {
    mongo_uri: process.env.BACKEND_MONGO_URI,
    port: process.env.BACKEND_PORT,
    jwt_secret: process.env.BACKEND_JWT_SECRET,
    expiresIn: process.env.BACKEND_JWT_EXPIRES_IN
}

export default config