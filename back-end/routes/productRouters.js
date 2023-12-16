const express = require('express');
const router = express.Router();

const articleController = require('../controllers/productController')
// const uploadImage = (image) => {
//     return new Promise((resolve, reject) => {
//         cloudinary.uploader.upload(image, {
//             overwrite: true,
//             invalidate: true,
//             resource_type: "auto",
//         }, (error, result) => {
//             if (result && result.secure_url) {
//                 // console.log(result.secure_url);
//                 return resolve(result.secure_url);
//             }
//             // console.log(error.message);
//             return reject({
//                 message: error.message
//             });
//         });
//     });
// };

router
    .route('/')
    .get(articleController.getAllProduct)
    .post(articleController.createProduct)

router
    .route('/create/createAll')
    .post(articleController.createAllProduct)

router
    .route('/category/:name')
    .get(articleController.getCategory)

router
    .route('/top/:name')
    .get(articleController.getTops)

router
    .route('/upload/:id')
    .post((req, res) => {
        // console.log("1111", req.body)
        // console.log(req)
        try {
            res.status(200).send("ok")
            // uploadImage(req.body.image)
            //     .then((url) => res.send(url))
            //     .catch((err) => res.status(500).send(err));
        } catch (error) {
            console.error('Error uploading image:', error.message);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    })

router
    .route('/page/pagination')
    .get(articleController.getPagination)

router
    .route('/:id')
    .get(articleController.getProduct)
    .patch(articleController.updateProduct)
    .delete(articleController.deleteProduct)
    .post(articleController.addComment)

router
    .route('/search/:searchString')  // Note: if searchString have multiple words, convert to "word1+word2+..." .concatnate words with a "+" sign, must not have "space"(" ") in searchString
    .get(articleController.SearchProduct)

module.exports = router;