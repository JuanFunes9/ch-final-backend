const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const validateIsOwnUser = async(req, res, next) => {
    const { id } = req.params;
    if(req.uid !== id){
        return res.status(403).json({
            ok: false,
            data: 'No dispone de permisos para realizar esta accion.',
            user: null
        })
    }

    next();
}

module.exports = validateIsOwnUser;