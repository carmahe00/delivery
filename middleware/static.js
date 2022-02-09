const { request, response } = require("express")

class Authentication {
    static ensureRole(roles){
        return async (req= request, res=response, next) => {
            try {
                req.roles = roles;
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