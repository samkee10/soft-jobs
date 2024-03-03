import { userByEmail } from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { findError } from "../utils/utils.js"

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userByEmail(email)
        if (!user) {
            const findErrorResult = findError("auth_01")
            return res.status(findErrorResult[0].status).json({ error: findErrorResult[0].message})
        }else {
        const validPassword =  bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            const findErrorResult = findError("auth_02")
            return res.status(findErrorResult[0].status).json({ error: findErrorResult[0].message})
        }else {
        const { email } = user
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "2h" })
        res.status(200).json({ message: `Login exitoso ${email}`, code: 200, token })
    }
    }
}
    catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export { loginUser, userByEmail }