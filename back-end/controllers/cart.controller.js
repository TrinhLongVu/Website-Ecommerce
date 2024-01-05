const User = require('../models/user.model')
const Product = require('../models/product.model');

exports.getCart = async (req, res) => { // thông tin trả về là user.Cart và tổng số tiền của Cart
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        const products = await Product.find();
        if (!user) {
            return res.status(200).json({
                status: "fail",
                data: "Cannot find this user"
            });
        }

        let totalPrice = user.Cart.reduce((total, cartItem) => {
            let product = products.find(product => product.id == cartItem.product_id);
            return product ? total + cartItem.quantity * product.price : total;
        }, 0);


        res.status(201).json({
            status: "success",
            data: { cart: user.Cart, totalPrice: totalPrice }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "fail",
            data: err.message
        });
    }
};


exports.addCart = async (req, res) => {
    try {
        const { product_id, quantity } = req.body;
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(200).json({
                status: "fail",
                data: "Cannot find this user"
            });
        }

        const product = await Product.findById(product_id)
        if (!product) {
            return res.status(200).json({
                status: "fail",
                data: "Product does not exist"
            });
        }

        const existingProduct = user.Cart.find(item => item.product_id == product_id);

        if (existingProduct) {
            // If the product is already in the cart, update the quantity
            const Intquantity = parseInt(quantity)
            existingProduct.quantity += Intquantity;
        } else {
            // If the product is not in the cart, push a new entry
            user.Cart.push({
                product_id,
                quantity
            });
        }

        // Save the updated user
        const updatedUser = await user.save();

        res.status(201).json({
            status: "success",
            data: updatedUser.Cart
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "fail",
            data: err.message
        });
    }
};


exports.minusCart = async (req, res) => {
    try {
        const { product_id, quantity } = req.body;
        const userId = req.params.id;

        // Check if the product is already in the cart
        const user = await User.findById(userId);
        if (!user) {
            return res.status(200).json({
                status: "fail",
                data: "Cannot find this user"
            });
        }
        const product = await Product.findById(product_id)
        if (!product) {
            return res.status(200).json({
                status: "fail",
                data: "Product does not exist"
            });
        }

        const existingProduct = user.Cart.find(item => item.product_id == product_id);

        if (existingProduct) {
            // If the product is in the cart, update the quantity
            existingProduct.quantity -= quantity;

            if (existingProduct.quantity <= 0) {
                // If the quantity becomes zero or negative, remove the product from the cart
                user.Cart = user.Cart.filter(item => item.product_id != product_id);
            }

            // Save the updated user
            await user.save();

            res.status(200).json({
                status: "success"
            });
        } else {
            // If the product is not in the cart, you can handle it accordingly
            res.status(404).json({
                status: "fail",
                message: "Product not found in the cart"
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "fail",
            data: err.message
        });
    }
};

exports.deleteCart = async (req, res) => {
    try {
        const { product_id } = req.body;
        const userId = req.params.id;
        // Check if the product is already in the cart
        const user = await User.findById(userId);
        if (!user) {
            return res.status(200).json({
                status: "fail",
                data: "Cannot find this user"
            });
        }

        const product = await Product.findById(product_id)
        if (!product) {
            return res.status(200).json({
                status: "fail",
                data: "Product does not exist"
            });
        }

        const existingProduct = user.Cart.find(item => item.product_id == product_id);

        if (existingProduct) {
            user.Cart = user.Cart.filter(item => item.product_id != product_id);

            // Save the updated user
            await user.save();

            res.status(200).json({
                status: "success"
            });
        } else {
            // If the product is not in the cart, you can handle it accordingly
            res.status(404).json({
                status: "fail",
                message: "Product not found in the cart"
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "fail",
            data: err.message
        });
    }
};
