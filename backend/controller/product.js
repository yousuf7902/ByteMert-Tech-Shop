const express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/AsyncErrors");
const Product = require("../model/product");
const ErrorHandler = require("../utils/ErrorHandler");
const { isAuthenticated, admin } = require("../middleware/Auth.js");
const { upload } = require("../multer");
const path = require("path");

//Get All Products
router.get(
    "/",
    asyncHandler(async (req, res, next) => {
        try {
            const products = await Product.find({});
            if (products) {
                return res.status(200).json(products);
            }

            return res.status(404).json({ message: "Products are not found" });
        } catch (err) {
            return next(new ErrorHandler(err.message, 500));
        }
    })
);

//Get Single ,latest, Best Selling Products
router.get(
    "/:name",
    asyncHandler(async (req, res, next) => {
        try {
            const originalName = req.params.name.replace(/-/g, " ");

            if (originalName === "latest products") {
                const latestProducts = await Product.find().sort({ createdAt: -1 });
                return res.status(200).json(latestProducts);
            } else if (originalName === "best selling") {
                const topBestSelling = await Product.find().sort({ totalSell: -1 });
                return res.status(200).json(topBestSelling);
            } else {
                const product = await Product.findOne({ name: originalName });
                if (product) {
                    return res.status(200).json(product);
                }
                return res.status(404).json({ message: "Product is not found" });
            }
        } catch (err) {
            return next(new ErrorHandler(err.message, 500));
        }
    })
);

router.get(
    "/slider/top",
    asyncHandler(async (req, res, next) => {
        const products = await Product.find({}).sort({ rating: -1 }).limit(5);
        res.status(200).json(products);
    })
);

router.get(
    "/homepage/featured",
    asyncHandler(async (req, res, next) => {
        try {
            const allProducts = await Product.find().sort({ rating: -1 });

            const topRated = allProducts.slice(0, 6);
            const restOfProducts = allProducts.slice(6);

            const randomProducts = [];
            while (randomProducts.length < 6 && restOfProducts.length > 0) {
                const randomIndex = Math.floor(Math.random() * restOfProducts.length);
                randomProducts.push(...restOfProducts.splice(randomIndex, 1));
            }

            const featuredProducts = [...topRated, ...randomProducts];

            res.json(featuredProducts);
        } catch (error) {
            res.status(500).json({ message: "Error fetching featured products", error });
        }
    })
);

//get product by Id
router.get(
    "/product/:id",
    asyncHandler(async (req, res, next) => {
        const product = await Product.findById(req.params.id);
        res.status(201).json(product);
    })
);

//create products
router.post(
    "/",
    isAuthenticated,
    admin,
    upload.single("file"),
    asyncHandler(async (req, res, next) => {
        const filename = req.file.filename;
        const fileUrl = path.join(filename);
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            user: req.user._id,
            image: fileUrl,
            brand: req.body.brand,
            category: req.body.category,
            countInStock: req.body.countInStock,
            numReviews: 0,
            description: req.body.description,
        });
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    })
);

//update a product
router.put(
    "/:id",
    isAuthenticated,
    admin,
    asyncHandler(async (req, res, next) => {
        const { name, price, description, brand, category, countInStock } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler("Product is not found", 404));
        }

        product.name = name;
        product.price = price;
        product.description = description;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.status(201).json(updatedProduct);
    })
);

//delete a product
router.delete(
    "/product/:id",
    isAuthenticated,
    admin,
    asyncHandler(async (req, res, next) => {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler("Product is not found", 404));
        }

        await Product.deleteOne({ _id: product._id });
        res.status(200).json({ message: "Product has been deleted" });
    })
);

//create a new review
router.post(
    "/:id/reviews",
    isAuthenticated,
    asyncHandler(async (req, res, next) => {
        const { _id, productRating, comments } = req.body;

        const product = await Product.findById(_id);
        //console.log(product);

        if (!product) {
            return next(new ErrorHandler("Resources not found", 404));
        }

        const alreadyReviewed = product.reviews.find(
            (review) => review.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            return next(new ErrorHandler("Product already reviewed", 400));
        }

        const review = {
            name: req.user.name,
            rating: productRating,
            comment: comments,
            user: req.user._id,
        };

    
        product.reviews.push(review);
        product.numReviews = product.numReviews+1;
        product.rating =
            product.reviews.reduce((acc, review) => acc + review.rating, 0) /
            product.reviews.length;

        const reviews = await product.save();
        res.status(201).json(reviews);
    })
);

module.exports = router;
