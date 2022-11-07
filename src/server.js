const yargs = require('yargs')(process.argv.slice(2));
const {server} = require('./app');
const mongoAtlasConnect = require('./database/db.config');

// =================== Services =================== //
const seedDb = require('./database/db.seed');
const {logger, loggErrorFile} = require('./helpers/logger');

// =================== Server ARGV Config =================== //
const argv = yargs
    .default({
        port: process.env.PORT,
        seed: false     //Si se le pasa TRUE elimina los registros de PRODUCTOS y los vuelve a sembrar
    })
    .alias({
        p: 'port',
        s: 'seed'
    })
    .argv


const main = () => {
    try {
        server.listen(argv.port, () => logger.info(`Server on PORT: ${argv.port}!`));
        mongoAtlasConnect().then(() => logger.info(`Connection to MongoDB Atlas succesfully!`) );
        if (argv.seed) seedDb();
    } catch (error) {
        loggErrorFile.error(`Error al iniciar el servidor: ${error}`);
    }
}

main();