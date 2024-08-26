const ErrorHandler = require("../utils/ErrorHandler");

const errorHandler= (err, req, res, next) =>{
    err.statusCode=err.statusCode ||500;
    err.message= err.message || "Internal Server Error...."
    
    //wrong id search
    if(err.name === "CastError"){
        const message = "Invalid Id....";
        err=new ErrorHandler(message, 404);
    }

    //duplicate data error
    if(err.code === 11000){
        const message =`Duplicate data found ..... ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    //wrong Jwt token
    if(err.name === "JsonWebTokenError"){
        const message ="Your url is invalid....";
        err= new ErrorHandler(message, 400);
    }

    //jwt expired
    if(err.name === "TokenExpireError"){
        const message ="Session is expired....";
        err= new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })

}

module.exports= errorHandler;