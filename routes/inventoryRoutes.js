const express = require("express");
/////////////////////////////////////////////////////////////////////////////////////////////

const inventoryController = require('../controllers/inventoryController');
const authController = require("../controllers/authController");

/////////////////////////////////////////////////////////////////////////////////////////////


const router = express.Router();

router.route('/update-inventory')
    .post(inventoryController.updateInventory);


/////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;
