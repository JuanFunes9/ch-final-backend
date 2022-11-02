const router = require('express').Router();
const { check } = require('express-validator');

// =========================== Middlewares =========================== //
const validateEmailExists = require('../middlewares/validateEmailExists');
const validateFields = require('../middlewares/validateFields');
const validateUserAuth = require('../middlewares/validateUserAuth');

// =========================== Controllers =========================== //
const authController = require('../controllers/auth.controller');

router.post('/login', authController.login)

router.post('/register', [
    check('firstName', 'Ingrese un nombre valido.').isLength({min: 3}),
    check('lastName', 'Ingrese un apellido valido.').isLength({min: 2}),
    check('email', 'Ingrese un email valido.').isEmail(),
    check('password', 'Ingrese una password de minimo 6 caracteres.').isLength({min: 6}),
    check('address', 'Ingrese una direccion de facturacion valida.').isLength({min: 6}),
    check('phone', 'Ingrese un numero de telefono valido.').isLength({min: 6}),
    validateFields,
    validateEmailExists
], authController.register)

router.get('/whoami', [
    validateUserAuth
], authController.whoami)

module.exports = router;