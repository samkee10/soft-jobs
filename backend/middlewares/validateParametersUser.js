const validParamUser = (req, res, next) => {
    const {email, password, rol,lenguage} = req.body
    if(!email || !password || !rol || !lenguage) {
        return res
        .status(400)
        .json({error: "Faltan parámetros"})
    }
    next()
}

export { validParamUser }
