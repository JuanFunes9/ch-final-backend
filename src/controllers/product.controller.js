const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

// =========================== Model =========================== //
const Product = require('../models/Product.model');

// =========================== Services =========================== //
const uploadImg = require('../helpers/uploadImg');

const getAll = async (req, res) => {
	let { page, sort } = req.query;
	const currentPage = page ? Number.parseInt(page) : 1;
	const pageLimit = 12;

	sort === 'DESC' ? sort = -1 : sort = 1;


	const products = await Product.find(
		{ state: true },
		{},
		{
			skip: (currentPage * pageLimit) - pageLimit,
			limit: 12
		}
	)
		.sort({ price: sort });
	const countProds = await Product.count({ state: true });

	return res.json({
		ok: true,
		data: null,
		total: products.length,
		maxPages: Math.ceil(countProds / pageLimit),
		products
	})
}

const getByCategorie = async (req, res) => {
	let { page, sort } = req.query;
	const currentPage = page ? Number.parseInt(page) : 1;
	const pageLimit = 12;
	const { categorie } = req.params;

	sort === 'DESC' ? sort = -1 : sort = 1;


	const products = await Product.find(
		{ categorie, state: true },
		{},
		{
			skip: (currentPage * pageLimit) - pageLimit,
			limit: 12
		}
	)
		.sort({ price: sort });
	const countProds = await Product.count({ categorie, state: true });

	return res.json({
		ok: true,
		data: null,
		total: products.length,
		maxPages: Math.ceil(countProds / pageLimit),
		products
	})
}

const getById = async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id);

	if (!product || !product.state) {
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
	const { id } = req.params;
	const { title, price, desc, image, categorie } = req.body;

	// Buscar el producto en DB. Verificar que exista o que no haya sido eliminado:
	const product = await Product.findById(id);
	if (!product || !product.state) {
		return res.status(400).json({
			ok: false,
			data: `El producto con ID: ${id} no existe o fue eliminado.`,
			product: null
		})
	}

	//Limpiar IMG previas en cloudinary:
    if (product.image) {
        const arr = product.image.split("/");
        const nombre = arr[arr.length - 1];
        const [public_id] = nombre.split('.');
        await cloudinary.uploader.destroy(public_id);
    }

	//Actualizar campos que llegron en el req.body
	if (title) product.title = title;
	if (price) product.price = price;
	if (desc) product.desc = desc;
	if (image) product.image = image;
	if (categorie) product.categorie = categorie;

	await product.save();

	res.json({
		ok: true,
		data: null,
		product
	})
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