// configure mongodb 

import mongoose from 'mongoose'

export const initDB = async () => {
    mongoose.connect(process.env.DB_CONNECTION_STRING!).then(() => console.log("DB connected")).catch(err => console.log("error in DB connection ", err))
}