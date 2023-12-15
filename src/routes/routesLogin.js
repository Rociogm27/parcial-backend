import express from 'express'

import {verificarTokenGoogle,verificarConexion} from "../controllers/GoogleLogin.js"

const routerLogin = express.Router()

routerLogin.get('/loginToken/:token', verificarTokenGoogle)
routerLogin.get('/conexion/:tokenId/:token',verificarConexion)

export default routerLogin