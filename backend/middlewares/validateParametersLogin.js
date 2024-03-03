const validParamLogin = (req, res, next) => {
    const {email, password} = req.body
    if(!email || !password) {
        return res
        .status(400)
        .json({error: "Faltan parámetros"})
    }
    next()
}

export { validParamLogin }
