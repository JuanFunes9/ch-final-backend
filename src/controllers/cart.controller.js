// =========================== Model =========================== //
const Product = require('../models/Product.model');
const User = require('../models/User.model');

const getCart = async (req, res) => {
	const { cart } = await User.findById(req.uid).populate('cart');

	return res.json({
		ok: true,
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
			error: `No se ha podido agregar el producto. El producto con ID: ${prodId} no existe o fue eliminado.`
		})
	}

	user.cart.push(prodId);
	await user.save();

	return res.json({
		ok: true,
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
			error: `No se ha podido remover el producto. El producto con ID: ${prodId} no existe en el carrito.`
		})
	}

	user.cart.splice(prodIndex, 1);
	await user.save();

	return res.json({
		ok: true,
		cart: user.cart
	});
}

module.exports = {
	getCart,
	addToCart,
	removeFromCart
}