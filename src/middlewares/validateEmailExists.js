const User = require('../models/User.model');

const validateEmailExists = async (req, res, next) => {
    const { email } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({
            ok: false,
            error: `El email: ${email} ya esta registrado.`
        })
    }

    next();
}

module.exports = validateEmailExists;