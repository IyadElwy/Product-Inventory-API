const Product = require('../models/productModel');
const generalController = require('./generalControllers');
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

/////////////////////////////////////////////////////////////////////////////////////////////

const redis = require('redis');
const client = redis.createClient(process.env.REDISPORT);
/////////////////////////////////////////////////////////////////////////////////////////////


exports.getAllProducts = generalController.getAll(Product);
exports.getProduct = generalController.getOne(Product);
exports.deleteProduct = generalController.deleteOne(Product);

exports.getBestFiveResults = catchAsync(async (req, res, next) => {


    try {
        await client.connect();
    } catch (e) {

    }


    let data = await client.get(req.params.chars);


    if (data === null) {
        const regexp = new RegExp('^' + req.params.chars);
        const products = await Product.find({name: regexp}).limit(4);

        await client.setEx(req.params.chars, 10000, JSON.stringify(products));

        res.status(200).json({
            status: 'success',
            data: products
        });
    } else {

        data = JSON.parse(data);

        res.status(200).json({
            status: 'success',
            data
        });
    }


});

/////////////////////////////////////////////////////////////////////////////////////////////
