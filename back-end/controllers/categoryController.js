const Category = require("../models/categoryModel")

exports.addCategory = (req, res) => {
    try {
        console.log(req.body)
        Category.create(req.body)
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