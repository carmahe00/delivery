const { response } = require("express");
const { validationResult, matchedData } = require("express-validator");

const validarCampos = (req, res = response, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty())
        return res.status(400).json({
            ok: false,
            errores: errores.array()
        })
    next()
}

const matchData = (req, res = response, next) => {
    const bodyData = matchedData(req, { locations: ['body'] });

    req.body = bodyData

    next()
}

module.exports = { validarCampos, matchData }