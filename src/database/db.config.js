const mongoose = require('mongoose');

const {NODE_ENV ,MONGODB_URI, MONGODB_URI_TEST} = process.env;

// Si el entorno de NODE es 'test' usamos una base de datos aparte de la DB principal.
const connectionString = (NODE_ENV === 'test') ? MONGODB_URI_TEST : MONGODB_URI ;

const mongoAtlasConnect = async () => {

	try {
		await mongoose.connect(connectionString, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
	} catch (err) {
		throw new Error(`Error al intentar conectar a Mongo DB Atlas: ${ err }`);
	}

}

module.exports = mongoAtlasConnect;