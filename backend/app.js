const express = require("express");
const ErrorHandler = require("./middleware/Error");
const notFound = require("./middleware/NotFound");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "https://bytemert-tech-shop.netlify.app",
        credentials: true,
    })
);

app.use("/images/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

//Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "backend/config/.env",
    });
}

//imports routes
const userController = require("./controller/user");
app.use("/api/v2/users", userController);

const productController = require("./controller/product");
app.use("/api/v2/products", productController);

const ordersController = require("./controller/order");
app.use("/api/v2/orders", ordersController);

//Error Handling
app.use(notFound);
app.use(ErrorHandler);

Error;

module.exports = app;
