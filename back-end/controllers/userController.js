const fs = require('fs').promises;
const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const Product = require('../models/productModel');
const { pseudoRandomBytes } = require('crypto');
const Category = require('../models/categoryModel');
const product = require('../models/productModel');

//=========================== FUNCTION =========================================================================
function checkIfElementExists(element, array) {
    return array.includes(element);
}
//=============================================================================================================

exports.getAllUsers = async (req, res) => {
    try {
        const alldata = await User.find()

        res.status(201).json({
            status: 'success',
            data: alldata
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            msg: err
        })
    }
}

exports.createAllUser = async (req, res) => {
    try {

        const filePath = `${__dirname}data\\user.json`.replace('controllers', '');
        const users = JSON.parse(fs.readFileSync(filePath, 'utf-8')).user;

        //=================================================================================
        for (const user of users) {
            const { UserName } = user;

            try {
                // Check if username is taken
                const isTaken = await User.findOne({ UserName });

                // If username is taken, log a message and continue to th iteration
                if (isTaken) {
                    console.log(`Username '${UserName}' is already taken. Skipping user creation.`);
                    continue;
                }
                const saltRounds = 10
                // If username is not taken, create the user
                bcrypt.hash(user.Password, saltRounds, async function (err, hash) {
                    if (err) {
                        retur(err);
                    }
                    await User.create({
                        UserName: UserName,
                        Password: hash
                    });
                })

            } catch (error) {
                // Handle any other errors that might occur during user creation
                console.error(`Error creating user with username '${UserName}':`, error);
            }
        }

        res.status(201).json({
            status: 'success'
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            msg: err
        })
    }

}

exports.getUser = async (req, res) => {
    try {

        const _id = req.params.id;

        // Find the user by ID 
        const finduser = await User.findById(_id);

        if (!finduser) {
            // If the user with the specified ID is not found, return an error response
            return res.status(404).json({
                status: 'fail',
                msg: 'User not found.',
            });
        }


        res.status(201).json({
            status: 'success',
            data: finduser
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            msg: err
        })
    }
}

exports.updateUser = async (req, res) => {
    try {

        const _id = req.params.id;

        const update = await User.findByIdAndUpdate(_id, req.body, {
            new: true
        });

        if (!update) {
            return res.status(404).json({
                status: 'fail',
                msg: 'Update fail.',
            });
        }

        res.status(201).json({
            status: 'success',
            data: update
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            msg: err
        })
    };
}

exports.deleteUser = async (req, res) => {
    try {

        const _id = req.params.id;

        // Find the user by ID and delete it
        const deletedUser = await User.deleteOne({ _id });
        // const deletedUser = await User.deleteMany();

        if (!deletedUser) {
            // If the user with the specified ID is not found, return an error response
            return res.status(404).json({
                status: 'fail',
                msg: 'User not found.',
            });
        }


        res.status(201).json({
            status: 'success',
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            msg: err
        })
    }
}

exports.getCart = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(200).json({
                status: "fail",
                data: "Cannot find this user"
            });
        }

        res.status(201).json({
            status: "success",
            data: user.Cart
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


exports.searchProduct = async (req, res) => {
    try {
        const { searchValue } = req.body;

        const products = await Product.find();
        const categories = await Category.find();

        const normalize = (text) => text.replace(/\s/g, '').toLowerCase();

        const searchResult = products.filter(product => {
            const normalizedTitle = normalize(product.title);
            const normalizedDetail = normalize(product.detail);

            const titleMatch = normalizedTitle.includes(normalize(searchValue));
            const detailMatch = normalizedDetail.includes(normalize(searchValue));
            
            const categoryMatch = categories.some(category => {
                const normalizedCategoryName = normalize(category.name);
                return normalizedCategoryName.includes(normalize(searchValue)) && product.category.includes(category._id);
            });

            return titleMatch || detailMatch || categoryMatch;
        });

        console.log(searchResult.length)

        if (searchResult.length === 0) {
            return res.status(200).json({
                status: "fail",
                message: "Can't find what you want"
            });
        }

        res.status(200).json({
            status: "success",
            data: searchResult
        });
    } catch (error) {
        console.error('Error searching for products:', error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
};