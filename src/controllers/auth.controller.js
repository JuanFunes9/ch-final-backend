const bcryptjs = require('bcryptjs');

// =========================== Model =========================== //
const User = require('../models/User.model');

// =========================== Services =========================== //
const generateJWT = require('../helpers/generateJWT');

const register = async (req, res) => {
	const { email } = req.body;
	const newUser = new User(req.body);

	//Encriptar la PW:
	const salt = bcryptjs.genSaltSync();
	newUser.password = bcryptjs.hashSync(newUser.password, salt);

	//Validar si el usuario que se registra tiene permisos de administrador
	if(email === process.env.ADMIN_EMAIL){
		newUser.role = 'ADMIN_ROLE'
	}

	//Guardar nuevo user en BD:
	await newUser.save();

	//Devolver token para loggeo automatico
	const token = await generateJWT(newUser.id);

	const { firstName, lastName, address, image } = newUser;

	res.json({
		ok: true,
		user: {
			firstName,
			lastName,
			email,
			address,
			image
		},
		token
	});
}

const login = async (req, res) => {
	const { email, password } = req.body;

	//verificar si el user existe
	const user = await User.findOne({ email });

	if (!user) {
		return res.status(404).json({
			ok: false,
			error: `El email: ${email} no se encuentra registrado.`
		})
	}

	//verificar password
	const validPasswd = bcryptjs.compareSync(password, user.password);
	if (!validPasswd) {
		return res.status(400).json({
			ok: false,
			error: `La password no es valida.`
		})
	}
	//generar JWT
	const token = await generateJWT(user.id);

	//devoplver el user autenticado + su token
	const { firstName, lastName, address, image } = user;
	res.json({
		ok: true,
		user: {
			firstName,
			lastName,
			email,
			address,
			image
		},
		token
	});

}

module.exports = {
	register,
	login
}