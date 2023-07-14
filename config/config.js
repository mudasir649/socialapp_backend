import env from "../.env";

const config  = {
    mongo_uri: env.BACKEND_MONGO_URI,
    port: env.BACKEND_PORT
}

export default config