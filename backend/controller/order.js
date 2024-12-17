const express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/AsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Order = require("../model/order.js");
const Product = require("../model/product");
const { route } = require("./user");
const { isAuthenticated, admin } = require("../middleware/Auth.js");
const { ObjectId } = require("mongodb");
const SSLCommerzPayment = require("sslcommerz-lts");

//SSLCommerz
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false;

//Order Items
router.post(
    "/placeorder",
    isAuthenticated,
    asyncHandler(async (req, res, next) => {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
        } = req.body;

        if (orderItems && orderItems.length === 0) {
            return next(new ErrorHandler("No order items"), 400);
        }

        try {
            const order = new Order({
                orderItems: orderItems.map((x) => ({
                    ...x,
                    product: x._id,
                    _id: undefined,
                })),
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice,
            });

            const createOrder = await order.save();

            orderItems.map(async (order) => {
                const product = await Product.findById(order._id);
                product.countInStock = product.countInStock - order.qty;
                product.totalSell = product.totalSell + order.qty;
                await product.save();
            });

            res.status(201).json(createOrder);
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

//user order items
router.get(
    "/myorders",
    isAuthenticated,
    asyncHandler(async (req, res, next) => {
        try {
            const orders = await Order.find({ user: req.user._id }).sort({
                updatedAt: -1,
                createdAt: -1,
            });
            res.status(200).json(orders);
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

//Order by id
router.get(
    "/:id",
    isAuthenticated,
    asyncHandler(async (req, res, next) => {
        try {
            const order = await Order.findById(req.params.id).populate(
                "user",
                "name email phoneNumber"
            );

            if (!order) {
                return next(new ErrorHandler("Order is not found", 404));
            }

            res.status(200).json(order);
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

//payment sslcommerz
router.post(
    "/online-payment",
    isAuthenticated,
    asyncHandler(async (req, res, next) => {
        const tran_id = new ObjectId().toString();
        const order = await Order.findById(Object.keys(req.body)).populate(
            "user",
            "name email phoneNumber"
        );

        const updateOrder = await Order.findById(Object.keys(req.body));
        updateOrder.tranId = tran_id;

        await updateOrder.save();

        const data = {
            total_amount: order.totalPrice,
            currency: "BDT",
            tran_id: tran_id, // use unique tran_id for each api call
            success_url: `http://localhost:8080/api/v2/orders/payment-online/success/${tran_id}`,
            fail_url: `http://localhost:8080/api/v2/orders/payment-online/failed/${tran_id}`,
            cancel_url: "http://localhost:3030/cancel",
            ipn_url: "http://localhost:3030/ipn",
            shipping_method: "Courier",
            product_name: "Computer.",
            product_category: "Electronic",
            product_profile: "general",
            cus_name: order.user.name,
            cus_email: order.user.email,
            cus_add1: order.shippingAddress.address,
            cus_add2: "Dhaka",
            cus_city: order.shippingAddress.city,
            cus_state: "Dhaka",
            cus_postcode: order.shippingAddress.postalCode,
            cus_country: order.shippingAddress.country,
            cus_phone: order.user.phoneNumber || " ",
            cus_fax: "01711111111",
            ship_name: order.user.name,
            ship_add1: order.shippingAddress.address,
            ship_add2: "Dhaka",
            ship_city: order.shippingAddress.city,
            ship_state: "Dhaka",
            ship_postcode: order.shippingAddress.postalCode,
            ship_country: order.shippingAddress.country,
        };

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        sslcz.init(data).then((apiResponse) => {
            // Redirect the user to payment gateway
            let GatewayPageURL = apiResponse.GatewayPageURL;
            res.send({ url: GatewayPageURL, updateOrder });
            console.log("Redirecting to: ", GatewayPageURL);
        });
    })
);

//payment sslcommerz success
router.post(
    "/payment-online/success/:tranId",
    isAuthenticated,
    asyncHandler(async (req, res, next) => {
        try {
            const updateOrder = await Order.findOne({ tranId: req.params.tranId });

            if (!updateOrder) {
                return res.status(404).json({ message: "Order is not found" });
            }

            updateOrder.isPaid = true;
            await updateOrder.save();
            res.redirect(`http://localhost:3000/placeorder`);
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

//payment sslcommerz failed
router.post(
    "/payment-online/failed/:tranId",
    isAuthenticated,
    asyncHandler(async (req, res, next) => {
        try {
            await Order.deleteOne({tranId: req.params.tranId})
            res.redirect(`http://localhost:3000/`);
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
); 

//update order status
router.put(
    "/:id",
    isAuthenticated,
    admin,
    asyncHandler(async (req, res, next) => {
        const order = await Order.findById(req.body._id);

        if (!order) {
            return next(new ErrorHandler("Order is not found", 404));
        }

        if (req.body.currentStatus === "Delivered") {
            order.orderStatus = req.body.currentStatus;
            order.isPaid = true;
            order.deliveredAt = Date.now();
        } else {
            order.orderStatus = req.body.currentStatus;
        }

        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    })
);

//get all orders
router.get(
    "/",
    isAuthenticated,
    admin,
    asyncHandler(async (req, res, next) => {
        const orders = await Order.find({}).populate("user", "id name email").sort({
            createdAt: -1,
            updatedAt:-1
        });
        res.status(200).json(orders);
    })
);

module.exports = router;
