const express = require("express");

/////////////////////////////////////////////////////////////////////////////////////////////

const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

/////////////////////////////////////////////////////////////////////////////////////////////


const router = express.Router();

router.route('/')
    .get(productController.getAllProducts);

router.route('/:id')
    .get(productController.getProduct)
    .delete(productController.deleteProduct);

router.route('/match/:chars')
    .get(productController.getBestFiveResults);


/////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;