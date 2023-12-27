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
        const newProduct = req.body
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            public_id: `${Date.now()}`,
            resource_type: "auto",
            folder: "images"
        })
        newProduct.image = result.url

        const update = await Product.findByIdAndUpdate(id, req.body, {
            new: true
        })
        res.status(201).json({
            status: 'success',
            data: newProduct
        })
    } catch (err) {
        res.status(500).send({
            status: "error",
            msg: err
        })
    };
}

exports.getPagination = async (req, res) => {
    try {

        const query = req.query
        const skip = (query.page - 1) * query.limit
        const data = await Product.find()
            .populate({
                path: 'category',
                match: { name: query.category},
                select: 'name'
            })
            .exec();
        const filteredData = data.filter(product => product.category != null);
        const paginatedResults = filteredData.slice(skip, skip + query.limit * 1.0);

        res.status(200).json({
            status: 'success',
            totalPage: Math.ceil(filteredData.length / query.limit),
            data: paginatedResults,
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
        const keyword = req.params.key;
        const data = await Product.find({
            $or: [{
                    title: {
                        $regex: keyword,
                        $options: 'i'
                    }
                }, 
                {
                    category: {
                        $regex: keyword,
                        $options: 'i'
                    }
                }
            ]
        })
        .populate({
            path: 'category'
        })
        .exec();

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