const fs = require('fs').promises;
const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const Product = require('../models/product.model');
const Category = require('../models/category.model');
const cloudinary = require('cloudinary').v2;

exports.getInfo = async (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: req.user
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            msg: err
        })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const query = req.query;
        const skip = (query.page - 1) * query.limit;
        const alldata = await User.find().skip(skip).limit(query.limit)
        const totalPage = Math.ceil(await User.countDocuments() / query.limit)
        res.status(201).json({
            status: 'success',
            totalPage: totalPage,
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

exports.createUser = async (req, res) => {
    try {
        const user = req.body;

        const isTaken = await User.findOne({
            "UserName": user.UserName
        });
        if (isTaken) {
            return res.status(400).json({
                status: "fail",
                msg: "Email is already taken",
            });
        }

        bcrypt.hash(user.Password, 10, async function (err, hash) {
            if (err) {
                retur(err);
            }
            await User.create({
                UserName: user.UserName,
                Role: user.Role,
                FullName: user.FullName,
                Password: hash
            });
        })

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

        const id = req.params.id;
        const newUser = req.body
        if (req.files) {
            const file = req.files.image;
            const result = await cloudinary.uploader.upload(file.tempFilePath, {
                public_id: `${Date.now()}`,
                resource_type: "auto",
                folder: "images"
            })
            newUser.Image_Avatar = result.url
        }
        const update = await User.findByIdAndUpdate(id, newUser, {
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

exports.searchProduct = async (req, res) => {
    try {
        const { page, limit, search, filter, filtercategory } = req.query;
        let arrayfilter = [];
        if (filter) {
            arrayfilter = filter.split(',')
        }

        const skip = (page - 1) * limit;
        let queryBuilder = Product.find()
            .populate({
            path: 'category',
            select: 'name'
        })

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            queryBuilder = queryBuilder.sort(sortBy);
        }
        const products = await queryBuilder.exec();

        const categories = await Category.find();

       
        const normalize = (text) => (text ? text.replace(/\s/g, '').toLowerCase() : '');

        const searchResult = products.filter(product => {
            const normalizedTitle = normalize(product.title);
            const normalizedDetail = normalize(product.detail);

            const titleMatch = normalizedTitle.includes(normalize(search));
            const detailMatch = normalizedDetail.includes(normalize(search));

            const categoryMatch = categories.some(category => {
                if (!product.category || !category.name || !Array.isArray(product.category)) {
                    return false;
                }

                const normalizedCategoryName = normalize(category.name);
                return normalizedCategoryName.includes(normalize(search)) && product.category.includes(category._id);
            });

            let check = true;
            if (filter) {
                check = false
                if (product.price >= arrayfilter[0] && product.price <= arrayfilter[1]){
                    check = true
                }
            }

            const checkcate = product.category.name == filtercategory

            return (titleMatch || detailMatch || categoryMatch) && check && checkcate;
        });
        const result = searchResult.slice(skip, skip + limit * 1.0);

        if (searchResult.length === 0) {
            return res.status(200).json({
                status: "fail",
                message: "Can't find what you want"
            });
        }

        res.status(200).json({
            status: "success",
            totalPage: Math.ceil(searchResult.length / limit),
            data: result
        });
    } catch (error) {
        console.error('Error searching for products:', error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
};