const app = require('./app');
const mongoAtlasConnect = require('./database/db.config');

const PORT = process.env.PORT;


const main = () => {
    try {
        mongoAtlasConnect()
        app.listen(PORT, () => console.log(`Server on PORT: ${PORT} !`))
    } catch (error) {
        console.log(error)
    }
}

main();