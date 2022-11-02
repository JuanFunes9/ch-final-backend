const bcryptjs = require('bcryptjs');

// =========================== Model =========================== //
const User = require('../models/User.model');

// =========================== Services =========================== //
const generateJWT = require('../helpers/generateJWT');
const { registerEmail } = require('../helpers/sendEmail');

const register = async (req, res) => {
	let { email, firstName, lastName, phone, address } = req.body;
	const newUser = new User(req.body);

	//Normalizar el nombre y el apellido
	newUser.firstName = firstName.toLowerCase().trim();
	newUser.lastName = lastName.toLowerCase().trim();

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

	//Enviar email al administrador para notificarle del nuevo registro:
	registerEmail(newUser);


	res.json({
		ok: true,
		data: null,
		user: {
			firstName: newUser.firstName,
			lastName: newUser.lastName,
			email,
			address,
			image: newUser.image,
			cart: newUser.cart,
			phone
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
			data: `El email: ${email} no se encuentra registrado.`
		})
	}

	//verificar password
	const validPasswd = bcryptjs.compareSync(password, user.password);
	if (!validPasswd) {
		return res.status(400).json({
			ok: false,
			data: `La password no es valida.`
		})
	}
	//generar JWT
	const token = await generateJWT(user.id);

	//devoplver el user autenticado + su token
	const { firstName, lastName, address, image, cart, phone } = user;
	res.json({
		ok: true,
		data: null,
		user: {
			firstName,
			lastName,
			email,
			address,
			image,
			cart,
			phone
		},
		token
	});

}

const whoami = async (req, res) => {
	return res.json({
		ok: true,
		data: null,
		user: req.userAuth
	})
}

module.exports = {
	register,
	login,
	whoami
}