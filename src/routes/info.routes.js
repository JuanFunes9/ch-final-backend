// ==================== MiddleWares ==================== //
const validateUserAdmin = require('../middlewares/validateUserAdmin');
const validateUserAuth = require('../middlewares/validateUserAuth');

// ==================== Controller ==================== //
const infoController = require('../controllers/info.controller')

const router = require('express').Router();

router.get('/', [
    validateUserAuth,
    validateUserAdmin
], infoController.getServerInfo)

module.exports = router;