const mongoose = require('mongoose');

/////////////////////////////////////////////////////////////////////////////


const productSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'A product must have a name.'],
        unique: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: [true, 'A product must have a price.']
    },
    category: {
        type: String,
        required: [true, 'A product must have a category.'],
        enum: {
            values: ['Greatest Offers', 'gourmet', 'Fruits & Vegetables', 'Cheese',
                'Meat', 'Chicken & Poultry', 'Seafood', 'Frozen Food', 'Cold Cuts',
                'Salads & Ready Meals', 'Bakery & Pastry', 'Eggs', 'Dairy Products',
                'Milk', 'Water', 'Beverages', 'Everyday Roastery Coffee', 'Coffee & Tea',
                'Breakfast Food', 'Healthy Mix', 'Cooking', 'Condiments', 'Baking Products',
                'Canned & Jarred Food', 'Ice Cream', 'Chocolates & Biscuits', 'Chips & Crackers',
                'Laundry', 'General Home Cleaning', 'Hair Care', 'Skin Care', 'Women Care',
                'Men Grooming', 'Bath & Body Clean', 'Oral Care', 'Pharmacy', 'Baby Care Products',
                'kitchen Consumables', 'Paper Products & Wipes', 'Household Essentials', 'Luxuries & Accessories'],
            message: 'Category must be of: Greatest Offers, Gourmet, Fruits & Vegetables,' +
                ' Cheese, Meat, Chicken & Poultry, Seafood, Frozen Food, Cold Cuts, Salads & Ready Meals, Bakery & Pastry, Eggs, Dairy Products, ' +
                'Milk, Water, Beverages, Everyday Roastery Coffee, Coffee & Tea, Breakfast Food, Healthy Mix, ' +
                'Cooking, Condiments, Baking Products, Canned & Jarred Food, Ice Cream, Chocolates & Biscuits, ' +
                'Chips & Crackers, Laundry, General Home Cleaning, Hair Care, Skin Care, Women Care, Men Grooming, ' +
                'Bath & Body Clean, Oral Care, Pharmacy, Baby Care Products, kitchen Consumables, Paper Products & Wipes, ' +
                'Household Essentials, Luxuries & Accessories'
        }
    },
    picture: {
        type: String,
        required: [true, 'A product must have a picture.']
    },
    quantity: {
        type: Number,
        default: 0
    },
    stock: {
        type: String,
        default: 'Available',
        enum: {
            values: ['Available', 'Unavailable']
        }
    }

}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
});

/////////////////////////////////////////////////////////////////////////////

productSchema.pre('save', function (next) {
    if (this.quantity === 0) {
        this.stock = 'Unavailable';
    }
    next();
});

/////////////////////////////////////////////////////////////////////////////


const Product = mongoose.model('Product', productSchema);
module.exports = Product;