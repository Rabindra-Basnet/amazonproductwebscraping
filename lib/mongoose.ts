import mongoose from 'mongoose'
import config from './config/config';

let isConnected = false; // variable to track the connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if (!config.mongoDB_Database)
       throw new Error('MONGODB_URI is not defined')

    if (isConnected) {
        console.log('=> using existing database connection');
        return;
    }

    try {
        await mongoose.connect(config.mongoDB_Database)
        isConnected = true;
        console.log('MongoDB connected ') 
        
    } catch (error:any) {
        throw new Error(`failed to connect to MongoDb ${error.message}`)
    }
}