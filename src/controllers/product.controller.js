// =========================== Model =========================== //
const Product = require('../models/Product.model');

// =========================== Services =========================== //
const uploadImg = require('../helpers/uploadImg');

const getAll = async (req, res) => {
	const products = await Product.find({ state: true });

	return res.json({
		ok: true,
		products
	})
}

const getByCategorie = async (req, res) => {
	const { categorie } = req.params;
	const products = await Product.find({ categorie, state: true });

	return res.json({
		ok: true,
		products
	})
}

const getById = async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id);

	if(!product.state){
		return res.status(400).json({
			ok: false,
			error: `El poroducto al que desea acceder fue eliminado.`
		})
	}

	return res.json({
		ok: true,
		product
	})
}

const uploadProdImg = async (req, res) => {
	const { file } = req.files;
	const imageUrl = await uploadImg(file)

	return res.json({
		ok: true,
		imageUrl
	})
}

const newProduct = async (req, res) => {
	const newProd = new Product(req.body);
	await newProd.save();

	return res.json({
		ok: true,
		newProd
	})
}

const updateProduct = async (req, res) => {

}

const deleteProduct = async (req, res) => {
	const { id } = req.params;

	const product = await Product.findById(id);

	if (!product || !product.state) {
		return res.status(400).json({
			ok: false,
			error: `El producto con ID: ${id} no exite o ya fue eliminado.`
		})
	}

	product.state = false;
	await product.save();

	return res.json({
		ok: true,
		product
	})
}

module.exports = {
	getAll,
	getByCategorie,
	getById,
	uploadProdImg,
	newProduct,
	updateProduct,
	deleteProduct
}