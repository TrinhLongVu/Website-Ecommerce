const Product = require('../models/productModel')
const User = require('../models/userModel')
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

exports.getAllProduct = async (req, res) => {
    try {
        const data = await Product.find()
        res.status(200).json({
            status: "success",
            data: data
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err
        })
    };
}

exports.getProduct = async (req, res) => {
    try {
        const id = req.params.id;
        let product = await Product.findById(id)

        res.status(200).json({
            status: "success",
            data: product
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err
        })
    }
}

exports.createProduct = async (req, res) => {
    try {
        const {
            title,
            detail,
            category,
            price
        } = req.body;
        const file = req.files.image;
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            public_id: `${Date.now()}`,
            resource_type: "auto",
            folder: "images"
        })

        const product = {
            Title: title,
            Detail: detail,
            Category: category,
            posted_time: new Date(),
            price: price,
            Image: result.url
        }

        const newProduct = await Product.create(product);
        res.status(201).json({
            status: 'success',
            data: {
                Product: newProduct
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            msg: err
        })
    }
}

exports.createAllProduct = async (req, res) => {
    try {
        const filePath = `${__dirname}data\\products.json`.replace('controllers', '');
        const Products = JSON.parse(fs.readFileSync(filePath, 'utf-8')).product;

        console.log(Products)

        for (const pr of Products) {
            await Product.create(pr);
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

exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const update = await Product.findByIdAndUpdate(id, req.body, {
            new: true
        })
        res.status(201).json({
            status: 'success',
            data: update
        })
    } catch (err) {
        res.status(500).send({
            status: "error",
            msg: err
        })
    };
}

exports.getTops = async (req, res) => {
    try {
        // const name = req.params.name;
        // let datas = '';
        // const limit = req.query.limit || 12;
        // console.log(name)

        // if (name == "increase") {
        //     datas = await Product.find({
        //         price:{ 
        //                 $exists: true,
        //                 $gt: 0
        //             }
        //         })
        //         .sort({
        //             view: 1
        //         }).limit(limit);
        // }

        // if (name == 'views') {
        //     datas = await Product.find({
        //             view: {
        //                 $exists: true,
        //                 $gt: 0
        //             }
        //         })
        //         .sort({
        //             view: -1
        //         }).limit(limit);
        // } else if (name == 'likes') {
        //     datas = await Product.find({
        //         likes: {
        //             $exists: true
        //         }
        //     }).sort({
        //         likes: -1
        //     }).limit(limit);
        // } else if (name == 'priority') {
        //     datas = await Product.find({
        //         isPriority: true
        //     }).limit(limit)
        // } else if (name == 'timer') {
        //     datas = await Product.find().sort({
        //         posted_time: -1
        //     }).limit(limit)
        // }
        // // console.log(datas)/
        // const result = await Promise.all(datas.map(async (data) => {
        //     const user = await User.findById(data.ID_author);
        //     // the cause is Products do not have attribute is imageAuthor then i must be parse them
        //     let aritcle = {
        //         ...data
        //     }._doc;
        //     aritcle.ID_author = user.FullName
        //     aritcle.imageAuthor = user.Image_Avatar
        //     return aritcle
        // }))

        res.status(200).json({
            status: 'success',
            data: datas
        })
    } catch (err) {
        res.status(500).send({
            status: "error",
            msg: err
        })
    };
}

exports.getCategory = async (req, res) => {
    try {
        // const data = await Product.find({
        //     Category: {
        //         $in: [req.params.name]
        //     }
        // }).exec();

        // const user = await User.findById(data.ID_author);
        // let Product = {
        //     ...data
        // }._doc;
        // Product.ID_author = user.FullName
        // Product.imageAuthor = user.Image_Avatar

        res.status(200).json({
            status: 'success',
            data: Product
        })
    } catch (err) {
        res.status(500).send({
            status: "error",
            msg: err
        })
    };
}

exports.getPagination = async (req, res) => {
    const query = req.query
    const skip = (query.page - 1) * query.limit
    try {
        const data = await Product.find()
            .populate('category')
            .exec();
        const filteredData = data.filter(product => product.category.name == query.category);

        res.status(200).json({
            status: 'success',
            data: filteredData
        })

    } catch (err) {
        res.status(500).send({
            status: "error",
            msg: err
        })
    };
}


exports.deleteProduct = async (req, res) => {
    try {

        const _id = req.params.id;

        // Find the user by ID and delete it
        // const deletedProduct = await Product.deleteOne({
        //     _id
        // });
        const deletedUser = await Product.deleteMany();

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


exports.SearchProduct = async (req, res) => {
    try {
        const tempsearchString = req.params.searchString;

        const searchString = tempsearchString.replace(/\+/g, ' ');

        console.log(searchString)


        const data = await Product.find({
            $or: [{
                    Title: {
                        $regex: searchString,
                        $options: 'i'
                    }
                }, // Search by Title
                {
                    Category: {
                        $in: [searchString]
                    }
                } // Search by Category
            ]
        });


        res.status(200).json({
            status: "success",
            data: data
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err
        })
    };
}