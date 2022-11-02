// =========================== Model =========================== //
const Product = require('../models/Product.model');

// =========================== Services =========================== //
const uploadImg = require('../helpers/uploadImg');

const getAll = async (req, res) => {
	const { page } = req.query;
	const currentPage = page ? Number.parseInt(page) : 1;
	const pageLimit = 12;
	const products = await Product.find(
		{ state: true },
		{},
		{
			skip: (currentPage * pageLimit) - pageLimit,
			limit: 12
		}
	);
	const countProds = await Product.count({state: true});

	return res.json({
		ok: true,
		data: null,
		total: products.length,
		maxPages: countProds/pageLimit,
		products
	})
}

const getByCategorie = async (req, res) => {
	const { page } = req.query;
	const currentPage = page ? Number.parseInt(page) : 1;
	const pageLimit = 12;
	const { categorie } = req.params;
	const products = await Product.find(
		{ categorie, state: true },
		{},
		{
			skip: (currentPage * pageLimit) - pageLimit,
			limit: 12
		}
	);
	const countProds = await Product.count({state: true});

	return res.json({
		ok: true,
		data: null,
		total: products.length,
		maxPages: countProds/pageLimit,
		products
	})
}

const getById = async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id);

	if(!product || !product.state){
		return res.status(400).json({
			ok: false,
			data: `El poroducto al que desea acceder no existe o fue eliminado.`,
			product: {}
		})
	}

	return res.json({
		ok: true,
		data: null,
		product
	})
}

const uploadProdImg = async (req, res) => {
	const { file } = req.files;
	const imageUrl = await uploadImg(file)

	return res.json({
		ok: true,
		data: null,
		imageUrl
	})
}

const newProduct = async (req, res) => {
	const newProd = new Product(req.body);
	await newProd.save();

	return res.json({
		ok: true,
		data: null,
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
			data: `El producto con ID: ${id} no exite o ya fue eliminado.`,
			product: {}
		})
	}

	product.state = false;
	await product.save();

	return res.json({
		ok: true,
		data: null,
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