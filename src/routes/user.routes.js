const router = require('express').Router();

// =========================== Middlewares =========================== //
const validateUserAuth = require('../middlewares/validateUserAuth');
const validateUserAdmin = require('../middlewares/validateUserAdmin');
const validateIsOwnUser = require('../middlewares/validateIsOwnUser');
const validateImg = require('../middlewares/validateImg');

// =========================== Controllers =========================== //
const userController = require('../controllers/user.controller');

router.get('/', [
    validateUserAuth,
    validateUserAdmin
], userController.getAll);

router.get('/:id', [
    validateUserAuth,
    validateUserAdmin
], userController.getById);

router.post('/update-img', [
    validateUserAuth,
    validateImg
], userController.updateImage);

router.put('/:id', [
    validateUserAuth,
    validateIsOwnUser,
], userController.updateUser);

router.delete('/:id', [
    validateUserAuth,
    validateIsOwnUser,
], userController.deleteUser);

router.delete('/admin/:id', [
    validateUserAuth,
    validateUserAdmin
], userController.deleteUser)

module.exports = router;