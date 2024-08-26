const ErrorHandler = require("../utils/ErrorHandler");

const notFound = (req, res, next) => {
    const error = new ErrorHandler(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

module.exports=notFound;
