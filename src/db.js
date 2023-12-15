import mongoose from 'mongoose' 
import dotenv from 'dotenv'
dotenv.config()

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://rociogoomez27:9gYXW6XGsvvSBCo9@cluster0.0tackob.mongodb.net/parcialWeb3')
        console.log("Conexión establecida")        
    } catch (error) {
        console.log(error)
    }
};

