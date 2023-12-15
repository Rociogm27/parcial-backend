import express from 'express'

import { getParadasCercanas, getUbicacion } from '../controllers/paradaController.js'

const router = express.Router()

router.put('/cercanas/', getParadasCercanas)
//router.get('/ubicacion/:direccion', getUbicacion)
router.get('/ubicacion/', getUbicacion)


export default router