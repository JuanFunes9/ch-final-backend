const router = require('express').Router();
const { check } = require('express-validator');

// =========================== Services =========================== //

// =========================== Middlewares =========================== //
const validateFields = require('../middlewares/validateFields');
const validateUserAuth = require('../middlewares/validateUserAuth');

// =========================== Controllers =========================== //
const cartController = require('../controllers/cart.controller');

router.get('/', [
    validateUserAuth
], cartController.getCart)

router.post('/add-product/:prodId', [
    validateUserAuth,
    check('prodId', 'Ingrese un ID de mongo valido.').isMongoId(),
    validateFields
], cartController.addToCart)

router.delete('/delete-product/:prodId', [
    validateUserAuth,
    check('prodId', 'Ingrese un ID de mongo valido.').isMongoId(),
    validateFields
], cartController.removeFromCart)



module.exports = router;