////////////////////////////IMPORTS////////////////////////////
// =========================== Librerias =========================== //
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config()

const app = express();

// =========================== Modules =========================== //
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/products.routes');
const cartRoutes = require('./routes/cart.routes');

////////////////SETTINGS & MIDDLEWARES/////////////////////////
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './src/uploads'
}));
app.use(cors());

// =========================== Routes =========================== //
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes)

module.exports = app;