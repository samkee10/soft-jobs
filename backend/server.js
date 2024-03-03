import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { logger } from 'logger-express'

import loginRoutes from './config/routes/loginRoutes.js' //c:/Users/SamKee/Documents/Desafiolatam/Nodejs/desafios/Soft-jobs/backend/config/routes/loginRoutes.js'
import userRoutes from './config/routes/userRoutes.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(logger())
app.use("/", userRoutes)
app.use("/", loginRoutes)

app.listen(PORT, console.log(`Server running on port ${PORT}`))