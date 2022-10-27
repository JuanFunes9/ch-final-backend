const User = require('../models/User.model');

const validateUserAdmin = async(req, res, next) => {
    const { role } = await User.findById(req.uid)

    if(role !== 'ADMIN_ROLE'){
        return res.status(403).json({
            ok: false,
            error: 'No dispone de permisos para acceder al recurso solicitado.'
        })
    }
    next();
}   

module.exports = validateUserAdmin;