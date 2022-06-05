const generalController = require('./generalControllers');
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const csv = require('csvtojson');
const Products = require('../models/productModel');

/////////////////////////////////////////////////////////////////////////////////////////////


exports.updateInventory = catchAsync(
    async (req, res, next) => {

        let f = 0;


        if (!req.files) {
            return next(new AppError('Please upload a csv file containing the inventory list.', 404));
        }

        const file = req.files;


        if (file.inventory.mimetype.split('/')[1] !== 'csv') {
            return next(new AppError('Please upload a csv file containing the inventory list.', 404));
        }


        const csvData = file.inventory.data.toString('utf8');

        csv().fromString(csvData).then(async (jsonObj) => {


            for (const product of jsonObj) {

                const currentProduct = await Products.findOne({name: product.name});

                if (currentProduct !== null) {

                    try {
                        const newQuantity = Number(currentProduct.quantity) + Number(product.quantity);
                        currentProduct.quantity = newQuantity;


                        if (currentProduct.description !== product.description) {
                            currentProduct.description = product.description;
                        }
                        if (currentProduct.price !== product.price) {
                            currentProduct.price = product.price;
                        }
                        if (currentProduct.picture !== product.picture) {
                            currentProduct.picture = product.picture;
                        }


                    } catch (err) {

                    }


                    currentProduct.save();


                } else {

                    try {
                        await Products.create(product);
                    } catch (err) {
                        return new AppError('Bad request while creating new Products' +
                            ' Check your csv input file and try again.', 403);
                    }

                }


            }

        });


        res.status(200).json({
            status: 'success',
            message: 'Inventory successfully updated.'
        });


    });


/////////////////////////////////////////////////////////////////////////////////////////////

