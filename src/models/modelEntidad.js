import mongoose from 'mongoose'

const entitySchema = new mongoose.Schema({
    foto: {
        type: String,
        default: "http://res.cloudinary.com/dekrjaaxf/image/upload/v1702642544/nwiwv9lxd1t17ha6vycz.jpg"
    },
    imagenes: {
        type:[String],
        default: []
    },
    usuario: {
        type:String  
    },
    ubicacion: {
        type: String
    }


},{ versionKey: false });

export default mongoose.model('entidades', entitySchema)