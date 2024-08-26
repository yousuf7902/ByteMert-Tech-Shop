const app = require("./app");
const connectDatabase = require("./db/Database");

//Handling errors
process.on("exceptions", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Sever is down.....");
});

//Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "backend/config/.env",
    });
}

//Connect Database
connectDatabase();


//Create Server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`); 
});

//Promise rejection
process.on("promiseRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Sever is down.....");

    server.close(() => {
        process.exit(1);
    });
});
