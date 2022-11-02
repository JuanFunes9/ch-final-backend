const router = require('express').Router();
const { check } = require('express-validator');

// =========================== Services =========================== //

// =========================== Middlewares =========================== //
const validateFields = require('../middlewares/validateFields');
const validateImg = require('../middlewares/validateImg');
const validateCategorie = require('../middlewares/validateCategorie');
const validateUserAuth = require('../middlewares/validateUserAuth');
const validateUserAdmin = require('../middlewares/validateUserAdmin');

// =========================== Controllers =========================== //
const productController = require('../controllers/product.controller');


router.get('/', [], productController.getAll);

router.get('/:categorie', productController.getByCategorie)

router.get('/get-by-id/:id', [
    check('id', 'Ingrese un ID de mongo valido.').isMongoId(),
    validateFields
], productController.getById);

router.post('/upload-img', [
    validateUserAuth,
    validateImg
], productController.uploadProdImg)

router.post('/', [
    validateUserAuth,
    validateUserAdmin,
    check('title', 'Ingrese un titulo valido.').isLength({ min: 3 }),
    check('price', 'Ingrese un precio valido').isInt({ min: 0 }),
    check('desc', 'Ingrese una descripcion basica').isLength({ min: 10 }),
    check('image', 'Ingrese una url de imagen valida').isURL(),
    validateCategorie,
    validateFields
], productController.newProduct);

router.put('/:id', [
    validateUserAuth,
    validateUserAdmin
], productController.updateProduct);

router.delete('/:id', [
    validateUserAuth,
    validateUserAdmin
], productController.deleteProduct);



module.exports = router;