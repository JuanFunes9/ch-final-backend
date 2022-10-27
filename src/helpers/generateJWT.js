const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
	return new Promise((resolve, reject) => {

		const payload = { uid };

		jwt.sign(
			payload,
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: process.env.TOKEN_DURATION
			},
			(err, token) => {
				if (err) {
					console.log(err);
					reject('No se pudo generar el JWT.');
				} else {
					resolve(token);
				}
			});

	})
}

module.exports = generateJWT;