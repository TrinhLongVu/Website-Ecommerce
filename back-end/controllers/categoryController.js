const Category = require("../models/categoryModel")
const Product = require("../models/productModel")

exports.getCategory = async (req, res) => {
    try {
        const data = await Category.find({});
        res.status(201).json({
            status: "success",
            data: data,
        })
    }
    catch (err) {
        res.status(500).json({
            status: "failed",
            data: err
        })
    }
}

exports.addCategory = async (req, res) => {
    try {
        await Category.create(req.body)
        res.status(201).json({
            status: "success"
        })
    }
    catch (err) {
        res.status(500).json({
            status: "fail",
            data: err
        })
    }
}

exports.getPagination = async (req, res) => {
    try {
        const query = req.query
        console.log(query)
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