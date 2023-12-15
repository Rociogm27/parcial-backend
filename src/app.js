import express from 'express'
import morgan from 'morgan'
import routerParada from './routes/routesParada.js'
import routerEntidad from './routes/routesEntidad.js'
import routerLogin from './routes/routesLogin.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/paradas/', routerParada)
app.use('/entidades/', routerEntidad)
app.use('/', routerLogin)

export default app;