const mongoose = require("mongoose");
const users = require("../data/user");
const products = require("../data/products");
const userModel = require("../model/user");
const productModel = require("../model/product");
const orderModel = require("../model/order");
const connectDatabase = require("../db/Database");

//Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "backend/config/.env",
    });
}

//Connect Database
connectDatabase();

const importData = async () => {
    try {
        await orderModel.deleteMany();
        await productModel.deleteMany();
        await userModel.deleteMany();

        const createdUsers = await userModel.insertMany(users);
        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        await productModel.insertMany(sampleProducts);
        console.log("Data Imported Successfully");
    } catch (error) {
        console.log(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await orderModel.deleteMany();
        await productModel.deleteMany();
        await userModel.deleteMany();

        console.log("Data Destroyed Successfully");
        process.exit();
    } catch (error) {
        console.log(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
