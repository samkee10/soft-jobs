import { findError } from "../src/api/v1/utils/utils.js"
import jwt from "jsonwebtoken"

const isLogin = async (req, res, next) => {
  try {
    validateHeaders(req, res);
    if (req.headers["Authorization"]) {
      const token = req.headers["Authorization"].split(" ")[1];
      const decoded = await validateToken(token);
      req.user = decoded;
      next();
    } else {
      throw new Error("Authorization header is missing");
    }
  } catch (error) {
    const errorFound = findError(error.code);
    if (errorFound && errorFound.length > 0) {
      return res.status(errorFound[0]?.status || 500).json({ error: errorFound[0]?.message || "Internal Server Error" });
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
const validateToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded
  } catch (error) {
    throw createError("auth_04", "Token inválido")
  }
}

const validateHeaders = (req) => {
  if (!req.headers("Authorization")) {
    throw createError("auth_01", "Token no encontrado")
  }
}

const createError = (code, message) => {
  const error = new Error()
  error.code = code
  return error
}

export {isLogin}
