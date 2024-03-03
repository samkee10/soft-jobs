import express from 'express'
import { createNewUser, getUserByEmail }   from '../../src/api/v1/controllers/userController.js'
import { validParamUser } from "../../middlewares/validateParametersUser.js"
import { isLogin } from "../../middlewares/isLogin.js"

const router = express.Router()

router.post("/usuarios",validParamUser, createNewUser)
router.get("/usuarios", isLogin, getUserByEmail)

export default router
