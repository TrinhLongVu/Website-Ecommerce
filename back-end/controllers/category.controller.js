const Category = require("../models/category.model")
const Product = require("../models/product.model")

exports.getCategory = async (req, res) => {
    try {
        const data = await Category.find({});
        const filteredData = data.filter(product => product.isHidden == false);
        res.status(201).json({
            status: "success",
            data: filteredData,
        })
    }
    catch (err) {
        res.status(500).json({
            status: "failed",
            data: err
        })
    }
}

exports.getAdminCategory = async (req, res) => {
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
        const query = req.query;
        const skip = (query.page - 1) * query.limit;
    
        let data = Product.find()
            .populate({
                path: 'category',
                match: { name: query.category },
                select: 'name'
            })
        
        if (query.sort) {
            const sortBy = query.sort.split(',').join(' ');
            data = data.sort(sortBy);
        }

        const result = await data.exec();
        let filteredData = result.filter(product => product.category != null);
        const paginatedResults = filteredData.slice(skip, skip + query.limit * 1.0);
    
        res.status(200).json({
            status: "success",
            totalPage: Math.ceil(filteredData.length / query.limit),
            data: paginatedResults
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err.message
        });
    }
}

exports.hidden = async (req, res) => {
    const { category } = req.body;
    let cate = await Category.findOne({ name: category })
    const hidden = cate.isHidden ? false : true 
    try {
        await Category.updateOne({ name: category }, { $set: { isHidden: hidden } })
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