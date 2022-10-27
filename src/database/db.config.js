const mongoose = require('mongoose');

const mongoAtlasConnect = async () => {

	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
        console.log('Connection to MongoDB Atlas succesfully !');
	} catch (err) {
		throw new Error(`Error al intentar conectar a Mongo DB Atlas: ${ err }`);
	}

}

module.exports = mongoAtlasConnect;