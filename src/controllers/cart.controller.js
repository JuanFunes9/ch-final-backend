// =========================== Model =========================== //
const Product = require('../models/Product.model');
const User = require('../models/User.model');

// =========================== Services =========================== //
const { newOrderEmail } = require('../helpers/sendEmail');
const generateOrder = require('../helpers/generateOrder');


const getCart = async (req, res) => {
	const { cart } = await User.findById(req.uid).populate('cart');

	return res.json({
		ok: true,
		data: null,
		cart
	});
}

const addToCart = async (req, res) => {
	const { prodId } = req.params;

	const product = await Product.findById(prodId);
	const user = await User.findById(req.uid);

	if (!product || !product.state) {
		return res.status(400).json({
			ok: false,
			data: `No se ha podido agregar el producto. El producto con ID: ${prodId} no existe o fue eliminado.`
		})
	}

	user.cart.push(prodId);
	await user.save();

	return res.json({
		ok: true,
		data: null,
		cart: user.cart
	})
}

const removeFromCart = async (req, res) => {
	const { prodId } = req.params;
	const user = await User.findById(req.uid);

	const prodIndex = user.cart.indexOf(prodId);

	if (prodIndex === -1) {
		return res.status(400).json({
			ok: false,
			data: `No se ha podido remover el producto. El producto con ID: ${prodId} no existe en el carrito.`
		})
	}

	user.cart.splice(prodIndex, 1);
	await user.save();

	return res.json({
		ok: true,
		data: null,
		cart: user.cart
	});
}

const sendOrder = async (req, res) => {
	//Traer al usuario y realizar el "join" con la coleccion de productos
	const user = await User.findById(req.uid).populate('cart');

	//Validar que el carrito no este vacio
	if (!user.cart.length) {
		return res.status(400).json({
			ok: true,
			data: 'Agrega productos al carrito antes de enviar la orden.',
			user
		})
	}

	//Enviar email al administrador informandole del nuevo pedido (que usuario y que productos pidio)
	newOrderEmail(user, user.cart);

	//Crear la orden de compra y vaciar el carrito:
	const order = await generateOrder(user)

	user.cart = [];
	await user.save();

	return res.json({
		ok: true,
		data: null,
		order
	})
}

module.exports = {
	getCart,
	addToCart,
	removeFromCart,
	sendOrder
}