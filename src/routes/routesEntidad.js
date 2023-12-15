import express from 'express'
import multer from 'multer'
import cloudinary from 'cloudinary'
import streamifier from 'streamifier'
import dotenv from 'dotenv'
dotenv.config()

import { getAllEntidades,getEntidadID, createEntidad, editEntidad, deleteEntidad} from "../controllers/entidadController.js"

const routerEntidad = express.Router()

routerEntidad.get('/', getAllEntidades)
routerEntidad.get('/:id', getEntidadID)
routerEntidad.post('/', createEntidad)
routerEntidad.put('/:id', editEntidad)
routerEntidad.delete('/:id', deleteEntidad)

const fileUpload = multer();
cloudinary.config({
    cloud_name: 'dekrjaaxf',
    api_key: '556747322283782',
    api_secret: 'iF85XtRRorDz9cIrMAtSbTPuL3c'
});

routerEntidad.post('/subirFoto', fileUpload.single('foto'), function (req, res, next) {
  let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream(
            (result, error) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
  };

  async function upload(req) {
    try {
      let result = await streamUpload(req);
      res.status(200).json({ message: 'Imagen subida correctamente', imageUrl: result.url});
    } catch (error) {
      console.log('Error al subir la imagen: ', error)
      res.status(500).json({ message: 'Error al subir la imagen:', error});
    }
  }

  upload(req);
});

export default routerEntidad