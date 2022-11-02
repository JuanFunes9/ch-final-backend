// =========================== Middlewares =========================== //
const validateUserAdmin = require('../middlewares/validateUserAdmin');
const validateUserAuth = require('../middlewares/validateUserAuth');

// =========================== Controllers =========================== //
const orderController = require('../controllers/order.controllers');

const router = require('express').Router();

router.get('/', [
    validateUserAuth
], orderController.getOrdersByUser)

router.get('/admin/all-orders', [
    validateUserAuth,
    validateUserAdmin
], orderController.getAllOrders);



module.exports = router;