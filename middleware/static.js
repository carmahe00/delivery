const { request, response } = require("express")

class Authentication {
    static ensureRole(rol){
        return async (req= request, res=response, next) => {
            try {
                req.rol = rol;
                return next()
            } catch (error) {
                return res.status(500).send({
                    error: 'Comuniquese con el administrador'
                })
            }
        }
    }
}

module.exports = Authentication