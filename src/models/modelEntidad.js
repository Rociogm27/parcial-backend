import mongoose from 'mongoose'

const entitySchema = new mongoose.Schema({
    nombre: {
        type:String  
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    lugar: {
        type: String
    },
    lon : {
        type : Number,
        required : true 
    },
    lat : {
        type : Number,
        required : true
    },
    organizador: {
        type:String  
    },
    foto: {
        type: String,
        default: "http://res.cloudinary.com/dekrjaaxf/image/upload/v1702642544/nwiwv9lxd1t17ha6vycz.jpg"
    }
    
    


},{ versionKey: false });

export default mongoose.model('entidades', entitySchema)