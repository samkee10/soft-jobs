import ERRORS from "../helpers/errors.js"
const findError = (code) => {
    return ERRORS.find((error) => error.code == code)
}
export { findError }
