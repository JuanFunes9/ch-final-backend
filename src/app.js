////////////////////////////IMPORTS////////////////////////////
// =========================== Librerias =========================== //
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config()

const app = express();
const loggerMiddleware = require('./middlewares/loggerMiddleware');
// =========================== Modules =========================== //
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/products.routes');
const cartRoutes = require('./routes/cart.routes');
const userRutes = require('./routes/user.routes');
const orderRoutes = require('./routes/order.routes');
const infoRoutes = require('./routes/info.routes');

////////////////SETTINGS & MIDDLEWARES/////////////////////////
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './src/uploads'
}));
app.use(cors());

// =========================== Routes =========================== //
app.use('/auth', loggerMiddleware, authRoutes);
app.use('/products', loggerMiddleware, productRoutes);
app.use('/cart', loggerMiddleware, cartRoutes);
app.use('/users', loggerMiddleware, userRutes);
app.use('/orders', loggerMiddleware, orderRoutes);
app.use('/info', loggerMiddleware, infoRoutes);
app.get('/*', (req, res) => {
    res.status(404).json({
        ok: false,
        data: "Ruta no implementada"
    })
})

module.exports = app;