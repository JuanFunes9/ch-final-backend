const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const validateUserAuth = async (req, res, next) => {
	let token = req.header('Authorization');

	if (!token) {
		return res.status(401).json({
			ok: false,
			data: "No envio un token valido."
		})
	}

	try {
		token = token.split(" ")[1];
		const { uid } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

		req.uid = uid;
		req.userAuth = await User.findById(uid);

		if (!req.userAuth) {
			return res.status(401).json({
				ok: false,
				data: "No envio un token valido. Usuario no existente."
			})
		}

		next();
	} catch (error) {
		return res.status(500).json({
			ok: false,
			data: "Error interno en el servidor. Intente iniciar sesion nuevamente."
		})
	}


}

module.exports = validateUserAuth;