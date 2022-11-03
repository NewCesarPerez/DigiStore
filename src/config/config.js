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
    twilio:{
        ACCOUNTSID:process.env.TWILIO_ACCOUNT_SID,
        ACCOUNTTOKEN:process.env.TWILIO_ACCOUNT_TOKEN,
        PHONENUMBER:process.env.TWILIO_PHONE_NUMBER,
        WHATSAPP:process.env.TWILIO_WHATSAPP_NUMBER
    },
    port: ARGS.puerto,
    modo:ARGS.modo,
    database:process.env.DATABASE

}