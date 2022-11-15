import dotenv from 'dotenv'
dotenv.config()
 
import ARGS from "../yargs/configuration.js";

export default {
    mongodb: {
        URI: process.env.MONGO_ATLAS_URL
    },
    session: {
        SECRET: process.env.SECRET
    },
    ethereal:{
    EMAIL:process.env.ETHEREAL_EMAIL,
    PASSWORD:process.env.ETHEREAL_PASSWORD,
    PORT:process.env.ETHEREAL_PORT
    },
    maxAge:process.env.MAX_AGE,
    port: ARGS.puerto,
    modo:ARGS.modo,
    database:process.env.DATABASE

}