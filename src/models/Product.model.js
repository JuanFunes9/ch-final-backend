const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
	title: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	desc: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: false
	},
	categorie: {
		type: String,
		required: true,
		emun: [
			'almacenamiento',
			'componentes-de-pc',
			'perifericos',
			'sonido-y-multimedia',
			'impresoras',
			'monitores',
			'smart-tv',
			'notebooks',
			'accesorios'
		]
	},
	state: {
		type: Boolean,
		default: true
	}
})

module.exports = model('Product', ProductSchema);